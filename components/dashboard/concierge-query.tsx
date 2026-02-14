"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export function ConciergeQuery() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isProcessing) return

    setIsProcessing(true)
    setResponse("")

    const fakeResponse = `[Senti-001]: Processing query "${query.trim()}"... Sovereign Genesis protocol engaged. Neural overlay analysis indicates nominal parameters across all monitored vectors. Current build status: 84.1% complete. All redaction guards active.`

    let i = 0
    const interval = setInterval(() => {
      setResponse(fakeResponse.slice(0, i + 1))
      i++
      if (i >= fakeResponse.length) {
        clearInterval(interval)
        setIsProcessing(false)
      }
    }, 20)

    setQuery("")
  }

  return (
    <div className="glass-card-bright rounded-lg glow-green">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00FF41]/10">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
        <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest">
          Senti-Concierge
        </span>
        <span className="font-mono text-[9px] text-[#00FF41]/30 ml-auto">
          Agent Query Interface
        </span>
      </div>

      {response && (
        <div className="px-4 py-3 border-b border-[#00FF41]/10">
          <p className="font-mono text-[11px] text-[#00FF41]/80 leading-relaxed">
            {response}
            {isProcessing && (
              <span className="inline-block w-1.5 h-3 bg-[#00FF41]/70 ml-0.5 animate-[blink_1s_infinite]" />
            )}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3">
        <span className="text-[#00FF41]/30 font-mono text-sm">{">"}</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Senti-001 about the Sovereign Genesis..."
          className="flex-1 bg-transparent font-mono text-sm text-[#00FF41] placeholder:text-[#00FF41]/20 outline-none caret-[#00FF41]"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={!query.trim() || isProcessing}
          className="flex items-center justify-center w-8 h-8 rounded border border-[#00FF41]/20 text-[#00FF41]/40 hover:text-[#00FF41] hover:border-[#00FF41]/40 hover:bg-[#00FF41]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Send query"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  )
}
