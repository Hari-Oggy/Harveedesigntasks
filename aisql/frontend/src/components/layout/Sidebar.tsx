import { useDatasets } from '../../hooks/useDatasets'
import {
  Upload,
  Database,
  History,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  ChevronRight,
} from 'lucide-react'

type ActiveView = 'chat' | 'history' | 'dashboard' | 'upload'

interface SidebarProps {
  onSelectDataset: (id: string) => void
  selectedDatasetId: string | null
  onUploadClick: () => void
  activeView: ActiveView
  onNavigate: (view: ActiveView) => void
}

export function Sidebar({
  onSelectDataset,
  selectedDatasetId,
  onUploadClick,
  activeView,
  onNavigate,
}: SidebarProps) {
  const { data: datasets = [], isLoading } = useDatasets()

  const mainLinks = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      view: 'dashboard' as ActiveView,
      onClick: () => onNavigate('dashboard'),
    },
    {
      icon: Upload,
      label: 'Upload Dataset',
      view: 'upload' as ActiveView,
      onClick: onUploadClick,
    },
    {
      icon: MessageSquare,
      label: 'Chat & Query',
      view: 'chat' as ActiveView,
      onClick: () => onNavigate('chat'),
    },
    {
      icon: History,
      label: 'Query History',
      view: 'history' as ActiveView,
      onClick: () => onNavigate('history'),
    },
  ]

  return (
    <div className="flex flex-col h-full overflow-hidden text-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 shrink-0">
        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
          <Database size={24} />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-lg text-white truncate leading-tight">AI SQL</div>
          <div className="text-green-300 text-xs">Assistant</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-1 custom-scrollbar">
        {mainLinks.map((link) => {
          const Icon = link.icon
          const isActive = activeView === link.view
          return (
            <button
              key={link.view}
              onClick={link.onClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left font-medium ${
                isActive
                  ? 'bg-green-500/20 text-white border border-green-500/30'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-green-400' : ''} />
              <span className="flex-1">{link.label}</span>
              {isActive && <ChevronRight size={14} className="text-green-400" />}
            </button>
          )
        })}

        {/* Datasets section */}
        <div className="mt-6 mb-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Datasets
          </div>
          {isLoading ? (
            <div className="text-gray-400 text-sm px-4">Loading...</div>
          ) : datasets.length === 0 ? (
            <div className="text-gray-400 text-sm px-4 italic">No datasets yet</div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {datasets.map((dataset) => (
                <button
                  key={dataset.id}
                  onClick={() => {
                    onSelectDataset(dataset.id)
                    onNavigate('chat')
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors w-full text-left ${
                    selectedDatasetId === dataset.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Database
                    size={14}
                    className={selectedDatasetId === dataset.id ? 'text-green-400 shrink-0' : 'text-gray-500 shrink-0'}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-medium truncate text-xs">{dataset.name}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      {dataset.row_count.toLocaleString()} rows ·{' '}
                      <span
                        className={
                          dataset.status === 'ready'
                            ? 'text-green-400'
                            : dataset.status === 'processing'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }
                      >
                        {dataset.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="shrink-0 p-4 border-t border-white/10 flex flex-col gap-2">
        {/* Active Dataset Card */}
        {selectedDatasetId && datasets.find((d) => d.id === selectedDatasetId) && (
          <div className="mb-2 bg-[#142A20] rounded-xl p-3 border border-white/5">
            <div className="text-[10px] text-gray-400 mb-0.5">Active dataset</div>
            <div className="font-semibold text-white text-xs truncate">
              {datasets.find((d) => d.id === selectedDatasetId)?.name}
            </div>
            <div className="text-[10px] text-green-400 mt-0.5">
              {datasets.find((d) => d.id === selectedDatasetId)?.row_count.toLocaleString()} rows
            </div>
          </div>
        )}

        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors w-full text-left font-medium text-gray-400 hover:text-red-400 hover:bg-white/5">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  )
}
