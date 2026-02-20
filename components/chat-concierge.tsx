"use client"

import { useEffect } from "react"

export function ChatConcierge() {
    useEffect(() => {
        // Load Jotform Agent embed script
        const script = document.createElement("script")
        script.src =
            "https://cdn.jotfor.ms/agent/embedjs/019c5149774973eba96df2610d62da643ca3/embed.js?isVoice=1"
        script.async = true
        document.body.appendChild(script)

        return () => {
            // Clean up on unmount
            try {
                document.body.removeChild(script)
            } catch { }
        }
    }, [])

    return null // The Jotform script injects its own UI
}
