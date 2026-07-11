"""
FastAPI dependency factories for service layer injection.

Each function is an async generator (or simple coroutine) that FastAPI
calls via Depends(), keeping service construction clean and testable.
"""
from __future__ import annotations

from app.database import engine, get_db  # noqa: F401
from app.services.file_processor import FileProcessor
from app.services.insight_generator import InsightGenerator
from app.services.llm_service import LLMService
from app.services.query_executor import QueryExecutor
from app.services.schema_detector import SchemaDetector
from app.services.sql_validator import SQLValidator
from app.services.table_manager import TableManager


# Re-export get_db for convenience
__all__ = [
    "get_db",
    "get_llm_service",
    "get_file_processor",
    "get_schema_detector",
    "get_table_manager",
    "get_sql_validator",
    "get_query_executor",
    "get_insight_generator",
]


# NOTE: Return type annotations are intentionally omitted on dependency
# functions to prevent FastAPI from treating service classes as response models.
# FastAPI Depends() works fine without annotations — it inspects the function
# signature only for parameter injection, not return type.

async def get_llm_service():  # type: ignore[return]
    """Return a shared LLMService instance."""
    return LLMService()


async def get_file_processor():  # type: ignore[return]
    """Return a FileProcessor instance."""
    return FileProcessor()


async def get_schema_detector():  # type: ignore[return]
    """Return a SchemaDetector instance."""
    return SchemaDetector()


async def get_table_manager():  # type: ignore[return]
    """Return a TableManager bound to the application engine."""
    return TableManager(engine)


async def get_sql_validator():  # type: ignore[return]
    """Return a SQLValidator instance."""
    return SQLValidator()


async def get_query_executor():  # type: ignore[return]
    """Return a QueryExecutor bound to the application engine."""
    return QueryExecutor(engine)


async def get_insight_generator():  # type: ignore[return]
    """Return an InsightGenerator wired to a fresh LLMService."""
    return InsightGenerator(LLMService())
