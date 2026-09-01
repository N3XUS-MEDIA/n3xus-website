'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { HexMark } from '@/ui/brand/HexMark';
import { site } from '@/content/copy';

/**
 * Aria — the assistant, launched by the hex mark.
 *
 * Sends only `{messages}`. The route handler decides the model, the token
 * ceiling and the system prompt, and rejects anything else — see
 * app/api/chat/route.ts. The old static site let the browser choose all three,
 * which is how it became an open proxy to the Anthropic account.
 *
 * Keyboard and screen-reader behaviour is deliberate rather than inherited: a
 * floating panel that traps focus badly is worse than no panel, because it can
 * strand a keyboard user on a page they cannot leave.
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING =
  'Hi — I’m Aria. Ask me anything about how N3XUS works, what we do, or what something might cost. If I don’t know, I’ll say so.';

export function Aria() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  /**
   * Return focus to the launcher after closing — but only once React has
   * re-rendered it.
   *
   * The launcher is `hidden` while the panel is open, and a display:none
   * element cannot take focus. Calling .focus() inside the close handler
   * therefore did nothing at all, and a keyboard user pressing Escape was
   * silently dumped at the top of the document with no way back.
   */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !open) launcherRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Keep Tab inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, textarea, a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, sending]);

  async function send() {
    const text = draft.trim();
    if (!text || sending) return;

    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setDraft('');
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.reply) {
        setError(data?.error ?? `Something went wrong. Email ${site.email} and we’ll pick it up.`);
        return;
      }
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setError(`I can’t reach the server. Email ${site.email} and we’ll pick it up.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full',
          'bg-accent text-carbon shadow-lg transition-colors hover:bg-accent-deep',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink',
          open && 'hidden',
        )}
      >
        <span className="sr-only">Ask Aria, the N3XUS assistant</span>
        <HexMark className="size-7" />
      </button>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Ask Aria"
          className={cn(
            'fixed bottom-5 right-5 z-50 flex w-[min(24rem,calc(100vw-2.5rem))] flex-col',
            'max-h-[min(32rem,calc(100dvh-2.5rem))] overflow-hidden rounded-lg',
            'border border-line bg-paper shadow-2xl',
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line bg-carbon px-4 py-3">
            <span className="inline-flex items-center gap-2.5">
              <HexMark className="size-5 text-accent" />
              <span className="font-heading font-semibold text-on-carbon">Aria</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-md text-on-carbon/70 hover:bg-on-carbon/10 hover:text-on-carbon"
            >
              <span className="sr-only">Close</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-5"
                aria-hidden
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={logRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            <p className="rounded-md bg-mist px-3 py-2 text-sm leading-relaxed text-ink-muted">
              {GREETING}
            </p>

            {messages.map((m, i) => (
              <p
                key={i}
                className={cn(
                  'max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'ml-auto bg-accent/15 text-ink'
                    : 'bg-mist text-ink',
                )}
              >
                {m.content}
              </p>
            ))}

            {sending ? (
              <p className="text-sm text-ink-muted" aria-hidden>
                Typing…
              </p>
            ) : null}

            {error ? (
              <p role="alert" className="rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">
                {error}
              </p>
            ) : null}

            {/* Replies are announced here rather than by making the whole log a
                live region, which would re-read the conversation on every turn. */}
            <p className="sr-only" aria-live="polite">
              {sending ? 'Aria is typing' : messages.at(-1)?.role === 'assistant' ? messages.at(-1)?.content : ''}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="border-t border-line p-3"
          >
            <label htmlFor="aria-input" className="sr-only">
              Your message
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="aria-input"
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter sends, Shift+Enter breaks the line.
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder="Ask a question…"
                className="max-h-28 min-h-[44px] flex-1 resize-none rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent-ink focus:outline-none focus:ring-2 focus:ring-accent-ink/30"
              />
              <button
                type="submit"
                disabled={sending || !draft.trim()}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-accent text-carbon transition-colors hover:bg-accent-deep disabled:pointer-events-none disabled:opacity-40"
              >
                <span className="sr-only">Send</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
