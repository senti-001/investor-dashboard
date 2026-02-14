"use client"

import { useEffect, useState, useRef } from "react"
import { useDashData } from "@/hooks/use-dash-data"

function CircularProgress({ percentage }: { percentage: number }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(0, 255, 65, 0.08)"
          strokeWidth="4"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#00FF41"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: "drop-shadow(0 0 6px rgba(0, 255, 65, 0.5))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-2xl font-bold text-[#00FF41] glow-text">
          {percentage.toFixed(1)}%
        </span>
        <span className="font-mono text-[9px] text-[#00FF41]/50 uppercase tracking-wider mt-0.5">
          Complete
        </span>
      </div>
    </div>
  )
}

function BuildLogs({ liveLogs }: { liveLogs?: string[] }) {
  const defaultLogs = [
    "NC-BLD-001: Initializing sovereign mesh...",
    "NC-BLD-002: Deploying neural overlay v2.4...",
    "NC-BLD-003: Configuring tensor pipelines...",
    "NC-BLD-004: Verifying quantum state locks...",
    "NC-BLD-005: Compiling chromium bindings...",
    "NC-BLD-006: Establishing devnet handshake...",
    "NC-BLD-007: Compiling Neural Overlay...",
    "NC-BLD-008: Build checkpoint saved...",
  ]

  const logs = liveLogs && liveLogs.length > 0 ? liveLogs : defaultLogs

  const [visibleLogs, setVisibleLogs] = useState<string[]>([])
  const logIndex = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = [...prev, logs[logIndex.current % logs.length]]
        logIndex.current++
        return next.slice(-4)
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [logs])

  return (
    <div className="font-mono text-[10px] text-[#00FF41]/60 space-y-1 mt-3 min-h-[52px]">
      {visibleLogs.map((log, i) => (
        <div
          key={`${log}-${i}`}
          className="flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-1 duration-300"
        >
          <span className="text-[#00FF41]/30">{">"}</span>
          <span>{log}</span>
          {i === visibleLogs.length - 1 && (
            <span className="inline-block w-1.5 h-3 bg-[#00FF41]/70 animate-[blink_1s_infinite]" />
          )}
        </div>
      ))}
    </div>
  )
}

function YieldTicker({ liveYield }: { liveYield?: number }) {
  const [yield_, setYield_] = useState(liveYield || 8.41)
  const [displayValue, setDisplayValue] = useState(4521.09)

  useEffect(() => {
    if (liveYield) setYield_(liveYield)
  }, [liveYield])

  useEffect(() => {
    const interval = setInterval(() => {
      setYield_((prev) => {
        const delta = (Math.random() - 0.48) * 0.03
        return Math.max((liveYield || 7.5) - 1, Math.min((liveYield || 9.5) + 1, prev + delta))
      })
      setDisplayValue((prev) => {
        const delta = (Math.random() - 0.45) * 2.5
        return prev + delta
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [liveYield])

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-widest">
        $NEURAL Yield
      </span>
      <span className="font-mono text-3xl font-bold text-[#00FF41] glow-text tabular-nums">
        ${displayValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-xs text-[#00FF41]/80">
          +{yield_.toFixed(2)}% APY
        </span>
        <span className="font-mono text-[10px] text-[#00FF41]/40">(LIVE)</span>
      </div>
    </div>
  )
}

export function HeroStats() {
  const { data, loading } = useDashData()

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card-bright rounded-lg p-6 h-48 bg-[#00FF41]/5" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Rig-Ratio */}
      <div className="glass-card-bright rounded-lg p-6 flex flex-col items-center justify-center glow-green">
        <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-widest mb-2">
          Rig-Ratio
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-4xl font-bold text-[#00FF41] glow-text">
            {data.rig_ratio > 0 ? data.rig_ratio.toFixed(1) : "--"}
          </span>
          <span className="font-mono text-lg text-[#00FF41]/60">GB/1M</span>
        </div>

        <div className="w-full max-w-[120px] h-1.5 bg-[#00FF41]/5 rounded-full mt-4 overflow-hidden border border-[#00FF41]/10">
          <div
            className="h-full bg-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.5)] transition-all duration-1000"
            style={{ width: `${data.rig_ratio > 0 ? (data.rig_ratio / 150) * 100 : 0}%` }}
          />
        </div>
        <span className="font-mono text-[8px] text-[#00FF41]/30 uppercase mt-2">Utilization: {data.rig_ratio > 0 ? Math.round((data.rig_ratio / 150) * 100) : 0}%</span>
      </div>

      {/* Build Status */}
      <div className="glass-card-bright rounded-lg p-6 flex flex-col items-center glow-green">
        <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-widest mb-2">
          Build Status
        </span>
        <CircularProgress percentage={data.build_status} />
        <BuildLogs liveLogs={data.last_logs} />
      </div>

      {/* $NEURAL Yield */}
      <div className="glass-card-bright rounded-lg p-6 flex flex-col items-center justify-center glow-green">
        <YieldTicker liveYield={data.neural_yield} />
      </div>
    </div>
  )
}
