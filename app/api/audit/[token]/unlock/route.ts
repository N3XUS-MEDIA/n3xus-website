import { NextResponse } from 'next/server';
import { z } from 'zod';
import { clientIp, rateLimit } from '@/server/rateLimit';
import { unlockAudit } from '@/server/audit';
import { AUDIT_TOKEN } from '@/lib/auditContract';
import { site } from '@/content/copy';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(1, 'Your name is required').max(200),
  email: z.string().trim().email('A valid email is required').max(320),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  /** Must be ticked. Recorded by HQ as the person's agreement. */
  consent: z.literal(true, { errorMap: () => ({ message: 'Please tick the box so we can send your report.' }) }),
  _gotcha: z.string().optional(),
});

/**
 * Unlock the full free report. The visitor's details go to HQ, where they
 * become a lead and a work order; the report is emailed once someone at N3XUS
 * has approved it. Nothing is promised here that HQ cannot keep.
 */
export async function POST(req: Request, ctx: { params: Promise<{ token: string }> }) {
  const limit = rateLimit(`audit-unlock:${clientIp(req)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: 'Too many submissions. Please wait a moment and try again.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  const { token } = await ctx.params;
  if (!AUDIT_TOKEN.test(token)) {
    return NextResponse.json({ ok: false, error: 'That report link isn’t valid.' }, { status: 404 });
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

  const { name, email, company, phone, _gotcha } = parsed.data;
  if (_gotcha) return NextResponse.json({ ok: true });

  const accepted = await unlockAudit({
    token,
    name,
    email,
    company: company || undefined,
    phone: phone || undefined,
  });
  if (!accepted) {
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn’t save your details just now. Email ${site.email} with your website address and we’ll send the report.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
