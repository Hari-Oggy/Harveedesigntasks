import {
  Menu,
  Database,
  Trash2,
  History,
  LayoutDashboard,
  MessageSquare,
} from 'lucide-react'
import { useDatasets } from '../../hooks/useDatasets'
import type { ActiveView } from './Layout'

interface HeaderProps {
  datasetId: string | null
  onToggleSidebar: () => void
  onClearChat: () => void
  onShowHistory: () => void
  activeView: ActiveView
  onNavigate: (view: ActiveView) => void
}

export function Header({
  datasetId,
  onToggleSidebar,
  onClearChat,
  onShowHistory,
  activeView,
  onNavigate,
}: HeaderProps) {
  const { data: datasets } = useDatasets()
  const dataset = datasets?.find((d) => d.id === datasetId)

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 shrink-0 z-40 justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Tab-style nav (desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'dashboard'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>
          <button
            onClick={() => onNavigate('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'chat'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <MessageSquare size={15} />
            Chat
          </button>
          <button
            onClick={onShowHistory}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'history'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <History size={15} />
            History
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {/* Active dataset badge */}
        {dataset && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-xs text-green-700 font-medium">
            <Database size={11} />
            {dataset.name}
            <span className="text-green-500">· {dataset.row_count.toLocaleString()} rows</span>
          </div>
        )}

        {/* Clear chat — only relevant on chat view */}
        {dataset && activeView === 'chat' && (
          <button
            onClick={onClearChat}
            title="Clear chat"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        )}
      </div>
    </header>
  )
}
