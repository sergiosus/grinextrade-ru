import { NextResponse } from 'next/server';

const RECIPIENT = 'info@grinextrade.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequestBody = {
  source?: 'contact' | 'product';
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  country?: string;
  productName?: string;
  quantity?: string;
  message?: string;
  pageUrl?: string;
};

function validate(body: RequestBody): string | null {
  if (!body.companyName?.trim()) return 'Company name is required';
  if (!body.contactPerson?.trim()) return 'Contact person is required';
  if (!body.email?.trim()) return 'Email is required';
  if (!EMAIL_REGEX.test(body.email.trim())) return 'Invalid email';
  if (!body.country?.trim()) return 'Country is required';
  if (!body.message?.trim()) return 'Message is required';
  if (body.source && !['contact', 'product'].includes(body.source)) return 'Invalid source';
  return null;
}

function buildEmailText(body: RequestBody): string {
  const sourceLabel = body.source === 'contact' ? 'Contact page' : 'Product request';
  return [
    'Source form: ' + sourceLabel,
    'Company name: ' + (body.companyName ?? '—'),
    'Contact person: ' + (body.contactPerson ?? '—'),
    'Email: ' + (body.email ?? '—'),
    'Phone: ' + (body.phone ?? '—'),
    'Country: ' + (body.country ?? '—'),
    'Product: ' + (body.productName ?? '—'),
    'Quantity: ' + (body.quantity ?? '—'),
    'Message: ' + (body.message ?? '—'),
    'Page URL: ' + (body.pageUrl ?? '—'),
  ].join('\n');
}

function getSubject(source: RequestBody['source']): string {
  if (source === 'contact') return 'New Contact Request — GrinexTrade';
  return 'New Product Quote Request — GrinexTrade';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    const subject = getSubject(body.source ?? 'product');
    const text = buildEmailText(body);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // When Resend is not configured, return success so the form does not show a permanent error.
      // Set RESEND_API_KEY in production to send real emails to info@grinextrade.com.
      console.warn('[api/request] RESEND_API_KEY not set — email not sent. Subject:', subject);
      return NextResponse.json({ ok: true });
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
        subject,
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
    console.error('Request API error:', e);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
