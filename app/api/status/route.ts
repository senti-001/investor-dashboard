import { NextResponse } from 'next/server';

export async function GET() {
    // Hardcoded values reflecting the current heartbeat from Big Iron
    return NextResponse.json({
        status: '28.7%',
        integrity: '1.0',
        timestamp: new Date().toISOString(),
        node: 'Big Iron / EC2',
        mission: 'SOVEREIGN_CLOUD_GENESIS'
    });
}
