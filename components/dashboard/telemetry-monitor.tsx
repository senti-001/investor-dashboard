"use client"

import { useState, useEffect } from "react"
import { useHeartbeat } from "@/hooks/use-heartbeat"
import { Progress } from "@/components/ui/progress"

export function TelemetryMonitor() {
    const { blockNumber } = useHeartbeat()
    const [metrics, setMetrics] = useState({
        buildProgress: 65,
        diskUsage: 65,
        heartbeat: 0
    })

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/metrics')
                if (!res.ok) throw new Error('Failed to fetch metrics')
                const data = await res.json()

                // Ensure numeric values to prevent render crashes
                setMetrics({
                    buildProgress: Number(data.buildProgress) || 0,
                    diskUsage: Number(data.diskUsage) || 0,
                    heartbeat: Number(data.heartbeat) || 0
                })
            } catch (err) {
                console.error("Failed to fetch Prometheus metrics", err)
                // Fallback to "Offline" state on error, don't crash
                setMetrics(prev => ({ ...prev, heartbeat: 0 }))
            }
        }

        fetchMetrics()
        const interval = setInterval(fetchMetrics, 5000) // Poll every 5 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="glass-card rounded-lg p-4 border border-[#00FF41]/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-[10px] text-[#00FF41]/60 uppercase tracking-widest">
                    Big Iron Telemetry [GCP-06]
                </h3>
                <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${metrics.heartbeat ? 'bg-[#00FF41] animate-pulse' : 'bg-red-500'}`} />
                    <span className="font-mono text-[9px] text-[#00FF41]">
                        {metrics.heartbeat ? 'ACTIVE' : 'OFFLINE'}
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px] text-[#00FF41]/40 uppercase">Disk Capacity</span>
                        <span className="font-mono text-[9px] text-[#00FF41]">{metrics.diskUsage}%</span>
                    </div>
                    <Progress value={metrics.diskUsage} className="h-1 bg-[#00FF41]/10" indicatorClassName="bg-[#00FF41]" />
                </div>

                <div>
                    <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px] text-[#00FF41]/40 uppercase">GClient Sync</span>
                        <span className="font-mono text-[9px] text-[#00FF41]">{metrics.buildProgress}%</span>
                    </div>
                    <Progress value={metrics.buildProgress} className="h-1 bg-[#00FF41]/10" indicatorClassName="bg-[#00FF41]" />
                </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#00FF41]/10">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-[8px] text-[#00FF41]/30 uppercase">Node ID</span>
                        <span className="font-mono text-[8px] text-[#00FF41]/60 tabular-nums">SENTI-BIG-IRON-GCP</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-mono text-[8px] text-[#00FF41]/30 uppercase">Session Hash</span>
                        <span className="font-mono text-[8px] text-[#00FF41]/60 tabular-nums truncate max-w-[120px]">
                            0x{blockNumber.toString(16).toUpperCase()}...{Math.random().toString(16).slice(2, 6).toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
