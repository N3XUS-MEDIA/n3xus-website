import { NextResponse } from 'next/server';
import { z } from 'zod';
import { clientIp, rateLimit } from '@/server/rateLimit';

export const runtime = 'nodejs';

const TO_EMAIL = 'info@n3xus.media';
const FROM_EMAIL = 'website@n3xus.media'; // must be a verified sender in Resend

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(320),
  phone: z.string().trim().max(60).optional().or(z.literal('')),
  service: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(1, 'Message is required').max(5000),
  /**
   * Honeypot. Real people leave it empty; bots fill everything in.
   *
   * Deliberately unconstrained: validating it here would reject the bot with a
   * 400 naming the field, which teaches the next attempt to omit it. It is
   * checked after parsing so a tripped honeypot gets a plain 200 instead.
   */
  _gotcha: z.string().optional(),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  const limit = rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Malformed request.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  const { name, email, phone, service, message, _gotcha } = parsed.data;

  // Honeypot tripped: accept and discard, so the bot sees success and doesn't
  // retry with a different shape.
  if (_gotcha) {
    return NextResponse.json({ ok: true });
  }

  /**
   * If the key is missing this MUST fail loudly.
   *
   * The version of this handler that shipped on the static site returned
   * `200 {ok:true}` with a console.warn when RESEND_API_KEY was unset — so
   * every enquiry would vanish while the sender saw a success message. On a
   * site whose whole job is lead capture that is the worst available failure
   * mode. A visible error at least lets someone email directly.
   */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not configured — enquiry NOT delivered', {
      from: email,
    });
    return NextResponse.json(
      {
        ok: false,
        error: `Our contact form is temporarily unavailable. Please email ${TO_EMAIL} directly.`,
      },
      { status: 503 },
    );
  }

  const html = `
    <h2>New enquiry from n3xus.media</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
    ${service ? `<p><strong>Service interest:</strong> ${escapeHtml(service)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `N3XUS Media Website <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] resend rejected the send', res.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error: `We couldn't send that. Please email ${TO_EMAIL} directly.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed', err);
    return NextResponse.json(
      { ok: false, error: `We couldn't send that. Please email ${TO_EMAIL} directly.` },
      { status: 502 },
    );
  }
}
