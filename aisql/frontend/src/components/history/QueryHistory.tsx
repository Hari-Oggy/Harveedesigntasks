import { useState } from 'react'
import { History, Search, ChevronRight, X, Clock, Database, CheckCircle2, XCircle } from 'lucide-react'
import { useQueryHistory } from '../../hooks/useQueryHistory'
import { formatDate, formatExecutionTime } from '../../utils/formatters'
import type { QueryHistoryItem } from '../../types'

export function QueryHistory() {
  const { data, isLoading } = useQueryHistory()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedQuery, setSelectedQuery] = useState<QueryHistoryItem | null>(null)

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <div className="w-8 h-8 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-4" />
        <p>Loading history...</p>
      </div>
    )
  }

  const items = data || []
  const filtered = items.filter(item => 
    item.natural_language_query.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-[600px] bg-white text-gray-900 rounded-xl overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2">
          <History size={18} className="text-[#0A6C4C]" />
          Query History
        </h3>
        <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
          {items.length} Queries
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* List Panel */}
        <div className={`w-full md:w-2/5 flex flex-col border-r border-gray-200 ${selectedQuery ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A6C4C] focus:ring-1 focus:ring-[#0A6C4C] transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No queries found.
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedQuery(item)}
                    className={`text-left p-3 rounded-lg transition-colors flex items-start gap-3 border border-transparent ${
                      selectedQuery?.id === item.id
                        ? 'bg-[#EEF2EB] border-[#0A6C4C]/20'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {item.status === 'success' ? (
                        <CheckCircle2 size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.natural_language_query}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                        <span className="truncate">{formatDate(item.created_at)}</span>
                        {item.execution_time_ms && (
                          <span className="shrink-0">{item.execution_time_ms}ms</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={16} className={`shrink-0 self-center text-gray-400 ${selectedQuery?.id === item.id ? 'text-[#0A6C4C]' : ''}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className={`w-full md:w-3/5 bg-gray-50 flex flex-col relative ${!selectedQuery ? 'hidden md:flex' : 'flex'}`}>
          {selectedQuery ? (
            <>
              {/* Mobile back button */}
              <button 
                className="md:hidden absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm text-gray-500 border border-gray-200"
                onClick={() => setSelectedQuery(null)}
              >
                <X size={16} />
              </button>

              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Query</h4>
                  <p className="text-lg font-medium text-gray-900">{selectedQuery.natural_language_query}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5"><Clock size={12}/> Time</span>
                    <span className="font-semibold text-gray-900">{formatDate(selectedQuery.created_at)}</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col gap-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1.5"><Database size={12}/> Execution</span>
                    <span className="font-semibold text-gray-900">
                      {selectedQuery.execution_time_ms ? formatExecutionTime(selectedQuery.execution_time_ms) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Generated SQL</h4>
                  <div className="bg-[#1f2937] p-4 rounded-xl border border-gray-800 text-sm text-gray-200 overflow-x-auto font-mono whitespace-pre custom-scrollbar">
                    {selectedQuery.generated_sql}
                  </div>
                </div>

                {selectedQuery.status === 'error' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 text-red-500">Error</h4>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-sm text-red-700 whitespace-pre-wrap">
                      Query execution failed. Check server logs for details.
                    </div>
                  </div>
                )}
                
                {selectedQuery.result_summary && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Result Summary</h4>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm">
                      <p><span className="text-gray-500">Row Count:</span> <span className="font-medium">{selectedQuery.result_summary.row_count}</span></p>
                      <p className="mt-2"><span className="text-gray-500">Columns:</span></p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedQuery.result_summary.columns.map((c: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded border border-gray-200 text-xs">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <History size={48} className="mb-4 opacity-20" />
              <p className="font-medium text-gray-500">Select a query to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
