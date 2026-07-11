import { useState, useRef } from 'react'
import { UploadCloud, FileType, AlertCircle, X } from 'lucide-react'
import { datasetsApi } from '../../services/api'
import { useQueryClient } from '@tanstack/react-query'
import { datasetKeys } from '../../hooks/useDatasets'
import toast from 'react-hot-toast'

interface FileUploadProps {
  onSuccess?: (datasetId: string) => void
  onClose?: () => void
}

export function FileUpload({ onSuccess, onClose }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const validateFile = (file: File): boolean => {
    setError(null)
    
    // Check extension
    const validExtensions = ['.csv', '.xlsx', '.xls']
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    
    if (!validExtensions.includes(extension)) {
      setError(`Unsupported file type: ${extension}. Please upload CSV or Excel files.`)
      return false
    }
    
    // Check size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 50MB.`)
      return false
    }
    
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return
    
    try {
      setUploading(true)
      setError(null)
      setProgress(0)
      
      const response = await datasetsApi.upload(file, (percent) => {
        setProgress(percent)
      })
      
      toast.success('Dataset uploaded successfully!')
      
      // Invalidate datasets list
      queryClient.invalidateQueries({ queryKey: datasetKeys.all })
      
      if (onSuccess) {
        onSuccess(response.id)
      }
      
      setFile(null)
      setProgress(0)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setError(err.message || 'Failed to upload file. Please try again.')
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setFile(null)
    setError(null)
    setProgress(0)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Upload Your Dataset</h3>
          <p className="text-sm text-gray-500">Upload CSV or Excel files to get started</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div 
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center text-center ${
          dragActive ? 'border-[#0A6C4C] bg-[#0A6C4C]/5 scale-[0.99]' : 
          file ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-[#0A6C4C] hover:bg-gray-50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
          onChange={handleChange}
          disabled={uploading}
        />
        
        {file ? (
          <div className="flex flex-col items-center w-full max-w-md animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-white border border-gray-200 shadow-sm rounded-xl flex items-center justify-center text-[#0A6C4C] mb-4">
              <FileType size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1 w-full truncate px-4">{file.name}</h4>
            <p className="text-sm text-gray-500 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            
            {uploading ? (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 font-medium">Uploading...</span>
                  <span className="text-[#0A6C4C] font-bold">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#0A6C4C] to-[#10B981] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 px-4 py-2 bg-[#0A6C4C] text-white rounded-lg text-sm font-medium hover:bg-[#075239] transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
                  <UploadCloud size={16} />
                  Upload Data
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${dragActive ? 'bg-[#0A6C4C]/10 text-[#0A6C4C]' : 'bg-gray-100 text-gray-400'}`}>
              <UploadCloud size={32} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Drag & drop your file here</h4>
            <p className="text-sm text-gray-500 mb-6">or</p>
            <button
              onClick={() => inputRef.current?.click()}
              className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-[#0A6C4C] transition-all shadow-sm flex items-center gap-2"
            >
              Choose File
            </button>
            <div className="mt-6 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 inline-block">
              Supports: CSV, XLS, XLSX
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 items-start animate-in slide-in-from-top-2">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  )
}
