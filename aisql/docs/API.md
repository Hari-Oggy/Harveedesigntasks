# AI SQL Assistant — API Documentation

## Base URL

- **Development**: `http://localhost:8000/api/v1`
- **Interactive Docs**: `http://localhost:8000/docs` (Swagger UI)
- **ReDoc**: `http://localhost:8000/redoc`

---

## Authentication

Currently using API key authentication via header:
```
X-API-Key: your-api-key
```
*In development mode (`DEBUG=true`), authentication is relaxed.*

---

## Endpoints

### Health Check

```
GET /health
```

**Response**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "database": "connected"
}
```

---

### Datasets

#### Upload Dataset

```
POST /api/v1/datasets/upload
Content-Type: multipart/form-data
```

**Request Form Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | CSV or Excel file |
| `name` | string | ❌ | Custom dataset name (defaults to filename) |

**Response** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Sales Data Q1",
  "original_filename": "sales_q1.csv",
  "table_name": "ds_550e8400",
  "column_schema": [
    {
      "name": "order_id",
      "db_type": "TEXT",
      "nullable": false,
      "sample_values": ["ORD001", "ORD002", "ORD003"]
    },
    {
      "name": "total_amount",
      "db_type": "DOUBLE PRECISION",
      "nullable": false,
      "sample_values": ["2599.98", "1497.50", "450.00"]
    }
  ],
  "row_count": 72,
  "file_size_bytes": 4892,
  "status": "ready",
  "error_message": null,
  "created_at": "2024-07-11T09:45:00Z",
  "updated_at": "2024-07-11T09:45:02Z"
}
```

**Errors**
| Code | Reason |
|------|--------|
| `400` | Invalid file format |
| `413` | File exceeds 50MB limit |
| `415` | Unsupported file type |
| `500` | Processing error |

---

#### List Datasets

```
GET /api/v1/datasets?skip=0&limit=20
```

**Query Params**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `skip` | int | 0 | Pagination offset |
| `limit` | int | 20 | Max results (max 100) |

**Response** `200 OK`
```json
{
  "datasets": [...],
  "total": 5
}
```

---

#### Get Dataset

```
GET /api/v1/datasets/{dataset_id}
```

**Response** `200 OK` — Full DatasetResponse object

---

#### Preview Dataset

```
GET /api/v1/datasets/{dataset_id}/preview?limit=50
```

**Response** `200 OK`
```json
{
  "columns": ["order_id", "customer_name", "total_amount"],
  "rows": [
    {"order_id": "ORD001", "customer_name": "Alice Johnson", "total_amount": 2599.98}
  ],
  "total_rows": 72
}
```

---

#### Delete Dataset

```
DELETE /api/v1/datasets/{dataset_id}
```

**Response** `200 OK`
```json
{
  "message": "Dataset deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### Chat (NL-to-SQL)

#### Send Message

```
POST /api/v1/chat
Content-Type: application/json
```

**Request Body**
```json
{
  "dataset_id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Show top 10 orders by total amount",
  "include_insights": true
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `dataset_id` | UUID | ✅ | Target dataset |
| `message` | string | ✅ | Natural language query (max 2000 chars) |
| `include_insights` | bool | ❌ | Generate AI insights (slower, costs extra tokens) |

**Response** `200 OK`
```json
{
  "query_id": "660f9511-f3ac-52e5-b827-557766551111",
  "natural_language": "Show top 10 orders by total amount",
  "generated_sql": "SELECT \"order_id\", \"customer_name\", \"total_amount\" FROM \"user_data\".\"ds_550e8400\" ORDER BY \"total_amount\" DESC LIMIT 10",
  "is_valid": true,
  "validation_notes": null,
  "results": [
    {"order_id": "ORD041", "customer_name": "Oliver Rogers", "total_amount": 6499.95},
    ...
  ],
  "row_count": 10,
  "columns": ["order_id", "customer_name", "total_amount"],
  "execution_time_ms": 45,
  "insights": "Oliver Rogers leads with $6,499.95 in total orders — 3x higher than the median order value of $1,847. The top 10 customers account for 38% of all revenue, suggesting a concentrated customer base worth nurturing.",
  "suggested_chart": {
    "chart_type": "bar",
    "x_column": "customer_name",
    "y_column": "total_amount",
    "title": "Top 10 Orders by Amount"
  },
  "error": null
}
```

**Response when SQL is invalid**
```json
{
  "query_id": "...",
  "natural_language": "...",
  "generated_sql": "DROP TABLE user_data.ds_550e8400",
  "is_valid": false,
  "validation_notes": ["Statement type rejected: only SELECT is allowed", "Blocked keyword: DROP"],
  "results": null,
  "row_count": 0,
  "columns": [],
  "execution_time_ms": 0,
  "insights": null,
  "suggested_chart": null,
  "error": "The generated SQL was rejected for security reasons. Please rephrase your query."
}
```

---

### Query History

#### List History

```
GET /api/v1/queries/history?dataset_id=&skip=0&limit=20
```

**Query Params**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `dataset_id` | UUID | ❌ | Filter by dataset |
| `skip` | int | 0 | Pagination offset |
| `limit` | int | 20 | Max results |

**Response** `200 OK`
```json
{
  "items": [
    {
      "id": "660f9511-...",
      "dataset_id": "550e8400-...",
      "natural_language_query": "Show top 10 orders by total amount",
      "generated_sql": "SELECT ...",
      "status": "success",
      "execution_time_ms": 45,
      "created_at": "2024-07-11T09:50:00Z",
      "result_summary": {
        "row_count": 10,
        "columns": ["order_id", "customer_name", "total_amount"],
        "execution_time_ms": 45
      }
    }
  ],
  "total": 25
}
```

---

#### Get Query Detail

```
GET /api/v1/queries/{query_id}
```

**Response** `200 OK` — Full QueryHistoryItem

---

### Export

#### Export to Excel

```
GET /api/v1/export/{query_id}/excel
```

**Response** `200 OK`
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Content-Disposition: `attachment; filename="query_results.xlsx"`

---

#### Export to CSV

```
GET /api/v1/export/{query_id}/csv
```

**Response** `200 OK`
- Content-Type: `text/csv`
- Content-Disposition: `attachment; filename="query_results.csv"`

---

## Error Response Format

All errors return:
```json
{
  "detail": "Human-readable error message",
  "error_code": "DATASET_NOT_FOUND",
  "timestamp": "2024-07-11T09:50:00Z"
}
```

## Rate Limiting

- Default: 60 requests/minute per IP
- Upload endpoint: 10 requests/minute per IP
- Chat endpoint: 30 requests/minute per IP

Rate limit headers included in responses:
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1720686660
```
