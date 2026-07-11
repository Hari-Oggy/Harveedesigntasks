"""
Unit tests for FileProcessor — validates file reading, cleaning, and schema mapping.
Uses in-memory DataFrames and temporary CSV/Excel files.
"""
from __future__ import annotations

import io
import os
import tempfile
from pathlib import Path

import pandas as pd
import pytest
import pytest_asyncio

from app.services.file_processor import FileProcessor, ProcessedFileResult, _dataframe_to_dicts
from app.utils.exceptions import FileTooLargeError, UnsupportedFileTypeError


@pytest.fixture()
def processor() -> FileProcessor:
    return FileProcessor()


# ---------------------------------------------------------------------------
# validate_file
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_validate_file_rejects_unsupported_extension(processor: FileProcessor) -> None:
    with pytest.raises(UnsupportedFileTypeError):
        await processor.validate_file(file_size=1024, filename="data.json")


@pytest.mark.asyncio
async def test_validate_file_rejects_too_large(processor: FileProcessor) -> None:
    # 60 MB > default 50 MB limit
    with pytest.raises(FileTooLargeError):
        await processor.validate_file(file_size=60 * 1024 * 1024, filename="data.csv")


@pytest.mark.asyncio
async def test_validate_file_accepts_csv(processor: FileProcessor) -> None:
    # Should not raise
    await processor.validate_file(file_size=1024, filename="data.csv")


@pytest.mark.asyncio
async def test_validate_file_accepts_xlsx(processor: FileProcessor) -> None:
    await processor.validate_file(file_size=1024, filename="report.xlsx")


@pytest.mark.asyncio
async def test_validate_file_accepts_xls(processor: FileProcessor) -> None:
    await processor.validate_file(file_size=1024, filename="legacy.xls")


# ---------------------------------------------------------------------------
# _clean_dataframe
# ---------------------------------------------------------------------------


def test_clean_dataframe_strips_whitespace(processor: FileProcessor) -> None:
    df = pd.DataFrame({"name": ["  Alice  ", "Bob ", "  Charlie"]})
    cleaned = processor._clean_dataframe(df)
    assert list(cleaned["name"]) == ["Alice", "Bob", "Charlie"]


def test_clean_dataframe_normalises_null_strings(processor: FileProcessor) -> None:
    df = pd.DataFrame({
        "id": [1, 2, 3, 4, 5, 6],
        "val": ["N/A", "NULL", "none", "nan", "", "real_value"]
    })
    cleaned = processor._clean_dataframe(df)
    # All null-like strings should become None
    null_count = cleaned["val"].isna().sum()
    assert null_count == 5
    assert cleaned["val"].dropna().tolist() == ["real_value"]


def test_clean_dataframe_removes_duplicates(processor: FileProcessor) -> None:
    df = pd.DataFrame({"a": [1, 2, 2, 3], "b": ["x", "y", "y", "z"]})
    cleaned = processor._clean_dataframe(df)
    assert len(cleaned) == 3


def test_clean_dataframe_preserves_non_null_values(processor: FileProcessor) -> None:
    df = pd.DataFrame({"score": [10, 20, 30], "label": ["good", "bad", "ok"]})
    cleaned = processor._clean_dataframe(df)
    assert len(cleaned) == 3
    assert cleaned["score"].tolist() == [10, 20, 30]


# ---------------------------------------------------------------------------
# process_file — CSV
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_process_csv_file(processor: FileProcessor, tmp_path: Path) -> None:
    csv_content = "Name,Age,City\nAlice,30,New York\nBob,25,London\nCharlie,35,Tokyo\n"
    csv_file = tmp_path / "test_data.csv"
    csv_file.write_text(csv_content, encoding="utf-8")

    result = await processor.process_file(csv_file, "test_data.csv")

    assert isinstance(result, ProcessedFileResult)
    assert result.row_count == 3
    assert set(result.original_columns) == {"Name", "Age", "City"}
    # Sanitized column names should be lowercase
    assert "name" in result.column_mapping
    assert "age" in result.column_mapping
    assert "city" in result.column_mapping


@pytest.mark.asyncio
async def test_process_csv_with_null_values(processor: FileProcessor, tmp_path: Path) -> None:
    csv_content = "product,price,category\napple,1.5,fruit\nN/A,NULL,\nbanana,0.8,fruit\n"
    csv_file = tmp_path / "nulls.csv"
    csv_file.write_text(csv_content, encoding="utf-8")

    result = await processor.process_file(csv_file, "nulls.csv")

    assert result.row_count == 3


@pytest.mark.asyncio
async def test_process_csv_with_special_column_names(
    processor: FileProcessor, tmp_path: Path
) -> None:
    csv_content = "First Name,Last Name,Phone #,E-mail\nJohn,Doe,555-1234,john@test.com\n"
    csv_file = tmp_path / "contacts.csv"
    csv_file.write_text(csv_content, encoding="utf-8")

    result = await processor.process_file(csv_file, "contacts.csv")

    # All sanitized names should be safe SQL identifiers
    for sanitized in result.column_mapping:
        assert sanitized.islower() or sanitized[0] == "_"
        assert " " not in sanitized
        assert "#" not in sanitized


@pytest.mark.asyncio
async def test_process_excel_file(processor: FileProcessor, tmp_path: Path) -> None:
    df = pd.DataFrame(
        {
            "Product": ["Widget A", "Widget B", "Widget C"],
            "Price": [9.99, 19.99, 4.99],
            "In Stock": [True, False, True],
        }
    )
    xlsx_path = tmp_path / "products.xlsx"
    df.to_excel(xlsx_path, index=False, engine="openpyxl")

    result = await processor.process_file(xlsx_path, "products.xlsx")

    assert result.row_count == 3
    assert "product" in result.column_mapping


@pytest.mark.asyncio
async def test_process_file_raises_for_empty_csv(
    processor: FileProcessor, tmp_path: Path
) -> None:
    from app.utils.exceptions import FileProcessingError

    csv_file = tmp_path / "empty.csv"
    csv_file.write_text("name,age\n", encoding="utf-8")  # header only, no rows

    with pytest.raises(FileProcessingError, match="no data rows"):
        await processor.process_file(csv_file, "empty.csv")


# ---------------------------------------------------------------------------
# _dataframe_to_dicts helper
# ---------------------------------------------------------------------------


def test_dataframe_to_dicts_handles_nan() -> None:
    df = pd.DataFrame({"a": [1, None, 3], "b": ["x", "y", None]})
    result = _dataframe_to_dicts(df)

    assert len(result) == 3
    assert result[1]["a"] is None
    assert result[2]["b"] is None


def test_dataframe_to_dicts_numpy_scalar() -> None:
    import numpy as np

    df = pd.DataFrame({"val": pd.array([1, 2, 3], dtype="int64")})
    result = _dataframe_to_dicts(df)

    for row in result:
        # Should be Python int, not numpy.int64
        assert isinstance(row["val"], int)


def test_dataframe_to_dicts_empty_df() -> None:
    df = pd.DataFrame()
    result = _dataframe_to_dicts(df)
    assert result == []
