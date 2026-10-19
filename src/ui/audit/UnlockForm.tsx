'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/primitives/Button';
import { trackLead } from '@/lib/track';
import { readSource } from '@/lib/source';
import { site } from '@/content/copy';

const FIELD =
  'mt-2 block w-full rounded-md border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/70 focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/30';

/**
 * Name and email for the full free report.
 *
 * The copy promises only what HQ does: the details become a lead, someone at
 * N3XUS reviews the write-up, and the report is emailed when they approve it.
 * It does not promise a time, because a person is in the loop.
 */
export function UnlockForm({ token, onUnlocked }: { token: string; onUnlocked: () => void }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      company: String(form.get('company') ?? ''),
      phone: String(form.get('phone') ?? ''),
      consent: form.get('consent') === 'on',
      _gotcha: String(form.get('_gotcha') ?? '') || undefined,
    };
    if (!data.consent) {
      setError('Please tick the box so we can send your report.');
      return;
    }

    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/audit/${token}/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        setError(json?.error ?? `Something went wrong. Email ${site.email} and we’ll send the report.`);
        setSending(false);
        return;
      }
      // Only after HQ has the lead — a lead that failed to save is not a lead.
      trackLead(undefined, readSource()?.kind, 'website_audit');
      onUnlocked();
    } catch {
      setError(`We couldn’t reach the server. Email ${site.email} and we’ll send the report.`);
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border border-line bg-paper p-6 sm:p-8">
      <h2 className="text-2xl text-ink">Get the full report</h2>
      <p className="mt-3 leading-relaxed text-ink-muted">
        Every finding, what each one costs you in enquiries, how AI assistants answer when your customers ask, and
        the three things we’d fix first. A person at N3XUS checks it before it’s sent.
      </p>

      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="unlock-gotcha">Leave this field empty</label>
        <input id="unlock-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="unlock-name" className="text-sm font-medium text-ink">
            Your name <span className="text-danger">*</span>
          </label>
          <input id="unlock-name" name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>
        <div>
          <label htmlFor="unlock-email" className="text-sm font-medium text-ink">
            Work email <span className="text-danger">*</span>
          </label>
          <input id="unlock-email" name="email" type="email" required autoComplete="email" className={FIELD} />
        </div>
        <div>
          <label htmlFor="unlock-company" className="text-sm font-medium text-ink">
            Business name
          </label>
          <input id="unlock-company" name="company" type="text" autoComplete="organization" className={FIELD} />
        </div>
        <div>
          <label htmlFor="unlock-phone" className="text-sm font-medium text-ink">
            Phone / WhatsApp
          </label>
          <input id="unlock-phone" name="phone" type="tel" autoComplete="tel" className={FIELD} />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-ink-muted">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 flex-none rounded border-line accent-[rgb(var(--n3x-accent-ink))]"
        />
        <span>
          Email me the report, and N3XUS may contact me about it. We don’t add you to a mailing list. See our{' '}
          <Link href="/privacy" className="text-accent-ink underline underline-offset-4">
            privacy policy
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p role="alert" className="mt-5 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={sending} className="mt-6 w-full sm:w-auto">
        {sending ? 'Sending…' : 'Send me the full report'}
      </Button>
    </form>
  );
}
