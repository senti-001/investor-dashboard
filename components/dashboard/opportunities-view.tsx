"use client"

import { Cpu, ShieldCheck, Zap, ArrowRight, Layers } from "lucide-react"

export function OpportunitiesView() {
    const tiers = [
        {
            id: "Tier 1",
            title: "Compute Sponsorship",
            subtitle: "Big Iron Scaling",
            icon: <Cpu className="h-5 w-5 text-[#00FF41]" />,
            proposal: "Sponsor the expansion of the 'Big Iron' node cluster.",
            advantage: "177 TPS Intelligence Yield | sub-16ms Vision Latency.",
            benefit: "Revenue share on all MCP vision traffic processed via sponsored hardware.",
            color: "border-[#00FF41]/20",
            tag: "COMPUTE-PROVIDER"
        },
        {
            id: "Tier 2",
            title: "Strategic Integration",
            subtitle: "Agentic Orchestrators",
            icon: <Layers className="h-5 w-5 text-[#00FF41]" />,
            proposal: "Default integration of the Glazyr MCP as the primary Vision Tool.",
            advantage: "99.9% Uptime. bypasses standard CDP-based anti-bot measures.",
            benefit: "Priority access to the sub-5ms Zero-Copy pipeline for partner agents.",
            color: "border-[#00FF41]/20",
            tag: "ORCHESTRATOR"
        },
        {
            id: "Tier 3",
            title: "Treasury Participation",
            subtitle: "Economic Sovereign",
            icon: <ShieldCheck className="h-5 w-5 text-[#00FF41]" />,
            proposal: "Participate in the USDC sponsorship pool for gasless onboarding.",
            advantage: "EIP-7702 Integration for seamless compute scaling.",
            benefit: "Governance over Rig-Ratio and future $NEURAL minting schedules.",
            color: "border-[#0066FF]/20",
            tag: "TREASURY-MANAGER"
        }
    ]

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col gap-6">
            <div className="glass-card p-8 rounded-lg border border-[#00FF41]/10">
                <h2 className="font-mono text-[#00FF41] uppercase tracking-widest text-xl mb-2">
                    Strategic Opportunities: Path B
                </h2>
                <p className="font-mono text-xs text-[#00FF41]/40 max-w-2xl">
                    Establish institutional partnerships with Magnetar Sentient to secure the vision layer of the synthetic economy.
                    Current Intelligence Yield: <span className="text-[#00FF41]">177 TPS</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {tiers.map((tier, idx) => (
                    <div key={idx} className={`glass-card p-6 rounded-lg border ${tier.color} flex flex-col gap-4 transition-all hover:bg-[#00FF41]/5`}>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-[9px] text-[#00FF41]/40 uppercase tracking-tighter">{tier.id}</span>
                            <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#00FF41]/20 text-[#00FF41]/60">{tier.tag}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded bg-[#00FF41]/10 border border-[#00FF41]/20">
                                {tier.icon}
                            </div>
                            <div>
                                <h3 className="font-mono text-sm text-[#00FF41] uppercase font-bold">{tier.title}</h3>
                                <p className="font-mono text-[10px] text-[#00FF41]/45">{tier.subtitle}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 my-2">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase font-bold">Proposal</span>
                                <p className="font-mono text-xs text-[#00FF41]/80 leading-relaxed">{tier.proposal}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase font-bold">Technical Moat</span>
                                <p className="font-mono text-xs text-[#00FF41]/80 leading-relaxed italic">{tier.advantage}</p>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-[#00FF41]/5 flex flex-col gap-4">
                            <div className="flex items-start gap-2">
                                <ArrowRight className="h-3 w-3 text-[#00FF41] mt-0.5 flex-shrink-0" />
                                <span className="font-mono text-[10px] text-[#00FF41]/60 leading-tight">{tier.benefit}</span>
                            </div>
                            <button className="w-full font-mono text-[10px] text-[#0A0A0A] bg-[#00FF41] uppercase tracking-widest py-2 rounded hover:brightness-110 transition-all font-bold">
                                Initiate Handshake
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card p-6 rounded-lg border border-[#00FF41]/10 bg-[#00FF41]/[0.02] flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-[#00FF41] uppercase font-bold">On-Chain Unit Economics</span>
                    <p className="font-mono text-[10px] text-[#00FF41]/50">
                        Delivering context at <span className="text-[#00FF41]">0.47x GPT-4o cost</span>. Vision ROI verified.
                    </p>
                </div>
                <div className="px-4 py-2 border border-[#00FF41]/20 rounded font-mono text-[10px] text-[#00FF41]/60">
                    NC-PARTNER-001 VALIDATED
                </div>
            </div>
        </div>
    )
}
