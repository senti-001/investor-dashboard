import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Fetch from local Prometheus Mission Exporter
        // In production, this would be an internal network IP or the Prometheus server itself
        const response = await fetch('http://localhost:8000/metrics', {
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

        return NextResponse.json(metrics)
    } catch (error) {
        console.error('Metrics API Error:', error)
        return NextResponse.json({
            error: 'Mission Exporter Offline',
            buildProgress: 65, // Fallback to last known manifest state
            diskUsage: 65,
            heartbeat: 0
        }, { status: 503 })
    }
}
