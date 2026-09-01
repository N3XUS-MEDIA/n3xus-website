/**
 * Crude in-memory rate limit.
 *
 * Per-instance only: serverless means several instances, so a determined
 * caller gets roughly (limit × instances). It is a speed bump, not a wall —
 * enough to stop a stuck retry loop or a casual script, not enough to stop a
 * distributed abuser. Move to Vercel KV / Upstash when there's a reason to.
 */

interface Bucket {
  count: number;
  reset: number;
}

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (now > v.reset) buckets.delete(k);
  }

  if (bucket.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.reset - now) / 1000) };
  }

  return { ok: true, retryAfterSeconds: 0 };
}

/** Best-effort client IP from Vercel's forwarding headers. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
