/**
 * Aria's knowledge base — answers questions without calling the model.
 *
 * ── Why ─────────────────────────────────────────────────────────────────────
 * Most questions a website assistant gets are the same twenty questions. Paying
 * an LLM to re-derive "what does it cost" from a system prompt, every time, is
 * spending money to reproduce an answer that is already written down and
 * already approved.
 *
 * So: match first, generate second. A confident match returns the approved copy
 * for zero API cost. Anything else falls through to the model.
 *
 * ── The part that matters more than cost ────────────────────────────────────
 * A canned answer cannot invent a price. Routing pricing questions here is a
 * stronger guarantee than instructing the model not to guess — the instruction
 * is a request, this is arithmetic. Every entry below is copy that already
 * ships on the site, so anything Aria says this way has already been reviewed.
 *
 * ── Why not embeddings ──────────────────────────────────────────────────────
 * Semantic search would match better. It would also mean an API call per
 * question to embed it, which is the cost this exists to avoid. Token overlap
 * with a confidence margin is worse at matching and free, which is the correct
 * trade for twenty FAQs. Revisit if the knowledge base reaches hundreds.
 */

import { PILLARS, site } from '@/content/copy';
import { faqs as homeFaqs } from '@/content/home';
import { contactFaqs } from '@/content/contact';
import { RETAINER_AREAS } from '@/content/retainerModules';
import { strategyPage } from '@/content/services/strategy';
import { websiteOsPage } from '@/content/services/website-os';
import { aiPage } from '@/content/services/ai';
import { softwarePage } from '@/content/services/software';

export interface KnowledgeEntry {
  id: string;
  /** Phrasings a person might actually use. */
  questions: string[];
  answer: string;
  /** Terms that strongly imply this entry, weighted above ordinary overlap. */
  keywords?: string[];
}

/** Built once at module load — this is all static content. */
function buildEntries(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  // ── The site's own FAQs, already written and approved ──────────────────────
  for (const [i, f] of homeFaqs.entries()) {
    entries.push({ id: `home-faq-${i}`, questions: [f.q], answer: f.a });
  }
  for (const [i, f] of contactFaqs.entries()) {
    entries.push({ id: `contact-faq-${i}`, questions: [f.q], answer: f.a });
  }
  for (const page of [strategyPage, websiteOsPage, aiPage, softwarePage]) {
    for (const [i, f] of (page.faqs ?? []).entries()) {
      entries.push({ id: `${page.eyebrow}-faq-${i}`.toLowerCase().replace(/\s+/g, '-'), questions: [f.q], answer: f.a });
    }
  }

  // ── Pricing: not published, but still answered for free ───────────────────
  // Prices were withdrawn from the site on 2026-09-18. "How much does it cost"
  // is still one of the most common opening questions, so it keeps a
  // knowledge-base answer — spending model tokens to say "we quote it" would be
  // pure cost. The answer must never carry a figure; the positioning tests
  // check for currency amounts anywhere the assistant can read.
  entries.push({
    id: 'pricing-base',
    keywords: ['price', 'pricing', 'cost', 'costs', 'much', 'fee', 'rate', 'quote', 'expensive', 'afford'],
    questions: [
      'How much does it cost?',
      'What does it cost?',
      'What are your prices?',
      'How much do you charge?',
      'What is your pricing?',
    ],
    answer:
      `We quote every business individually rather than publishing a price list — what it costs ` +
      `depends on which parts you actually need. Retainers are built from modules on top of a ` +
      `Website OS base, so you only pay for what you use. Tell us what you are after at ` +
      `${site.bookingUrl} and we will come back with a figure within one business day.`,
  });

  entries.push({
    id: 'pricing-modules',
    keywords: ['module', 'modules', 'included', 'options', 'add-on', 'addons'],
    questions: [
      'What modules are available?',
      'What can I add to a retainer?',
      'What is included?',
      'What are the options?',
    ],
    answer:
      `Retainers are grouped into ${RETAINER_AREAS.length} areas: ` +
      RETAINER_AREAS.map((a) => a.name).join(', ') +
      `. Every retainer includes the Website OS base, and you add only the modules you need. ` +
      `They are all described at ${site.url}/retainers, and we quote the combination you choose.`,
  });

  // ── Who we are and where we work ──────────────────────────────────────────
  entries.push({
    id: 'what-is-n3xus',
    keywords: ['who', 'what', 'agency', 'consultancy', 'company', 'firm', 'do'],
    questions: [
      'What is N3XUS?',
      'What do you do?',
      'Who are you?',
      'Are you a marketing agency?',
      'What kind of company are you?',
    ],
    answer:
      `${site.name} is a full-service marketing agency working across three areas — ` +
      PILLARS.map((p) => `${p.name} (${p.summary.replace(/\.$/, '')})`).join(', ') +
      `. That is what the 3 in the name stands for. We run the marketing — social, paid media, ` +
      `television and search — and we also build the systems on your site that make it measurable, ` +
      `so there is no handover between whoever plans it and whoever builds it.`,
  });

  entries.push({
    id: 'where-based',
    keywords: ['where', 'based', 'located', 'location', 'country', 'south africa', 'usa', 'america', 'remote'],
    questions: [
      'Where are you based?',
      'Where are you located?',
      'Do you work with US clients?',
      'Do you work internationally?',
      'Are you in South Africa?',
    ],
    answer:
      `We are based in South Africa and work with clients there and in the United States. Everything is ` +
      `delivered remotely, with working overlap for US hours. Retainers are quoted in ZAR for South ` +
      `African businesses at a 20% local rate, and in USD elsewhere.`,
  });

  entries.push({
    id: 'contact',
    keywords: ['contact', 'email', 'call', 'book', 'booking', 'talk', 'speak', 'reach', 'meeting'],
    questions: [
      'How do I get in touch?',
      'Can I book a call?',
      'What is your email?',
      'How do I contact you?',
      'I want to speak to someone',
    ],
    answer:
      `Email ${site.email}, or tell us what you need at ${site.bookingUrl} and we will set up a free ` +
      `call. We come back within one business day.`,
  });

  entries.push({
    id: 'getting-started',
    keywords: ['start', 'started', 'begin', 'first', 'process', 'next', 'step'],
    questions: [
      'How do we get started?',
      'What is the first step?',
      'How does it work?',
      'What happens first?',
    ],
    answer:
      `It starts with a conversation — you tell us what is going wrong, and we tell you what we would ` +
      `look at first and roughly what it would take. No deck, no pressure, and you keep whatever we ` +
      `work out even if you never speak to us again. Start it at ${site.bookingUrl}.`,
  });

  // ── One entry per discipline ──────────────────────────────────────────────
  for (const pillar of PILLARS) {
    entries.push({
      id: `pillar-${pillar.id}`,
      keywords: [pillar.name.toLowerCase()],
      questions: [
        `What is ${pillar.name}?`,
        `Tell me about ${pillar.name}`,
        `Do you do ${pillar.name}?`,
      ],
      answer: `${pillar.name}: ${pillar.summary} There is more at ${site.url}${pillar.href}.`,
    });
  }

  return entries;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = buildEntries();

// Words that carry no matching signal and would otherwise inflate every score.
const STOPWORDS = new Set([
  'a','an','the','is','are','was','were','be','been','am','do','does','did','can','could','would',
  'should','will','shall','may','might','must','have','has','had','i','you','we','they','it','he',
  'she','my','your','our','their','me','us','them','this','that','these','those','of','to','in',
  'for','on','at','by','with','about','from','as','into','and','or','but','if','so','than','then',
  'there','here','what','which','who','whom','how','when','where','why','please','tell','know',
  'get','guys','hi','hello','hey','thanks','thank',
]);

/**
 * Country synonyms, normalised before stopwords are stripped.
 *
 * "us" is both the United States and an object pronoun ("contact us"), so it
 * has to be a stopword — which silently destroyed the country signal in
 * "do you work with US clients". Mapping the synonyms to a canonical token
 * first keeps the geography and still lets the pronoun fall away.
 */
const SYNONYMS: Record<string, string> = {
  us: 'unitedstates',
  usa: 'unitedstates',
  america: 'unitedstates',
  american: 'unitedstates',
  states: 'unitedstates',
  sa: 'southafrica',
  rsa: 'southafrica',
  za: 'southafrica',
  pricing: 'price',
  prices: 'price',
  cost: 'price',
  costs: 'price',
  charge: 'price',
  fees: 'fee',
};

function tokenise(text: string): string[] {
  const raw = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  // "south africa" / "united states" as adjacent words collapse to one token.
  const joined: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    const pair = `${raw[i]} ${raw[i + 1] ?? ''}`.trim();
    if (pair === 'south africa' || pair === 'united states') {
      joined.push(pair === 'south africa' ? 'southafrica' : 'unitedstates');
      i++;
    } else {
      joined.push(raw[i]);
    }
  }

  const normalised = joined.map((t) => SYNONYMS[t] ?? t).filter((t) => t.length > 1);
  const meaningful = normalised.filter((t) => !STOPWORDS.has(t));

  /**
   * "What do you do?" and "Who are you?" are entirely stopwords — strip them
   * and nothing is left to match on, so two of the most common questions a
   * visitor asks were falling through to the model.
   *
   * When removal empties the query, the stopwords ARE the question: match on
   * the raw tokens instead. Only ever a fallback — doing it always would make
   * every query match everything.
   */
  return meaningful.length > 0 ? meaningful : normalised;
}

export interface Match {
  entry: KnowledgeEntry;
  score: number;
}

/**
 * Scores a query against one entry: the share of the query's meaningful words
 * that appear in the entry, with keyword hits weighted double.
 */
function scoreEntry(
  queryTokens: string[],
  entry: KnowledgeEntry,
): { score: number; keywordHits: number } {
  if (!queryTokens.length) return { score: 0, keywordHits: 0 };

  const entryTokens = new Set(entry.questions.flatMap(tokenise));
  const keywordTokens = new Set((entry.keywords ?? []).flatMap(tokenise));

  let hits = 0;
  let keywordHits = 0;
  for (const token of queryTokens) {
    if (keywordTokens.has(token)) {
      hits += 2;
      keywordHits += 1;
    } else if (entryTokens.has(token)) {
      hits += 1;
    }
  }

  return { score: hits / queryTokens.length, keywordHits };
}

/** A match must clear this to be used at all. */
export const MIN_SCORE = 0.6;
/** …and must beat the runner-up by this much, or the question was ambiguous. */
export const MIN_MARGIN = 0.15;

/**
 * Returns an answer only when confident.
 *
 * Two gates, and the margin is the important one: a question that matches two
 * entries almost equally well is a question we have understood badly, and
 * answering it confidently from the wrong entry is worse than paying for the
 * model. When in doubt, fall through.
 */
export function findAnswer(query: string): Match | null {
  const tokens = tokenise(query);
  if (tokens.length === 0) return null;

  const scored = KNOWLEDGE_BASE.map((entry) => ({ entry, ...scoreEntry(tokens, entry) })).sort(
    (a, b) => b.score - a.score || b.keywordHits - a.keywordHits,
  );

  const best = scored[0];
  const runnerUp = scored[1];
  if (!best || best.score < MIN_SCORE) return null;

  if (runnerUp && best.score - runnerUp.score < MIN_MARGIN) {
    /**
     * A tie on overlap alone is not necessarily ambiguity. Keywords are the
     * curated intent signal — an entry that matched on one has been explicitly
     * told this is its question, so it wins a tie the raw token overlap cannot
     * break.
     *
     * This came up on "do you work with US clients": `us` is a stopword
     * (as in "contact us"), so the country signal is stripped, and two entries
     * tied at 1.0. Both answers were correct; declining was a false negative.
     */
    if (best.keywordHits === runnerUp.keywordHits) return null;
  }

  return { entry: best.entry, score: best.score };
}

/**
 * Only the first message is eligible.
 *
 * Mid-conversation, "what about the second one?" depends on everything above
 * it, and a keyword matcher has no way to know that. Follow-ups go to the
 * model, which is the thing that can actually read context.
 */
export function isEligibleForKnowledgeBase(
  messages: { role: string; content: string }[],
): boolean {
  return messages.length === 1 && messages[0]?.role === 'user';
}
