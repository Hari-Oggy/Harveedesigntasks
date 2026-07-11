"""
SQLAlchemy ORM model for QueryHistory.
Stores every NL→SQL execution with status and performance metadata.
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import Any, Dict, Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class QueryHistory(Base):
    """Audit trail of every natural-language query and its generated SQL."""

    __tablename__ = "query_history"
    __table_args__ = {"schema": "metadata_schema"}

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
    )

    # Nullable FK so history is preserved after dataset deletion
    dataset_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("metadata_schema.datasets.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    natural_language_query: Mapped[str] = mapped_column(Text, nullable=False)
    generated_sql: Mapped[str] = mapped_column(Text, nullable=False)
    validated_sql: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Metadata only: {row_count, columns, execution_time_ms}
    result_summary: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)

    # 'pending' | 'success' | 'error' | 'rejected'
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    execution_time_ms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    # Relationship (optional, for ORM traversal)
    dataset = relationship(
        "Dataset",
        foreign_keys=[dataset_id],
        lazy="select",
    )

    def __repr__(self) -> str:
        return (
            f"<QueryHistory id={self.id!s} status={self.status!r} "
            f"dataset_id={self.dataset_id!s}>"
        )
