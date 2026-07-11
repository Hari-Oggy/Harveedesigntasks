// =====================================================
// AI SQL Assistant — Dataset TanStack Query Hooks
// =====================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { datasetsApi } from '../services/api'
import type { Dataset } from '../types'

// Query keys
export const datasetKeys = {
  all: ['datasets'] as const,
  lists: () => [...datasetKeys.all, 'list'] as const,
  detail: (id: string) => [...datasetKeys.all, 'detail', id] as const,
  preview: (id: string) => [...datasetKeys.all, 'preview', id] as const,
}

/** Fetch all datasets */
export function useDatasets() {
  return useQuery({
    queryKey: datasetKeys.lists(),
    queryFn: datasetsApi.list,
    staleTime: 30_000,
    refetchInterval: (query) => {
      // Poll while any dataset is still processing
      const datasets = query.state.data as Dataset[] | undefined
      const hasProcessing = datasets?.some((d) => d.status === 'processing')
      return hasProcessing ? 3_000 : false
    },
  })
}

/** Fetch a single dataset by ID */
export function useDataset(id: string) {
  return useQuery({
    queryKey: datasetKeys.detail(id),
    queryFn: () => datasetsApi.get(id),
    enabled: !!id,
    staleTime: 30_000,
  })
}

/** Upload dataset mutation */
export function useUploadDataset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      file,
      onProgress,
    }: {
      file: File
      onProgress?: (percent: number) => void
    }) => datasetsApi.upload(file, onProgress),

    onSuccess: () => {
      // Invalidate the list query so the new dataset shows up
      queryClient.invalidateQueries({ queryKey: datasetKeys.lists() })
    },
  })
}

/** Delete dataset mutation */
export function useDeleteDataset() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => datasetsApi.delete(id),

    onMutate: async (id: string) => {
      // Optimistic update — remove from list immediately
      await queryClient.cancelQueries({ queryKey: datasetKeys.lists() })
      const previous = queryClient.getQueryData<Dataset[]>(datasetKeys.lists())
      queryClient.setQueryData<Dataset[]>(datasetKeys.lists(), (old) =>
        old ? old.filter((d) => d.id !== id) : [],
      )
      return { previous }
    },

    onError: (_err, _id, context) => {
      // Rollback optimistic update on error
      if (context?.previous) {
        queryClient.setQueryData(datasetKeys.lists(), context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: datasetKeys.lists() })
    },
  })
}

/** Fetch preview rows for a dataset */
export function useDatasetPreview(id: string) {
  return useQuery({
    queryKey: datasetKeys.preview(id),
    queryFn: () => datasetsApi.preview(id),
    enabled: !!id,
    staleTime: 60_000,
  })
}
