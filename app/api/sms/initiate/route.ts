import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new Twilio(accountSid, authToken);

export async function POST(req: Request) {
    try {
        const { to, context } = await req.json();

        let message = "This is Senti-001. Uplink confirmed. View the live dossier here: https://neural-chromium-design-ten.vercel.app/";

        if (context === 'build_status') {
            message = "Senti-001 | Status Report: Chromium Build (28.7% - Executing). Mission Integrity 1.0. Full Dossier: https://neural-chromium-design-ten.vercel.app/";
        }

        const result = await client.messages.create({
            body: message,
            from: '+18664773684',
            to: to
        });

        return NextResponse.json({ success: true, sid: result.sid });
    } catch (error) {
        console.error('SMS Initiation Failed:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
