"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
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
  return (
    <div className="glass-card-bright rounded-lg glow-green">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00FF41]/10">
        <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest">
          $NEURAL Token Split
        </span>
        <span className="font-mono text-[9px] text-[#00FF41]/30 ml-auto">
          Allocation Model
        </span>
      </div>

      <div className="flex items-center gap-6 px-4 py-4">
        <div className="w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: index === 0
                        ? "drop-shadow(0 0 8px rgba(0, 255, 65, 0.4))"
                        : "none",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2.5 h-2.5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-mono text-xs text-[#00FF41]/70">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 rounded-full bg-[#00FF41]/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 6px ${item.color}60`,
                    }}
                  />
                </div>
                <span className="font-mono text-xs text-[#00FF41] font-bold tabular-nums w-8 text-right">
                  {item.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
