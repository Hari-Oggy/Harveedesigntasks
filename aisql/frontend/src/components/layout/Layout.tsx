import React, { useState, useCallback } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export type ActiveView = 'chat' | 'history' | 'dashboard' | 'upload'

interface LayoutProps {
  selectedDatasetId: string | null
  onSelectDataset: (id: string) => void
  onUploadClick: () => void
  onClearChat: () => void
  activeView: ActiveView
  onNavigate: (view: ActiveView) => void
  children: React.ReactNode
}

export function Layout({
  selectedDatasetId,
  onSelectDataset,
  onUploadClick,
  onClearChat,
  activeView,
  onNavigate,
  children,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth <= 768) {
      setMobileOpen((v) => !v)
    } else {
      setSidebarOpen((v) => !v)
    }
  }, [])

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-gray-900">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 transition-opacity"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A1C14] text-white shadow-xl transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${!sidebarOpen ? 'md:hidden' : 'md:flex'} flex-col`}
      >
        <Sidebar
          onSelectDataset={(id) => {
            onSelectDataset(id)
            closeMobile()
          }}
          selectedDatasetId={selectedDatasetId}
          onUploadClick={() => {
            onUploadClick()
            closeMobile()
          }}
          activeView={activeView}
          onNavigate={(view) => {
            onNavigate(view)
            closeMobile()
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          datasetId={selectedDatasetId}
          onToggleSidebar={toggleSidebar}
          onClearChat={onClearChat}
          onShowHistory={() => onNavigate('history')}
          activeView={activeView}
          onNavigate={onNavigate}
        />
        <main className="flex-1 relative overflow-hidden bg-gray-50 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}
