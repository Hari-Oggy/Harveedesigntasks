import { useState } from 'react'
import { Database, Search, FileText, CheckCircle2, Clock, Trash2, Loader2, AlertCircle } from 'lucide-react'
import { useDatasets, useDeleteDataset } from '../../hooks/useDatasets'
import { formatBytes, formatDate } from '../../utils/formatters'
import toast from 'react-hot-toast'

interface DatasetListProps {
  selectedDatasetId: string | null
  onSelectDataset: (id: string) => void
  onUploadClick: () => void
}

export function DatasetList({ selectedDatasetId, onSelectDataset, onUploadClick }: DatasetListProps) {
  const { data: datasets = [], isLoading, isError } = useDatasets()
  const deleteDataset = useDeleteDataset()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDatasets = datasets.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      try {
        await deleteDataset.mutateAsync(id)
        toast.success('Dataset deleted successfully')
        if (selectedDatasetId === id) {
          onSelectDataset('') // Clear selection if active is deleted
        }
      } catch (err) {
        toast.error('Failed to delete dataset')
      }
    }
  }

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 text-gray-400">
        <Loader2 size={32} className="animate-spin mb-4 text-[#0A6C4C]" />
        <p className="text-sm">Loading datasets...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600 flex flex-col items-center">
        <AlertCircle size={32} className="mb-2" />
        <p className="font-medium">Failed to load datasets</p>
        <p className="text-sm mt-1 text-red-500">Please make sure the backend server is running.</p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Database size={18} className="text-[#0A6C4C]" />
          Uploaded Datasets
        </h3>
        <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
          {datasets.length} Files
        </span>
      </div>
      
      {datasets.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-[#0A6C4C] focus:ring-1 focus:ring-[#0A6C4C] outline-none transition-all"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {datasets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <FileText size={32} />
            </div>
            <h4 className="text-gray-900 font-semibold mb-2">No Datasets Yet</h4>
            <p className="text-sm text-gray-500 max-w-[250px] mb-6">
              Upload a CSV or Excel file to start querying your data.
            </p>
            <button
              onClick={onUploadClick}
              className="px-5 py-2 bg-[#0A6C4C] text-white rounded-lg text-sm font-medium hover:bg-[#075239] transition-colors"
            >
              Upload Data
            </button>
          </div>
        ) : filteredDatasets.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No datasets match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDatasets.map((dataset) => {
              const isActive = selectedDatasetId === dataset.id
              
              return (
                <div
                  key={dataset.id}
                  onClick={() => onSelectDataset(dataset.id)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col group ${
                    isActive 
                      ? 'border-[#0A6C4C] bg-[#EEF2EB] shadow-sm' 
                      : 'border-gray-200 bg-white hover:border-[#0A6C4C] hover:shadow-md'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 text-[#0A6C4C]">
                      <CheckCircle2 size={20} fill="currentColor" className="text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3 mb-4 pr-6">
                    <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-white text-[#0A6C4C]' : 'bg-gray-50 text-gray-400 group-hover:text-[#0A6C4C]'}`}>
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate" title={dataset.name}>
                        {dataset.name}
                      </h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1 truncate">
                        <Clock size={10} />
                        Uploaded {formatDate(dataset.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{dataset.row_count.toLocaleString()} rows</span>
                      <span>{formatBytes(dataset.file_size_bytes)}</span>
                    </div>
                    
                    <button
                      onClick={(e) => handleDelete(e, dataset.id, dataset.name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete dataset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
