"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"

interface BenchmarkMetrics {
    page_load: { avg: number; min: number; max: number }
    js_execution: { avg: number; min: number; max: number }
    dom_manipulation: { avg: number; min: number; max: number }
    memory_rss_mb: { avg: number; min: number; max: number }
}

interface BenchmarkVariant {
    label: string
    binary_size_mb: number
    security_flags: string[]
    metrics: BenchmarkMetrics
}

interface BenchmarkData {
    version: string
    build_date: string
    platform: string
    runs: number
    baseline: BenchmarkVariant
    hardened: BenchmarkVariant | null
}

export function BenchmarkPanel({ data }: { data: BenchmarkData }) {
    const b = data.baseline.metrics
    const h = data.hardened?.metrics

    const chartData = [
        {
            metric: "Page Load",
            unit: "ms",
            baseline: b.page_load.avg,
            hardened: h?.page_load.avg ?? 0,
        },
        {
            metric: "JS Exec",
            unit: "ms",
            baseline: b.js_execution.avg,
            hardened: h?.js_execution.avg ?? 0,
        },
        {
            metric: "DOM Ops",
            unit: "ms",
            baseline: b.dom_manipulation.avg,
            hardened: h?.dom_manipulation.avg ?? 0,
        },
        {
            metric: "Memory",
            unit: "MB",
            baseline: b.memory_rss_mb.avg,
            hardened: h?.memory_rss_mb.avg ?? 0,
        },
    ]

    const hasHardened = data.hardened !== null

    return (
        <div className="glass-card-bright rounded-lg p-6 glow-green col-span-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
                    <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest">
                        Build Performance — {data.version}
                    </span>
                </div>
                <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase">
                    {data.runs} runs · {data.build_date}
                </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <StatBlock
                    label="Binary Size"
                    value={`${data.baseline.binary_size_mb} MB`}
                    accent="#00FF41"
                />
                <StatBlock
                    label="Page Load (avg)"
                    value={`${b.page_load.avg} ms`}
                    accent="#00FF41"
                />
                <StatBlock
                    label="JS Execution (avg)"
                    value={`${b.js_execution.avg} ms`}
                    accent="#00FF41"
                />
                <StatBlock
                    label="Peak Memory"
                    value={`${b.memory_rss_mb.avg} MB`}
                    accent="#00FF41"
                />
            </div>

            {/* Chart */}
            <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barGap={4}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#00FF4110"
                        />
                        <XAxis
                            dataKey="metric"
                            stroke="#00FF4140"
                            fontSize={9}
                            fontFamily="var(--font-mono)"
                        />
                        <YAxis
                            stroke="#00FF4140"
                            fontSize={9}
                            fontFamily="var(--font-mono)"
                        />
                        <RechartsTooltip
                            contentStyle={{
                                backgroundColor: "#0A0A0A",
                                border: "1px solid #00FF4120",
                                borderRadius: "4px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                            }}
                            itemStyle={{ color: "#00FF41" }}
                            formatter={(value: number, name: string) => [
                                `${value}`,
                                name === "baseline"
                                    ? "Standard"
                                    : "Hardened (CFI+LTO)",
                            ]}
                        />
                        <Bar
                            dataKey="baseline"
                            fill="#00FF41"
                            radius={[2, 2, 0, 0]}
                            barSize={28}
                            name="baseline"
                        />
                        {hasHardened && (
                            <Bar
                                dataKey="hardened"
                                fill="#41CFFF"
                                radius={[2, 2, 0, 0]}
                                barSize={28}
                                name="hardened"
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend / Status */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#00FF41] rounded-sm" />
                        <span className="text-[8px] font-mono text-[#00FF41]/60 uppercase">
                            Standard Build
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#41CFFF] rounded-sm" />
                        <span className="text-[8px] font-mono text-[#41CFFF]/60 uppercase">
                            {hasHardened
                                ? "Hardened (CFI + ThinLTO)"
                                : "Hardened — Compiling..."}
                        </span>
                    </div>
                </div>
                {!hasHardened && (
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFB341] animate-pulse" />
                        <span className="font-mono text-[8px] text-[#FFB341]/60 uppercase">
                            Guardian Pipeline Active
                        </span>
                    </div>
                )}
                {hasHardened && (
                    <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[8px] text-[#00FF41]/40 uppercase">
                            Security: CFI · ThinLTO · V8 Sandbox
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

function StatBlock({
    label,
    value,
    accent,
}: {
    label: string
    value: string
    accent: string
}) {
    return (
        <div
            className="rounded-md p-2.5 border"
            style={{
                borderColor: `${accent}15`,
                background: `${accent}05`,
            }}
        >
            <span
                className="font-mono text-[8px] uppercase tracking-wider block mb-0.5"
                style={{ color: `${accent}60` }}
            >
                {label}
            </span>
            <span
                className="font-mono text-sm font-bold tabular-nums"
                style={{ color: accent }}
            >
                {value}
            </span>
        </div>
    )
}
