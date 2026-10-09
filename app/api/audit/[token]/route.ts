import { NextResponse } from 'next/server';
import { fetchAudit } from '@/server/audit';
import { clientIp, rateLimit } from '@/server/rateLimit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The report page polls this while the audit runs. It forwards HQ's public
 * view and nothing else — HQ has already reduced it to what a stranger holding
 * the token may see.
 */
export async function GET(req: Request, ctx: { params: Promise<{ token: string }> }) {
  // Generous: the page polls every few seconds for a couple of minutes.
  const limit = rateLimit(`audit-poll:${clientIp(req)}`, { limit: 120, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: 'Too many requests.' }, { status: 429 });
  }

  const { token } = await ctx.params;
  const result = await fetchAudit(token);
  const headers = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };

  if (result.kind === 'not_found') {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404, headers });
  }
  if (result.kind === 'unavailable') {
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503, headers });
  }
  return NextResponse.json({ ok: true, audit: result.audit }, { headers });
}
