"""
Main API router that aggregates all sub-routers under /api/v1.
"""
from __future__ import annotations

from fastapi import APIRouter

from app.api import chat, datasets, export, queries

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(datasets.router, prefix="/datasets", tags=["Datasets"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(queries.router, prefix="/queries", tags=["Query History"])
api_router.include_router(export.router, prefix="/export", tags=["Export"])
