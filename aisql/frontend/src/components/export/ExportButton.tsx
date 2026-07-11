import { useState } from 'react'
import { Download, ChevronDown, Table, FileSpreadsheet } from 'lucide-react'
import { exportApi } from '../../services/api'
import toast from 'react-hot-toast'

interface ExportButtonProps {
  queryId: string
}

export function ExportButton({ queryId }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (type: 'excel' | 'csv') => {
    try {
      setIsExporting(true)
      setIsOpen(false)
      
      if (type === 'excel') {
        await exportApi.excel(queryId)
      } else {
        await exportApi.csv(queryId)
      }
      
      toast.success(`Exported ${type.toUpperCase()} successfully`)
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm disabled:opacity-50"
      >
        <Download size={14} />
        <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download'}</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-50 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => handleExport('csv')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Table size={14} className="text-gray-400" />
              CSV format
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <FileSpreadsheet size={14} className="text-gray-400" />
              Excel (.xlsx)
            </button>
          </div>
        </>
      )}
    </div>
  )
}
