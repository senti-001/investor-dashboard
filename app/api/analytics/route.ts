import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
    const jsonDirectory = path.join(process.cwd(), 'data')
    const [analyticsRaw, benchmarksRaw] = await Promise.all([
        fs.readFile(path.join(jsonDirectory, 'analytics.json'), 'utf8'),
        fs.readFile(path.join(jsonDirectory, 'benchmarks.json'), 'utf8'),
    ])
    const analytics = JSON.parse(analyticsRaw)
    const benchmarks = JSON.parse(benchmarksRaw)
    return NextResponse.json({ ...analytics, benchmarks })
}
