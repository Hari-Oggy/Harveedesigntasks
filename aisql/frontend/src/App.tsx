import { useState, useCallback } from 'react'
import { Layout } from './components/layout/Layout'
import type { ActiveView } from './components/layout/Layout'
import { ChatInterface } from './components/chat/ChatInterface'
import { FileUpload } from './components/upload/FileUpload'
import { DatasetList } from './components/upload/DatasetList'
import { QueryHistory } from './components/history/QueryHistory'
import { Database, Sparkles, X, LayoutDashboard } from 'lucide-react'
import { useDatasets } from './hooks/useDatasets'

// ── Dashboard placeholder ────────────────────────────────────────────────────
function Dashboard({
  onNavigate,
  onUploadClick,
}: {
  onNavigate: (v: ActiveView) => void
  onUploadClick: () => void
}) {
  const { data: datasets = [] } = useDatasets()
  const ready = datasets.filter((d) => d.status === 'ready').length
  const processing = datasets.filter((d) => d.status === 'processing').length

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <LayoutDashboard size={22} className="text-green-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Overview of your AI SQL workspace</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Datasets', value: datasets.length, color: 'blue' },
            { label: 'Ready', value: ready, color: 'green' },
            { label: 'Processing', value: processing, color: 'yellow' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={onUploadClick}
            className="bg-[#0A6C4C] text-white rounded-xl p-6 text-left hover:bg-[#075239] transition-colors shadow-sm"
          >
            <div className="text-lg font-semibold mb-1">Upload Dataset</div>
            <div className="text-green-200 text-sm">Import a CSV or Excel file to start querying</div>
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:border-[#0A6C4C] hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">Chat & Query</div>
            <div className="text-gray-500 text-sm">Ask questions about your data in plain English</div>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="bg-white border border-gray-200 rounded-xl p-6 text-left hover:border-[#0A6C4C] hover:shadow-md transition-all"
          >
            <div className="text-lg font-semibold text-gray-900 mb-1">Query History</div>
            <div className="text-gray-500 text-sm">Browse and replay your previous queries</div>
          </button>
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-6 text-center flex flex-col items-center justify-center">
            <Sparkles size={24} className="text-gray-300 mb-2" />
            <div className="text-sm text-gray-400">More features coming soon</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>('dashboard')
  const [clearChatKey, setClearChatKey] = useState(0)

  const handleClearChat = useCallback(() => {
    setClearChatKey((k) => k + 1)
  }, [])

  const handleNavigate = useCallback((view: ActiveView) => {
    setActiveView(view)
  }, [])

  const renderMain = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onUploadClick={() => setShowUploadModal(true)}
          />
        )
      case 'history':
        return (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <QueryHistory />
            </div>
          </div>
        )
      case 'chat':
        return selectedDatasetId ? (
          <ChatInterface key={clearChatKey} datasetId={selectedDatasetId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50 h-full">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Database size={40} className="text-green-700" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">AI SQL Assistant</h1>
            <p className="text-base text-gray-500 max-w-md mb-8">
              Select a dataset from the sidebar or upload a new one to start asking questions.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-[#0A6C4C] text-white rounded-xl font-semibold hover:bg-[#075239] transition-colors shadow-md"
            >
              Upload a Dataset
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Layout
      selectedDatasetId={selectedDatasetId}
      onSelectDataset={setSelectedDatasetId}
      onUploadClick={() => setShowUploadModal(true)}
      onClearChat={handleClearChat}
      activeView={activeView}
      onNavigate={handleNavigate}
    >
      {renderMain()}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Manage Datasets</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
              <FileUpload
                onSuccess={(id) => {
                  setSelectedDatasetId(id)
                  setShowUploadModal(false)
                  setActiveView('chat')
                }}
              />
              <DatasetList
                selectedDatasetId={selectedDatasetId}
                onSelectDataset={(id: string) => {
                  setSelectedDatasetId(id)
                  setShowUploadModal(false)
                  setActiveView('chat')
                }}
                onUploadClick={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default App
