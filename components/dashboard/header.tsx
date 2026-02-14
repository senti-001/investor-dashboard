"use client"

import { useEffect, useState } from "react"

export function DashboardHeader() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="glass-card rounded-lg px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse-dot" />
          <span className="font-mono text-xs text-[#00FF41]/70 uppercase tracking-widest">
            Devnet Connected
          </span>
        </div>
        <div className="w-px h-4 bg-[#00FF41]/20" />
        <span className="font-mono text-xs text-[#00FF41]/40">
          {time} UTC
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-sans text-sm font-bold text-[#00FF41] tracking-wide">
          NEURAL-CHROMIUM
        </span>
        <div className="w-px h-4 bg-[#00FF41]/20" />
        <div className="flex items-center gap-2 glass-card rounded px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
          <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-wider">
            Senti-001
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-wider">
          Sovereign Genesis v2.4.1
        </span>
        <div className="w-px h-4 bg-[#00FF41]/20" />
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-[#00FF41]" />
          <div className="w-1 h-1 rounded-full bg-[#00FF41]" />
          <div className="w-1 h-1 rounded-full bg-[#00FF41]/40" />
        </div>
      </div>
    </header>
  )
}
