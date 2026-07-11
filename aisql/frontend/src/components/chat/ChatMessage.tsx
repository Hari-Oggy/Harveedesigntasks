import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Copy,
  Check,
  AlertTriangle,
  Clock,
  Bot,
  User,
  Download,
} from 'lucide-react'
import { ResultTable } from '../results/ResultTable'
import { exportApi } from '../../services/api'
import type { ChatMessage as ChatMessageType } from '../../types'
import toast from 'react-hot-toast'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessageComponent({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)

  const handleCopySQL = async () => {
    if (!message.sql) return
    await navigator.clipboard.writeText(message.sql)
    setCopied(true)
    toast.success('SQL copied!', { duration: 1500, icon: '📋' })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportCsv = () => {
    if (!message.results || !message.columns) return
    exportApi.clientCsv(message.results, message.columns, `query_results.csv`)
    toast.success('CSV downloaded!')
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end gap-4 animate-in slide-in-from-bottom-2 duration-300 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-end gap-1.5 max-w-[85%]">
          <div className="bg-[#0A6C4C] text-white px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-md">
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 font-medium mr-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#0A6C4C] flex items-center justify-center text-white shrink-0 shadow-sm">
          <User size={18} />
        </div>
      </div>
    )
  }

  // Assistant message
  return (
    <div className="flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300 w-full max-w-5xl mx-auto">
      <div className="w-10 h-10 rounded-xl bg-[#0A1C14] flex items-center justify-center text-white shrink-0 shadow-sm">
        <Bot size={22} />
      </div>

      <div className="flex flex-col gap-4 flex-1 min-w-0">
        {/* Text bubble */}
        {message.content && (
          <div className={`bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-5 shadow-sm ${message.error ? 'border-red-300 bg-red-50/50' : ''}`}>
            {message.error && (
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-700 text-sm mb-1">Query Error</div>
                  <p className="text-red-600/90 text-sm">{message.error}</p>
                </div>
              </div>
            )}
            <p className="text-gray-800 text-[15px] leading-relaxed">{message.content}</p>
          </div>
        )}

        {/* SQL Block */}
        {message.sql && (
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-[#1f2937]">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-900 text-gray-400 border-b border-gray-800">
              <span className="text-xs font-semibold tracking-wider">SQL</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleCopySQL() }}
                className="flex items-center gap-1.5 text-xs hover:text-white transition-colors py-1"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="max-h-[300px] overflow-auto custom-scrollbar">
              <SyntaxHighlighter
                language="sql"
                style={atomDark}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: 'transparent',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  padding: '16px',
                }}
              >
                {message.sql}
              </SyntaxHighlighter>
            </div>
            {/* Status bar */}
            <div className="flex justify-between items-center px-4 py-2.5 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 text-green-600 text-xs font-medium">
                <div className="bg-green-100 p-0.5 rounded-full"><Check size={12} /></div>
                Query validated
              </div>
              <div className="flex items-center gap-4 text-gray-500 text-xs">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.execution_time_ms !== undefined && (
                  <span>{message.execution_time_ms} ms</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {message.results && message.results.length > 0 && message.columns && (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Results — {message.results.length.toLocaleString()} row{message.results.length !== 1 ? 's' : ''}
              </h3>
              <button
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
              >
                <Download size={13} />
                CSV
              </button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <ResultTable
                columns={message.columns}
                rows={message.results}
                totalRows={message.row_count || message.results.length}
              />
            </div>
          </>
        )}

        {/* Insights (plain text, no broken component) */}
        {message.insights && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <div className="font-semibold mb-1">💡 AI Insights</div>
            <p className="leading-relaxed">{message.insights}</p>
          </div>
        )}
      </div>
    </div>
  )
}
