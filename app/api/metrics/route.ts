import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Configurable metrics endpoint (Supports local or remote GCP node)
        const METRICS_URL = process.env.MISSION_METRICS_URL || 'http://136.113.105.70:8000/metrics'

        const response = await fetch(METRICS_URL, {
            cache: 'no-store'
        })

        const text = await response.text()

        // Parse Prometheus text format into a clean JSON for the dashboard
        // This is a simplified parser for our specific mission metrics
        const metrics: any = {
            buildProgress: 0,
            diskUsage: 0,
            heartbeat: 0
        }

        const lines = text.split('\n')
        lines.forEach(line => {
            if (line.startsWith('mission_build_progress')) {
                metrics.buildProgress = parseFloat(line.split(' ')[1])
            }
            if (line.startsWith('mission_disk_usage')) {
                metrics.diskUsage = parseFloat(line.split(' ')[1])
            }
            if (line.startsWith('mission_agent_heartbeat')) {
                metrics.heartbeat = parseFloat(line.split(' ')[1])
            }
        })

        // Map to comprehensive DashboardData structure
        const responseData = {
            // New Scheme (TelemetryMonitor)
            buildProgress: metrics.buildProgress,
            diskUsage: metrics.diskUsage,
            heartbeat: metrics.heartbeat,

            // Legacy Scheme (HeroStats, useDashData)
            build_status: metrics.buildProgress,
            rig_ratio: metrics.diskUsage, // Mapping disk usage to rig ratio for viz
            neural_yield: 14.2, // Static for now
            timestamp: new Date().toISOString(),
            last_logs: [
                `[${new Date().toLocaleTimeString()}] NC-CORE: Heartbeat synced`,
                `[${new Date().toLocaleTimeString()}] NC-BLD: Progress at ${metrics.buildProgress}%`,
                `[${new Date().toLocaleTimeString()}] NC-DSK: Volume at ${metrics.diskUsage}%`
            ]
        }

        return NextResponse.json(responseData)
    } catch (error) {
        console.error('Metrics API Error:', error)
        // Fallback that satisfies BOTH contracts
        return NextResponse.json({
            status: 'Simulated (Remote Source Unavailable)',

            // New
            buildProgress: 42,
            diskUsage: 65,
            heartbeat: 1,

            // Legacy
            build_status: 42,
            rig_ratio: 65,
            neural_yield: 8.4,
            timestamp: new Date().toISOString(),
            last_logs: ["System recovering from metrics outage..."]
        }, { status: 200 })
    }
}
