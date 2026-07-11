import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Database } from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { ChatMessageComponent } from './ChatMessage'

interface ChatInterfaceProps {
  datasetId: string
}

export function ChatInterface({ datasetId }: ChatInterfaceProps) {
  const [input, setInput] = useState('')
  const { messages, sendMessage, isLoading } = useChat(datasetId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const suggestions = [
    'Top 10 customers by revenue',
    'Which month generated highest sales?',
    'Show missing values',
    'Find duplicate records'
  ]

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative z-10 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-[#0A1C14] rounded-2xl flex items-center justify-center text-white shadow-xl mb-6">
              <Database size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hello, John! 👋</h2>
            <p className="text-gray-500 mb-8 text-lg">Ask anything about your data in natural language.</p>
            
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {suggestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setInput(q)}
                  className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#0A6C4C] hover:text-[#0A6C4C] hover:shadow-md transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessageComponent key={msg.id} message={msg} />
          ))
        )}

        {isLoading && (
          <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
              <Loader2 size={20} className="text-[#0A6C4C] animate-spin" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#0A6C4C]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#0A6C4C]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-[#0A6C4C]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500 font-medium ml-2">Analyzing data...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-gray-200 z-20">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-3 bg-gray-50 border border-gray-300 rounded-2xl p-2 sm:p-3 focus-within:border-[#0A6C4C] focus-within:ring-2 focus-within:ring-[#0A6C4C]/20 transition-all shadow-sm"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your data..."
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[44px] max-h-32 text-gray-900 placeholder:text-gray-400 py-2.5 px-2 custom-scrollbar text-[15px]"
              rows={input.split('\n').length > 1 ? Math.min(4, input.split('\n').length) : 1}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-[#0A6C4C] text-white flex items-center justify-center shrink-0 transition-all hover:bg-[#075239] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} className="ml-0.5" />
              )}
            </button>
          </form>
          <div className="mt-2 text-xs text-gray-400 text-center">
            Press <kbd className="font-sans px-1 py-0.5 bg-gray-100 border border-gray-200 rounded">Shift</kbd> + <kbd className="font-sans px-1 py-0.5 bg-gray-100 border border-gray-200 rounded">Enter</kbd> for new line
          </div>
        </div>
      </div>
    </div>
  )
}
