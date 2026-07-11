"""
SchemaDetector service: inspects a cleaned DataFrame and produces
PostgreSQL-compatible column definitions (ColumnInfo objects) and
a CREATE TABLE DDL statement.
"""
from __future__ import annotations

import logging
from typing import Dict, List

import pandas as pd

from app.schemas.dataset import ColumnInfo
from app.utils.type_mapping import infer_varchar_or_text, pandas_dtype_to_pg

logger = logging.getLogger(__name__)


class SchemaDetector:
    """Derives PostgreSQL schema metadata from a cleaned pandas DataFrame."""

    def detect_schema(
        self,
        df: pd.DataFrame,
        column_mapping: Dict[str, str],
    ) -> List[ColumnInfo]:
        """
        Analyse each column and return a list of :class:`ColumnInfo`.

        Parameters
        ----------
        df:
            Cleaned DataFrame with *sanitized* column names.
        column_mapping:
            Maps sanitized column name → original column name.
        """
        columns: List[ColumnInfo] = []

        for sanitized_name in df.columns:
            series = df[sanitized_name]
            dtype_str = str(series.dtype)

            # Determine PostgreSQL type
            if dtype_str == "object":
                pg_type = infer_varchar_or_text(series)
            else:
                pg_type = pandas_dtype_to_pg(dtype_str)

            # Nullable if any null values exist
            nullable = bool(series.isnull().any())

            # Sample up to 3 distinct non-null values as strings
            try:
                sample_values: List[str] = (
                    series.dropna()
                    .unique()[:3]
                    .tolist()
                )
                sample_values = [str(v) for v in sample_values]
            except Exception:
                sample_values = []

            original_name = column_mapping.get(sanitized_name, sanitized_name)

            columns.append(
                ColumnInfo(
                    name=sanitized_name,
                    original_name=original_name,
                    db_type=pg_type,
                    nullable=nullable,
                    sample_values=sample_values,
                )
            )

        logger.debug("Detected schema: %d columns.", len(columns))
        return columns

    def generate_create_table_sql(
        self,
        table_name: str,
        columns: List[ColumnInfo],
    ) -> str:
        """
        Build a ``CREATE TABLE IF NOT EXISTS`` DDL string for the
        ``user_data`` schema.

        The table always has a ``id SERIAL PRIMARY KEY`` as the first column.

        Parameters
        ----------
        table_name:
            Short, sanitized table identifier (without schema prefix).
        columns:
            Column definitions as returned by :meth:`detect_schema`.
        """
        col_defs: List[str] = ['    "id" SERIAL PRIMARY KEY']

        for col in columns:
            null_clause = "NULL" if col.nullable else "NOT NULL"
            col_defs.append(f'    "{col.name}" {col.db_type} {null_clause}')

        col_block = ",\n".join(col_defs)
        ddl = (
            f'CREATE TABLE IF NOT EXISTS "user_data"."{table_name}" (\n'
            f"{col_block}\n"
            f");"
        )
        logger.debug("Generated DDL:\n%s", ddl)
        return ddl
