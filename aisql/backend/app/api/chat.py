"""
Chat router: natural-language to SQL pipeline.
POST /chat converts a user message to SQL, validates, executes, and optionally
enriches results with AI insights and chart suggestions.
"""
from __future__ import annotations

import logging
import time
import uuid
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import (
    get_db,
    get_insight_generator,
    get_llm_service,
    get_query_executor,
    get_sql_validator,
)
from app.models.dataset import Dataset
from app.models.query_history import QueryHistory
from app.schemas.dataset import ColumnInfo
from app.schemas.query import ChatRequest, ChatResponse, ChartSuggestion
from app.security.rate_limiter import limiter
from app.security.sanitizer import sanitize_user_input
from app.services.insight_generator import InsightGenerator
from app.services.llm_service import LLMService
from app.services.query_executor import QueryExecutor
from app.services.sql_validator import SQLValidator
from app.config import settings
from app.utils.exceptions import LLMError, QueryExecutionError

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "",
    response_model=ChatResponse,
    summary="Convert a natural language question to SQL and execute it",
)
@limiter.limit(settings.RATE_LIMIT)
async def chat(
    request: Request,
    body: ChatRequest,
    db: AsyncSession = Depends(get_db),
    llm_service: LLMService = Depends(get_llm_service),
    sql_validator: SQLValidator = Depends(get_sql_validator),
    query_executor: QueryExecutor = Depends(get_query_executor),
    insight_gen: InsightGenerator = Depends(get_insight_generator),
) -> ChatResponse:
    """
    Full NL→SQL pipeline:

    1. Load dataset metadata from the database.
    2. Sanitise the user message.
    3. Call LLMService to generate a SELECT query.
    4. Validate the generated SQL with SQLValidator.
    5. Execute via QueryExecutor (read-only, with timeout).
    6. Optionally generate insights & chart suggestion.
    7. Persist to query_history.
    8. Return ChatResponse.
    """
    query_id = uuid.uuid4()

    # ------------------------------------------------------------------
    # 1. Load dataset
    # ------------------------------------------------------------------
    stmt = select(Dataset).where(Dataset.id == body.dataset_id)
    result = await db.execute(stmt)
    dataset = result.scalar_one_or_none()

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail=f"Dataset '{body.dataset_id}' not found.",
        )

    if dataset.status != "ready":
        raise HTTPException(
            status_code=409,
            detail=f"Dataset is not ready (status: {dataset.status}). Please wait.",
        )

    # ------------------------------------------------------------------
    # 2. Sanitise user input
    # ------------------------------------------------------------------
    clean_message = sanitize_user_input(body.message, max_length=2_000)
    if not clean_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Reconstruct ColumnInfo objects from stored JSON schema
    column_infos: List[ColumnInfo] = []
    if dataset.column_schema:
        for col_dict in dataset.column_schema:
            column_infos.append(ColumnInfo(**col_dict))

    table_name = dataset.table_name

    # ------------------------------------------------------------------
    # 3. Generate SQL via LLM
    # ------------------------------------------------------------------
    generated_sql: str = ""
    history_status = "pending"
    error_msg: Optional[str] = None
    columns: List[str] = []
    rows: List[Dict[str, Any]] = []
    exec_time_ms = 0
    validated_sql: Optional[str] = None
    validation_notes: List[str] = []

    try:
        generated_sql = await llm_service.generate_sql(
            table_name=table_name,
            columns=column_infos,
            natural_language=clean_message,
            sample_rows=[],  # sample rows not stored; use empty list
        )
    except LLMError as exc:
        logger.error("LLM SQL generation failed: %s", exc)
        history_status = "error"
        error_msg = str(exc)
        return await _save_and_respond(
            db=db,
            query_id=query_id,
            dataset_id=body.dataset_id,
            nl_query=clean_message,
            generated_sql=generated_sql or "",
            validated_sql=None,
            is_valid=False,
            validation_notes=["LLM failed to generate SQL."],
            columns=[],
            rows=[],
            exec_time_ms=0,
            status=history_status,
            error_msg=error_msg,
            insights=None,
            chart=None,
        )

    # ------------------------------------------------------------------
    # 4. Validate SQL
    # ------------------------------------------------------------------
    is_valid, validation_notes, validated_sql = sql_validator.validate(
        generated_sql, allowed_table=table_name
    )

    if not is_valid:
        logger.warning(
            "SQL validation rejected query for dataset %s: %s",
            body.dataset_id, validation_notes,
        )
        return await _save_and_respond(
            db=db,
            query_id=query_id,
            dataset_id=body.dataset_id,
            nl_query=clean_message,
            generated_sql=generated_sql,
            validated_sql=None,
            is_valid=False,
            validation_notes=validation_notes,
            columns=[],
            rows=[],
            exec_time_ms=0,
            status="rejected",
            error_msg="; ".join(validation_notes),
            insights=None,
            chart=None,
        )

    # ------------------------------------------------------------------
    # 5. Execute SQL
    # ------------------------------------------------------------------
    try:
        columns, rows, exec_time_ms = await query_executor.execute(
            sql=validated_sql,  # type: ignore[arg-type]
            timeout_seconds=settings.QUERY_TIMEOUT_SECONDS,
        )
        history_status = "success"
    except QueryExecutionError as exc:
        logger.error("Query execution error: %s", exc)
        return await _save_and_respond(
            db=db,
            query_id=query_id,
            dataset_id=body.dataset_id,
            nl_query=clean_message,
            generated_sql=generated_sql,
            validated_sql=validated_sql,
            is_valid=True,
            validation_notes=validation_notes,
            columns=[],
            rows=[],
            exec_time_ms=0,
            status="error",
            error_msg=str(exc),
            insights=None,
            chart=None,
        )

    # ------------------------------------------------------------------
    # 6. Insights & chart (optional, non-blocking)
    # ------------------------------------------------------------------
    insights: Optional[str] = None
    chart_dict: Optional[Dict[str, Any]] = None

    if body.include_insights and rows:
        insights, chart_dict = await insight_gen.generate(
            query=clean_message,
            sql=validated_sql,  # type: ignore[arg-type]
            results=rows,
            columns=columns,
        )

    chart_suggestion: Optional[ChartSuggestion] = None
    if chart_dict:
        try:
            chart_suggestion = ChartSuggestion(**chart_dict)
        except Exception:
            chart_suggestion = None

    # ------------------------------------------------------------------
    # 7. Persist & respond
    # ------------------------------------------------------------------
    return await _save_and_respond(
        db=db,
        query_id=query_id,
        dataset_id=body.dataset_id,
        nl_query=clean_message,
        generated_sql=generated_sql,
        validated_sql=validated_sql,
        is_valid=True,
        validation_notes=validation_notes,
        columns=columns,
        rows=rows,
        exec_time_ms=exec_time_ms,
        status=history_status,
        error_msg=None,
        insights=insights,
        chart=chart_suggestion,
    )


# ---------------------------------------------------------------------------
# Internal helper
# ---------------------------------------------------------------------------


async def _save_and_respond(
    db: AsyncSession,
    query_id: uuid.UUID,
    dataset_id: uuid.UUID,
    nl_query: str,
    generated_sql: str,
    validated_sql: Optional[str],
    is_valid: bool,
    validation_notes: List[str],
    columns: List[str],
    rows: List[Dict[str, Any]],
    exec_time_ms: int,
    status: str,
    error_msg: Optional[str],
    insights: Optional[str],
    chart: Optional[ChartSuggestion],
) -> ChatResponse:
    """Persist query history and build the ChatResponse."""
    result_summary = None
    if status == "success":
        result_summary = {
            "row_count": len(rows),
            "columns": columns,
            "execution_time_ms": exec_time_ms,
        }

    history = QueryHistory(
        id=query_id,
        dataset_id=dataset_id,
        natural_language_query=nl_query,
        generated_sql=generated_sql,
        validated_sql=validated_sql,
        result_summary=result_summary,
        status=status,
        error_message=error_msg,
        execution_time_ms=exec_time_ms if exec_time_ms else None,
    )
    db.add(history)
    try:
        await db.commit()
    except Exception as exc:
        logger.error("Failed to persist query history: %s", exc)
        await db.rollback()

    chart_suggestion = None
    if chart:
        chart_suggestion = ChartSuggestion(
            chart_type=chart.chart_type,
            x_column=chart.x_column,
            y_column=chart.y_column,
            title=chart.title,
        ) if isinstance(chart, ChartSuggestion) else chart

    return ChatResponse(
        query_id=query_id,
        natural_language=nl_query,
        generated_sql=generated_sql,
        is_valid=is_valid,
        validation_notes=validation_notes or None,
        results=rows if rows else None,
        row_count=len(rows),
        columns=columns,
        execution_time_ms=exec_time_ms,
        insights=insights,
        suggested_chart=chart_suggestion,
        error=error_msg,
    )
