/**
 * The six articles, lifted out of blog/index.html.
 *
 * They previously lived in one 689-line page, rendered client-side from hidden
 * <article> nodes, with no permalinks — so no post could be linked to, shared,
 * or indexed individually. Each is now its own route.
 *
 * Two edits, both marked at the point they were made in the generator:
 * - "choosing-a-digital-marketing-agency" opened "<p> has a growing number of
 *   digital marketing agencies." The country had been stripped from the
 *   sentence; restored to South Africa, consistent with /about.
 * - "ai-chatbots-for-business" listed three tiers at $500 / $1,160 / $2,370
 *   once-off. Those figures exist nowhere else on the site and contradict the
 *   $1,500 in the homepage JSON-LD (claims register C4, still open), so they
 *   are held back and the article points at a scoping call instead.
 */

export interface ArticleBlock {
  kind: 'p' | 'h2' | 'h3' | 'li';
  text: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  /** ISO date, used for sorting and metadata. */
  published: string;
  /** How the date is written on the page. */
  displayDate: string;
  readingMinutes: number;
  /** Opening paragraph, reused as the excerpt and meta description. */
  standfirst: string;
  blocks: ArticleBlock[];
}

export const articles: Article[] = [
  {
    "slug": "llm-marketing-how-to-get-found-in-ai-assistants",
    "title": "LLM Marketing: How to Get Found in ChatGPT, Gemini, Grok and Perplexity",
    "category": "AI Marketing",
    "published": "2026-03-01",
    "displayDate": "March 2026",
    "readingMinutes": 7,
    "standfirst": "Most global businesses are investing in SEO, Google Ads and social media. Very few are thinking about how to get found when a potential client types their question into ChatGPT, Gemini, Grok or Perplexity. That gap is your opportunity and it is closing fast.",
    "blocks": [
      {
        "kind": "p",
        "text": "Most global businesses are investing in SEO, Google Ads and social media. Very few are thinking about how to get found when a potential client types their question into ChatGPT, Gemini, Grok or Perplexity. That gap is your opportunity and it is closing fast."
      },
      {
        "kind": "h2",
        "text": "What is LLM Marketing?"
      },
      {
        "kind": "p",
        "text": "LLM Marketing, also called Generative Engine Optimisation (GEO), is the practice of making your brand visible and recommendable within large language model AI systems. Unlike traditional search, AI assistants synthesise an answer and may recommend specific businesses by name. Whether your business is mentioned depends on how well-represented you are in the data these models draw from."
      },
      {
        "kind": "p",
        "text": "Traditional SEO gets you found on Google. LLM Marketing gets you recommended by AI. Those are two very different outcomes."
      },
      {
        "kind": "li",
        "text": "Structured data optimisation — Schema.org Article, FAQPage, Organization and Service markup"
      },
      {
        "kind": "li",
        "text": "Content engineering — authoritative, factual content written as AI source material"
      },
      {
        "kind": "li",
        "text": "Entity establishment — ensuring your business is a distinct, credible entity across the web"
      },
      {
        "kind": "li",
        "text": "Citation building — getting mentioned in sources AI training data prioritises"
      },
      {
        "kind": "li",
        "text": "llms.txt implementation — the emerging standard that tells AI crawlers who you are"
      },
      {
        "kind": "h2",
        "text": "Why global businesses need to act now"
      },
      {
        "kind": "p",
        "text": "A growing proportion of buying decisions are informed by AI-generated answers. Businesses that establish their AI visibility now will hold a significant advantage as adoption matures. N3XUS Media uses these techniques on our own website as a live proof of concept."
      }
    ]
  },
  {
    "slug": "ai-chatbots-for-business",
    "title": "AI Chatbots for Business: A Practical Guide",
    "category": "AI Systems",
    "published": "2026-02-01",
    "displayDate": "February 2026",
    "readingMinutes": 8,
    "standfirst": "Most global businesses still respond to leads during office hours and manually qualify prospects. AI chatbots change all of that, but there is a significant gap between a basic FAQ bot and a genuinely intelligent sales assistant.",
    "blocks": [
      {
        "kind": "p",
        "text": "Most global businesses still respond to leads during office hours and manually qualify prospects. AI chatbots change all of that, but there is a significant gap between a basic FAQ bot and a genuinely intelligent sales assistant."
      },
      {
        "kind": "h2",
        "text": "Why WhatsApp AI matters"
      },
      {
        "kind": "p",
        "text": "WhatsApp has exceptional penetration in the global market. An AI system that responds to WhatsApp messages intelligently at any hour is one of the highest-return technology investments available today."
      },
      {
        "kind": "p",
        "text": "Responding to a lead within minutes rather than the next working day can be the difference between winning and losing the deal."
      },
      {
        "kind": "p",
        "text": "Chatbot builds are quoted against scope — channels, integrations and how much of your knowledge base the assistant needs to hold all move the number. Book a call and we will scope it properly rather than guess at a tier."
      }
    ]
  },
  {
    "slug": "choosing-a-digital-marketing-agency",
    "title": "What to Look for in a Digital Marketing Agency",
    "category": "Digital Marketing",
    "published": "2026-01-01",
    "displayDate": "January 2026",
    "readingMinutes": 6,
    "standfirst": "South Africa has a growing number of digital marketing agencies. Choosing the right partner directly affects your growth trajectory.",
    "blocks": [
      {
        "kind": "p",
        "text": "South Africa has a growing number of digital marketing agencies. Choosing the right partner directly affects your growth trajectory."
      },
      {
        "kind": "h2",
        "text": "The most important question"
      },
      {
        "kind": "p",
        "text": "Before discussing services, ask: How do you measure success and how does that connect to our commercial goals? An agency that answers with impressions is focused on activity. An agency that answers with cost per qualified lead is focused on outcomes."
      },
      {
        "kind": "li",
        "text": "Guaranteed rankings before understanding your business"
      },
      {
        "kind": "li",
        "text": "Reporting focused on impressions without connecting to outcomes"
      },
      {
        "kind": "li",
        "text": "No clear strategy process before execution begins"
      },
      {
        "kind": "li",
        "text": "Long-term contracts with no performance benchmarks"
      },
      {
        "kind": "p",
        "text": "Book a free strategy call, no obligation."
      }
    ]
  },
  {
    "slug": "television-marketing-broadcast-brand-building",
    "title": "Television Marketing: Why Broadcast Still Builds Brands",
    "category": "Brand and TV",
    "published": "2026-03-01",
    "displayDate": "March 2026",
    "readingMinutes": 7,
    "standfirst": "There is a persistent belief that television is a legacy channel. This belief is wrong and businesses that act on it hand a significant advantage to their competitors.",
    "blocks": [
      {
        "kind": "p",
        "text": "There is a persistent belief that television is a legacy channel. This belief is wrong and businesses that act on it hand a significant advantage to their competitors."
      },
      {
        "kind": "h2",
        "text": "What television does that digital cannot"
      },
      {
        "kind": "p",
        "text": "When your brand appears on television it carries an implicit credibility signal that no digital format replicates. This shows up in branded search volume, conversion rates and sales cycle length."
      },
      {
        "kind": "p",
        "text": "The brands that win long-term build both reach and trust. Television builds trust at scale. Digital converts it into revenue."
      },
      {
        "kind": "li",
        "text": "Commercial production — concept, scripting, filming, post-production, broadcast delivery"
      },
      {
        "kind": "li",
        "text": "Media buying — national broadcast placement"
      },
      {
        "kind": "li",
        "text": "Sponsorship integration — programme sponsorship, sports partnerships"
      }
    ]
  },
  {
    "slug": "ai-consulting-strategy",
    "title": "AI Consulting: How to Build an AI Strategy That Works",
    "category": "AI Consulting",
    "published": "2026-02-01",
    "displayDate": "February 2026",
    "readingMinutes": 8,
    "standfirst": "Every week global businesses are told AI will transform their industry. Most of this advice is accurate. Very little of it explains practically what to do.",
    "blocks": [
      {
        "kind": "p",
        "text": "Every week global businesses are told AI will transform their industry. Most of this advice is accurate. Very little of it explains practically what to do."
      },
      {
        "kind": "h2",
        "text": "Why most AI implementations fail"
      },
      {
        "kind": "p",
        "text": "The majority fail not because the technology does not work but because businesses start with the technology rather than the problem, underestimate integration requirements, or have no clear success metric before starting."
      },
      {
        "kind": "li",
        "text": "Lead response and qualification — AI that responds instantly and qualifies prospects"
      },
      {
        "kind": "li",
        "text": "Reporting and analytics — AI that synthesises data from multiple platforms"
      },
      {
        "kind": "li",
        "text": "Content production — AI-assisted creation of marketing copy at scale"
      },
      {
        "kind": "li",
        "text": "Customer support — AI that handles common queries across email, chat and WhatsApp"
      },
      {
        "kind": "p",
        "text": "Start with a free AI Business Audit, no obligation."
      }
    ]
  },
  {
    "slug": "core3-framework",
    "title": "The Core3 Framework: Why Integrated Marketing Outperforms Isolated Campaigns",
    "category": "Strategy",
    "published": "2026-01-01",
    "displayDate": "January 2026",
    "readingMinutes": 6,
    "standfirst": "Most businesses run their marketing in fragments. Brand campaigns by one agency. Google Ads by another. Social media by a freelancer. AI bolted on separately. The combined output is far less than the sum of its parts.",
    "blocks": [
      {
        "kind": "p",
        "text": "Most businesses run their marketing in fragments. Brand campaigns by one agency. Google Ads by another. Social media by a freelancer. AI bolted on separately. The combined output is far less than the sum of its parts."
      },
      {
        "kind": "h2",
        "text": "The three pillars"
      },
      {
        "kind": "p",
        "text": "Pillar 1 — Brand and Market Presence: Television marketing, brand activations, sponsorship integration and brand strategy."
      },
      {
        "kind": "p",
        "text": "Pillar 2 — Digital Growth and Performance: SEO, paid advertising, social media, web development, conversion optimisation and LLM Marketing."
      },
      {
        "kind": "p",
        "text": "Pillar 3 — AI Systems and Automation: AI chatbots, sales automation, CRM workflows, custom AI software and AI consulting."
      },
      {
        "kind": "p",
        "text": "When brand, performance and AI work as one connected system, each pillar amplifies the others. That is the Core3 difference."
      }
    ]
  }
];

/** Newest first. */
export const articlesByDate = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Up to `limit` other articles, preferring the same category. */
export function relatedTo(slug: string, limit = 2): Article[] {
  const current = findArticle(slug);
  if (!current) return [];
  const others = articlesByDate.filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === current.category);
  return [...sameCategory, ...others.filter((a) => a.category !== current.category)].slice(0, limit);
}
