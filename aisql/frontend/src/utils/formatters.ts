// =====================================================
// AI SQL Assistant — Utility Formatters
// =====================================================

import { format, parseISO, isValid } from 'date-fns'

/**
 * Format bytes to human-readable string
 * @example formatBytes(1536000) // '1.5 MB'
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / Math.pow(k, i)
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${sizes[i]}`
}

/**
 * Format ISO date string to readable date-time
 * @example formatDate('2026-07-11T10:00:00Z') // 'Jul 11, 2026 at 10:00 AM'
 */
export function formatDate(dateStr: string): string {
  try {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr
    return format(date, "MMM d, yyyy 'at' h:mm a")
  } catch {
    return dateStr
  }
}

/**
 * Format number with thousands separator
 * @example formatNumber(1234567) // '1,234,567'
 */
export function formatNumber(n: number): string {
  if (n === null || n === undefined) return '0'
  return new Intl.NumberFormat('en-US').format(n)
}

/**
 * Truncate text to max length with ellipsis
 */
export function truncateText(text: string, maxLen: number): string {
  if (!text) return ''
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen - 3) + '...'
}

/**
 * Returns an emoji icon based on file extension
 */
export function getFileIcon(filename: string): string {
  if (!filename) return '📄'
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  const icons: Record<string, string> = {
    csv: '📊',
    xlsx: '📗',
    xls: '📗',
    json: '📋',
    txt: '📄',
    pdf: '📕',
    sql: '🗃️',
  }
  return icons[ext] ?? '📄'
}

/**
 * Check if a value is numeric (string or number)
 */
export function isNumeric(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return false
  return !isNaN(Number(value))
}

/**
 * Format execution time to human readable
 * @example formatExecutionTime(1234) // '1.23s'
 */
export function formatExecutionTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

/**
 * Relative time like "2 minutes ago"
 */
export function relativeTime(dateStr: string): string {
  try {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr
    const now = new Date()
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diffSeconds < 60) return 'just now'
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`
    return `${Math.floor(diffSeconds / 86400)}d ago`
  } catch {
    return dateStr
  }
}

/**
 * Generate a unique ID (for optimistic UI updates)
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Parse AI insights text into numbered list items if possible
 */
export function parseInsights(text: string): string[] {
  if (!text) return []
  // Try to split by numbered list pattern like "1. " "2. "
  const numbered = text.split(/\n?\d+\.\s+/).filter(Boolean)
  if (numbered.length > 1) return numbered.map((s) => s.trim())
  // Try splitting by newlines
  const lines = text.split('\n').filter((l) => l.trim().length > 0)
  if (lines.length > 1) return lines
  return [text]
}

/**
 * Detect column type from sample values
 */
export function detectColumnType(dbType: string): 'number' | 'text' | 'date' | 'boolean' {
  const lower = dbType.toLowerCase()
  if (/int|float|double|numeric|decimal|real|money|number/.test(lower)) return 'number'
  if (/date|time|timestamp/.test(lower)) return 'date'
  if (/bool/.test(lower)) return 'boolean'
  return 'text'
}
