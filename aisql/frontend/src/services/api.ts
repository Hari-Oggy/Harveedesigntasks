// =====================================================
// AI SQL Assistant — Axios API Service Layer
// =====================================================

import axios from 'axios'
import type {
  Dataset,
  ChatRequest,
  ChatResponse,
  QueryHistoryItem,
  DatasetPreviewResponse,
} from '../types'

// ---- Axios Instance ----
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 60_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ---- Request Interceptor ----
api.interceptors.request.use(
  (config) => {
    // Attach auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ---- Response Interceptor ----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      const message =
        data?.detail ||
        data?.message ||
        (typeof data === 'string' ? data : null) ||
        `Request failed with status ${status}`
      return Promise.reject(new Error(message))
    }
    if (error.request) {
      return Promise.reject(new Error('Network error — is the backend running?'))
    }
    return Promise.reject(error)
  },
)

// =====================================================
// Datasets API
// =====================================================

export const datasetsApi = {
  /**
   * Upload a CSV/Excel file as a dataset.
   * Accepts optional onProgress callback for upload tracking.
   */
  upload: (
    file: File,
    onProgress?: (percent: number) => void,
  ): Promise<Dataset> => {
    const formData = new FormData()
    formData.append('file', file)

    return api
      .post<Dataset>('/datasets/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress(percent)
          }
        },
      })
      .then((r) => r.data)
  },

  /** List all uploaded datasets */
  list: (): Promise<Dataset[]> =>
    api.get<{datasets: Dataset[], total: number}>('/datasets').then((r) => r.data.datasets),

  /** Get a single dataset by ID */
  get: (id: string): Promise<Dataset> =>
    api.get<Dataset>(`/datasets/${id}`).then((r) => r.data),

  /** Delete a dataset by ID */
  delete: (id: string): Promise<void> =>
    api.delete(`/datasets/${id}`).then(() => undefined),

  /** Get preview rows for a dataset */
  preview: (id: string, limit = 50): Promise<DatasetPreviewResponse> =>
    api.get<DatasetPreviewResponse>(`/datasets/${id}/preview`, { params: { limit } }).then((r) => r.data),
}

// =====================================================
// Chat API
// =====================================================

export const chatApi = {
  /**
   * Send a natural language query for a dataset.
   * Returns generated SQL + query results + optional insights.
   */
  sendMessage: (req: ChatRequest): Promise<ChatResponse> =>
    api.post<ChatResponse>('/chat', req).then((r) => r.data),
}

// =====================================================
// Queries / History API
// =====================================================

export const queriesApi = {
  /** Get paginated query history, optionally filtered by dataset */
  history: (datasetId?: string, skip = 0, limit = 20): Promise<QueryHistoryItem[]> =>
    api
      .get<{items: QueryHistoryItem[], total: number}>('/queries/history', {
        params: { dataset_id: datasetId, skip, limit },
      })
      .then((r) => r.data.items),

  /** Get a single query detail by ID */
  get: (id: string): Promise<QueryHistoryItem> =>
    api.get<QueryHistoryItem>(`/queries/${id}`).then((r) => r.data),
}

// =====================================================
// Export API
// =====================================================

export const exportApi = {
  /**
   * Download query results as Excel. Returns a blob URL.
   */
  excel: async (queryId: string): Promise<void> => {
    const response = await api.get(`/queries/${queryId}/export/excel`, {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `query_${queryId}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },

  /**
   * Download query results as CSV.
   */
  csv: async (queryId: string): Promise<void> => {
    const response = await api.get(`/queries/${queryId}/export/csv`, {
      responseType: 'blob',
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `query_${queryId}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },

  /**
   * Export arbitrary results array to CSV in-browser (no server needed).
   */
  clientCsv: (rows: Record<string, unknown>[], columns: string[], filename = 'export.csv'): void => {
    const header = columns.join(',')
    const csvRows = rows.map((row) =>
      columns.map((col) => {
        const val = row[col]
        if (val === null || val === undefined) return ''
        const str = String(val)
        // Escape commas and quotes
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }).join(','),
    )
    const csv = [header, ...csvRows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  },
}

export default api
