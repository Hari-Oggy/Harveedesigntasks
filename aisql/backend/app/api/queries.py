"""
Queries router: query history listing and single-item retrieval.
"""
from __future__ import annotations

import logging
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models.query_history import QueryHistory
from app.schemas.query import QueryHistoryItem, QueryHistoryResponse

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get(
    "/history",
    response_model=QueryHistoryResponse,
    summary="List query history with optional dataset filter",
)
async def list_query_history(
    dataset_id: uuid.UUID | None = Query(default=None, description="Filter by dataset UUID"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
) -> QueryHistoryResponse:
    """Return paginated query history, optionally filtered by dataset."""
    base = select(QueryHistory)
    count_base = select(func.count(QueryHistory.id))

    if dataset_id is not None:
        base = base.where(QueryHistory.dataset_id == dataset_id)
        count_base = count_base.where(QueryHistory.dataset_id == dataset_id)

    total_result = await db.execute(count_base)
    total = total_result.scalar_one()

    stmt = base.order_by(QueryHistory.created_at.desc()).offset(skip).limit(limit)
    result = await db.execute(stmt)
    items = result.scalars().all()

    return QueryHistoryResponse(
        items=[QueryHistoryItem.model_validate(h) for h in items],
        total=total,
    )


@router.get(
    "/{query_id}",
    response_model=QueryHistoryItem,
    summary="Get a single query history record",
)
async def get_query_history_item(
    query_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
) -> QueryHistoryItem:
    """Return the full details of a single query history record."""
    stmt = select(QueryHistory).where(QueryHistory.id == query_id)
    result = await db.execute(stmt)
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=404,
            detail=f"Query history record '{query_id}' not found.",
        )

    return QueryHistoryItem.model_validate(item)
