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
import { digitalPage } from '@/content/services/digital';
import { brandPage } from '@/content/services/brand';

/**
 * Answers are written to be read in a chat bubble, by a person, so they use
 * contractions, short sentences and one clear next step. Links are written as
 * [label](url) and rendered as real links by the chat widget — the label is
 * what the visitor reads, so make it say where it goes.
 */
const link = (label: string, path: string) => `[${label}](${site.url}${path})`;
/** The enquiry form: the booking page if one is live, otherwise the contact form. */
const enquiryLink = (label: string) => `[${label}](${site.bookingUrl})`;

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
  for (const page of [strategyPage, websiteOsPage, aiPage, softwarePage, digitalPage, brandPage]) {
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
      `We don't publish a price list, because it really does depend on what you need. ` +
      `Retainers are a base plus whichever pieces make sense for you, so you only pay for what you'll use. ` +
      `Tell us what you're after and we'll come back with a figure within one business day. ` +
      `${enquiryLink('Ask us for a quote')}`
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
      `A retainer is built from ${RETAINER_AREAS.length} areas: ` +
      RETAINER_AREAS.map((a) => a.name.toLowerCase()).join(', ') +
      `. Everyone gets the Website OS base, and you add only what you need. ` +
      `${link("It's all listed here", '/retainers')}, and we price whichever combination you pick.`
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
      `We're a full-service marketing agency with a build team. In plain terms: we work out what's ` +
      `holding the business back, build the systems that fix it, and then bring in the customers. ` +
      `Most agencies only do that last part and hand you a report. ${link('Here is what that looks like', '/services')}.`
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
      `We're based in South Africa and work with clients here and in the US. It's all done remotely, ` +
      `and we make sure there's overlap with US hours. Retainers are quoted in rand for South African ` +
      `businesses (with a 20% local rate) and in dollars everywhere else.`
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
      `Easiest is to ${enquiryLink('send us a quick message')} and we'll come back to you within one ` +
      `business day. You can also just email ${site.email}.`
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
      `It starts with a conversation. You tell us what's going wrong, and we tell you what we'd look at ` +
      `first and roughly what it would take. No deck, no pressure, and you keep whatever we work out even ` +
      `if you never speak to us again. ${enquiryLink('Start here')}.`
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
      answer: `${pillar.name} is about ${pillar.summary.charAt(0).toLowerCase()}${pillar.summary.slice(1)} ${link('Read more about it', pillar.href)}.`,
    });
  }

  // ── One entry per service page, from the page's own approved hero copy ────
  // So "what is the Website OS?" or "do you do SEO?" is answered from the page
  // itself, now that the assistant runs without a model behind it.
  const services: { path: string; keywords: string[]; questions: string[]; answer: string }[] = [
    {
      path: '/services/website-os',
      keywords: ['website', 'os', 'operating', 'bookings', 'booking', 'portal', 'crm', 'payments', 'invoicing'],
      questions: ['What is the Website OS?', 'What is a Website Operating System?', 'Can my website take bookings and payments?', 'Do you build websites?'],
      answer: `Short version: it's your website doing the work your team does by hand today. Bookings, quotes, payments and customer records all run behind the site, instead of a contact form that lands in an inbox. Usually we build it onto the site you already have, so there's nothing to relaunch. ${link('Here is the full page', '/services/website-os')}.`,
    },
    {
      path: '/services/ai',
      keywords: ['ai', 'chatbot', 'assistant', 'agents', 'llm', 'automation', 'rag', 'whatsapp'],
      questions: ['Do you build AI assistants?', 'Can you build a chatbot?', 'Do you do AI automation?', 'What AI do you build?'],
      answer: `Yes, that's a big part of what we do. Assistants that answer real questions from your own information, take enquiries and bookings, and pass to a person when they should. We also automate the follow-ups and admin your team does by hand. ${link('More on the AI side', '/services/ai')}.`,
    },
    {
      path: '/services/software',
      keywords: ['software', 'app', 'application', 'api', 'saas', 'integration', 'custom', 'tool'],
      questions: ['Do you build custom software?', 'Can you build an app?', 'Do you do integrations?', 'Can you build internal tools?'],
      answer: `We do. If you've got a process no off-the-shelf tool handles properly, we'll build it: web apps, integrations, internal tools. We scope it up front so you know what you're getting. ${link('The details are here', '/services/software')}.`,
    },
    {
      path: '/services/digital',
      keywords: ['seo', 'google', 'ads', 'search', 'social', 'marketing', 'geo', 'chatgpt', 'leads', 'traffic'],
      questions: ['Do you do SEO?', 'Can you run our ads?', 'Do you do social media?', 'How do we get more leads?', 'Can you get us found on ChatGPT?'],
      answer: `Yes, that's our growth side: SEO, Google and Meta ads, social, email, and getting you found in ChatGPT and the other AI tools people now ask instead of searching. We tie it to real results so you can see what's working. ${link('Have a look', '/services/digital')}.`,
    },
    {
      path: '/services/brand',
      keywords: ['brand', 'branding', 'tv', 'television', 'video', 'logo', 'identity', 'sponsorship', 'activation'],
      questions: ['Do you do branding?', 'Do you do TV advertising?', 'Can you make a video?', 'Can you do our logo and identity?'],
      answer: `We do, from brand identity through to TV, streaming and video production. We plan campaigns so the effect shows up in your own numbers, not someone else's case study. ${link('More on brand and TV', '/services/brand')}.`,
    },
    {
      path: '/services/strategy',
      keywords: ['strategy', 'consulting', 'advice', 'audit', 'diagnostic', 'plan', 'roadmap'],
      questions: ['Do you do strategy?', 'Can you audit our business?', 'Where should we start?', 'Can you tell us what to fix first?'],
      answer: `That's usually where we start. We look at how the business really runs, put a number on what each problem is costing you, and tell you what to fix first, in writing. It's yours to keep either way. ${link('Read more about it', '/services/strategy')}.`,
    },
    {
      path: '/intelligence',
      keywords: ['intelligence', 'dashboard', 'reporting', 'reports', 'analytics', 'attribution', 'data'],
      questions: ['What is N3XUS Intelligence?', 'Do you provide reporting?', 'Do you have a dashboard?', 'How do we see what is working?'],
      answer: `It's our reporting platform: leads, bookings, spend and revenue on one screen, with attribution that shows which channel actually produced what. It comes with every retainer. ${link('See how it works', '/intelligence')}.`,
    },
  ];
  for (const s of services) {
    entries.push({
      id: `service-${s.path.split('/').pop()}`,
      keywords: s.keywords,
      questions: s.questions,
      answer: s.answer,
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
 * The closest questions we *can* answer, for when findAnswer declines.
 *
 * A miss should never be a dead end: offering "did you mean…" turns an
 * unanswerable question into a click on one we have approved copy for.
 */
export function suggestQuestions(query: string, n = 3): string[] {
  const tokens = tokenise(query);
  const picks = KNOWLEDGE_BASE.map((entry) => ({ entry, ...scoreEntry(tokens, entry) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || b.keywordHits - a.keywordHits)
    .map((r) => r.entry.questions[0]!);
  const fallback = ['What do you do?', 'How much does it cost?', 'What is the Website OS?'];
  return [...new Set([...picks, ...fallback])].slice(0, n);
}

const LEAD_INTENT = [
  'quote', 'proposal', 'book', 'booking', 'call', 'meeting', 'hire', 'interested', 'talk',
  'speak', 'contact', 'start', 'started', 'help', 'need', 'want', 'looking', 'project',
];

/** Does this message sound like someone ready to talk, rather than browsing? */
export function isLeadIntent(text: string): boolean {
  const words = text.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/);
  return words.some((w) => LEAD_INTENT.includes(w));
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
