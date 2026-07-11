// =====================================================
// AI SQL Assistant — ChatInput Component
// =====================================================

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Send, Loader, Sparkles } from 'lucide-react'
import './chat.css'

interface ChatInputProps {
  onSend: (text: string, includeInsights: boolean) => void
  isLoading: boolean
  disabled?: boolean
}

const EXAMPLE_CHIPS = [
  'Show top 10 rows by highest value',
  'Count records grouped by category',
  'Find rows with missing values',
  'What is the average of numeric columns?',
  'Show duplicate rows',
  'Summarize dataset statistics',
]

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [text, setText] = useState('')
  const [includeInsights, setIncludeInsights] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const lineHeight = 24
    const maxHeight = lineHeight * 4 + 8
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
  }, [])

  useEffect(() => {
    adjustHeight()
  }, [text, adjustHeight])

  const handleSend = useCallback(() => {
    const trimmed = text.trim()
    if (!trimmed || isLoading || disabled) return
    onSend(trimmed, includeInsights)
    setText('')
    // Reset height after clearing
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    })
  }, [text, isLoading, disabled, onSend, includeInsights])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleChipClick = (chip: string) => {
    setText(chip)
    textareaRef.current?.focus()
  }

  const canSend = text.trim().length > 0 && !isLoading && !disabled

  return (
    <div className="chat-input-area">
      {/* Example chips */}
      <div className="chat-input-chips">
        {EXAMPLE_CHIPS.map((chip) => (
          <button
            key={chip}
            className="chat-input-chip"
            onClick={() => handleChipClick(chip)}
            disabled={isLoading || disabled}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="chat-input-box">
        <textarea
          ref={textareaRef}
          className="chat-input-textarea"
          placeholder="Ask anything about your data…  (Enter to send, Shift+Enter for new line)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading || disabled}
        />
        <button
          className="chat-send-btn"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>

      {/* Footer options */}
      <div className="chat-input-footer">
        <label className="chat-insights-toggle">
          <input
            type="checkbox"
            checked={includeInsights}
            onChange={(e) => setIncludeInsights(e.target.checked)}
            disabled={isLoading || disabled}
          />
          <Sparkles size={13} />
          Include AI insights
        </label>
        <span>
          {text.length > 0 && (
            <span style={{ color: text.length > 500 ? 'var(--color-warning)' : 'inherit' }}>
              {text.length} chars
            </span>
          )}
        </span>
      </div>
    </div>
  )
}
