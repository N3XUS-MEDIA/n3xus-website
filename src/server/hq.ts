/**
 * Forward an enquiry to N3XUS HQ over the N3XUS Link connector.
 *
 * ── The one rule this file exists to respect ────────────────────────────────
 *
 * `app/api/contact/route.ts` is built so an enquiry can never be silently
 * dropped — Resend, then Formspree, then a visible error naming a real address.
 * That guarantee predates HQ and must survive it.
 *
 * So this function:
 *   - never throws, whatever happens;
 *   - never changes the response the enquirer sees;
 *   - is started BEFORE the email work and awaited after it, so on the happy
 *     path it overlaps the send and adds no measurable latency;
 *   - times out in 5 seconds.
 *
 * If HQ is down, the enquiry still reaches the inbox exactly as it does today.
 * If the inbox path fails, HQ has still recorded the lead. Two independent
 * paths, and neither can take the other down.
 *
 * Unset HQ_LINK_URL or HQ_LINK_KEY disables it silently — that is the correct
 * behaviour in preview deploys and in local development.
 */
export interface HqLeadPayload {
  name: string;
  email: string;
  phone?: string | undefined;
  service?: string | undefined;
  message: string;
}

export async function notifyHq(payload: HqLeadPayload): Promise<boolean> {
  // A fresh id per submission. HQ dedupes on this, which protects against a
  // retried DELIVERY of one enquiry — not against a person pressing submit
  // twice, which is two enquiries as far as anyone can tell from here.
  return postLinkEvent(
    {
      type: 'lead.created',
      external_id: globalThis.crypto.randomUUID(),
      payload: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || undefined,
        service: payload.service || undefined,
        message: payload.message,
        source: 'n3xus.media contact form',
      },
    },
    'contact',
  );
}

/** One N3XUS Link event, as HQ's /api/link/events accepts it. */
export interface LinkEvent {
  type: 'lead.created' | 'audit.requested' | 'audit.unlocked';
  external_id: string;
  payload: Record<string, unknown>;
}

/** Both connector settings, or null when HQ is not wired up here. */
export function hqLink(): { url: string; key: string } | null {
  const url = process.env.HQ_LINK_URL;
  const key = process.env.HQ_LINK_KEY;
  return url && key ? { url, key } : null;
}

/**
 * Send one event to HQ. Never throws; true only when HQ accepted it.
 *
 * Shared by the contact form and the website audit, so both inherit the same
 * timeout and the same refusal to let HQ's state leak into an exception.
 */
export async function postLinkEvent(event: LinkEvent, tag: string): Promise<boolean> {
  const link = hqLink();
  if (!link) return false;

  try {
    const res = await fetch(link.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${link.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [{ ...event, occurred_at: new Date().toISOString() }],
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) {
      console.error(`[${tag}] HQ rejected the event`, res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    // Includes the timeout. Log and carry on — callers decide what it means.
    console.error(`[${tag}] could not reach HQ`, err);
    return false;
  }
}
