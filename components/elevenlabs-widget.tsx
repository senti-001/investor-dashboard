"use client"

import { useEffect } from "react"

export function ElevenLabsWidget() {
    useEffect(() => {
        // Load ElevenLabs Conversational AI Widget
        const script = document.createElement("script")
        script.src = "https://elevenlabs.io/convai-widget/index.js"
        script.async = true
        script.type = "text/javascript"
        document.body.appendChild(script)

        // Inject the ElevenLabs custom element
        const widget = document.createElement("elevenlabs-convai")
        widget.setAttribute("agent-id", "agent_6101khj3773zesqrh2pwcsenxy59")
        document.body.appendChild(widget)

        return () => {
            // Clean up on unmount
            try {
                document.body.removeChild(script)
                document.body.removeChild(widget)
            } catch { }
        }
    }, [])

    return null
}
