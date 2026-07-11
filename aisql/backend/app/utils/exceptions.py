"""
Custom application exception hierarchy.
Each exception maps to a specific HTTP status in the global exception handlers.
"""
from __future__ import annotations


class AISQLException(Exception):
    """Base exception for all AI SQL Assistant errors."""

    def __init__(self, message: str = "An unexpected error occurred.") -> None:
        super().__init__(message)
        self.message = message

    def __str__(self) -> str:
        return self.message


class FileProcessingError(AISQLException):
    """Raised when a file cannot be parsed or processed."""


class SchemaDetectionError(AISQLException):
    """Raised when column types cannot be reliably detected."""


class TableCreationError(AISQLException):
    """Raised when the dynamic PostgreSQL table cannot be created."""


class LLMError(AISQLException):
    """Raised when the LLM call fails or returns an invalid response."""


class SQLValidationError(AISQLException):
    """Raised when generated SQL fails security or correctness validation."""

    def __init__(self, message: str, reason: str = "") -> None:
        super().__init__(message)
        self.reason = reason


class QueryExecutionError(AISQLException):
    """Raised when executing a validated SQL query fails."""


class DatasetNotFoundError(AISQLException):
    """Raised when a requested dataset UUID does not exist."""


class FileTooLargeError(AISQLException):
    """Raised when an uploaded file exceeds the configured size limit."""


class UnsupportedFileTypeError(AISQLException):
    """Raised when an uploaded file has an unsupported extension."""
