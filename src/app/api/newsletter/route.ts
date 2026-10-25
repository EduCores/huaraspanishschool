import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API key no configurada' }, { status: 500 });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, listIds: [1], senderId: 1 }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ success: false, error: text }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: 'Suscrito' });
  } catch (error) {
    console.error('[newsletter]', error);
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 });
  }
}
