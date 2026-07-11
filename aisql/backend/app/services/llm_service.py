"""
LLM Service: converts natural-language questions to PostgreSQL SELECT queries
and generates analytical insights / chart suggestions.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Dict, List, Optional

import openai

from app.config import settings
from app.schemas.dataset import ColumnInfo
from app.utils.exceptions import LLMError

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Prompt templates
# ---------------------------------------------------------------------------

_SYSTEM_PROMPT_SQL = """\
You are an expert PostgreSQL SQL engineer. Your sole responsibility is to \
convert natural language questions into syntactically correct, safe PostgreSQL \
SELECT queries.

STRICT RULES — NEVER VIOLATE THESE:
1. Generate ONLY a single SELECT statement.
   NEVER use: INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE, GRANT, \
REVOKE, COPY, EXECUTE, PERFORM, DO, or any Data Manipulation / Definition language.
2. NEVER reference system catalogs or internal schemas.
   Forbidden prefixes: pg_*, information_schema, pg_catalog.
3. ALWAYS reference the table exactly as: "user_data"."{table_name}"
4. ALWAYS use LIMIT 1000 unless the user explicitly specifies a different limit \
or asks for all records.
5. NEVER use semicolons. Return ONE query only.
6. For "duplicates" queries: GROUP BY all relevant columns HAVING COUNT(*) > 1.
7. For "missing values" / "nulls": WHERE column IS NULL OR column = ''.
8. ALWAYS wrap column names in double quotes, e.g. "column_name".
9. Use ILIKE (case-insensitive) for string search comparisons.
10. For date/time filtering use DATE_TRUNC or EXTRACT appropriately.
11. Return ONLY the SQL query text — no markdown code fences, no explanations, \
no comments.

TABLE SCHEMA:
Table: "user_data"."{table_name}"
Columns:
{column_definitions}

SAMPLE DATA (first 3 rows):
{sample_rows}
"""

_SYSTEM_PROMPT_INSIGHTS = """\
You are a senior data analyst. A user asked the following question about their \
dataset and you have the query results. Provide 2-3 concise, actionable \
analytical insights about the data.

Guidelines:
- Be specific and reference actual values from the results.
- Use plain business language, no technical jargon.
- Focus on patterns, anomalies, or notable findings.
- Keep your response to 3-4 sentences maximum.
- Do NOT repeat the question back; jump straight into insights.
"""

_SYSTEM_PROMPT_CHART = """\
You are a data visualisation expert. Based on the query question and its results, \
suggest the single most appropriate chart type.

Respond with a JSON object ONLY — no markdown, no explanation:
{
  "chart_type": "bar" | "line" | "pie" | "scatter" | "area" | null,
  "x_column": "<column name>",
  "y_column": "<column name>",
  "title": "<short, descriptive chart title>"
}

Return null for chart_type if no chart makes sense (e.g. single-value results).
"""


class LLMService:
    """Async wrapper around the OpenAI API for SQL generation and insights."""

    def __init__(self) -> None:
        provider = settings.LLM_PROVIDER.lower()
        
        if provider == "groq":
            self.client = openai.AsyncOpenAI(
                api_key=settings.GROQ_API_KEY,
                base_url="https://api.groq.com/openai/v1",
            )
            self.model = "llama-3.3-70b-versatile"
        elif provider == "nvidia":
            self.client = openai.AsyncOpenAI(
                api_key=settings.NVIDIA_API_KEY,
                base_url="https://integrate.api.nvidia.com/v1",
            )
            self.model = "meta/llama-3.1-70b-instruct"
        elif provider == "openrouter":
            self.client = openai.AsyncOpenAI(
                api_key=settings.OPENROUTER_API_KEY,
                base_url="https://openrouter.ai/api/v1",
            )
            self.model = "meta-llama/llama-3.3-70b-instruct:free"
        elif provider == "gemini":
            self.client = openai.AsyncOpenAI(
                api_key=settings.GEMINI_API_KEY,
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
            )
            self.model = "gemini-1.5-pro"
        else:
            self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            self.model = "gpt-4o"

    # ------------------------------------------------------------------
    # SQL generation
    # ------------------------------------------------------------------

    async def generate_sql(
        self,
        table_name: str,
        columns: List[ColumnInfo],
        natural_language: str,
        sample_rows: List[Dict[str, Any]],
    ) -> str:
        """
        Convert a natural-language question to a PostgreSQL SELECT query.

        Parameters
        ----------
        table_name:        Short table name (without schema prefix).
        columns:           Schema metadata for the table.
        natural_language:  The user's question.
        sample_rows:       First 3 rows for context (list of dicts).

        Returns
        -------
        str
            Raw SQL string (no markdown, no semicolons).
        """
        column_definitions = _format_column_definitions(columns)
        sample_str = _format_sample_rows(sample_rows)

        system_prompt = _SYSTEM_PROMPT_SQL.format(
            table_name=table_name,
            column_definitions=column_definitions,
            sample_rows=sample_str,
        )

        logger.debug("Generating SQL for: %r", natural_language[:120])

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": natural_language},
                ],
                temperature=0.0,
                max_tokens=1024,
            )
        except openai.OpenAIError as exc:
            raise LLMError(f"OpenAI API error during SQL generation: {exc}") from exc

        sql = response.choices[0].message.content or ""
        sql = sql.strip()

        if not sql:
            raise LLMError("LLM returned an empty response for SQL generation.")

        logger.debug("LLM generated SQL: %s", sql[:300])
        return sql

    # ------------------------------------------------------------------
    # Insights generation
    # ------------------------------------------------------------------

    async def generate_insights(
        self,
        natural_language: str,
        sql: str,
        results: List[Dict[str, Any]],
        row_count: int,
    ) -> str:
        """
        Generate 2-3 analytical insights about the query results.

        Returns a plain-text string suitable for display in the UI.
        """
        # Truncate results to avoid excessive token usage
        sample_results = results[:20]
        user_content = (
            f"User question: {natural_language}\n\n"
            f"Executed SQL:\n{sql}\n\n"
            f"Total rows returned: {row_count}\n\n"
            f"Sample results (up to 20 rows):\n{json.dumps(sample_results, default=str, indent=2)}"
        )

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": _SYSTEM_PROMPT_INSIGHTS},
                    {"role": "user", "content": user_content},
                ],
                temperature=0.3,
                max_tokens=512,
            )
        except openai.OpenAIError as exc:
            raise LLMError(f"OpenAI API error during insight generation: {exc}") from exc

        return (response.choices[0].message.content or "").strip()

    # ------------------------------------------------------------------
    # Chart suggestion
    # ------------------------------------------------------------------

    async def suggest_chart(
        self,
        natural_language: str,
        columns: List[str],
        results: List[Dict[str, Any]],
    ) -> Optional[Dict[str, Any]]:
        """
        Suggest the most appropriate chart for the results.

        Returns a dict ``{chart_type, x_column, y_column, title}`` or
        ``None`` if no chart is appropriate.
        """
        sample_results = results[:10]
        user_content = (
            f"User question: {natural_language}\n\n"
            f"Available columns: {columns}\n\n"
            f"Sample results (up to 10 rows):\n"
            f"{json.dumps(sample_results, default=str, indent=2)}"
        )

        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": _SYSTEM_PROMPT_CHART},
                    {"role": "user", "content": user_content},
                ],
                temperature=0.0,
                max_tokens=256,
                response_format={"type": "json_object"},
            )
        except openai.OpenAIError as exc:
            logger.warning("Chart suggestion LLM call failed: %s", exc)
            return None

        raw = (response.choices[0].message.content or "").strip()
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            logger.warning("Could not parse chart suggestion JSON: %r", raw)
            return None

        if payload.get("chart_type") is None:
            return None

        return payload


# ---------------------------------------------------------------------------
# Formatting helpers
# ---------------------------------------------------------------------------


def _format_column_definitions(columns: List[ColumnInfo]) -> str:
    lines = []
    for col in columns:
        nullable_str = "NULLABLE" if col.nullable else "NOT NULL"
        samples = ", ".join(col.sample_values[:3]) if col.sample_values else "N/A"
        lines.append(
            f'  "{col.name}" {col.db_type} [{nullable_str}] — sample values: {samples}'
        )
    return "\n".join(lines)


def _format_sample_rows(sample_rows: List[Dict[str, Any]]) -> str:
    if not sample_rows:
        return "(no sample data available)"
    try:
        return json.dumps(sample_rows, default=str, indent=2)
    except Exception:
        return str(sample_rows)
