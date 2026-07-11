"""
SQLValidator: multi-layer security validation of LLM-generated SQL.

Ensures only safe SELECT queries targeting the correct dataset table
are ever executed against the database.
"""
from __future__ import annotations

import logging
import re
from typing import List, Optional, Tuple

import sqlparse
from sqlparse.sql import Statement
from sqlparse.tokens import Keyword, Keyword as KW, DML

from app.utils.exceptions import SQLValidationError

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_BLOCKED_KEYWORDS: List[str] = [
    "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "TRUNCATE",
    "GRANT", "REVOKE", "COPY", "EXECUTE", "PERFORM", "DO",
    "pg_read_file", "pg_ls_dir", "pg_stat_file", "pg_stat_activity",
    "lo_import", "lo_export", "dblink", "pg_sleep",
    "information_schema", "pg_catalog",
]

_ALLOWED_SCHEMAS = frozenset({"user_data"})
_MAX_LIMIT = 1_000

# Regex to extract LIMIT value
_LIMIT_RE = re.compile(r"\bLIMIT\s+(\d+)", re.IGNORECASE)
# Regex to detect semicolons outside of string literals (simplified)
_SEMICOLON_RE = re.compile(r";")
# Strip markdown code fences
_CODE_FENCE_RE = re.compile(r"^```(?:sql)?\s*\n?(.*?)\n?```$", re.DOTALL | re.IGNORECASE)
# Strip inline backtick wrapping
_INLINE_BACKTICK_RE = re.compile(r"^`(.*)`$", re.DOTALL)


class SQLValidator:
    """
    Validates and sanitises LLM-generated SQL before execution.

    Usage::

        validator = SQLValidator()
        is_valid, notes, clean_sql = validator.validate(raw_sql, allowed_table)
    """

    def validate(
        self,
        sql: str,
        allowed_table: str,
    ) -> Tuple[bool, List[str], Optional[str]]:
        """
        Full validation pipeline.

        Parameters
        ----------
        sql:            Raw SQL string from the LLM (may include markdown).
        allowed_table:  The only table name the query is allowed to reference.

        Returns
        -------
        Tuple[bool, list[str], str | None]
            ``(is_valid, validation_notes, sanitized_sql)``
            If ``is_valid`` is False, ``sanitized_sql`` is None.
        """
        notes: List[str] = []

        # Step 1: Strip markdown wrappers
        clean = self._strip_sql_markdown(sql)
        if not clean.strip():
            return False, ["SQL is empty after stripping markdown."], None

        # Step 2: Remove SQL comments (potential injection vector)
        clean = self._remove_comments(clean)

        # Step 3: Check for multiple statements
        if self._has_multiple_statements(clean):
            notes.append("Multiple SQL statements detected. Only a single SELECT is allowed.")
            return False, notes, None

        # Step 4: Detect blocked keywords BEFORE parsing
        blocked = self._has_blocked_keywords(clean)
        if blocked:
            notes.append(
                f"Blocked keyword(s) detected: {', '.join(blocked)}. "
                "Only SELECT statements are allowed."
            )
            return False, notes, None

        # Step 5: Parse and verify it is a SELECT statement
        parsed = sqlparse.parse(clean.strip())
        if not parsed:
            notes.append("SQL could not be parsed.")
            return False, notes, None

        stmt: Statement = parsed[0]
        stmt_type = stmt.get_type()

        if stmt_type != "SELECT":
            notes.append(
                f"Statement type '{stmt_type}' is not allowed. Only SELECT is permitted."
            )
            return False, notes, None

        # Step 6: Verify schema references
        schema_ok, schema_note = self._check_schema_references(clean, allowed_table)
        if not schema_ok:
            notes.append(schema_note)
            return False, notes, None

        # Step 7: Enforce LIMIT
        clean = self._ensure_limit(clean)
        notes.append("Validation passed.")

        return True, notes, clean.strip()

    # ------------------------------------------------------------------
    # Step helpers
    # ------------------------------------------------------------------

    def _strip_sql_markdown(self, sql: str) -> str:
        """Remove ```sql ... ``` or ``` ... ``` wrappers and inline backticks."""
        sql = sql.strip()
        match = _CODE_FENCE_RE.match(sql)
        if match:
            return match.group(1).strip()
        match = _INLINE_BACKTICK_RE.match(sql)
        if match:
            return match.group(1).strip()
        return sql

    def _remove_comments(self, sql: str) -> str:
        """Strip SQL line comments (-- ...) and block comments (/* ... */)."""
        # Block comments
        sql = re.sub(r"/\*.*?\*/", " ", sql, flags=re.DOTALL)
        # Line comments
        sql = re.sub(r"--[^\n]*", " ", sql)
        return sql.strip()

    def _has_multiple_statements(self, sql: str) -> bool:
        """Return True if more than one SQL statement is present."""
        # Split on semicolons; ignore trailing empty strings
        parts = [p.strip() for p in sql.split(";") if p.strip()]
        return len(parts) > 1

    def _has_blocked_keywords(self, sql: str) -> List[str]:
        """Return list of blocked keywords found in the SQL (case-insensitive)."""
        sql_upper = sql.upper()
        found = []
        for keyword in _BLOCKED_KEYWORDS:
            pattern = re.compile(
                r"\b" + re.escape(keyword.upper()) + r"\b",
                re.IGNORECASE,
            )
            if pattern.search(sql_upper):
                found.append(keyword)
        return found

    def _check_schema_references(
        self, sql: str, allowed_table: str
    ) -> Tuple[bool, str]:
        """
        Verify the query only references 'user_data'.'allowed_table'.

        Rejects any reference to other schemas or table names.
        """
        # Look for schema-qualified table references: "schema"."table" or schema.table
        schema_ref_pattern = re.compile(
            r'"?(\w+)"?\s*\.\s*"?(\w+)"?',
            re.IGNORECASE,
        )
        for match in schema_ref_pattern.finditer(sql):
            schema_name = match.group(1).lower()
            table_ref = match.group(2).lower()

            if schema_name not in _ALLOWED_SCHEMAS:
                return (
                    False,
                    f"Schema reference '{schema_name}' is not allowed. "
                    f"Only 'user_data' schema is permitted.",
                )

            if table_ref != allowed_table.lower():
                return (
                    False,
                    f"Table reference '{table_ref}' is not allowed. "
                    f"Only '{allowed_table}' is permitted for this dataset.",
                )

        return True, ""

    def _ensure_limit(self, sql: str, max_limit: int = _MAX_LIMIT) -> str:
        """
        Ensure the query has a LIMIT clause capped at *max_limit*.

        - If no LIMIT present: append ``LIMIT <max_limit>``.
        - If LIMIT > max_limit: rewrite to cap at max_limit.
        """
        # Remove trailing semicolon
        clean = sql.rstrip().rstrip(";").rstrip()

        match = _LIMIT_RE.search(clean)
        if not match:
            return f"{clean} LIMIT {max_limit}"

        existing = int(match.group(1))
        if existing > max_limit:
            clean = _LIMIT_RE.sub(f"LIMIT {max_limit}", clean)
            logger.debug("Capped LIMIT from %d to %d.", existing, max_limit)

        return clean
