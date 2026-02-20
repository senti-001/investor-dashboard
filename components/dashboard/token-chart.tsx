"use client"

import { ChartPie } from "lucide-react"

const MILESTONES = [
  { name: "Chromium Fork", status: "complete", progress: 100 },
  { name: "Neural Overlay", status: "active", progress: 47 },
  { name: "$NEURAL Mint", status: "pending", progress: 0 },
  { name: "Mainnet Launch", status: "pending", progress: 0 },
]

function getStatusColor(status: string) {
  switch (status) {
    case "complete":
      return "bg-[#00FF41]"
    case "active":
      return "bg-[#00FF41] animate-pulse"
    case "pending":
      return "bg-[#00FF41]/20"
    default:
      return "bg-[#00FF41]/10"
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "complete":
      return "DONE"
    case "active":
      return "IN PROGRESS"
    case "pending":
      return "QUEUED"
    default:
      return "—"
  }
}

export function TokenChart() {
  const completedCount = MILESTONES.filter((m) => m.status === "complete").length
  const totalCount = MILESTONES.length
  const overallProgress = Math.round(
    MILESTONES.reduce((acc, m) => acc + m.progress, 0) / totalCount
  )

  return (
    <div className="glass-card-bright rounded-lg p-6 flex flex-col glow-green">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-widest mb-1">
            Mission Roadmap
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-[#00FF41] tabular-nums">
              {completedCount}/{totalCount} Phases
            </span>
            <div className="px-1.5 py-0.5 rounded-sm bg-[#00FF41]/10 border border-[#00FF41]/20">
              <span className="font-mono text-[8px] text-[#00FF41] uppercase tracking-tighter">
                {overallProgress}% Overall
              </span>
            </div>
          </div>
        </div>
        <ChartPie className="w-5 h-5 text-[#00FF41]/40" />
      </div>

      <div className="flex flex-col gap-3">
        {MILESTONES.map((milestone) => (
          <div key={milestone.name} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(milestone.status)}`} />
                <span className="font-mono text-[10px] text-[#00FF41]/60">
                  {milestone.name}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#00FF41]/40">
                {getStatusLabel(milestone.status)}
              </span>
            </div>
            <div className="h-1 w-full bg-[#00FF41]/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00FF41] transition-all duration-1000"
                style={{
                  width: `${milestone.progress}%`,
                  opacity: milestone.status === "pending" ? 0.15 : 1,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
