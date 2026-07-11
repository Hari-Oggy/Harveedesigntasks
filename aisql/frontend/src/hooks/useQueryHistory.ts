// =====================================================
// AI SQL Assistant — Query History TanStack Query Hooks
// =====================================================

import { useQuery } from '@tanstack/react-query'
import { queriesApi } from '../services/api'

export const queryHistoryKeys = {
  all: ['queryHistory'] as const,
  list: (datasetId?: string) => [...queryHistoryKeys.all, 'list', datasetId ?? 'all'] as const,
  detail: (id: string) => [...queryHistoryKeys.all, 'detail', id] as const,
}

/** Fetch query history, optionally filtered by dataset */
export function useQueryHistory(datasetId?: string) {
  return useQuery({
    queryKey: queryHistoryKeys.list(datasetId),
    queryFn: () => queriesApi.history(datasetId, 0, 50),
    staleTime: 10_000,
    enabled: true,
  })
}

/** Fetch a single query detail */
export function useQueryDetail(id: string) {
  return useQuery({
    queryKey: queryHistoryKeys.detail(id),
    queryFn: () => queriesApi.get(id),
    enabled: !!id,
    staleTime: 60_000,
  })
}
