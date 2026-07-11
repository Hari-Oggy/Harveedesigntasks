"""
Pydantic v2 schemas for chat / NL-to-SQL endpoints and query history.
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Chat request / response
# ---------------------------------------------------------------------------


class ChatRequest(BaseModel):
    """Payload for the POST /chat endpoint."""

    dataset_id: uuid.UUID = Field(..., description="Target dataset UUID")
    message: str = Field(
        ...,
        min_length=1,
        max_length=2000,
        description="Natural language question about the dataset",
    )
    include_insights: bool = Field(
        default=False,
        description="Whether to generate AI-powered analytical insights",
    )


class ChartSuggestion(BaseModel):
    """Optional chart suggestion returned alongside query results."""

    chart_type: str = Field(
        ...,
        description="One of: bar, line, pie, scatter, area",
    )
    x_column: str
    y_column: str
    title: str


class ChatResponse(BaseModel):
    """Full response from the NL-to-SQL pipeline."""

    query_id: uuid.UUID
    natural_language: str
    generated_sql: str
    is_valid: bool
    validation_notes: Optional[List[str]] = None
    results: Optional[List[Dict[str, Any]]] = None
    row_count: int = 0
    columns: List[str] = Field(default_factory=list)
    execution_time_ms: int = 0
    insights: Optional[str] = None
    suggested_chart: Optional[ChartSuggestion] = None
    error: Optional[str] = None


# ---------------------------------------------------------------------------
# Query history
# ---------------------------------------------------------------------------


class ResultSummary(BaseModel):
    """Compact metadata stored per executed query."""

    row_count: int
    columns: List[str]
    execution_time_ms: int


class QueryHistoryItem(BaseModel):
    """Single query history record returned by the API."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    dataset_id: Optional[uuid.UUID] = None
    natural_language_query: str
    generated_sql: str
    validated_sql: Optional[str] = None
    status: str
    execution_time_ms: Optional[int] = None
    created_at: datetime
    result_summary: Optional[Dict[str, Any]] = None


class QueryHistoryResponse(BaseModel):
    """Paginated query history list."""

    items: List[QueryHistoryItem]
    total: int
