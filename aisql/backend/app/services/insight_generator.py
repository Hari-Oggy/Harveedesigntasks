"""
InsightGenerator: orchestrates LLM calls for analytical insights and
chart suggestions, catching errors gracefully so the main query flow
is never interrupted.
"""
from __future__ import annotations

import asyncio
import logging
from typing import Any, Dict, List, Optional, Tuple

from app.services.llm_service import LLMService

logger = logging.getLogger(__name__)


class InsightGenerator:
    """Thin orchestrator that calls LLMService for enrichment data."""

    def __init__(self, llm_service: LLMService) -> None:
        self.llm = llm_service

    async def generate(
        self,
        query: str,
        sql: str,
        results: List[Dict[str, Any]],
        columns: List[str],
    ) -> Tuple[Optional[str], Optional[Dict[str, Any]]]:
        """
        Generate insights and a chart suggestion for the given results.

        Both calls run concurrently. Errors are caught and logged so the
        main query response is never blocked.

        Parameters
        ----------
        query:    Original natural-language question.
        sql:      Validated SQL that produced the results.
        results:  List of row dicts from QueryExecutor.
        columns:  Column names in result order.

        Returns
        -------
        Tuple[str | None, dict | None]
            ``(insights_text, chart_suggestion)``
        """
        if not results:
            return None, None

        row_count = len(results)

        insights_task = asyncio.create_task(
            self._safe_insights(query, sql, results, row_count)
        )
        chart_task = asyncio.create_task(
            self._safe_chart(query, columns, results)
        )

        insights, chart = await asyncio.gather(insights_task, chart_task)
        return insights, chart

    # ------------------------------------------------------------------
    # Private safe wrappers
    # ------------------------------------------------------------------

    async def _safe_insights(
        self,
        query: str,
        sql: str,
        results: List[Dict[str, Any]],
        row_count: int,
    ) -> Optional[str]:
        try:
            return await self.llm.generate_insights(query, sql, results, row_count)
        except Exception as exc:
            logger.warning("Insight generation failed (non-fatal): %s", exc)
            return None

    async def _safe_chart(
        self,
        query: str,
        columns: List[str],
        results: List[Dict[str, Any]],
    ) -> Optional[Dict[str, Any]]:
        try:
            return await self.llm.suggest_chart(query, columns, results)
        except Exception as exc:
            logger.warning("Chart suggestion failed (non-fatal): %s", exc)
            return None
