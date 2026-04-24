import { NextResponse } from 'next/server';
import { COMPANY } from '@/lib/company';

const RECIPIENT = COMPANY.contacts.email;
const SUBJECT = `New Quote Request — ${COMPANY.brand}`;

type QuoteBody = {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  country?: string;
  productName?: string;
  quantity?: string;
  message?: string;
  source?: string;
};

function buildEmailText(body: QuoteBody): string {
  return [
    'Company name: ' + (body.companyName ?? '—'),
    'Contact person: ' + (body.contactPerson ?? '—'),
    'Email: ' + (body.email ?? '—'),
    'Phone: ' + (body.phone ?? '—'),
    'Country: ' + (body.country ?? '—'),
    'Product name: ' + (body.productName ?? '—'),
    'Quantity: ' + (body.quantity ?? '—'),
    'Message: ' + (body.message ?? '—'),
    'Source: ' + (body.source ?? '—'),
  ].join('\n');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as QuoteBody;
    const text = buildEmailText(body);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not set; quote email not sent.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 503 }
      );
    }

    const from = process.env.RESEND_FROM ?? 'GrinexTrade <onboarding@resend.dev>';
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: RECIPIENT,
        subject: SUBJECT,
        text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend API error:', res.status, err);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('Quote API error:', e);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
