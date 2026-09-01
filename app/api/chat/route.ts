import { NextResponse } from 'next/server';
import { z } from 'zod';
import { buildSystemPrompt } from '@/server/aria/systemPrompt';
import { clientIp, rateLimit } from '@/server/rateLimit';

export const runtime = 'nodejs';

/**
 * Pinned server-side. The browser does not get a vote.
 *
 * The static site's version of this endpoint forwarded the entire request body
 * verbatim to Anthropic with our API key, and set
 * Access-Control-Allow-Origin: *. Any origin could pick the model and
 * max_tokens and bill it to us.
 */
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 600;

const ALLOWED_ORIGINS = ['https://n3xus.media', 'https://www.n3xus.media'];

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(20),
});

function originAllowed(req: Request): boolean {
  const origin = req.headers.get('origin');
  // Same-origin fetches from some browsers omit Origin entirely; allow those.
  if (!origin) return true;
  if (process.env.NODE_ENV !== 'production' && origin.startsWith('http://localhost')) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const limit = rateLimit(`chat:${clientIp(req)}`, { limit: 10, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many messages. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Anything beyond `messages` — model, max_tokens, system — is dropped here.
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const totalChars = parsed.data.messages.reduce((n, m) => n + m.content.length, 0);
  if (totalChars > 20_000) {
    return NextResponse.json({ error: 'Conversation too long.' }, { status: 413 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Chat is unavailable right now. Email info@n3xus.media.' },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: buildSystemPrompt(),
        messages: parsed.data.messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      // Upstream errors can echo account context; log, don't forward.
      console.error('[chat] anthropic error', upstream.status, data?.error);
      return NextResponse.json(
        { error: 'Chat is unavailable right now. Email info@n3xus.media.' },
        { status: 502 },
      );
    }

    const text =
      Array.isArray(data?.content) && typeof data.content[0]?.text === 'string'
        ? data.content[0].text
        : null;

    if (!text) {
      return NextResponse.json({ error: 'No reply. Email info@n3xus.media.' }, { status: 502 });
    }

    // Return only the reply — the raw Anthropic envelope carries usage and
    // model metadata the page has no use for.
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error('[chat] request failed', err);
    return NextResponse.json(
      { error: 'Chat is unavailable right now. Email info@n3xus.media.' },
      { status: 502 },
    );
  }
}
