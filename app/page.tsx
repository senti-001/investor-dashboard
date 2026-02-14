import { DashboardHeader } from "@/components/dashboard/header"
import { HeroStats } from "@/components/dashboard/hero-stats"
import { IntelFeed } from "@/components/dashboard/intel-feed"
import { ConciergeQuery } from "@/components/dashboard/concierge-query"
import { TokenChart } from "@/components/dashboard/token-chart"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient background effects */}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 flex flex-col gap-4">
        <DashboardHeader />

        <HeroStats />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <IntelFeed />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-4">
            <TokenChart />
            <ConciergeQuery />
          </div>
        </div>

        {/* Footer bar */}
        <footer className="glass-card rounded-lg px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-[#00FF41]/30 uppercase tracking-wider">
              Neural-Chromium Sovereign Cloud
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] text-[#00FF41]/20">
              Block #4,821,093
            </span>
            <span className="font-mono text-[9px] text-[#00FF41]/20">
              Latency: 12ms
            </span>
            <span className="font-mono text-[9px] text-[#00FF41]/20">
              Peers: 1,247
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
