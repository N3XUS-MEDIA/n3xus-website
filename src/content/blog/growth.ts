import type { Article } from './types';

const p = (text: string) => ({ kind: 'p' as const, text });
const h2 = (text: string) => ({ kind: 'h2' as const, text });
const li = (text: string) => ({ kind: 'li' as const, text });

export const growthArticles: Article[] = [
  {
    slug: 'get-recommended-by-ai-assistants',
    title: 'How to get your business recommended by ChatGPT and Gemini',
    category: 'Growth',
    pillar: 'growth',
    intent: 'solution',
    market: 'both',
    keyphrase: 'how to get my business recommended by ChatGPT',
    published: '2026-09-03',
    displayDate: 'September 2026',
    readingMinutes: 8,
    standfirst:
      'Buyers increasingly ask an assistant who to use rather than scrolling a results page. Those tools name one to three businesses, and most sites give them nothing to work with.',
    blocks: [
      p(
        'A search engine returns ten links and lets the person choose. An assistant returns an answer — typically naming one to three businesses. The difference matters enormously: on a results page, position four still gets clicks. In an answer, there is no position four.',
      ),
      p(
        'The work of being in that answer has a name — Generative Engine Optimisation — and it overlaps with SEO without being the same thing.',
      ),

      h2('What these systems can actually use'),
      p(
        'An assistant answering "who should I use for X in Y" is assembling from sources it can read, parse and attribute. Sites fail that test in mundane ways: the services are in an image, the coverage area is implied, the pricing model is a phone call, the expertise is asserted rather than demonstrated.',
      ),
      p('What helps, in rough order:'),
      li(
        'Plain, parseable text. What you do, who for, where, in sentences — not baked into graphics or hidden behind interactions.',
      ),
      li(
        'Structured data that states the same things machine-readably: organisation, services, areas served, currencies.',
      ),
      li(
        'Questions answered in the shape they are asked. A visible question with a direct answer under it is the format these systems lift most readily.',
      ),
      li(
        'Specifics over adjectives. "Retainers start at a fixed base plus modules" is usable; "affordable pricing" is not.',
      ),
      li(
        'An llms.txt file describing the business and pointing at what matters — a small, growing convention for exactly this purpose.',
      ),

      h2('Why vague copy fails badly here'),
      p(
        'Marketing language that survives on a website — "world-class", "trusted partner", "results-driven" — is close to useless to a system deciding whether to name you. It carries no distinguishing information. Worse, it displaces the text that would.',
      ),
      p(
        'The businesses that get cited tend to have unglamorous, concrete pages: what they do, where, for whom, at roughly what cost, with the common questions answered directly.',
      ),

      h2('Where geography comes in'),
      p(
        'A great deal of this is local. "Who should I use for X in Cape Town" is a different query from "who should I use for X", and the answer depends on whether a system can establish where you operate. Most sites state this nowhere a machine can find it — the address is in a footer image, or the coverage is "we work with clients everywhere", which resolves to nothing.',
      ),
      p(
        'Naming markets specifically beats claiming all of them. "Worldwide" matches no query.',
      ),

      h2('How to see where you stand'),
      p(
        'Ask the assistants directly. Take the five or six questions a buyer would realistically ask, put them to ChatGPT, Gemini, Claude and Perplexity, and record what comes back. You will usually find one of three things: you are absent, you are described inaccurately, or a competitor is named consistently.',
      ),
      p(
        'Repeat it monthly. It is a crude measure and it is the one that matters — and unlike rankings, nobody sells you a dashboard for it yet.',
      ),

      h2('What this does not replace'),
      p(
        'Traditional search is not going away, and the foundations overlap heavily: site health, clear structure, credible content. GEO is not a separate budget so much as a different bar for the same work. If a page is genuinely clear about what you do and who for, it tends to do better in both.',
      ),
      p(
        'One honest caveat: this field is young. Anyone offering guaranteed placement in AI answers is selling something they cannot control, and the mechanics will keep changing.',
      ),
    ],
    faqs: [
      {
        q: 'What is Generative Engine Optimisation?',
        a: 'Work that makes a business readable, credible and attributable to AI assistants, so it can be named when someone asks for a recommendation. It shares foundations with SEO — structure, clarity, site health — but targets being the answer rather than a ranked link.',
      },
      {
        q: 'How is GEO different from SEO?',
        a: 'SEO competes for position on a page of links, where fourth place still earns clicks. GEO competes to be one of the one to three businesses named in an answer, where there is no fourth place.',
      },
      {
        q: 'How do I check whether AI assistants recommend my business?',
        a: 'Ask them. Put the five or six questions a buyer would realistically ask to ChatGPT, Gemini, Claude and Perplexity, and record the answers. Repeat monthly. It is crude, and it is the measure that counts.',
      },
      {
        q: 'Can anyone guarantee my business appears in AI answers?',
        a: 'No. Nobody controls those systems’ outputs, and any guarantee is a claim about something the seller cannot influence. What can be done is make the business as readable and attributable as possible, then measure.',
      },
    ],
    related: ['seo-vs-geo-what-changed', 'why-your-website-isnt-generating-leads'],
  },

  {
    slug: 'seo-vs-geo-what-changed',
    title: 'SEO and GEO: what changed, and what to do about it',
    category: 'Growth',
    pillar: 'growth',
    intent: 'problem',
    market: 'both',
    keyphrase: 'seo vs geo difference what to do',
    published: '2026-09-04',
    displayDate: 'September 2026',
    readingMinutes: 6,
    standfirst:
      'Ranking well and being recommended are now two different achievements. Plenty of businesses have the first and have not noticed they lack the second.',
    blocks: [
      p(
        'For twenty years, being findable meant ranking. The mechanics were understood, the measurement was mature, and everyone competed on the same board.',
      ),
      p(
        'That board still exists. A second one appeared next to it, and the rules are not the same.',
      ),

      h2('What actually changed'),
      p(
        'Search engines return a list and let the person choose. Assistants return an answer and choose for them. So the unit of competition moved from "appear on the page" to "be one of the names in the response" — and the second is a much smaller doorway.',
      ),
      p(
        'This does not make ranking worthless. It makes ranking necessary and no longer sufficient.',
      ),

      h2('What carries over'),
      p(
        'More than the discourse suggests. Site health, sensible structure, clear language, credible depth on a subject — all of it helps in both. A site that is genuinely good at explaining what it does tends to do better in search and in assistant answers, because both are ultimately trying to work out what the page is about.',
      ),

      h2('What does not carry over'),
      li(
        'Keyword density and its descendants. An assistant is not counting terms; repetition mostly makes text worse to read and no more likely to be cited.',
      ),
      li(
        'Volume as a strategy. Forty thin pages targeting variations of a phrase is a search tactic that ages badly and does nothing for citation.',
      ),
      li(
        'Position tracking as the measure. There is no rank to hold. You are named or you are not.',
      ),

      h2('What is genuinely new'),
      p(
        'Being attributable. A search engine can rank a page it only partly understands. An assistant naming your business is making a small claim on your behalf, and it prefers sources where the claim is easy to support — where what you do, where you do it and roughly what it costs are stated plainly and consistently.',
      ),
      p(
        'Consistency matters more here than in search. If your pricing is described three different ways across three pages, a system has no way to decide which is true, and the safe move is to cite somebody else.',
      ),

      h2('Where to actually start'),
      li('Ask the assistants your buyers’ questions and write down what comes back'),
      li('Fix contradictions across your own site before adding anything new'),
      li('State geography, services and pricing model in plain text and in structured data'),
      li('Answer real questions visibly, in the shape they are asked'),
      li('Re-measure monthly'),
      p(
        'None of that is exotic, and most of it improves conventional search too. The main shift is not tactical — it is accepting that "we rank well" is no longer the same statement as "we get found".',
      ),
    ],
    faqs: [
      {
        q: 'Does SEO still matter?',
        a: 'Yes. Ranking is now necessary rather than sufficient, and most of the underlying work — structure, clarity, site health — serves both search and assistant answers.',
      },
      {
        q: 'Should I hire separately for GEO?',
        a: 'Usually not. It is a different bar for largely the same work rather than a separate discipline with a separate budget. Be wary of anyone selling it as an entirely new line item.',
      },
      {
        q: 'How do I measure GEO?',
        a: 'By asking the assistants your buyers’ questions and recording whether you are named, monthly. There is no rank to track, and no mature tooling yet.',
      },
    ],
    related: ['get-recommended-by-ai-assistants', 'why-your-website-isnt-generating-leads'],
  },

  {
    slug: 'whatsapp-for-south-african-business',
    title: 'Running a South African business on WhatsApp: what to automate',
    category: 'Growth',
    pillar: 'growth',
    intent: 'solution',
    market: 'za',
    keyphrase: 'whatsapp business automation south africa',
    published: '2026-09-05',
    displayDate: 'September 2026',
    readingMinutes: 6,
    standfirst:
      'In South Africa a great deal of business is genuinely conducted on WhatsApp. Most of it runs through one person’s phone, which works until it does not.',
    blocks: [
      p(
        'Advice written for other markets tends to treat WhatsApp as a marketing channel. Here it is frequently the channel — where quotes get agreed, jobs get confirmed and problems get raised, often on a personal number belonging to whoever answered first.',
      ),
      p(
        'That is not a bad thing. Customers use it because it is fast and they are already there. The problem is what it means operationally.',
      ),

      h2('What actually goes wrong'),
      li('The conversation lives on one phone, and nobody else can see it'),
      li('Agreements are made in a thread with no record anywhere else'),
      li('Whoever owns the phone becomes a bottleneck, and cannot take leave'),
      li('When they leave the business, the relationships leave with them'),
      p(
        'None of this shows up as a crisis. It shows up as the business being unable to answer straightforward questions about its own work.',
      ),

      h2('What is worth automating first'),

      h2('1. Get the conversation off a personal phone'),
      p(
        'WhatsApp Business API lets several people work one number, with history that belongs to the business rather than an individual. This is unglamorous and it is the foundation — nothing else is safe to build until the thread is not hostage to one handset.',
      ),

      h2('2. Answer the repeated questions automatically'),
      p(
        'A large share of incoming messages are the same handful: are you open, do you cover this area, roughly what does this cost, where is my job. Answering those automatically is not impersonal — it is faster than a person, and it frees the person for messages that need judgement.',
      ),

      h2('3. Write conversations into the record'),
      p(
        'When a WhatsApp enquiry becomes a tracked record automatically, a category of loss disappears: the enquiry somebody meant to follow up and forgot. This is usually where the immediate money is.',
      ),

      h2('4. Confirmations and reminders'),
      p(
        'Booking confirmations and reminders on the channel people actually read get opened far more reliably than email. If no-shows cost you, this is the cheapest intervention available.',
      ),

      h2('What not to do'),
      p(
        'Do not turn it into a broadcast channel. WhatsApp works because it feels like talking to a person, and that tolerance is easily spent. Templates, opt-in and message categories exist for good reason, and businesses that ignore them lose the number that their customers rely on.',
      ),
      p(
        'And do not automate the part customers value. If people choose you because they can message someone who knows them, putting a bot in front of that is a downgrade dressed as efficiency. Automate the repetitive layer underneath and leave the relationship alone.',
      ),

      h2('Why this is a local question'),
      p(
        'Playbooks imported from the US will usually tell you to drive everything to email and a form. Here that instruction quietly costs you enquiries, because it asks customers to move to a channel they use less, to suit a process that suits you.',
      ),
    ],
    faqs: [
      {
        q: 'Do I need the WhatsApp Business API, or is the app enough?',
        a: 'The app is fine while one person handles everything. The API matters once more than one person needs the same number, or once you want conversations recorded outside the handset — which is usually the point at which the app has become a risk.',
      },
      {
        q: 'Will automating WhatsApp annoy customers?',
        a: 'Not if you automate the repetitive layer — hours, coverage, job status, confirmations — and leave the actual conversation to people. What annoys customers is a bot placed in front of a relationship they valued.',
      },
      {
        q: 'Is this only relevant in South Africa?',
        a: 'The pattern is strongest in markets where WhatsApp is a primary business channel, South Africa among them. The underlying principle — meet buyers where they already are — travels anywhere.',
      },
    ],
    related: ['stop-losing-after-hours-enquiries', 'why-your-website-isnt-generating-leads'],
  },
];
