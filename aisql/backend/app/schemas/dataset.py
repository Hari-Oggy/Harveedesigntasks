"""
Pydantic v2 schemas for Dataset endpoints.
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field


class ColumnInfo(BaseModel):
    """Metadata describing a single column in an uploaded dataset."""

    model_config = ConfigDict(from_attributes=True)

    name: str = Field(..., description="Sanitized column name as stored in the database")
    original_name: str = Field(default="", description="Original column name from the file")
    db_type: str = Field(..., description="PostgreSQL type, e.g. TEXT, BIGINT")
    nullable: bool = Field(default=True)
    sample_values: List[str] = Field(default_factory=list, description="Up to 3 example values")


class DatasetCreate(BaseModel):
    """Request body when creating/uploading a dataset (multipart form data)."""

    name: str = Field(..., min_length=1, max_length=255, description="Human-readable dataset name")


class DatasetResponse(BaseModel):
    """Full dataset representation returned by the API."""

    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    original_filename: str
    table_name: str
    column_schema: Optional[List[Dict[str, Any]]] = None
    row_count: int
    file_size_bytes: int
    status: str
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class DatasetListResponse(BaseModel):
    """Paginated list of datasets."""

    datasets: List[DatasetResponse]
    total: int


class DatasetPreview(BaseModel):
    """First N rows of a dataset for the UI preview panel."""

    columns: List[str]
    rows: List[Dict[str, Any]]
    total_rows: int
