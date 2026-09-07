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
  const url = process.env.HQ_LINK_URL;
  const key = process.env.HQ_LINK_KEY;
  if (!url || !key) return false;

  // A fresh id per submission. HQ dedupes on this, which protects against a
  // retried DELIVERY of one enquiry — not against a person pressing submit
  // twice, which is two enquiries as far as anyone can tell from here.
  const externalId = globalThis.crypto.randomUUID();

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: [
          {
            type: 'lead.created',
            external_id: externalId,
            occurred_at: new Date().toISOString(),
            payload: {
              name: payload.name,
              email: payload.email,
              phone: payload.phone || undefined,
              service: payload.service || undefined,
              message: payload.message,
              source: 'n3xus.media contact form',
            },
          },
        ],
      }),
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) {
      console.error('[contact] HQ rejected the lead', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    // Includes the timeout. Log and carry on — the inbox path is unaffected.
    console.error('[contact] could not reach HQ', err);
    return false;
  }
}
