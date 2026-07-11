"""
Security sanitization utilities for user-supplied inputs.
"""
from __future__ import annotations

import re


_SAFE_FILENAME_RE = re.compile(r"[^A-Za-z0-9 \-_.]")


def sanitize_user_input(text: str, max_length: int = 2_000) -> str:
    """
    Sanitise free-text user input (natural language query, dataset name, etc.).

    - Truncates to *max_length* characters.
    - Strips null bytes that could cause issues in downstream processing.

    Parameters
    ----------
    text:       Raw input string from the user.
    max_length: Maximum allowed length (default 2000).

    Returns
    -------
    str
        Sanitised string safe for further processing.
    """
    # Strip null bytes
    text = text.replace("\x00", "")
    # Truncate
    text = text[:max_length]
    return text.strip()


def validate_filename(filename: str) -> str:
    """
    Return a safe version of *filename*.

    Strips any characters that are not alphanumeric, spaces, hyphens,
    underscores, or dots. Limits the result to 255 characters.

    Parameters
    ----------
    filename:   Original filename from the client.

    Returns
    -------
    str
        Sanitised filename.

    Raises
    ------
    ValueError
        If the sanitised filename is empty.
    """
    safe = _SAFE_FILENAME_RE.sub("", filename)
    safe = safe.strip().strip(".")[:255]

    if not safe:
        raise ValueError(
            f"Filename '{filename}' contains no valid characters. "
            "Use only letters, numbers, spaces, hyphens, underscores, and dots."
        )

    return safe
