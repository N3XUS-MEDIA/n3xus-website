/**
 * /api/chat.js — Vercel Serverless Function
 * Proxies the Aria chat widget to the Anthropic Messages API.
 *
 * SECURITY NOTE: this endpoint spends real money against ANTHROPIC_API_KEY.
 * The model, token ceiling and system prompt are decided HERE, on the server.
 * Anything the browser sends beyond `messages` is ignored, not trusted — an
 * earlier version forwarded the entire request body verbatim, which let any
 * origin pick the model and max_tokens and bill it to us.
 */

const ALLOWED_ORIGINS = [
  'https://n3xus.media',
  'https://www.n3xus.media',
];

// Pinned server-side. The client does not get a vote on these.
const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 600;

// Guard rails on what we'll accept and forward.
const MAX_MESSAGES = 20;      // conversation turns kept
const MAX_CHARS_PER_MSG = 4000;
const MAX_TOTAL_CHARS = 20000;

const SYSTEM_PROMPT = `You are Aria, N3XUS Media's AI specialist. You are warm, knowledgeable and help clients grow their businesses through the Core3 framework.

N3XUS MEDIA: Full-service AI development and marketing agency combining AI Engineering (LLM apps, RAG systems, AI agents, custom AI software), Software Development (web apps, APIs, SaaS), and Marketing (TV, digital, SEO, Google Ads, Meta Ads, LLM Marketing/GEO). Serving clients worldwide. Email: info@n3xus.media | Book: https://link.n3xus.media/widget/bookings/jared-sinclair-calendar

Do not quote specific prices. If asked about cost, say pricing depends on the modules selected and point them to https://n3xus.media/pricing or a strategy call.

Keep replies concise (2-4 sentences). Guide toward booking a strategy call.`;

/* ── crude in-memory rate limit ──────────────────────────────────────────────
 * Per-instance only: serverless means several instances, so this is a speed
 * bump rather than a wall. It still bounds the damage from a single caller.
 * Move to Vercel KV / Upstash for a real limit across instances.
 */
const WINDOW_MS = 60 * 1000;
const MAX_REQ_PER_WINDOW = 10;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);

  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  if (rec.count > MAX_REQ_PER_WINDOW) return true;

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
  }
  return false;
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

/**
 * Accepts only [{role: 'user'|'assistant', content: string}].
 * Unknown fields on each message are dropped rather than forwarded.
 */
function sanitizeMessages(input) {
  if (!Array.isArray(input) || input.length === 0) return null;

  const trimmed = input.slice(-MAX_MESSAGES);
  const out = [];
  let total = 0;

  for (const m of trimmed) {
    if (!m || typeof m !== 'object') return null;
    if (m.role !== 'user' && m.role !== 'assistant') return null;
    if (typeof m.content !== 'string') return null;

    const content = m.content.slice(0, MAX_CHARS_PER_MSG);
    if (!content.trim()) continue;

    total += content.length;
    if (total > MAX_TOTAL_CHARS) return null;

    out.push({ role: m.role, content });
  }

  return out.length ? out : null;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // A browser request from an origin we don't serve has no business here.
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (rateLimited(clientIp(req))) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  let body = req.body;
  if (!body || typeof body !== 'object') {
    const raw = await new Promise((resolve) => {
      let d = '';
      req.on('data', (c) => {
        d += c;
        if (d.length > 100000) req.destroy(); // hard cap on payload size
      });
      req.on('end', () => resolve(d));
    });
    try {
      body = JSON.parse(raw);
    } catch {
      return res.status(400).json({ error: 'Could not parse request body' });
    }
  }

  // NOTE: body.model / body.max_tokens / body.system are deliberately ignored.
  // Older cached copies of assets/script.js still send them; silently dropping
  // them keeps those clients working instead of breaking chat on deploy.
  const messages = sanitizeMessages(body && body.messages);
  if (!messages) {
    return res.status(400).json({ error: 'Invalid request - missing or malformed messages' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[chat] ANTHROPIC_API_KEY is not configured');
    return res.status(500).json({ error: 'Chat is unavailable right now. Email info@n3xus.media' });
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
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      // Don't leak upstream error detail (it can echo account/key context).
      console.error('[chat] anthropic error', upstream.status, data && data.error);
      return res.status(502).json({ error: 'Chat is unavailable right now. Email info@n3xus.media' });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('[chat] request failed', err);
    return res.status(502).json({ error: 'Chat is unavailable right now. Email info@n3xus.media' });
  }
};

module.exports.config = {
  api: { bodyParser: true },
};
