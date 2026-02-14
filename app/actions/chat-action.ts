"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "")
const snsClient = new SNSClient({ region: process.env.AWS_REGION || "us-east-1" })

const SYSTEM_PROMPT = `
You are Senti-001, the sovereign concierge for the Neural-Chromium project.
Your persona is professional, industrial, and highly technical. 
You provide intelligence on the Sovereign Genesis, $NEURAL heartbeat, and build status.
Current context:
- Build Status: 84.1%
- Project: Neural-Chromium
- Persona: Advanced Agentic AI
- Environment: Sovereign Cloud

Keep responses concise (max 2-3 sentences) and prefix with [Senti-001]:.
`

export async function submitConciergeQuery(query: string) {
    try {
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            throw new Error("Missing GOOGLE_GENERATIVE_AI_API_KEY")
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT
        })

        const result = await model.generateContent(query)
        const response = result.response.text()

        // SNS Bridge Integration
        const topicArn = process.env.AWS_SNS_TOPIC_ARN
        if (topicArn) {
            try {
                const publishCommand = new PublishCommand({
                    TopicArn: topicArn,
                    Message: JSON.stringify({
                        query,
                        response,
                        source: "investor-dashboard-concierge",
                        timestamp: new Date().toISOString()
                    }),
                    Subject: "Senti-Concierge Query Engagement"
                })
                await snsClient.send(publishCommand)
            } catch (snsError) {
                console.error("SNS Bridge Failure:", snsError)
                // We don't fail the query just because SNS failed
            }
        }

        return {
            success: true,
            response,
            timestamp: new Date().toISOString()
        }
    } catch (error) {
        console.error("Concierge Query Error:", error)
        return {
            success: false,
            response: "[Error]: Neural link interrupted. Genesis protocol fallback active.",
            timestamp: new Date().toISOString()
        }
    }
}
