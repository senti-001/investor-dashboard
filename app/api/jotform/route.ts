import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const data: Record<string, any> = {}

        // Jotform sends data as form-data
        formData.forEach((value, key) => {
            // Look for specific dashboard fields or mapping
            if (key.includes('rig_ratio')) data.rig_ratio = parseFloat(value.toString())
            if (key.includes('neural_yield')) data.neural_yield = parseFloat(value.toString())
            if (key.includes('build_status')) data.build_status = parseFloat(value.toString())
            if (key.includes('log_entry')) data.new_log = value.toString()
        })

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ success: false, message: "No relevant fields found" }, { status: 400 })
        }

        const metricsPath = path.join(process.cwd(), 'data', 'metrics.json')
        const fileContents = await fs.readFile(metricsPath, 'utf8')
        const currentMetrics = JSON.parse(fileContents)

        // Update metrics
        if (data.rig_ratio !== undefined) currentMetrics.rig_ratio = data.rig_ratio
        if (data.neural_yield !== undefined) currentMetrics.neural_yield = data.neural_yield
        if (data.build_status !== undefined) currentMetrics.build_status = data.build_status
        if (data.new_log) {
            currentMetrics.last_logs = [data.new_log, ...currentMetrics.last_logs].slice(0, 10)
        }
        currentMetrics.timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16)

        await fs.writeFile(metricsPath, JSON.stringify(currentMetrics, null, 2))

        return NextResponse.json({ success: true, updated: data })
    } catch (error) {
        console.error("Jotform Ingestion Error:", error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
    }
}
