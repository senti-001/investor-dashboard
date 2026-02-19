"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
    role: "user" | "assistant"
    content: string
}

export function ChatConcierge() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Greetings. Senti-001 online. How shall we synchronize today?" }
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMsg: Message = { role: "user", content: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMsg] }),
            })

            const data = await response.json()
            if (data.role === "assistant") {
                setMessages(prev => [...prev, data])
            }
        } catch (error) {
            console.error("Chat Error:", error)
            setMessages(prev => [...prev, { role: "assistant", content: "Error: Connection to Neural Mainnet interrupted." }])
        } finally {
            setIsLoading(false)
        }
    }

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
                <PopoverContent
                    className="w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] sm:h-[600px] p-0 mb-4 border-border/50 bg-black shadow-2xl overflow-hidden rounded-xl"
                    align="end"
                    sideOffset={8}
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="border-b border-[#00FF41]/20 bg-[#00FF41]/5 p-3 flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00FF41]/10 relative border border-[#00FF41]/30">
                                    <span className="font-mono text-xs font-bold text-[#00FF41]">S1</span>
                                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs font-semibold text-[#00FF41] uppercase tracking-wider">Sovereign Concierge</h3>
                                    <p className="text-[8px] text-[#00FF41]/40 uppercase tracking-widest">Protocol Version: 1.0.4</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
                            <div className="flex flex-col gap-4">
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col max-w-[85%] ${m.role === "user" ? "ml-auto items-end" : "items-start"}`}
                                    >
                                        <div
                                            className={`rounded-lg p-3 text-xs font-mono ${m.role === "user"
                                                ? "bg-[#00FF41]/10 text-white border border-[#00FF41]/20"
                                                : "bg-zinc-900 text-[#00FF41] border border-zinc-800"
                                                }`}
                                        >
                                            {m.content}
                                        </div>
                                        <span className="text-[8px] text-zinc-600 mt-1 uppercase tracking-tighter">
                                            {m.role === "assistant" ? "Senti-001" : "Authorized User"}
                                        </span>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] italic">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Processing Intelligence Pulse...
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Input Area */}
                        <div className="p-3 border-t border-[#00FF41]/10 bg-zinc-950">
                            <form
                                className="flex gap-2"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSend()
                                }}
                            >
                                <input
                                    className="flex-1 bg-black border border-[#00FF41]/20 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#00FF41]/50 placeholder:text-zinc-700"
                                    placeholder="Execute command..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 text-[#00FF41] hover:bg-[#00FF41]/10 border border-[#00FF41]/20"
                                    disabled={isLoading}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
