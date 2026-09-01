'use client';

import { useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import { serviceOptions } from '@/content/contact';
import { site } from '@/content/copy';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD =
  'mt-2 block w-full rounded-md border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/70 focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/30';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus('sending');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok) {
        setError(json?.error ?? `Something went wrong. Please email ${site.email} directly.`);
        setStatus('error');
        return;
      }

      setStatus('sent');
    } catch {
      setError(`We couldn't reach the server. Please email ${site.email} directly.`);
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-lg border border-line bg-mist/40 p-8" role="status">
        <h3 className="text-xl text-ink">Message sent.</h3>
        <p className="mt-3 leading-relaxed text-ink-muted">
          We’ll come back to you within one business day. If it’s urgent, book a call directly.
        </p>
        <Button asChild className="mt-6">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book a strategy call
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-lg border border-line p-6 sm:p-8">
      <h2 className="text-xl text-ink">Send a message</h2>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="_gotcha">Leave this field empty</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name <span className="text-danger">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email address <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={FIELD}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={FIELD} />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="service" className="text-sm font-medium text-ink">
            Service interest
          </label>
          <select id="service" name="service" defaultValue="" className={FIELD}>
            <option value="">Select a service…</option>
            {serviceOptions.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-ink">
            Message <span className="text-danger">*</span>
          </label>
          <textarea id="message" name="message" required rows={6} className={FIELD} />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-5 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger"
        >
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="mt-6 w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>

      <p className="mt-4 text-sm text-ink-muted">
        Prefer email? <a className="text-accent-ink underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </form>
  );
}
