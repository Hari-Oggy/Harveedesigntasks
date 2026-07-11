# Architecture Design Document

## AI SQL Assistant — Technical Architecture

---

## 1. System Overview

The AI SQL Assistant is a full-stack web application that enables users to upload structured datasets (CSV/Excel) and query them using natural language. The system translates natural language into validated SQL queries using Large Language Models (LLMs), executes them safely against a PostgreSQL database, and presents results with visualizations and AI-generated insights.

---

## 2. Architecture Design

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client Browser                     │
│  ┌─────────────────────────────────────────────┐    │
│  │         Vite + React TypeScript Frontend      │    │
│  │  Chat UI │ Upload │ Charts │ History │ Export  │    │
│  └─────────────────────┬───────────────────────┘    │
└────────────────────────┼────────────────────────────┘
                         │ HTTP / REST API
                         ▼
┌─────────────────────────────────────────────────────┐
│              FastAPI Backend (Python + uv)           │
│                                                     │
│  ┌──────────┐  ┌───────────┐  ┌─────────────────┐  │
│  │  API     │  │ Security  │  │  Rate Limiter   │  │
│  │  Layer   │  │ Middleware │  │  (slowapi)      │  │
│  └────┬─────┘  └───────────┘  └─────────────────┘  │
│       │                                             │
│  ┌────▼──────────────────────────────────────────┐  │
│  │              Service Layer                     │  │
│  │  FileProcessor │ SchemaDetector │ TableManager │  │
│  │  LLMService    │ SQLValidator   │ QueryExec    │  │
│  │  InsightGen    │                               │  │
│  └────┬──────────────────────┬────────────────────┘  │
└───────┼──────────────────────┼────────────────────────┘
        │                      │
        ▼                      ▼
┌───────────────┐    ┌─────────────────────┐
│  PostgreSQL   │    │   OpenAI API        │
│  ┌──────────┐ │    │   (GPT-4o)          │
│  │metadata_ │ │    └─────────────────────┘
│  │schema    │ │
│  ├──────────┤ │
│  │user_data │ │
│  │schema    │ │
│  └──────────┘ │
└───────────────┘
```

### 2.2 Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| **FastAPI App** | Request routing, middleware, dependency injection, lifecycle management |
| **FileProcessor** | Validates, parses, and cleans CSV/Excel files; handles encoding detection |
| **SchemaDetector** | Infers PostgreSQL column types from pandas dtypes, generates DDL |
| **TableManager** | Executes DDL to create dynamic tables, handles bulk data insertion |
| **LLMService** | Constructs prompts, calls OpenAI API, parses SQL responses |
| **SQLValidator** | Multi-layer validation: AST parsing, keyword blacklisting, table verification |
| **QueryExecutor** | Executes validated SQL in read-only transactions with timeouts |
| **InsightGenerator** | Wraps LLMService for post-query insights and chart suggestions |

---

## 3. Database Design Decisions

### 3.1 Why PostgreSQL?

**Decision**: PostgreSQL over MongoDB (both were listed as options).

**Rationale**:
- The core product value is SQL query execution. PostgreSQL lets us run LLM-generated SQL directly with zero translation layer.
- MongoDB would require converting NL → MongoDB aggregation pipelines, which LLMs handle far less reliably than SQL.
- PostgreSQL's dynamic DDL (`CREATE TABLE`, `DROP TABLE`) is mature, fast, and transactional.
- Rich SQL feature set (window functions, CTEs, complex aggregations) means LLM-generated queries can be powerful.

### 3.2 Dynamic Table Strategy

**Decision**: Create one table per uploaded dataset (not EAV or single-table design).

**Rationale**:
- EAV (Entity-Attribute-Value) makes SQL generation extremely complex — every "column" becomes a join.
- Single-table designs require JSON columns which LLMs struggle to query correctly.
- Dynamic tables = standard SQL, which GPT-4 generates with very high accuracy.
- Isolation: each dataset's data is contained in its own table, simplifying access control.

**Implementation**: Tables are named `ds_{first_8_chars_of_uuid}` in the `user_data` schema.

### 3.3 Schema Isolation

Two PostgreSQL schemas are used:
- `metadata_schema`: Stores application metadata (dataset catalog, query history)
- `user_data`: Contains all dynamically created user data tables

This isolation allows precise role-based access control — the query execution role has `SELECT` access to `user_data` only and cannot touch metadata or other schemas.

### 3.4 Type Mapping Strategy

pandas dtypes are mapped to PostgreSQL types conservatively:
- Prefer `TEXT` over `VARCHAR(n)` for string columns (avoids truncation errors)
- Use `DOUBLE PRECISION` for all floats (no precision loss)
- Detect datetime strings and convert to `TIMESTAMP`
- Store as `BOOLEAN` when column contains only true/false values

---

## 4. AI Integration Approach

### 4.1 LLM Choice: GPT-4o

**Why GPT-4o**: Among LLMs, GPT-4o has the best SQL generation accuracy. Its training data includes extensive SQL, schema-aware reasoning, and it follows system prompt instructions reliably.

**Fallback**: Google Gemini 2.5 Flash configured as optional fallback via `LLM_PROVIDER` env var.

### 4.2 Prompt Engineering Strategy

The system prompt is carefully engineered with:

1. **Role definition**: Positions the LLM as a PostgreSQL expert, not a general assistant
2. **Hard constraints**: Explicit list of forbidden SQL operations (INSERT, UPDATE, DELETE, DROP, etc.)
3. **Schema injection**: Full column names, types, and nullability
4. **Sample data**: First 3 rows provide semantic context (e.g., `q1` means "Quarter 1 sales")
5. **Output format**: "Return ONLY the SQL query" prevents explanation/markdown wrapping
6. **Edge case handling**: Explicit instructions for duplicate detection, null checks, date handling

**Temperature**: Set to `0` for deterministic, reproducible SQL generation.

### 4.3 Structured Output Validation

LLM output is NEVER trusted directly. It goes through:
1. Markdown stripping (remove ` ```sql ``` ` wrapping)
2. sqlparse AST parsing
3. Statement type check (must be SELECT)
4. Blocked keyword scan
5. Table reference verification
6. LIMIT clause enforcement

### 4.4 Insight Generation

A separate LLM call (optional, user-triggered) analyzes results and provides:
- 2-3 business-focused analytical insights
- Chart type recommendation based on data shape

This is implemented as an optional post-processing step to avoid increasing latency for all queries.

---

## 5. Security Considerations

### 5.1 Primary Threat: LLM-Generated SQL Injection

The biggest risk is an LLM generating malicious SQL (either through adversarial prompt injection or hallucination). Mitigation is multi-layered:

- **Layer 1 (Prompt)**: System prompt explicitly forbids non-SELECT operations
- **Layer 2 (Validation)**: SQL AST parser verifies SELECT-only at syntax level
- **Layer 3 (Keyword)**: Blacklist of 20+ dangerous keywords/functions
- **Layer 4 (Table check)**: Only the user's specific table can be referenced
- **Layer 5 (DB role)**: Query execution uses a PostgreSQL role with only SELECT privileges

### 5.2 File Upload Security

- Validate MIME type and file extension
- Save with UUID filename (never use original filename on disk)
- Size limit (50MB) enforced before reading
- Files processed in temporary directory and deleted after import

### 5.3 Data Isolation

Each user's data is in a separate table. Cross-table access is prevented at the SQL validation layer (only the dataset's specific table is whitelisted).

### 5.4 Operational Security

- Rate limiting (60 req/min) prevents DoS
- Statement timeout (30s) prevents long-running queries
- Row limit (1000) prevents full table scans
- Request size limits at nginx/FastAPI level

---

## 6. Challenges Faced & Solutions

### Challenge 1: LLM Generating Invalid SQL

**Problem**: GPT-4 sometimes generates SQL with markdown wrappers, explanation text, or invalid column names.

**Solution**: Multi-layer validation + output cleaning. Markdown stripping, AST validation, and column name verification. If SQL fails validation, return a friendly error with the validation reason.

### Challenge 2: Large File Processing

**Problem**: 50MB CSV files can cause memory issues when loaded entirely.

**Solution**: Use pandas `chunksize` parameter to read in 10,000-row chunks. Process and insert each chunk separately. Update dataset status asynchronously so the upload endpoint responds quickly.

### Challenge 3: Column Name Collisions with SQL Keywords

**Problem**: User data might have columns named `order`, `select`, `table`, etc.

**Solution**: All column names are wrapped in double quotes in the DDL and generated SQL. Additionally, column names are sanitized (spaces → underscores, special chars removed) during schema detection.

### Challenge 4: Ambiguous Natural Language

**Problem**: "Show me recent data" — what's recent? Today? Last month?

**Solution**: Include sample data in the prompt for context. For time-based queries, include the current date in the prompt. For truly ambiguous queries, the LLM generates a reasonable interpretation, and users can refine.

### Challenge 5: Type Inference Accuracy

**Problem**: A column `phone_number` with values like `555-1234` might be inferred as numeric by pandas if values happen to be all digits.

**Solution**: Conservative type mapping (prefer TEXT), manual checks for common patterns (phone numbers, IDs, zip codes), and ability to view schema and understand what types were detected.

---

## 7. Key Design Principles

1. **Security over convenience**: Never execute unvalidated SQL, even if it means more latency
2. **Fail gracefully**: Every error returns a user-friendly message, never raw exceptions
3. **Async everywhere**: Full async stack (FastAPI + asyncpg + SQLAlchemy async) for high concurrency
4. **Stateless API**: No server-side session state; all context passed in requests
5. **Observability**: Structured logging, execution time tracking, query history
