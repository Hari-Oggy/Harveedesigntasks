"""
Utility functions for mapping pandas dtypes to PostgreSQL types and for
sanitising column/table names so they are safe SQL identifiers.
"""
from __future__ import annotations

import re
import unicodedata

# ---------------------------------------------------------------------------
# PostgreSQL reserved keywords that must be escaped or renamed
# ---------------------------------------------------------------------------

_PG_RESERVED = frozenset(
    {
        "all", "analyse", "analyze", "and", "any", "array", "as", "asc",
        "asymmetric", "authorization", "binary", "both", "case", "cast",
        "check", "collate", "collation", "column", "concurrently", "constraint",
        "create", "cross", "current_catalog", "current_date", "current_role",
        "current_schema", "current_time", "current_timestamp", "current_user",
        "default", "deferrable", "deferred", "desc", "distinct", "do", "else",
        "end", "except", "false", "fetch", "for", "foreign", "freeze", "from",
        "full", "grant", "group", "having", "ilike", "in", "initially",
        "inner", "intersect", "into", "is", "isnull", "join", "lateral",
        "leading", "left", "like", "limit", "localtime", "localtimestamp",
        "natural", "not", "notnull", "null", "offset", "on", "only", "or",
        "order", "outer", "overlaps", "placing", "primary", "references",
        "returning", "right", "row", "select", "session_user", "similar",
        "some", "symmetric", "table", "tablesample", "then", "to", "trailing",
        "true", "union", "unique", "user", "using", "variadic", "verbose",
        "when", "where", "window", "with",
    }
)


# ---------------------------------------------------------------------------
# Dtype → PostgreSQL type
# ---------------------------------------------------------------------------


def pandas_dtype_to_pg(dtype_str: str) -> str:
    """
    Convert a pandas dtype string to the most appropriate PostgreSQL type.

    Parameters
    ----------
    dtype_str:
        Result of ``str(series.dtype)``, e.g. ``'int64'``, ``'object'``.

    Returns
    -------
    str
        A valid PostgreSQL column type declaration.
    """
    dtype_str = dtype_str.lower().strip()

    if dtype_str in ("int64", "int32", "int16", "int8", "uint64", "uint32", "uint16", "uint8"):
        return "BIGINT"

    if dtype_str in ("float64", "float32", "float16"):
        return "DOUBLE PRECISION"

    if dtype_str == "bool":
        return "BOOLEAN"

    if dtype_str.startswith("datetime64"):
        return "TIMESTAMP"

    if dtype_str == "category":
        return "VARCHAR(255)"

    if dtype_str == "object":
        # Caller should inspect actual values; default to TEXT for safety
        return "TEXT"

    # Fallback for any future or extension dtypes
    return "TEXT"


def infer_varchar_or_text(series) -> str:
    """
    Refine 'object' columns: use VARCHAR(500) when the average string length
    is ≤ 255 characters, otherwise TEXT.
    """
    try:
        non_null = series.dropna().astype(str)
        if non_null.empty:
            return "TEXT"
        avg_len = non_null.str.len().mean()
        return "VARCHAR(500)" if avg_len <= 255 else "TEXT"
    except Exception:
        return "TEXT"


# ---------------------------------------------------------------------------
# Name sanitisation
# ---------------------------------------------------------------------------


def _slugify(text: str) -> str:
    """Normalise unicode, lowercase, replace non-alphanumeric chars with _."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9]+", "_", text)
    text = re.sub(r"_+", "_", text)
    return text.strip("_")


def sanitize_column_name(name: str) -> str:
    """
    Convert a raw column header to a safe, lowercase PostgreSQL identifier.

    - Strips leading/trailing whitespace
    - Replaces spaces and special characters with underscores
    - Ensures it starts with a letter or underscore
    - Appends ``_col`` if the name is a PostgreSQL reserved keyword
    - Truncates to 63 characters (PostgreSQL identifier limit)
    """
    if not name or not name.strip():
        return "unnamed_col"

    slug = _slugify(name)

    if not slug:
        slug = "col"

    # Must start with a letter or underscore
    if slug[0].isdigit():
        slug = f"col_{slug}"

    # Avoid reserved keywords
    if slug in _PG_RESERVED:
        slug = f"{slug}_col"

    # PostgreSQL max identifier length
    return slug[:63]


def sanitize_table_name(filename: str) -> str:
    """
    Derive a safe ``user_data`` table name from the original filename.

    Format: ``<slugified_stem>`` truncated to 50 chars.
    The caller is responsible for prepending a UUID prefix to guarantee
    uniqueness.
    """
    # Strip extension(s)
    stem = re.sub(r"\.[^.]+$", "", filename)
    slug = _slugify(stem)
    if not slug:
        slug = "dataset"

    # Must start with a letter
    if slug[0].isdigit():
        slug = f"ds_{slug}"

    return slug[:50]
