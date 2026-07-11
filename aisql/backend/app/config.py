"""
Application configuration using Pydantic Settings.
All settings are read from environment variables or a .env file.
"""
from __future__ import annotations

from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )

    # Application metadata
    APP_NAME: str = "AI SQL Assistant"
    VERSION: str = "1.0.0"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://aisql_app:dev_password@localhost:5432/aisql"
    DATABASE_QUERY_URL: str = "postgresql+asyncpg://aisql_query:query_password@localhost:5432/aisql"

    # LLM
    LLM_PROVIDER: str = "openai"
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    NVIDIA_API_KEY: str = ""
    OPENROUTER_API_KEY: str = ""

    # Security
    SECRET_KEY: str = "change-me-in-production-use-a-long-random-string"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173"]

    # File upload
    MAX_UPLOAD_SIZE_MB: int = 50

    # Query execution
    QUERY_TIMEOUT_SECONDS: int = 30

    # Rate limiting
    RATE_LIMIT: str = "60/minute"

    # Debug & logging
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    @property
    def max_upload_size_bytes(self) -> int:
        return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024


settings = Settings()
