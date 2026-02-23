import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ status: 'Operational', timestamp: new Date().toISOString() })
}
