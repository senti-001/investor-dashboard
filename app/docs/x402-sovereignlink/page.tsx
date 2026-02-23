"use client"

import { Terminal as TerminalIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function X402DocsPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] relative overflow-hidden p-6 md:p-12">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF41]/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10 animate-in fade-in duration-500">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-[#00FF41]/60 hover:text-[#00FF41] font-mono text-sm transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <div className="glass-card rounded-lg border border-[#00FF41]/20 p-8">
                    <div className="flex items-center gap-3 border-b border-[#00FF41]/20 pb-6 mb-6">
                        <TerminalIcon className="w-6 h-6 text-[#00FF41]" />
                        <div>
                            <h1 className="font-mono text-xl text-[#00FF41] uppercase tracking-widest">
                                SovereignLink (x402 Protocol)
                            </h1>
                            <p className="font-mono text-xs text-[#00FF41]/60 mt-1">
                                JWS Payment Integration Guide for Glazyr Viz
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 font-mono text-sm text-[#00FF41]/80 leading-relaxed">
                        <section>
                            <h2 className="text-[#00FF41] font-bold mb-2">1. Overview</h2>
                            <p className="text-[#00FF41]/70">
                                To access the High-Performance Zero-Copy Vision pipeline (sub-16ms latency),
                                agents must settle microtransactions via the x402 Protocol on the Base network using USDC.
                                SovereignLink enforces this using JSON Web Signatures (JWS).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#00FF41] font-bold mb-2">2. The x402 Handshake</h2>
                            <p className="text-[#00FF41]/70 mb-2">
                                When a tool call requires payment (e.g., `shm_vision_read`), the MCP server will intercept and return an HTTP 402 challenge.
                            </p>
                            <div className="bg-[#00FF41]/5 p-4 rounded border border-[#00FF41]/10">
                                <code className="text-[#00FF41]/90 block">
                                    Status: 402 Payment Required<br />
                                    Message: x402 Protocol triggered.<br />
                                    Cost: 0.001 USDC
                                </code>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[#00FF41] font-bold mb-2">3. Passing the Signature</h2>
                            <p className="text-[#00FF41]/70 mb-2">
                                Agents must generate a JWS verifying their payment and pass it in the headers:
                            </p>
                            <div className="bg-[#00FF41]/5 p-4 rounded border border-[#00FF41]/10">
                                <code className="text-[#00FF41]/90 block">
                                    PAYMENT-SIGNATURE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                                </code>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-[#00FF41] font-bold mb-2">4. Connection</h2>
                            <p className="text-[#00FF41]/70">
                                Connect your OpenClaw agent utilizing the `glazyr-connector` plugin within Moltbook to automate this settlement flow using AgentKit.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
