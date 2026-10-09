import { hqLink, postLinkEvent } from './hq';
import { AUDIT_TOKEN, PublicAuditSchema, type PublicAudit } from '@/lib/auditContract';

/**
 * The website's half of the free website audit.
 *
 * The audit itself runs in N3XUS HQ. This file only:
 *   - asks HQ to start one (`audit.requested`, keyed by a token we mint);
 *   - reads HQ's public view of it by that token;
 *   - passes on a visitor's details when they unlock the full report
 *     (`audit.unlocked`, which HQ turns into a lead and a work order).
 *
 * Nothing here is allowed to throw. Every function answers with a value the
 * API route can turn into a plain sentence for the visitor.
 */

/** Ask HQ to audit `url` under `token`. True only when HQ accepted it. */
export async function requestAudit(url: string, token: string): Promise<boolean> {
  return postLinkEvent({ type: 'audit.requested', external_id: token, payload: { url } }, 'audit');
}

export type AuditLookup =
  | { kind: 'ok'; audit: PublicAudit }
  | { kind: 'not_found' }
  | { kind: 'unavailable' };

/**
 * HQ's public view of one audit. The endpoint sits beside the Link events
 * endpoint, so its address is derived from HQ_LINK_URL rather than configured
 * separately — one less env var to get wrong.
 */
export async function fetchAudit(token: string): Promise<AuditLookup> {
  if (!AUDIT_TOKEN.test(token)) return { kind: 'not_found' };
  const link = hqLink();
  if (!link) return { kind: 'unavailable' };

  try {
    const res = await fetch(new URL(`/api/public/audits/${token}`, link.url), {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(5_000),
    });
    if (res.status === 404) return { kind: 'not_found' };
    if (!res.ok) return { kind: 'unavailable' };

    const parsed = PublicAuditSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.error('[audit] HQ returned a shape the website does not recognise', parsed.error.issues[0]);
      return { kind: 'unavailable' };
    }
    return { kind: 'ok', audit: parsed.data };
  } catch (err) {
    console.error('[audit] could not reach HQ', err);
    return { kind: 'unavailable' };
  }
}

export interface UnlockDetails {
  token: string;
  name: string;
  email: string;
  company?: string | undefined;
  phone?: string | undefined;
}

/** Pass the visitor's details to HQ. True only when HQ accepted them. */
export async function unlockAudit(details: UnlockDetails): Promise<boolean> {
  return postLinkEvent(
    {
      type: 'audit.unlocked',
      // One unlock per audit: a double-click or a retried request is the same
      // event, and HQ dedupes on this id.
      external_id: `unlock:${details.token}`,
      payload: {
        token: details.token,
        name: details.name,
        email: details.email,
        ...(details.company ? { company: details.company } : {}),
        ...(details.phone ? { phone: details.phone } : {}),
        consent: true,
      },
    },
    'audit',
  );
}

/**
 * Cloudflare Turnstile, checked server-side.
 *
 * Without a secret configured the check is skipped outside production, so the
 * form works in local development, and refused in production, so a missing
 * env var cannot quietly open a free crawler to the internet.
 */
export async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== 'production';
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== 'unknown') body.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(5_000),
    });
    const json = (await res.json().catch(() => null)) as { success?: boolean } | null;
    return json?.success === true;
  } catch (err) {
    console.error('[audit] turnstile verification failed', err);
    return false;
  }
}
