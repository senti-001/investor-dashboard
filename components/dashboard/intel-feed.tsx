"use client"

import { useEffect, useState, useRef } from "react"

const INTEL_LOGS = [
  { id: "NC-INTEL-001", msg: "Intelligence Cascade: Daily Advancements initialized", type: "intelligence" },
  { id: "NC-OPS-020", msg: "Emergency Redaction: scrubbing exposed keys", type: "security" },
  { id: "SENTI-001", msg: "Infrastructure Heartbeat: VRAM Verified (40.0GB)", type: "system" },
  { id: "NC-TOKEN-001", msg: "$NEURAL Tokenomics: 70/20/10 split active", type: "token" },
  { id: "NC-WEB-DEV", msg: "feat: implement NC-WEB-DEV-001 technical specs", type: "build" },
  { id: "NC-EC2-NODE", msg: "EC2 Node: /dev/root 485G (58% util)", type: "system" },
  { id: "NC-GITHUB", msg: "Last 5 commits synced from master bridge", type: "github" },
  { id: "SENTI-AUTO", msg: "Agentic Lease framework: Autonomous Scheduling active", type: "intelligence" },
  { id: "NC-ZERO-COPY", msg: "Zero-Copy Vision architecture stabilized (sub-16ms)", type: "vision" },
  { id: "NC-SOL-PDA", msg: "Hardware Treasury PDA: Deployed on Solana Devnet", type: "token" },
]

function getTypeColor(type: string) {
  switch (type) {
    case "security":
      return "text-[#FF4141]"
    case "intelligence":
      return "text-[#41CFFF]"
    case "github":
      return "text-[#FFB341]"
    case "vision":
      return "text-[#B341FF]"
    case "system":
      return "text-[#00FF41]/60"
    case "token":
      return "text-[#00FF41] font-bold"
    default:
      return "text-[#00FF41]"
  }
}

function getTypePrefix(type: string) {
  switch (type) {
    case "security":
      return "!"
    case "audit":
      return "#"
    case "token":
      return "$"
    default:
      return ">"
  }
}

interface LogEntry {
  id: string
  msg: string
  type: string
  timestamp: string
  key: number
}

export function IntelFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logCounter = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with first 5 logs
    const initial = INTEL_LOGS.slice(0, 5).map((log, i) => ({
      ...log,
      timestamp: new Date(Date.now() - (5 - i) * 3000).toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      key: i,
    }))
    setLogs(initial)
    logCounter.current = 5

    const interval = setInterval(() => {
      const logItem = INTEL_LOGS[logCounter.current % INTEL_LOGS.length]
      const newLog: LogEntry = {
        ...logItem,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        key: logCounter.current,
      }
      logCounter.current++
      setLogs((prev) => [...prev.slice(-19), newLog])
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="glass-card-bright rounded-lg glow-green flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#00FF41]/10">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse-dot" />
          <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest">
            Intelligence Cycle
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase">
          Live Stream
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 max-h-[400px]"
      >
        {logs.map((log) => (
          <div
            key={log.key}
            className="flex items-start gap-2 font-mono text-[11px] animate-in fade-in slide-in-from-bottom-1 duration-300"
          >
            <span className="text-[#00FF41]/25 shrink-0 w-16">
              {log.timestamp}
            </span>
            <span className={`shrink-0 ${getTypeColor(log.type)}`}>
              {getTypePrefix(log.type)}
            </span>
            <span className="text-[#00FF41]/60 shrink-0 font-bold">
              [{log.id}]
            </span>
            <span className="text-[#00FF41]/80">{log.msg}</span>
          </div>
        ))}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[#00FF41]/30 font-mono text-[11px]">{">"}</span>
          <span className="inline-block w-1.5 h-3 bg-[#00FF41]/60 animate-[blink_1s_infinite]" />
        </div>
      </div>
    </div>
  )
}
