"""
QueryExecutor: executes validated SQL queries safely inside a read-only
PostgreSQL transaction with a configurable statement timeout.
"""
from __future__ import annotations

import logging
import time
from typing import Any, Dict, List, Tuple

from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncEngine

from app.config import settings
from app.utils.exceptions import QueryExecutionError

logger = logging.getLogger(__name__)


class QueryExecutor:
    """Executes pre-validated SQL in a read-only transaction with a timeout."""

    def __init__(self, engine: AsyncEngine) -> None:
        self.engine = engine

    async def execute(
        self,
        sql: str,
        timeout_seconds: int | None = None,
    ) -> Tuple[List[str], List[Dict[str, Any]], int]:
        """
        Execute *sql* and return its results.

        Parameters
        ----------
        sql:              Validated, sanitised SELECT statement.
        timeout_seconds:  Per-statement timeout (default from settings).

        Returns
        -------
        Tuple[list[str], list[dict], int]
            ``(column_names, rows_as_dicts, execution_time_ms)``
        """
        timeout = timeout_seconds or settings.QUERY_TIMEOUT_SECONDS
        timeout_ms = timeout * 1_000  # PostgreSQL expects milliseconds

        start = time.perf_counter()

        try:
            async with self.engine.connect() as conn:
                # Set read-only mode and statement timeout for this transaction
                await conn.execute(text("SET TRANSACTION READ ONLY"))
                await conn.execute(
                    text(f"SET LOCAL statement_timeout = '{timeout_ms}'")
                )

                result = await conn.execute(text(sql))
                col_keys: List[str] = list(result.keys())
                raw_rows = result.fetchall()
        except SQLAlchemyError as exc:
            elapsed_ms = int((time.perf_counter() - start) * 1_000)
            logger.error("Query execution failed after %dms: %s", elapsed_ms, exc)
            raise QueryExecutionError(
                f"Query execution failed: {_clean_db_error(str(exc))}"
            ) from exc

        elapsed_ms = int((time.perf_counter() - start) * 1_000)

        rows: List[Dict[str, Any]] = [
            dict(zip(col_keys, row)) for row in raw_rows
        ]

        # Convert non-serialisable types (e.g. Decimal, date)
        rows = _sanitise_rows(rows)

        logger.debug(
            "Query returned %d rows in %dms.", len(rows), elapsed_ms
        )
        return col_keys, rows, elapsed_ms


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _clean_db_error(msg: str) -> str:
    """Remove internal PostgreSQL noise from error messages."""
    # Remove DETAIL/HINT/CONTEXT lines
    lines = [
        line for line in msg.splitlines()
        if not any(
            line.strip().startswith(prefix)
            for prefix in ("DETAIL:", "HINT:", "CONTEXT:", "LOCATION:")
        )
    ]
    return " ".join(lines).strip()


def _sanitise_rows(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Convert non-JSON-native types to strings for safe serialisation."""
    import decimal
    import datetime

    sanitised = []
    for row in rows:
        clean: Dict[str, Any] = {}
        for k, v in row.items():
            if isinstance(v, decimal.Decimal):
                clean[k] = float(v)
            elif isinstance(v, (datetime.datetime, datetime.date, datetime.time)):
                clean[k] = v.isoformat()
            elif isinstance(v, bytes):
                clean[k] = v.hex()
            else:
                clean[k] = v
        sanitised.append(clean)
    return sanitised
