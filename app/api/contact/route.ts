import { NextResponse } from 'next/server';
import { z } from 'zod';
import { clientIp, rateLimit } from '@/server/rateLimit';

export const runtime = 'nodejs';

const TO_EMAIL = 'info@n3xus.media';
const FROM_EMAIL = 'website@n3xus.media'; // must be a verified sender in Resend

/**
 * The endpoint the previous static site posted to, and which has been carrying
 * real enquiries. Kept as a fallback so the cutover cannot lose a lead.
 *
 * Order of preference:
 *   1. Resend, if RESEND_API_KEY is configured and the send succeeds.
 *   2. Formspree, if Resend is unconfigured or fails.
 *   3. A visible error telling the person to email directly.
 *
 * This exists because deleting assets/script.js removed the only path
 * enquiries had. Without it, deploying before the Resend key was set in Vercel
 * would have silently pointed the form at nothing.
 *
 * Once Resend is confirmed working in production, this can be deleted — but
 * there is no cost to leaving it, and it is the difference between a bad
 * afternoon and a lost month of leads.
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeenrqej';

async function sendViaFormspree(payload: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}): Promise<boolean> {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) console.error('[contact] formspree fallback rejected', res.status);
    return res.ok;
  } catch (err) {
    console.error('[contact] formspree fallback failed', err);
    return false;
  }
}

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
   * An enquiry must never be silently dropped.
   *
   * The version of this handler that shipped on the static site returned
   * `200 {ok:true}` with a console.warn when RESEND_API_KEY was unset — so
   * every enquiry vanished while the sender saw a success message. On a site
   * whose whole job is lead capture that is the worst available failure mode.
   *
   * Now: try Resend, fall back to the endpoint that has been carrying real
   * enquiries, and only then show a visible error with a direct email address.
   */
  const forward = { name, email, phone, service, message };

  const apiKey = process.env.RESEND_API_KEY;

  // No Resend key: try the endpoint that has been carrying enquiries until now
  // rather than dropping the lead. Only error if that fails too.
  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY not configured — using Formspree fallback');
    if (await sendViaFormspree(forward)) return NextResponse.json({ ok: true });

    console.error('[contact] no delivery path available — enquiry NOT delivered', { from: email });
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
        from: `N3XUS Website <${FROM_EMAIL}>`,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry — ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error('[contact] resend rejected the send', res.status, detail);
      if (await sendViaFormspree(forward)) return NextResponse.json({ ok: true });
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
    if (await sendViaFormspree(forward)) return NextResponse.json({ ok: true });
    return NextResponse.json(
      { ok: false, error: `We couldn't send that. Please email ${TO_EMAIL} directly.` },
      { status: 502 },
    );
  }
}
