"""
SQLAlchemy ORM model for the Dataset entity.
Stored in the 'metadata_schema' PostgreSQL schema.
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Dataset(Base):
    """Represents an uploaded dataset (CSV or Excel file)."""

    __tablename__ = "datasets"
    __table_args__ = {"schema": "metadata_schema"}

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    original_filename: Mapped[str] = mapped_column(String(500), nullable=False)
    table_name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True, index=True)

    # JSON column: list of {name, db_type, nullable, sample_values}
    column_schema: Mapped[Optional[List[Dict[str, Any]]]] = mapped_column(
        JSONB, nullable=True
    )

    row_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    file_size_bytes: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # 'processing' | 'ready' | 'error'
    status: Mapped[str] = mapped_column(String(50), default="processing", nullable=False)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<Dataset id={self.id!s} name={self.name!r} status={self.status!r}>"
