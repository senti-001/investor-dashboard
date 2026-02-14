"use client"

import { useState, useEffect } from "react"
import { Connection } from "@solana/web3.js"

export interface HeartbeatState {
    blockNumber: number
    latency: number
    peers: number
    status: 'ONLINE' | 'SYNCING' | 'OFFLINE'
}

const DEVNET_RPC = "https://api.devnet.solana.com"

export function useHeartbeat() {
    const [state, setState] = useState<HeartbeatState>({
        blockNumber: 0,
        latency: 0,
        peers: 0,
        status: 'SYNCING'
    })

    useEffect(() => {
        const connection = new Connection(DEVNET_RPC)

        const fetchHeartbeat = async () => {
            const start = Date.now()
            try {
                const slot = await connection.getSlot()
                const end = Date.now()

                setState({
                    blockNumber: slot,
                    latency: end - start,
                    peers: 1247, // Solana Devnet approximate peers (constant for now)
                    status: 'ONLINE'
                })
            } catch (error) {
                console.error("Heartbeat sync failure:", error)
                setState(prev => ({ ...prev, status: 'OFFLINE' }))
            }
        }

        fetchHeartbeat()
        const interval = setInterval(fetchHeartbeat, 5000)
        return () => clearInterval(interval)
    }, [])

    return state
}
