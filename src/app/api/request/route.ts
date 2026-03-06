import { NextResponse } from 'next/server';

const RECIPIENT = 'info@grinextrade.ru';
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
  const logPrefix = '[api/request]';
  try {
    const body = (await request.json()) as RequestBody;
    console.log(logPrefix, 'Incoming body (keys):', Object.keys(body || {}));
    console.log(logPrefix, 'Incoming body (sanitized):', {
      source: body?.source,
      companyName: body?.companyName ? '(set)' : '(missing)',
      contactPerson: body?.contactPerson ? '(set)' : '(missing)',
      email: body?.email ? '(set)' : '(missing)',
      country: body?.country ? '(set)' : '(missing)',
      message: body?.message ? '(set)' : '(missing)',
    });

    const validationError = validate(body);
    if (validationError) {
      console.log(logPrefix, 'Validation failed:', validationError);
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }
    console.log(logPrefix, 'Validation passed');

    const subject = getSubject(body.source ?? 'product');
    const text = buildEmailText(body);

    const apiKey = process.env.RESEND_API_KEY;
    const hasKey = Boolean(apiKey);
    console.log(logPrefix, 'RESEND_API_KEY present:', hasKey, '| RESEND_FROM set:', Boolean(process.env.RESEND_FROM));

    if (!apiKey) {
      console.warn(logPrefix, 'RESEND_API_KEY not set — email NOT sent. Subject:', subject, '| To:', RECIPIENT);
      return NextResponse.json({ ok: true });
    }

    const resendDefaultFrom = 'GrinexTrade <onboarding@resend.dev>';
    let from = process.env.RESEND_FROM ?? resendDefaultFrom;
    console.log(logPrefix, 'Sending via Resend — from:', from, 'to:', RECIPIENT, 'subject:', subject);

    const sendEmail = (fromAddress: string) =>
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromAddress,
          to: RECIPIENT,
          subject,
          text,
        }),
      });

    let res = await sendEmail(from);
    const resBody = await res.text();

    if (res.status === 403 && from !== resendDefaultFrom) {
      console.warn(logPrefix, 'Resend 403 (sender domain not verified). Retrying with Resend default sender.');
      res = await sendEmail(resendDefaultFrom);
      const retryBody = await res.text();
      if (!res.ok) {
        let errDetail: unknown = retryBody;
        try {
          errDetail = JSON.parse(retryBody);
        } catch {
          // keep as text
        }
        console.error(logPrefix, 'Resend API error after fallback — status:', res.status, 'body:', errDetail);
        return NextResponse.json(
          { error: 'Failed to send email' },
          { status: 502 }
        );
      }
      console.log(logPrefix, 'Email sent successfully (fallback sender). Resend response:', retryBody || '(empty)');
      return NextResponse.json({ ok: true });
    }

    if (!res.ok) {
      let errDetail: unknown = resBody;
      try {
        errDetail = JSON.parse(resBody);
      } catch {
        // keep as text
      }
      console.error(logPrefix, 'Resend API error — status:', res.status, 'body:', errDetail);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 502 }
      );
    }

    console.log(logPrefix, 'Email sent successfully. Resend response:', resBody || '(empty)');
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    console.error(logPrefix, 'Caught error:', err.message, 'stack:', err.stack);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
