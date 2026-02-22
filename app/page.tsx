"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { HeroStats } from "@/components/dashboard/hero-stats"
import { IntelFeed } from "@/components/dashboard/intel-feed"
import { TokenChart } from "@/components/dashboard/token-chart"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { ReportsView } from "@/components/dashboard/reports-view"
import { TelemetryMonitor } from "@/components/dashboard/telemetry-monitor"

import { useHeartbeat } from "@/hooks/use-heartbeat"

export default function Page() {
  const [activeTab, setActiveTab] = useState("overview")
  const { blockNumber, latency, peers } = useHeartbeat()

  return (
    <main className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* ... (ambient effects) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00FF41]/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FF41]/[0.015] rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#00FF41 1px, transparent 1px), linear-gradient(90deg, #00FF41 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4 min-h-screen">
        <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1">
          {/* ... (tab content) */}
          {activeTab === "overview" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-500">
              <HeroStats />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-3">
                  <IntelFeed />
                </div>
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <TokenChart />
                  <TelemetryMonitor />
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <AnalyticsView />
            </div>
          )}

          {activeTab === "reports" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <ReportsView />
            </div>
          )}

          {activeTab === "docs" && (
            <div className="glass-card rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] border border-[#00FF41]/10 animate-in fade-in duration-500">
              <h2 className="font-mono text-[#00FF41] uppercase tracking-widest text-lg mb-2">
                Technical Documentation
              </h2>
              <p className="font-mono text-xs text-[#00FF41]/40 text-center max-w-xs mb-8">
                Access the Sovereign Genesis protocol, Project Mission, and Architectural Deep-Dives from official channels.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                <div
                  className="glass-card p-4 rounded border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all cursor-pointer"
                  onClick={() => window.open("https://www.reddit.com/r/OpenSourceeAI/comments/1qmxblj/project_share_neuralchromium_a_custom_chromium/", "_blank")}
                >
                  <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase block mb-1">NC-REDDIT</span>
                  <span className="font-mono text-xs text-[#00FF41]">Architecture Presentation</span>
                </div>
                <div
                  className="glass-card p-4 rounded border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all cursor-pointer"
                  onClick={() => window.open("https://form.typeform.com/to/sbdm0689", "_blank")}
                >
                  <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase block mb-1">SOVEREIGN-LINK</span>
                  <span className="font-mono text-xs text-[#00FF41]">Initialize Senti-001 Handshake</span>
                </div>
                <div
                  className="glass-card p-4 rounded border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all cursor-pointer"
                  onClick={() => window.open("https://neuralchromium.blogspot.com/", "_blank")}
                >
                  <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase block mb-1">NC-BLOGGER</span>
                  <span className="font-mono text-xs text-[#00FF41]">Neural Chromium Dev Blog</span>
                </div>
                <div
                  className="glass-card p-4 rounded border border-[#00FF41]/10 hover:border-[#00FF41]/30 transition-all cursor-pointer"
                  onClick={() => window.open("https://neuralchromium.com", "_blank")}
                >
                  <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase block mb-1">NC-MAIN</span>
                  <span className="font-mono text-xs text-[#00FF41]">neuralchromium.com Main Hub</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer bar */}
        <footer className="glass-card rounded-lg px-4 py-2.5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase tracking-wider">
              $NEURAL Sovereign Intelligence
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] text-[#00FF41]/20 tabular-nums">
              Block #{blockNumber.toLocaleString()}
            </span>
            <span className="font-mono text-[9px] text-[#00FF41]/20 tabular-nums">
              Latency: {Math.round(latency)}ms
            </span>
            <span className="font-mono text-[9px] text-[#00FF41]/20 tabular-nums">
              Peers: {peers.toLocaleString()}
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}

