import { NextResponse } from 'next/server';
import { z } from 'zod';
import { clientIp, rateLimit } from '@/server/rateLimit';
import { requestAudit, verifyTurnstile } from '@/server/audit';
import { checkAuditUrl } from '@/lib/auditUrl';
import { newAuditToken } from '@/lib/auditContract';
import { site } from '@/content/copy';

export const runtime = 'nodejs';

const schema = z.object({
  url: z.string().max(2048),
  turnstileToken: z.string().max(4096).optional(),
  /** Honeypot, as on the contact form: checked after parsing, never validated. */
  _gotcha: z.string().optional(),
});

/**
 * Start a free website audit.
 *
 * Order matters: the cheap checks (rate limit, shape, address) run before the
 * Turnstile round-trip, and Turnstile runs before anything reaches HQ. HQ adds
 * its own guards — a same-site audit in the last week is reused, a daily AI
 * budget caps the write-ups — so this route is the first fence, not the only.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`audit:${ip}`, { limit: 3, windowMs: 10 * 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'You’ve started a few audits already. Please try again in a few minutes.' },
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
    return NextResponse.json({ ok: false, error: 'Enter your website address.' }, { status: 400 });
  }

  const checked = checkAuditUrl(parsed.data.url);
  if (!checked.ok) {
    return NextResponse.json({ ok: false, error: checked.message }, { status: 400 });
  }

  // A bot that fills the honeypot gets a token that leads nowhere, rather than
  // an error that teaches it which field to leave alone.
  if (parsed.data._gotcha) {
    return NextResponse.json({ ok: true, token: newAuditToken() });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
    return NextResponse.json(
      { ok: false, error: 'We couldn’t confirm you’re not a robot. Please refresh the page and try again.' },
      { status: 403 },
    );
  }

  const token = newAuditToken();
  if (!(await requestAudit(checked.url, token))) {
    return NextResponse.json(
      {
        ok: false,
        error: `The audit isn’t available right now. Email ${site.email} and we’ll run it for you.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, token });
}
