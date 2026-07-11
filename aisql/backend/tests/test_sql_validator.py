"""
Unit tests for SQLValidator — the security gate for all LLM-generated SQL.
"""
from __future__ import annotations

import pytest

from app.services.sql_validator import SQLValidator

ALLOWED_TABLE = "ds_abc12345_sales"


@pytest.fixture()
def validator() -> SQLValidator:
    return SQLValidator()


# ---------------------------------------------------------------------------
# Valid queries — should pass
# ---------------------------------------------------------------------------


def test_valid_select_passes(validator: SQLValidator) -> None:
    sql = 'SELECT "name", "amount" FROM "user_data"."ds_abc12345_sales" LIMIT 100'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid, f"Expected valid but got notes: {notes}"
    assert clean is not None
    assert "SELECT" in clean.upper()


def test_valid_aggregation_passes(validator: SQLValidator) -> None:
    sql = (
        'SELECT "category", COUNT(*) as cnt, SUM("revenue") as total '
        'FROM "user_data"."ds_abc12345_sales" '
        'GROUP BY "category" ORDER BY total DESC LIMIT 50'
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid, f"Expected valid: {notes}"


def test_valid_where_clause_passes(validator: SQLValidator) -> None:
    sql = (
        'SELECT * FROM "user_data"."ds_abc12345_sales" '
        "WHERE \"status\" = 'active' AND \"amount\" > 100 LIMIT 200"
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid, f"Expected valid: {notes}"


# ---------------------------------------------------------------------------
# DML / DDL — must be rejected
# ---------------------------------------------------------------------------


def test_insert_is_rejected(validator: SQLValidator) -> None:
    sql = 'INSERT INTO "user_data"."ds_abc12345_sales" ("name") VALUES (\'x\')'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid
    assert clean is None
    assert any("INSERT" in n or "blocked" in n.lower() for n in notes)


def test_drop_table_is_rejected(validator: SQLValidator) -> None:
    sql = 'DROP TABLE "user_data"."ds_abc12345_sales"'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid
    assert clean is None


def test_update_is_rejected(validator: SQLValidator) -> None:
    sql = 'UPDATE "user_data"."ds_abc12345_sales" SET "name" = \'hack\' WHERE 1=1'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


def test_delete_is_rejected(validator: SQLValidator) -> None:
    sql = 'DELETE FROM "user_data"."ds_abc12345_sales" WHERE 1=1'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


def test_truncate_is_rejected(validator: SQLValidator) -> None:
    sql = 'TRUNCATE TABLE "user_data"."ds_abc12345_sales"'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


def test_create_table_is_rejected(validator: SQLValidator) -> None:
    sql = "CREATE TABLE evil (id SERIAL)"
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


# ---------------------------------------------------------------------------
# Multiple statements — must be rejected
# ---------------------------------------------------------------------------


def test_multiple_statements_rejected(validator: SQLValidator) -> None:
    sql = (
        'SELECT * FROM "user_data"."ds_abc12345_sales"; '
        'DROP TABLE "user_data"."ds_abc12345_sales"'
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid
    assert any("multiple" in n.lower() or "statement" in n.lower() for n in notes)


def test_stacked_selects_rejected(validator: SQLValidator) -> None:
    sql = (
        'SELECT 1; SELECT * FROM "user_data"."ds_abc12345_sales"'
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


# ---------------------------------------------------------------------------
# System catalog access — must be rejected
# ---------------------------------------------------------------------------


def test_information_schema_rejected(validator: SQLValidator) -> None:
    sql = "SELECT * FROM information_schema.tables LIMIT 10"
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


def test_pg_catalog_rejected(validator: SQLValidator) -> None:
    sql = "SELECT * FROM pg_catalog.pg_tables"
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid


def test_wrong_schema_rejected(validator: SQLValidator) -> None:
    sql = 'SELECT * FROM public."ds_abc12345_sales" LIMIT 10'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid
    assert any("schema" in n.lower() for n in notes)


def test_wrong_table_rejected(validator: SQLValidator) -> None:
    sql = 'SELECT * FROM "user_data"."other_table" LIMIT 10'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert not is_valid
    assert any("table" in n.lower() for n in notes)


# ---------------------------------------------------------------------------
# LIMIT enforcement
# ---------------------------------------------------------------------------


def test_limit_added_if_missing(validator: SQLValidator) -> None:
    sql = 'SELECT * FROM "user_data"."ds_abc12345_sales"'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid
    assert clean is not None
    assert "LIMIT 1000" in clean.upper()


def test_limit_capped_at_1000(validator: SQLValidator) -> None:
    sql = 'SELECT * FROM "user_data"."ds_abc12345_sales" LIMIT 99999'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid
    assert clean is not None
    assert "LIMIT 1000" in clean.upper()
    assert "99999" not in clean


def test_limit_below_1000_preserved(validator: SQLValidator) -> None:
    sql = 'SELECT * FROM "user_data"."ds_abc12345_sales" LIMIT 25'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid
    assert "LIMIT 25" in clean  # type: ignore[operator]


# ---------------------------------------------------------------------------
# Markdown stripping
# ---------------------------------------------------------------------------


def test_markdown_sql_block_stripped(validator: SQLValidator) -> None:
    sql = '```sql\nSELECT * FROM "user_data"."ds_abc12345_sales"\n```'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid
    assert "```" not in (clean or "")


def test_markdown_plain_block_stripped(validator: SQLValidator) -> None:
    sql = '```\nSELECT * FROM "user_data"."ds_abc12345_sales"\n```'
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid


# ---------------------------------------------------------------------------
# Comment injection
# ---------------------------------------------------------------------------


def test_line_comment_removed(validator: SQLValidator) -> None:
    sql = (
        'SELECT * FROM "user_data"."ds_abc12345_sales" '
        "-- DROP TABLE users\n LIMIT 10"
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    # The DROP in the comment should be stripped before keyword check
    assert is_valid


def test_block_comment_removed(validator: SQLValidator) -> None:
    sql = (
        'SELECT /* evil */ * FROM "user_data"."ds_abc12345_sales" LIMIT 10'
    )
    is_valid, notes, clean = validator.validate(sql, ALLOWED_TABLE)
    assert is_valid
