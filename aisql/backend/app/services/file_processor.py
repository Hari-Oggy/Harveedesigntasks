"""
FileProcessor service: reads, validates, and cleans uploaded CSV/Excel files.
"""
from __future__ import annotations

import asyncio
import logging
from dataclasses import dataclass, field
from io import BytesIO
from pathlib import Path
from typing import Any, Dict, List, Optional

import chardet
import pandas as pd

from app.config import settings
from app.utils.exceptions import (
    FileProcessingError,
    FileTooLargeError,
    UnsupportedFileTypeError,
)
from app.utils.type_mapping import pandas_dtype_to_pg, sanitize_column_name

logger = logging.getLogger(__name__)

_SUPPORTED_EXTENSIONS = {".csv", ".xlsx", ".xls"}
_NULL_STRINGS = {"", "null", "none", "n/a", "na", "nan", "#n/a", "#na", "nil"}
_CHUNK_SIZE = 10_000


# ---------------------------------------------------------------------------
# Result dataclass
# ---------------------------------------------------------------------------


@dataclass
class ProcessedFileResult:
    """Holds everything the rest of the pipeline needs after file processing."""

    df: pd.DataFrame
    original_columns: List[str]
    # Maps sanitized column name → original column name
    column_mapping: Dict[str, str]
    dtypes: Dict[str, str]  # sanitized name → pandas dtype string
    sample_rows: List[Dict[str, Any]] = field(default_factory=list)
    row_count: int = 0


# ---------------------------------------------------------------------------
# Service class
# ---------------------------------------------------------------------------


class FileProcessor:
    """Async-friendly service that processes uploaded tabular files."""

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    async def validate_file(self, file_size: int, filename: str) -> None:
        """
        Raise appropriate exceptions for invalid files before reading.

        Parameters
        ----------
        file_size:  Size in bytes of the incoming file.
        filename:   Original filename (used to check extension).
        """
        ext = Path(filename).suffix.lower()
        if ext not in _SUPPORTED_EXTENSIONS:
            raise UnsupportedFileTypeError(
                f"File type '{ext}' is not supported. "
                f"Accepted formats: {', '.join(sorted(_SUPPORTED_EXTENSIONS))}"
            )

        max_bytes = settings.max_upload_size_bytes
        if file_size > max_bytes:
            raise FileTooLargeError(
                f"File size {file_size / 1_048_576:.1f} MB exceeds the "
                f"maximum allowed size of {settings.MAX_UPLOAD_SIZE_MB} MB."
            )

    async def process_file(self, file_path: Path, filename: str) -> ProcessedFileResult:
        """
        Read, clean, and structure a tabular file from disk.

        Heavy pandas work is offloaded to a thread pool so the event loop
        is not blocked.

        Parameters
        ----------
        file_path:  Absolute path to the temporarily saved file.
        filename:   Original filename (determines reader strategy).
        """
        ext = Path(filename).suffix.lower()
        loop = asyncio.get_event_loop()

        try:
            if ext == ".csv":
                df = await loop.run_in_executor(
                    None, self._read_csv, file_path
                )
            elif ext in (".xlsx", ".xls"):
                df = await loop.run_in_executor(
                    None, self._read_excel, file_path
                )
            else:
                raise UnsupportedFileTypeError(f"Unsupported extension: {ext}")
        except (UnsupportedFileTypeError, FileTooLargeError):
            raise
        except Exception as exc:
            raise FileProcessingError(
                f"Failed to read file '{filename}': {exc}"
            ) from exc

        if df.empty:
            raise FileProcessingError("The uploaded file contains no data rows.")

        # Normalise column names to strings
        df.columns = [str(c).strip() for c in df.columns]
        original_columns: List[str] = list(df.columns)

        # Build sanitized → original mapping (handle duplicates)
        column_mapping: Dict[str, str] = {}
        seen: Dict[str, int] = {}
        renamed: Dict[str, str] = {}  # original → sanitized

        for orig in original_columns:
            sanitized = sanitize_column_name(orig)
            if sanitized in seen:
                seen[sanitized] += 1
                sanitized = f"{sanitized}_{seen[sanitized]}"
            else:
                seen[sanitized] = 0
            column_mapping[sanitized] = orig
            renamed[orig] = sanitized

        df = df.rename(columns=renamed)

        # Clean in executor to avoid blocking
        df = await loop.run_in_executor(None, self._clean_dataframe, df)

        dtypes = {col: str(df[col].dtype) for col in df.columns}

        # Sample rows — convert to plain Python types for JSON safety
        sample_df = df.head(3)
        sample_rows = _dataframe_to_dicts(sample_df)

        return ProcessedFileResult(
            df=df,
            original_columns=original_columns,
            column_mapping=column_mapping,
            dtypes=dtypes,
            sample_rows=sample_rows,
            row_count=len(df),
        )

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _read_csv(self, file_path: Path) -> pd.DataFrame:
        """Read a CSV file, auto-detecting encoding and chunking for large files."""
        raw = file_path.read_bytes()
        detected = chardet.detect(raw[:65_536])  # sample first 64 KB
        encoding = detected.get("encoding") or "utf-8"
        confidence = detected.get("confidence", 0.0)
        logger.info(
            "Detected encoding '%s' (confidence %.1f%%) for %s",
            encoding, confidence * 100, file_path.name,
        )

        # Try detected encoding first, fall back to latin-1
        for enc in [encoding, "utf-8", "latin-1"]:
            try:
                chunks: List[pd.DataFrame] = []
                reader = pd.read_csv(
                    BytesIO(raw),
                    encoding=enc,
                    chunksize=_CHUNK_SIZE,
                    on_bad_lines="warn",
                    low_memory=False,
                )
                for chunk in reader:
                    chunks.append(chunk)
                return pd.concat(chunks, ignore_index=True) if chunks else pd.DataFrame()
            except (UnicodeDecodeError, LookupError):
                continue

        raise FileProcessingError(
            f"Could not decode CSV file with any supported encoding."
        )

    def _read_excel(self, file_path: Path) -> pd.DataFrame:
        """Read an Excel workbook (first sheet only for now)."""
        try:
            return pd.read_excel(file_path, engine="openpyxl", dtype=str)
        except Exception:
            # .xls files need xlrd; fall back gracefully
            try:
                return pd.read_excel(file_path, dtype=str)
            except Exception as exc:
                raise FileProcessingError(f"Cannot read Excel file: {exc}") from exc

    def _clean_dataframe(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean and normalise a raw DataFrame:
        - Strip whitespace from string columns
        - Replace common null-like strings with NaN/None
        - Remove fully duplicate rows
        """
        # Strip whitespace from object columns
        str_cols = df.select_dtypes(include=["object"]).columns
        for col in str_cols:
            df[col] = df[col].astype(str).str.strip()

        # Replace null-like strings
        for col in str_cols:
            df[col] = df[col].apply(
                lambda v: None if (isinstance(v, str) and v.lower() in _NULL_STRINGS) else v
            )

        # Type inference after cleaning (let pandas re-infer)
        df = df.infer_objects()

        # Drop fully duplicate rows
        before = len(df)
        df = df.drop_duplicates()
        after = len(df)
        if before != after:
            logger.debug("Removed %d duplicate rows.", before - after)

        return df.reset_index(drop=True)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _dataframe_to_dicts(df: pd.DataFrame) -> List[Dict[str, Any]]:
    """Convert a DataFrame to a list of plain-Python dicts (JSON-serialisable)."""
    rows = []
    for _, row in df.iterrows():
        record: Dict[str, Any] = {}
        for k, v in row.items():
            if pd.isna(v) if not isinstance(v, (list, dict)) else False:
                record[str(k)] = None
            elif hasattr(v, "item"):  # numpy scalar
                record[str(k)] = v.item()
            else:
                record[str(k)] = v
        rows.append(record)
    return rows
