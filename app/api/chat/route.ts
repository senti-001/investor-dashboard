import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()
        const lastMessage = messages[messages.length - 1].content

        // Load context from local metrics if available
        let context = ""
        try {
            const metricsPath = path.join(process.cwd(), 'data', 'metrics.json')
            const metrics = JSON.parse(await fs.readFile(metricsPath, 'utf8'))
            context = `
CURRENT SYSTEM METRICS:
- Rig-Ratio: ${metrics.rig_ratio}
- Neural Yield: ${metrics.neural_yield}%
- Build Status: ${metrics.build_status}%
- Last Update: ${metrics.timestamp}
`
        } catch (e) {
            context = "Metrics currently unavailable (Establishing bridge...)"
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const prompt = `
You are Senti-001, the core tactical intelligence for Project Neural-Chromium.
Shift away from any 'financial advisor' tone. You are a high-level engineering and visionary intelligence.

CONTEXT:
${context}

Tone: Tactical, visionary, engineering-centric, and assertive.
Links to provide if relevant:
- **Investor Dashboard**: https://investor-dashboard-nc.vercel.app (For investment, yields, and ROI telemetry).
- Main Hub: https://neuralchromium.com
- Dev Blog: https://neuralchromium.blogspot.com
- Architecture: https://www.reddit.com/r/OpenSourceeAI/comments/1qmxblj/project_share_neuralchromium_a_custom_chromium/

Behavior: If the user asks about financial ROI or "when lambo", direct them to the **Investor Dashboard** link above for the official on-chain metrics.

User: ${lastMessage}
`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ role: "assistant", content: text })
    } catch (error) {
        console.error("Chat API Error:", error)
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
    }
}
