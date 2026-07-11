// =====================================================
// AI SQL Assistant — TypeScript Type Definitions
// =====================================================

export interface ColumnInfo {
  name: string
  db_type: string
  nullable: boolean
  sample_values: string[]
}

export interface Dataset {
  id: string
  name: string
  original_filename: string
  table_name: string
  column_schema: ColumnInfo[]
  row_count: number
  file_size_bytes: number
  status: 'processing' | 'ready' | 'error'
  error_message?: string
  created_at: string
  updated_at: string
}

export interface ChartSuggestion {
  chart_type: 'bar' | 'line' | 'pie' | 'scatter' | 'area'
  x_column: string
  y_column: string
  title: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sql?: string
  results?: Record<string, unknown>[]
  columns?: string[]
  row_count?: number
  execution_time_ms?: number
  insights?: string
  suggested_chart?: ChartSuggestion
  is_valid?: boolean
  error?: string
  timestamp: Date
}

export interface QueryHistoryItem {
  id: string
  dataset_id: string
  natural_language_query: string
  generated_sql: string
  status: 'success' | 'error' | 'rejected'
  execution_time_ms?: number
  created_at: string
  result_summary?: {
    row_count: number
    columns: string[]
    execution_time_ms: number
  }
}

export interface ChatRequest {
  dataset_id: string
  message: string
  include_insights?: boolean
}

export interface ChatResponse {
  query_id: string
  natural_language: string
  generated_sql: string
  is_valid: boolean
  validation_notes?: string[]
  results?: Record<string, unknown>[]
  row_count: number
  columns: string[]
  execution_time_ms: number
  insights?: string
  suggested_chart?: ChartSuggestion
  error?: string
}

export interface DatasetPreviewResponse {
  columns: string[]
  rows: Record<string, unknown>[]
  total_rows: number
}

export interface UploadResponse {
  dataset: Dataset
  message: string
}

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  column: string
  direction: SortDirection
}
