"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from "recharts"
import { useAnalyticsData } from "@/hooks/use-analytics-data"

export function AnalyticsView() {
    const { data, loading } = useAnalyticsData()

    if (loading || !data) {
        return (
            <div className="glass-card rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 rounded-full border-2 border-[#00FF41]/20 border-t-[#00FF41] animate-spin mb-4" />
                <span className="font-mono text-[#00FF41]/40 uppercase text-[10px]">Syncing Historical Lattice...</span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
            {/* 1. Historical Yield Analysis */}
            <div className="glass-card-bright rounded-lg p-6 glow-green">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00FF41]" />
                        <span className="font-mono text-[10px] text-[#00FF41] uppercase tracking-widest">Industrial Yield ($NEURAL)</span>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data.historical_yield}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#00FF4110" />
                            <XAxis dataKey="date" stroke="#00FF4140" fontSize={9} fontFamily="var(--font-mono)" />
                            <YAxis stroke="#00FF4140" fontSize={9} fontFamily="var(--font-mono)" domain={['auto', 'auto']} />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #00FF4120', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px' }} itemStyle={{ color: '#00FF41' }} />
                            <Line type="monotone" dataKey="value" stroke="#00FF41" strokeWidth={2} dot={{ fill: '#00FF41', strokeWidth: 0, r: 3 }} activeDot={{ r: 5, strokeWidth: 0, fill: '#00FF41' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 2. Agent Latency: Neural vs Standard */}
            <div className="glass-card-bright rounded-lg p-6 glow-blue">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#41CFFF]" />
                        <span className="font-mono text-[10px] text-[#41CFFF] uppercase tracking-widest">Latency Matrix (Seconds)</span>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.agent_latency}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#41CFFF10" />
                            <XAxis dataKey="label" stroke="#41CFFF40" fontSize={9} fontFamily="var(--font-mono)" />
                            <YAxis stroke="#41CFFF40" fontSize={9} fontFamily="var(--font-mono)" />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #41CFFF20', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px' }} itemStyle={{ color: '#41CFFF' }} />
                            <Bar dataKey="neural" fill="#00FF41" radius={[2, 2, 0, 0]} barSize={20} />
                            <Bar dataKey="standard" fill="#41CFFF" radius={[2, 2, 0, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#00FF41] rounded-sm" /><span className="text-[8px] font-mono text-[#00FF41]/60 uppercase">Neural</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#41CFFF] rounded-sm" /><span className="text-[8px] font-mono text-[#41CFFF]/60 uppercase">Standard</span></div>
                </div>
            </div>

            {/* 3. VRAM Utilization Trend */}
            <div className="glass-card-bright rounded-lg p-6 glow-purple">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#B341FF]" />
                        <span className="font-mono text-[10px] text-[#B341FF] uppercase tracking-widest">Hardware Treasury Load (GB)</span>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data.vram_utilization}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#B341FF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#B341FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#B341FF10" />
                            <XAxis dataKey="hour" stroke="#B341FF40" fontSize={9} fontFamily="var(--font-mono)" />
                            <YAxis stroke="#B341FF40" fontSize={9} fontFamily="var(--font-mono)" />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #B341FF20', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px' }} itemStyle={{ color: '#B341FF' }} />
                            <Area type="monotone" dataKey="usage" stroke="#B341FF" fillOpacity={1} fill="url(#colorUsage)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Success Metrics */}
            <div className="glass-card-bright rounded-lg p-6 glow-orange">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFB341]" />
                        <span className="font-mono text-[10px] text-[#FFB341] uppercase tracking-widest">Mission Critical Integrity (%)</span>
                    </div>
                </div>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.success_metrics} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#FFB34110" horizontal={true} vertical={false} />
                            <XAxis type="number" stroke="#FFB34140" fontSize={9} fontFamily="var(--font-mono)" domain={[0, 100]} />
                            <YAxis dataKey="category" type="category" stroke="#FFB34140" fontSize={9} fontFamily="var(--font-mono)" width={60} />
                            <RechartsTooltip contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #FFB34120', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px' }} itemStyle={{ color: '#FFB341' }} />
                            <Bar dataKey="success" fill="#FFB341" radius={[0, 2, 2, 0]} barSize={15} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
