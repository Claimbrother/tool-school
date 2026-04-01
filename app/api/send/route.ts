import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// WICHTIG: Kein dotenv.config() hier! Next.js macht das automatisch.
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, type } = body;

    // VALIDIERUNG: Prüfen, ob der Key da ist
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "API Key fehlt in .env.local" }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Test-Absender von Resend
      to: ['claimbrother@gmail.com'],       // Deine Ziel-Adresse
      subject: `Kontaktformular: ${type}`,
                           // So kannst du direkt auf die Mail antworten
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nachricht:</strong> ${message}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}