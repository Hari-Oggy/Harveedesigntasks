"""
Async SQLAlchemy database setup.
Provides engine, session factory, base model class, and lifespan helpers.
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from sqlalchemy import text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Engine & session factory
# ---------------------------------------------------------------------------

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
    pool_recycle=3600,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


# ---------------------------------------------------------------------------
# Declarative base
# ---------------------------------------------------------------------------


class Base(DeclarativeBase):
    pass


# ---------------------------------------------------------------------------
# FastAPI dependency
# ---------------------------------------------------------------------------


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Yield an async database session; commit on success, rollback on error."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# ---------------------------------------------------------------------------
# Startup initialisation
# ---------------------------------------------------------------------------

_SCHEMAS = ["metadata_schema", "user_data"]


async def init_db() -> None:
    """Create required schemas and all ORM-mapped tables on startup."""
    # Import models so that Base.metadata is populated before create_all
    import app.models.dataset  # noqa: F401
    import app.models.query_history  # noqa: F401

    async with engine.begin() as conn:
        # Ensure custom schemas exist
        for schema in _SCHEMAS:
            await conn.execute(
                text(f'CREATE SCHEMA IF NOT EXISTS "{schema}"')
            )
            logger.info("Schema ensured: %s", schema)

        # Create all tables defined in the metadata
        await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables initialised successfully.")
