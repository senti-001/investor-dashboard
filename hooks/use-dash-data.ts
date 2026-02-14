"use client"

import { useState, useEffect } from "react"

export interface DashboardData {
    rig_ratio: number
    neural_yield: number
    build_status: number
    timestamp: string
    last_logs: string[]
}

export function useDashData() {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/metrics")
                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard metrics")
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
        // Poll every 10 seconds for updates
        const interval = setInterval(fetchData, 10000)
        return () => clearInterval(interval)
    }, [])

    return { data, loading, error }
}
