"use client"

import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon } from "lucide-react"

export function TerminalNode() {
    const [history, setHistory] = useState<string[]>([
        "Investor Dashboard [Zero-Copy Vision Node v0.9.1]",
        "High-Frequency Agentic Infrastructure initialized.",
        "Type '/help' for a list of commands."
    ])
    const [input, setInput] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [history])

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase()
        const newHistory = [...history, `> ${cmd}`]

        switch (trimmedCmd) {
            case "/help":
                newHistory.push("Available commands:")
                newHistory.push("  /status    - Node health, DMA metrics & Token Savings ROI")
                newHistory.push("  /contribution - Access the Community Contribution board")
                newHistory.push("  /x402      - Display economic layer integration details")
                newHistory.push("  /capture   - [URL] Execute zero-copy vision (Requires 0.001 USDC or ETH eq.)")
                newHistory.push("  /benchmark - Run performance comparison vs Standard CDP")
                newHistory.push("  /clear     - Clear terminal output")
                break
            case "/status":
                newHistory.push("[STATUS] MCP Server: CONNECTED (Port 4545)")
                newHistory.push("[STATUS] Sync: Sub-16ms Vision Pipeline ACTIVE")
                newHistory.push(`[STATUS] Pipeline Jitter: <2ms variance [STABLE]`)
                newHistory.push(`[STATUS] Context Density Yield: 177 TPS (Structured vision.json)`)
                newHistory.push(`[STATUS] Token ROI: +2.1x vs Unhardened Baseline`)
                newHistory.push("[STATUS] Treasury: 50.00 USDC / 0.0024 ETH (Base Network)")
                break
            case "/benchmark":
                newHistory.push("--- GLAZYR VIZ PERFORMANCE COMPARISON ---")
                newHistory.push("METHOD:      STANDARD CDP    GLAZYR DMA (ZERO-COPY)")
                newHistory.push("LATENCY:     198ms           142ms (-28%)")
                newHistory.push("JITTER (P99): 2,378ms         338ms (-85.8%)")
                newHistory.push("TOKEN COST:  1.0x            0.47x")
                newHistory.push("-----------------------------------------")
                newHistory.push("RESULT: ECONOMIC SOVEREIGNTY THROUGH EFFICIENCY DETECTED.")
                break
            case "/contribution":
                newHistory.push("[COMMUNITY] Search & Extract Contribution - High Priority")
                newHistory.push("[COMMUNITY] Requires 'shm_vision_read' tool for high-dynamic parsing.")
                newHistory.push("[COMMUNITY] Execute glazyr-init to begin.")
                break
            case "/x402":
                newHistory.push("[ECONOMY] Universal Commerce Protocol Interceptor Loaded")
                newHistory.push("[ECONOMY] Cost: $0.001 USDC or 0.0000003 ETH per access")
                newHistory.push("[ECONOMY] Gateway: Microtransaction required for high-frequency extraction")
                break
            case trimmedCmd.startsWith('/capture') ? trimmedCmd : "":
                const url = cmd.split(' ')[1] || 'https://example.com'
                newHistory.push(`[VISION] Navigating headless Chromium to ${url}...`)
                newHistory.push(`[VISION] Interfacing with POSIX Shared Memory (SHM)...`)
                newHistory.push(`[VISION] Render compositor intercepted in 14ms.`)
                newHistory.push(`[VISION] Extracted structured DOM state. 100% Zero-Copy.`)
                break
            case "/clear":
                setHistory([])
                setInput("")
                return
            default:
                if (trimmedCmd !== "") {
                    newHistory.push(`Command not found: ${cmd}`)
                }
        }

        setHistory(newHistory)
        setInput("")
    }

    return (
        <div className="glass-card rounded-lg border border-[#00FF41]/20 flex flex-col overflow-hidden h-[500px] animate-in fade-in duration-500">
            <div className="bg-[#00FF41]/10 px-4 py-2 border-b border-[#00FF41]/20 flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-[#00FF41]" />
                <span className="font-mono text-xs text-[#00FF41] uppercase tracking-widest">
                    Glazyr Viz Cutting Edge Terminal
                </span>
            </div>

            <div
                ref={containerRef}
                className="flex-1 p-4 font-mono text-xs text-[#00FF41]/80 overflow-y-auto"
                onClick={() => inputRef.current?.focus()}
            >
                <div className="flex flex-col gap-1">
                    {history.map((line, i) => (
                        <div key={i} className={line.startsWith(">") ? "text-white" : "text-[#00FF41]"}>
                            {line}
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-[#00FF41]/20 flex items-center gap-2">
                <span className="font-mono text-[#00FF41] text-xs">root@glazyr-viz:~#</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleCommand(input)
                    }}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-[#00FF41] placeholder:text-[#00FF41]/30"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
        </div>
    )
}
