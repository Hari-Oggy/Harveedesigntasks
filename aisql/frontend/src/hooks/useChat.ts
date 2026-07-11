// =====================================================
// AI SQL Assistant — Chat State Management Hook
// =====================================================

import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { chatApi } from '../services/api'
import { queryHistoryKeys } from './useQueryHistory'
import type { ChatMessage } from '../types'
import { generateId } from '../utils/formatters'

interface UseChatReturn {
  messages: ChatMessage[]
  sendMessage: (text: string, includeInsights?: boolean) => Promise<void>
  isLoading: boolean
  clearMessages: () => void
}

export function useChat(datasetId: string): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const sendMessage = useCallback(
    async (text: string, includeInsights = false) => {
      if (!datasetId || !text.trim() || isLoading) return

      // Optimistically add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        const response = await chatApi.sendMessage({
          dataset_id: datasetId,
          message: text.trim(),
          include_insights: includeInsights,
        })

        // Build assistant message from API response
        const assistantMessage: ChatMessage = {
          id: response.query_id || generateId(),
          role: 'assistant',
          content: response.error
            ? `I couldn't process that query.`
            : response.is_valid
            ? `Here are the results for your query.`
            : `I generated SQL but it couldn't be validated: ${response.validation_notes?.join(', ') ?? ''}`,
          sql: response.generated_sql,
          results: response.results,
          columns: response.columns,
          row_count: response.row_count,
          execution_time_ms: response.execution_time_ms,
          insights: response.insights,
          suggested_chart: response.suggested_chart,
          is_valid: response.is_valid,
          error: response.error,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])

        // Invalidate history so the new query shows up
        queryClient.invalidateQueries({ queryKey: queryHistoryKeys.list(datasetId) })
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'An unexpected error occurred'
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: 'I encountered an error while processing your request.',
          error: errMsg,
          is_valid: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        setIsLoading(false)
      }
    },
    [datasetId, isLoading, queryClient],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return { messages, sendMessage, isLoading, clearMessages }
}
