"use client"

import { useEffect, useState } from "react"
import { useHeartbeat } from "@/hooks/use-heartbeat"

export interface DashboardHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function DashboardHeader({ activeTab, onTabChange }: DashboardHeaderProps) {
  const [time, setTime] = useState("")
  const { status } = useHeartbeat()

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

  const tabs = ["Overview", "Analytics", "Reports", "Docs"]

  return (
    <header className="flex flex-col gap-4">
      <div className="glass-card rounded-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse-dot ${status === 'ONLINE' ? 'bg-[#00FF41]' : status === 'SYNCING' ? 'bg-[#FFB341]' : 'bg-[#FF4141]'
              }`} />
            <span className="font-mono text-xs text-[#00FF41]/70 uppercase tracking-widest">
              Devnet {status}
            </span>
          </div>
          <div className="w-px h-4 bg-[#00FF41]/20" />
          <span className="font-mono text-xs text-[#00FF41]/40">
            {time} UTC
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img src="/Untitled design (7).png" alt="$NEURAL Logo" className="w-6 h-6 object-contain" />
          <span className="font-sans text-sm font-bold text-[#00FF41] tracking-wide">
            $NEURAL INVESTOR
          </span>
          <div className="w-px h-4 bg-[#00FF41]/20" />
          <div className="flex items-center gap-2 glass-card rounded px-2.5 py-1">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'ONLINE' ? 'bg-[#00FF41]' : 'bg-[#00FF41]/40'}`} />
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
            <div className={`w-1 h-1 rounded-full ${status === 'ONLINE' ? 'bg-[#00FF41]' : 'bg-[#00FF41]/20'}`} />
          </div>
        </div>
      </div>

      <nav className="glass-card rounded-lg p-1 flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab.toLowerCase())}
            className={`flex-1 font-mono text-[10px] uppercase tracking-wider py-2 rounded transition-all ${activeTab === tab.toLowerCase()
              ? "bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/20 shadow-[0_0_10px_rgba(0,255,65,0.1)]"
              : "text-[#00FF41]/40 hover:text-[#00FF41]/60 hover:bg-[#00FF41]/5 border border-transparent"
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}
