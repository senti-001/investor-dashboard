"use client"

import { FileText, Download, ShieldCheck } from "lucide-react"
import { useAnalyticsData } from "@/hooks/use-analytics-data"

export function ReportsView() {
    const { data, loading } = useAnalyticsData()

    if (loading || !data) {
        return (
            <div className="glass-card rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 rounded-full border-2 border-[#00FF41]/20 border-t-[#00FF41] animate-spin mb-4" />
                <span className="font-mono text-[#00FF41]/40 uppercase text-[10px]">Accessing Secure Archive...</span>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.reports.map((report) => (
                    <div
                        key={report.id}
                        className="glass-card-bright rounded-lg p-4 flex flex-col glow-green group hover:border-[#00FF41]/40 transition-all cursor-pointer"
                        onClick={() => window.open(report.url, "_blank")}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2 rounded ${report.type === 'BLOG' ? 'bg-[#FF4141]/5 text-[#FF4141]' : 'bg-[#41CFFF]/5 text-[#41CFFF]'}`}>
                                <FileText className="w-4 h-4" />
                            </div>
                            <span className="font-mono text-[9px] text-[#00FF41]/40 uppercase tracking-widest">{report.id}</span>
                        </div>

                        <h3 className="font-mono text-xs text-[#00FF41] mb-1 font-bold">{report.name}</h3>
                        <p className="font-mono text-[10px] text-[#00FF41]/40 mb-4">{report.date}</p>

                        <div className="mt-auto flex items-center justify-center gap-2 py-2 rounded border border-[#00FF41]/10 bg-[#00FF41]/5 text-[#00FF41]/60 text-[10px] font-mono uppercase tracking-wider group-hover:bg-[#00FF41]/10 group-hover:text-[#00FF41] transition-all">
                            <Download className="w-3 h-3" />
                            View {report.type}
                        </div>
                    </div>
                ))}

                <div className="glass-card rounded-lg p-4 border border-dashed border-[#00FF41]/10 flex flex-col items-center justify-center text-center opacity-60">
                    <ShieldCheck className="w-6 h-6 text-[#00FF41]/20 mb-2" />
                    <p className="font-mono text-[9px] text-[#00FF41]/20 uppercase tracking-widest leading-relaxed">
                        Encrypted Audit<br />Pending State Check
                    </p>
                </div>
            </div>
        </div>
    )
}
