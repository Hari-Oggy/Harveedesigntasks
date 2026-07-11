"""
FastAPI application entry point.

Sets up:
- Lifespan: database initialisation on startup
- Middleware: CORS, GZip, request-size limiting
- Rate limiting via slowapi
- Global exception handlers
- API router mounting
- /health endpoint
"""
from __future__ import annotations

import logging
import sys
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response

from app.api.router import api_router
from app.config import settings
from app.database import init_db
from app.security.rate_limiter import limiter
from app.utils.exceptions import (
    AISQLException,
    DatasetNotFoundError,
    FileTooLargeError,
    SQLValidationError,
    UnsupportedFileTypeError,
)

# ---------------------------------------------------------------------------
# Logging configuration
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL.upper(), logging.INFO),
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Request size limiting middleware
# ---------------------------------------------------------------------------


class MaxRequestSizeMiddleware(BaseHTTPMiddleware):
    """Reject any request body larger than MAX_UPLOAD_SIZE_MB + 1 MB overhead."""

    def __init__(self, app, max_bytes: int) -> None:
        super().__init__(app)
        self.max_bytes = max_bytes

    async def dispatch(self, request: Request, call_next) -> Response:
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > self.max_bytes:
            return JSONResponse(
                status_code=413,
                content={
                    "detail": (
                        f"Request body too large. "
                        f"Maximum allowed: {self.max_bytes // 1_048_576} MB."
                    )
                },
            )
        return await call_next(request)


# ---------------------------------------------------------------------------
# Lifespan
# ---------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan: initialise DB on startup, clean up on shutdown."""
    logger.info("Starting %s v%s …", settings.APP_NAME, settings.VERSION)
    try:
        await init_db()
        logger.info("Database initialised.")
    except Exception as exc:
        logger.critical("Failed to initialise database: %s", exc)
        raise

    yield

    logger.info("%s shutting down.", settings.APP_NAME)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------


def create_app() -> FastAPI:
    """Construct and configure the FastAPI application."""
    app = FastAPI(
        title=settings.APP_NAME,
        description=(
            "AI-powered SQL Assistant — upload your data, ask questions in plain "
            "English, and get instant SQL-powered answers."
        ),
        version=settings.VERSION,
        docs_url="/docs" if settings.DEBUG else None,
        redoc_url="/redoc" if settings.DEBUG else None,
        lifespan=lifespan,
    )

    # ------------------------------------------------------------------ #
    # Rate limiter                                                         #
    # ------------------------------------------------------------------ #
    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore[arg-type]
    app.add_middleware(SlowAPIMiddleware)

    # ------------------------------------------------------------------ #
    # Middleware stack (applied in reverse order)                          #
    # ------------------------------------------------------------------ #
    app.add_middleware(GZipMiddleware, minimum_size=1_000)

    app.add_middleware(
        MaxRequestSizeMiddleware,
        max_bytes=settings.max_upload_size_bytes + 1_048_576,  # +1 MB overhead
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ------------------------------------------------------------------ #
    # Exception handlers                                                   #
    # ------------------------------------------------------------------ #

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": exc.errors(), "body": str(exc.body)},
        )

    @app.exception_handler(FileTooLargeError)
    async def file_too_large_handler(
        request: Request, exc: FileTooLargeError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            content={"detail": str(exc)},
        )

    @app.exception_handler(UnsupportedFileTypeError)
    async def unsupported_file_type_handler(
        request: Request, exc: UnsupportedFileTypeError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            content={"detail": str(exc)},
        )

    @app.exception_handler(SQLValidationError)
    async def sql_validation_handler(
        request: Request, exc: SQLValidationError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"detail": str(exc), "reason": exc.reason},
        )

    @app.exception_handler(DatasetNotFoundError)
    async def dataset_not_found_handler(
        request: Request, exc: DatasetNotFoundError
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"detail": str(exc)},
        )

    @app.exception_handler(AISQLException)
    async def aisql_exception_handler(
        request: Request, exc: AISQLException
    ) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": str(exc)},
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An internal server error occurred. Please try again later."},
        )

    # ------------------------------------------------------------------ #
    # Routes                                                               #
    # ------------------------------------------------------------------ #
    app.include_router(api_router)

    @app.get("/health", tags=["Health"], summary="Health check")
    async def health_check() -> dict:
        return {"status": "ok", "version": settings.VERSION, "app": settings.APP_NAME}

    return app


app = create_app()
