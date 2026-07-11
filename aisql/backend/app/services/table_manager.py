"""
TableManager service: creates dynamic user_data tables, bulk-inserts rows,
provides drop and preview capabilities.
"""
from __future__ import annotations

import asyncio
import logging
from typing import Any, Dict, List, Tuple

import pandas as pd
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncEngine

from app.schemas.dataset import ColumnInfo
from app.services.schema_detector import SchemaDetector
from app.utils.exceptions import TableCreationError

logger = logging.getLogger(__name__)

_BATCH_SIZE = 1_000


class TableManager:
    """Manages lifecycle of dynamic dataset tables in the user_data schema."""

    def __init__(self, engine: AsyncEngine) -> None:
        self.engine = engine
        self._schema_detector = SchemaDetector()

    # ------------------------------------------------------------------
    # Create & populate
    # ------------------------------------------------------------------

    async def create_table_and_insert(
        self,
        dataset_id: str,
        df: pd.DataFrame,
        columns: List[ColumnInfo],
        table_name: str,
    ) -> int:
        """
        Execute CREATE TABLE DDL then bulk-insert all rows in batches.

        Parameters
        ----------
        dataset_id:   UUID string (for logging only).
        df:           Cleaned DataFrame with sanitized column names.
        columns:      Schema as produced by SchemaDetector.
        table_name:   Short table name (without schema prefix).

        Returns
        -------
        int
            Number of rows successfully inserted.
        """
        ddl = self._schema_detector.generate_create_table_sql(table_name, columns)

        try:
            async with self.engine.begin() as conn:
                await conn.execute(text(ddl))
                logger.info("Created table user_data.%s for dataset %s", table_name, dataset_id)
        except Exception as exc:
            raise TableCreationError(
                f"Failed to create table '{table_name}': {exc}"
            ) from exc

        # Prepare column list for INSERT (exclude auto-increment 'id')
        col_names = [col.name for col in columns]
        quoted_cols = ", ".join(f'"{c}"' for c in col_names)
        placeholders = ", ".join(f":{c}" for c in col_names)
        insert_sql = (
            f'INSERT INTO "user_data"."{table_name}" ({quoted_cols}) '
            f"VALUES ({placeholders})"
        )

        # Build list of parameter dicts, coercing NaN → None
        records = _df_to_records(df, col_names)

        total_inserted = 0
        try:
            async with self.engine.begin() as conn:
                for start in range(0, len(records), _BATCH_SIZE):
                    batch = records[start : start + _BATCH_SIZE]
                    await conn.execute(text(insert_sql), batch)
                    total_inserted += len(batch)
                    logger.debug(
                        "Inserted batch %d–%d into %s",
                        start, start + len(batch), table_name,
                    )
        except Exception as exc:
            # Attempt cleanup to avoid orphaned tables
            await self.drop_table(table_name)
            raise TableCreationError(
                f"Failed during data insertion into '{table_name}': {exc}"
            ) from exc

        logger.info(
            "Inserted %d rows into user_data.%s", total_inserted, table_name
        )
        return total_inserted

    # ------------------------------------------------------------------
    # Drop
    # ------------------------------------------------------------------

    async def drop_table(self, table_name: str) -> None:
        """Drop the dynamic table if it exists."""
        sql = f'DROP TABLE IF EXISTS "user_data"."{table_name}"'
        try:
            async with self.engine.begin() as conn:
                await conn.execute(text(sql))
            logger.info("Dropped table user_data.%s", table_name)
        except Exception as exc:
            logger.warning("Failed to drop table %s: %s", table_name, exc)

    # ------------------------------------------------------------------
    # Preview
    # ------------------------------------------------------------------

    async def get_table_preview(
        self,
        table_name: str,
        limit: int = 50,
    ) -> Tuple[List[str], List[Dict[str, Any]]]:
        """
        Fetch up to *limit* rows from the dataset table.

        Returns
        -------
        Tuple[list[str], list[dict]]
            Column names and list of row dicts.
        """
        sql = f'SELECT * FROM "user_data"."{table_name}" LIMIT :limit'
        try:
            async with self.engine.connect() as conn:
                result = await conn.execute(text(sql), {"limit": limit})
                col_keys = list(result.keys())
                rows = [dict(zip(col_keys, row)) for row in result.fetchall()]
                return col_keys, rows
        except Exception as exc:
            logger.error("Preview query failed for table %s: %s", table_name, exc)
            raise


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------


def _df_to_records(df: pd.DataFrame, col_names: List[str]) -> List[Dict[str, Any]]:
    """Convert DataFrame rows to parameter dicts, replacing NaN with None."""
    records: List[Dict[str, Any]] = []
    for _, row in df[col_names].iterrows():
        record: Dict[str, Any] = {}
        for col in col_names:
            val = row[col]
            try:
                if pd.isna(val):
                    val = None
            except (TypeError, ValueError):
                pass  # non-scalar types; keep as-is
            if hasattr(val, "item"):  # numpy scalar → Python native
                val = val.item()
            record[col] = val
        records.append(record)
    return records
