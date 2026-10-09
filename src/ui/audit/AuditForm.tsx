'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/primitives/Button';
import { checkAuditUrl } from '@/lib/auditUrl';
import { trackAuditStarted } from '@/lib/track';
import { site } from '@/content/copy';
import { cn } from '@/lib/cn';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type Turnstile = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

/**
 * Cloudflare Turnstile, rendered explicitly so the token lands in React state.
 *
 * "Managed" mode: most visitors never see a challenge. Without a site key (local
 * development, preview deploys) nothing renders and the server skips the check
 * outside production — see verifyTurnstile.
 */
function useTurnstile(container: React.RefObject<HTMLDivElement | null>) {
  const [token, setToken] = useState<string | null>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !container.current) return;
    const el = container.current;
    let cancelled = false;

    const mount = () => {
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (!ts || cancelled || widget.current) return;
      widget.current = ts.render(el, {
        sitekey: SITE_KEY,
        theme: 'auto',
        action: 'website_audit',
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(null),
        'error-callback': () => setToken(null),
      });
    };

    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', mount);
    mount();

    return () => {
      cancelled = true;
      script?.removeEventListener('load', mount);
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (widget.current && ts) ts.remove(widget.current);
      widget.current = null;
    };
  }, [container]);

  const reset = () => {
    const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
    if (widget.current && ts) ts.reset(widget.current);
    setToken(null);
  };

  return { token, required: Boolean(SITE_KEY), reset };
}

export function AuditForm({ tone = 'paper', id = 'audit-url' }: { tone?: 'paper' | 'carbon'; id?: string }) {
  const router = useRouter();
  const captcha = useRef<HTMLDivElement>(null);
  const turnstile = useTurnstile(captcha);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const checked = checkAuditUrl(url);
    if (!checked.ok) {
      setError(checked.message);
      return;
    }
    if (turnstile.required && !turnstile.token) {
      setError('One moment — we’re checking you’re not a robot. Try again in a second.');
      return;
    }

    const gotcha = new FormData(e.currentTarget).get('_gotcha');
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: checked.url,
          turnstileToken: turnstile.token ?? undefined,
          _gotcha: typeof gotcha === 'string' && gotcha ? gotcha : undefined,
        }),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; token?: string; error?: string } | null;

      if (!res.ok || !json?.ok || !json.token) {
        setError(json?.error ?? `Something went wrong. Email ${site.email} and we’ll run the audit for you.`);
        turnstile.reset();
        setSending(false);
        return;
      }

      trackAuditStarted();
      router.push(`/audit/${json.token}`);
    } catch {
      setError(`We couldn’t reach the server. Email ${site.email} and we’ll run the audit for you.`);
      turnstile.reset();
      setSending(false);
    }
  }

  const onCarbon = tone === 'carbon';

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-2xl">
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-gotcha`}>Leave this field empty</label>
        <input id={`${id}-gotcha`} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor={id} className={cn('text-sm font-medium', onCarbon ? 'text-on-carbon' : 'text-ink')}>
        Your website address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={id}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="yourbusiness.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'block min-h-[52px] w-full min-w-0 flex-1 rounded-md border px-4 py-3 text-lg focus:outline-none focus:ring-2',
            onCarbon
              ? 'border-on-carbon/20 bg-carbon-light text-on-carbon placeholder:text-on-carbon/40 focus:border-accent focus:ring-accent/30'
              : 'border-line bg-paper text-ink placeholder:text-ink-muted/70 focus:border-accent-ink focus:ring-accent-ink/30',
          )}
        />
        <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
          {sending ? 'Starting…' : 'Run my free audit'}
        </Button>
      </div>

      <div ref={captcha} className={turnstile.required ? 'mt-3 min-h-[65px]' : 'hidden'} />

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn(
            'mt-3 rounded-md border p-3 text-sm',
            onCarbon ? 'border-danger/40 bg-danger/10 text-on-carbon' : 'border-danger/30 bg-danger/5 text-danger',
          )}
        >
          {error}
        </p>
      ) : null}

      <p className={cn('mt-3 text-sm', onCarbon ? 'text-on-carbon/60' : 'text-ink-muted')}>
        Free, and no email needed to see your score. We only read pages anyone can visit.
      </p>
    </form>
  );
}
