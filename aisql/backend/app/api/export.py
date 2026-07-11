"""
Export router: re-execute a stored query and return results as Excel or CSV.
"""
from __future__ import annotations

import csv
import io
import logging
import uuid
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_query_executor
from app.models.dataset import Dataset
from app.models.query_history import QueryHistory
from app.services.query_executor import QueryExecutor
from app.utils.exceptions import QueryExecutionError

logger = logging.getLogger(__name__)

router = APIRouter()


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


async def _fetch_query_and_results(
    query_id: uuid.UUID,
    db: AsyncSession,
    executor: QueryExecutor,
) -> tuple[QueryHistory, List[str], List[Dict[str, Any]]]:
    """Load a QueryHistory record and re-execute its validated SQL."""
    stmt = select(QueryHistory).where(QueryHistory.id == query_id)
    result = await db.execute(stmt)
    history = result.scalar_one_or_none()

    if not history:
        raise HTTPException(
            status_code=404,
            detail=f"Query history record '{query_id}' not found.",
        )

    sql = history.validated_sql or history.generated_sql
    if not sql:
        raise HTTPException(
            status_code=400,
            detail="This query has no executable SQL (validation may have failed).",
        )

    # Verify the dataset still exists
    if history.dataset_id:
        ds_stmt = select(Dataset).where(Dataset.id == history.dataset_id)
        ds_result = await db.execute(ds_stmt)
        dataset = ds_result.scalar_one_or_none()
        if not dataset:
            raise HTTPException(
                status_code=404,
                detail="The dataset associated with this query no longer exists.",
            )
        if dataset.status != "ready":
            raise HTTPException(
                status_code=409,
                detail=f"Dataset is not ready (status: {dataset.status}).",
            )

    try:
        columns, rows, _ = await executor.execute(sql)
    except QueryExecutionError as exc:
        raise HTTPException(status_code=500, detail=f"Query re-execution failed: {exc}")

    return history, columns, rows


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------


@router.get(
    "/{query_id}/excel",
    summary="Export query results as an Excel (.xlsx) file",
)
async def export_excel(
    query_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    executor: QueryExecutor = Depends(get_query_executor),
) -> StreamingResponse:
    """Re-execute the stored query and stream the results as an Excel workbook."""
    history, columns, rows = await _fetch_query_and_results(query_id, db, executor)

    # Build the workbook in memory
    wb = Workbook()
    ws = wb.active
    ws.title = "Query Results"  # type: ignore[assignment]

    # Header row styling
    header_font = Font(bold=True, color="FFFFFF")
    header_fill = PatternFill(start_color="2563EB", end_color="2563EB", fill_type="solid")

    for col_idx, col_name in enumerate(columns, start=1):
        cell = ws.cell(row=1, column=col_idx, value=col_name)  # type: ignore[union-attr]
        cell.font = header_font
        cell.fill = header_fill

    # Data rows
    for row_idx, row in enumerate(rows, start=2):
        for col_idx, col_name in enumerate(columns, start=1):
            value = row.get(col_name)
            ws.cell(row=row_idx, column=col_idx, value=value)  # type: ignore[union-attr]

    # Auto-fit column widths (approximate)
    for col in ws.columns:  # type: ignore[union-attr]
        max_len = 0
        col_letter = col[0].column_letter
        for cell in col:
            try:
                if cell.value and len(str(cell.value)) > max_len:
                    max_len = len(str(cell.value))
            except Exception:
                pass
        ws.column_dimensions[col_letter].width = min(max_len + 4, 50)  # type: ignore[union-attr]

    buffer = io.BytesIO()
    wb.save(buffer)
    buffer.seek(0)

    safe_name = f"query_results_{str(query_id)[:8]}.xlsx"
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )


@router.get(
    "/{query_id}/csv",
    summary="Export query results as a CSV file",
)
async def export_csv(
    query_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    executor: QueryExecutor = Depends(get_query_executor),
) -> StreamingResponse:
    """Re-execute the stored query and stream the results as a CSV file."""
    history, columns, rows = await _fetch_query_and_results(query_id, db, executor)

    buffer = io.StringIO()
    writer = csv.DictWriter(
        buffer,
        fieldnames=columns,
        extrasaction="ignore",
        lineterminator="\n",
    )
    writer.writeheader()
    writer.writerows(rows)

    buffer.seek(0)
    safe_name = f"query_results_{str(query_id)[:8]}.csv"

    return StreamingResponse(
        io.BytesIO(buffer.getvalue().encode("utf-8")),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{safe_name}"'},
    )


# Keep the /pdf endpoint as an alias to CSV for compatibility,
# with a clear content-type header note.
@router.get(
    "/{query_id}/pdf",
    summary="Export query results (returns CSV; PDF requires reportlab)",
    deprecated=True,
)
async def export_pdf(
    query_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    executor: QueryExecutor = Depends(get_query_executor),
) -> StreamingResponse:
    """
    Returns a CSV download.  Install 'reportlab' or 'fpdf2' and replace
    this handler to generate real PDF output.
    """
    history, columns, rows = await _fetch_query_and_results(query_id, db, executor)

    buffer = io.StringIO()
    writer = csv.DictWriter(
        buffer,
        fieldnames=columns,
        extrasaction="ignore",
        lineterminator="\n",
    )
    writer.writeheader()
    writer.writerows(rows)
    buffer.seek(0)

    safe_name = f"query_results_{str(query_id)[:8]}.csv"
    return StreamingResponse(
        io.BytesIO(buffer.getvalue().encode("utf-8")),
        media_type="text/csv; charset=utf-8",
        headers={
            "Content-Disposition": f'attachment; filename="{safe_name}"',
            "X-Export-Note": "PDF not available; returning CSV instead.",
        },
    )
