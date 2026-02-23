"use client"

import { useState, useEffect } from "react"

export interface BenchmarkMetrics {
    page_load: { avg: number; min: number; max: number }
    js_execution: { avg: number; min: number; max: number }
    dom_manipulation: { avg: number; min: number; max: number }
    memory_rss_mb: { avg: number; min: number; max: number }
}

export interface BenchmarkVariant {
    label: string
    binary_size_mb: number
    security_flags: string[]
    metrics: BenchmarkMetrics
}

export interface BenchmarkData {
    version: string
    build_date: string
    platform: string
    runs: number
    baseline: BenchmarkVariant
    hardened: BenchmarkVariant | null
}

export interface AnalyticsData {
    historical_yield: Array<{ date: string; value: number }>
    agent_latency: Array<{ label: string; glazyr: number; standard: number }>
    success_metrics: Array<{ category: string; success: number }>
    vram_utilization: Array<{ hour: string; usage: number }>
    reports: Array<{ id: string; name: string; date: string; type: string; url: string }>
    benchmarks: BenchmarkData
}

export function useAnalyticsData() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/analytics")
                if (!response.ok) {
                    throw new Error("Failed to fetch analytics data")
                }
                const result = await response.json()
                setData(result)
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Unknown error"))
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, loading, error }
}
