"use client"

import { useState } from "react"
import { MessageSquare, X, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function ChatConcierge() {
    const [isOpen, setIsOpen] = useState(false)

    // Native JotForm Agent Configuration
    const AGENT_URL = "https://agent.jotform.com/019c5149774973eba96df2610d62da643ca3" // Removing /voice to default to chat, user can toggle if needed

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 bg-primary text-primary-foreground border-2 border-primary/50"
                        aria-label="Open Senti-001 Concierge"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-[600px] p-0 mb-4 mr-4 border-border/50 bg-card shadow-2xl overflow-hidden rounded-xl" align="end">
                    <div className="flex flex-col h-full bg-black">
                        {/* Header */}
                        <div className="border-b border-border/20 bg-primary/10 p-3 flex justify-between items-center backdrop-blur-md absolute top-0 w-full z-10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 relative">
                                    <span className="font-mono text-xs font-bold text-primary">S1</span>
                                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-mono text-sm font-semibold text-foreground">Sovereign Concierge</h3>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Native Neural Uplink</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 hover:bg-primary/20 text-muted-foreground"
                                onClick={() => {
                                    const iframe = document.getElementById('senti-agent-frame') as HTMLIFrameElement;
                                    if (iframe) iframe.src = iframe.src;
                                }}
                                title="Reset Agent"
                            >
                                <RefreshCw className="h-3 w-3" />
                            </Button>
                        </div>

                        {/* Agent Iframe */}
                        <div className="flex-1 pt-[56px] bg-white">
                            <iframe
                                id="senti-agent-frame"
                                src={AGENT_URL}
                                className="w-full h-full border-0"
                                allow="microphone;"
                                title="Senti-001 Native Agent"
                            />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
