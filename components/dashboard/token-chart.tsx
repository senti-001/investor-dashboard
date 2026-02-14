"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartPie } from "lucide-react"
import { useDashData } from "@/hooks/use-dash-data"
import { useOnChainSync } from "@/hooks/use-on-chain-sync"

const INITIAL_DATA = [
  { name: "Treasury", value: 70, color: "#00FF41" },
  { name: "Growth", value: 20, color: "#00CC33" },
  { name: "Liquidity", value: 10, color: "#009926" },
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded px-3 py-2 border border-[#00FF41]/30">
        <p className="font-mono text-[11px] text-[#00FF41]">
          {payload[0].name}: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}


export function TokenChart() {
  const { data: dashData, loading } = useDashData()
  const { treasuryBalance } = useOnChainSync()

  if (loading || !dashData) {
    return (
      <div className="glass-card-bright rounded-lg p-6 h-[300px] animate-pulse glow-green" />
    )
  }

  const data = [
    { name: "Treasury", value: 70, color: "#00FF41", full: 100 },
    { name: "Burn", value: 20, color: "#00FF41", opacity: 0.6, full: 100 },
    { name: "Dev", value: 10, color: "#00FF41", opacity: 0.3, full: 100 },
  ]

  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="glass-card-bright rounded-lg p-6 flex flex-col glow-green">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] text-[#00FF41]/40 uppercase tracking-widest mb-1">
            $NEURAL Distribution
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-[#00FF41] tabular-nums">
              ${treasuryBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <div className="px-1.5 py-0.5 rounded-sm bg-[#00FF41]/10 border border-[#00FF41]/20">
              <span className="font-mono text-[8px] text-[#00FF41] uppercase tracking-tighter">On-Chain Verified</span>
            </div>
          </div>
        </div>
        <ChartPie className="w-5 h-5 text-[#00FF41]/40" />
      </div>

      <div className="flex items-center gap-8">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={55}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    fillOpacity={entry.opacity || 1}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[10px] text-[#00FF41]/40">100%</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#00FF41]/60">
                  {item.name}
                </span>
                <span className="font-mono text-[10px] text-[#00FF41]">
                  {item.value}%
                </span>
              </div>
              <div className="h-1 w-full bg-[#00FF41]/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00FF41] transition-all duration-1000"
                  style={{
                    width: `${item.value}%`,
                    opacity: item.opacity || 1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
