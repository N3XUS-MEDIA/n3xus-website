'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { HexMark } from '@/ui/brand/HexMark';
import { HexArtMark } from '@/ui/brand/HexArtMark';
import { site } from '@/content/copy';
import { ChatText, plainText } from '@/ui/aria/ChatText';

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
  /** Follow-up questions the knowledge base can answer. */
  suggestions?: string[];
  /** Offer the details form under this reply. */
  lead?: boolean;
}

const GREETING =
  'Hi, I’m Aria. Ask me anything about what we do or how it works, or just leave your details and someone from the team will get back to you.';

/** Opening questions, all answered from the knowledge base. */
const STARTERS = [
  'What do you do?',
  'How much does it cost?',
  'What is the Website OS?',
  'Do you build AI assistants?',
];

/** After this many answers, offer the details form even if nobody asked. */
const NUDGE_AFTER = 2;

type LeadState = 'closed' | 'open' | 'sending' | 'sent';

function Chips({
  items,
  onPick,
  disabled,
}: {
  items: string[];
  onPick: (q: string) => void;
  disabled: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Suggested questions">
      {items.map((q) => (
        <li key={q}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onPick(q)}
            className="min-h-[36px] rounded-md border border-line bg-paper px-3 py-1.5 text-left text-xs font-medium text-ink-muted transition-colors hover:border-accent-ink hover:text-ink disabled:opacity-50"
          >
            {q}
          </button>
        </li>
      ))}
    </ul>
  );
}

function LeadField({
  name,
  label,
  type = 'text',
  autoComplete,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        maxLength={320}
        placeholder={label}
        className="min-h-[40px] w-full rounded-md border border-line bg-paper px-3 text-sm text-ink placeholder:text-ink-muted focus:border-accent-ink focus:outline-none"
      />
    </label>
  );
}

export function Aria() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [leadState, setLeadState] = useState<LeadState>('closed');
  const [leadError, setLeadError] = useState<string | null>(null);
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
  }, [messages, sending, leadState]);

  async function send(preset?: string) {
    const text = (preset ?? draft).trim();
    if (!text || sending) return;

    const next: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    if (!preset) setDraft('');
    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Only role and content: suggestions and flags are UI state.
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })).slice(-20) }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.reply) {
        setError(data?.error ?? `Something went wrong. Email ${site.email} and we’ll pick it up.`);
        return;
      }
      const answered = next.filter((m) => m.role === 'user').length;
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : undefined,
          lead: Boolean(data.lead) || answered === NUDGE_AFTER,
        },
      ]);
    } catch {
      setError(`I can’t reach the server. Email ${site.email} and we’ll pick it up.`);
    } finally {
      setSending(false);
    }
  }

  /**
   * Sends the visitor's details through the same route as the contact form,
   * so a chat lead lands in the same inbox (and HQ) as every other enquiry.
   * The conversation goes with it, so nobody has to ask the same questions twice.
   */
  async function submitLead(form: HTMLFormElement) {
    const fd = new FormData(form);
    const need = String(fd.get('need') ?? '').trim();
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Visitor' : 'Aria'}: ${m.content}`)
      .join('\n');
    setLeadState('sending');
    setLeadError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          service: 'Website chat (Aria)',
          message: `${need || 'Asked to be contacted from the website chat.'}${transcript ? `\n\n— Chat so far —\n${transcript}` : ''}`.slice(0, 5000),
          _gotcha: String(fd.get('_gotcha') ?? ''),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setLeadState('open');
        setLeadError(data?.error ?? `That didn’t send. Email ${site.email} and we’ll pick it up.`);
        return;
      }
      setLeadState('sent');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Thanks${String(fd.get('name') ?? '').split(' ')[0] ? `, ${String(fd.get('name')).split(' ')[0]}` : ''}. Your details are with the team and someone will get back to you within a business day.`,
        },
      ]);
    } catch {
      setLeadState('open');
      setLeadError(`I can’t reach the server. Email ${site.email} and we’ll pick it up.`);
    }
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  const showLeadButton = leadState === 'closed' && Boolean(lastAssistant?.lead);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'fixed bottom-5 right-5 z-50 inline-flex items-center justify-center',
          // The mark itself, not a mark inside a disc.
          //
          // A carbon disc was tried first and reads as a dark blob on the light
          // theme: the artwork's ground and the disc are near the same value,
          // so the shape that identifies it disappears. The bare hexagon keeps
          // its silhouette on both themes, and it is what was asked for —
          // the hex is the thing that opens Aria.
          //
          // The disc carried the affordance, so it is replaced by a glow that
          // grows on hover, and by a focus ring that traces the hexagon.
          'rounded-md p-1 transition-transform duration-200 hover:scale-110',
          'drop-shadow-[0_0_14px_rgba(0,200,163,0.45)] hover:drop-shadow-[0_0_22px_rgba(0,200,163,0.75)]',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
          open && 'hidden',
        )}
      >
        <span className="sr-only">Ask Aria, the N3XUS assistant</span>
        <HexArtMark className="h-14" />
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
              {/* Drawn, not the artwork. At 20px the photographic texture is
                  mud; a stroked mark in accent stays legible. The artwork is
                  used where it is big enough to be seen. */}
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

          {/* min-h-0 lets this shrink below its content inside the flex column,
              so it scrolls itself. Without it, a long conversation outgrew the
              panel and focusing the details form scrolled the header away. */}
          <div ref={logRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            <p className="rounded-md bg-mist px-3 py-2 text-sm leading-relaxed text-ink-muted">
              {GREETING}
            </p>

            {messages.length === 0 ? (
              <Chips items={STARTERS} onPick={(q) => void send(q)} disabled={sending} />
            ) : null}

            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
                <p
                  className={cn(
                    'max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed',
                    m.role === 'user' ? 'ml-auto bg-accent/15 text-ink' : 'bg-mist text-ink',
                  )}
                >
                  {m.role === 'assistant' ? <ChatText text={m.content} /> : m.content}
                </p>
                {/* Suggestions only under the latest reply — older ones are stale. */}
                {m.suggestions && i === messages.length - 1 ? (
                  <Chips items={m.suggestions} onPick={(q) => void send(q)} disabled={sending} />
                ) : null}
              </div>
            ))}

            {showLeadButton ? (
              <button
                type="button"
                onClick={() => setLeadState('open')}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-accent px-3 text-sm font-medium text-carbon hover:bg-accent-deep"
              >
                Leave my details
                <span aria-hidden>→</span>
              </button>
            ) : null}

            {leadState === 'open' || leadState === 'sending' ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void submitLead(e.currentTarget);
                }}
                className="space-y-2 rounded-md border border-line bg-paper p-3"
                aria-label="Leave your details"
              >
                <p className="text-sm font-medium text-ink">Who should we get back to?</p>
                <LeadField name="name" label="Your name" autoComplete="name" required />
                <LeadField name="email" label="Email" type="email" autoComplete="email" required />
                <LeadField name="phone" label="Phone (optional)" type="tel" autoComplete="tel" />
                <label className="block">
                  <span className="sr-only">What do you need help with?</span>
                  <textarea
                    name="need"
                    rows={2}
                    maxLength={1500}
                    placeholder="What do you need help with? (optional)"
                    className="w-full resize-none rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent-ink focus:outline-none"
                  />
                </label>
                {/* Honeypot — hidden from people, filled in by bots. */}
                <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                {leadError ? (
                  <p role="alert" className="text-sm text-danger">
                    {leadError}
                  </p>
                ) : null}
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={leadState === 'sending'}
                    className="inline-flex min-h-[40px] items-center rounded-md bg-accent px-3 text-sm font-medium text-carbon hover:bg-accent-deep disabled:opacity-50"
                  >
                    {leadState === 'sending' ? 'Sending…' : 'Send'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeadState('closed')}
                    className="min-h-[40px] px-2 text-sm text-ink-muted hover:text-ink"
                  >
                    Not now
                  </button>
                </div>
                <p className="text-xs text-ink-muted">
                  We only use this to reply to you. Our conversation is included so you don’t have to repeat yourself.
                </p>
              </form>
            ) : null}

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
              {sending ? 'Aria is typing' : messages.at(-1)?.role === 'assistant' ? plainText(messages.at(-1)?.content ?? '') : ''}
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
            {leadState === 'closed' ? (
              <button
                type="button"
                onClick={() => setLeadState('open')}
                className="mt-2 text-xs font-medium text-accent-ink underline underline-offset-4 hover:no-underline"
              >
                Rather talk to a person? Leave your details
              </button>
            ) : null}
          </form>
        </div>
      ) : null}
    </>
  );
}
