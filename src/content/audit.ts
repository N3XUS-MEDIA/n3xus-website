/**
 * /audit — the free website and AI-visibility audit.
 *
 * Every line here describes what the audit engine in N3XUS HQ actually does
 * (n3xus/apps/hq/src/lib/audit). If the engine changes, this changes with it.
 * No benchmarks, no "average business loses…" figures: the only numbers a
 * visitor sees are their own site's, measured.
 */
import type { Faq } from './home';

export const auditHero = {
  eyebrow: 'Free website audit',
  title: 'See what your website is costing you.',
  lede: 'Enter your address. We check how you show up in search and in AI assistants, how fast you load, how easy you are to contact, and what you can and can’t measure. Your score appears on screen in a minute or two.',
};

export const auditAreas = [
  {
    title: 'Search',
    body: 'Whether Google can find, read and understand every page — titles, descriptions, headings, sitemap, structured data and broken links.',
  },
  {
    title: 'AI visibility',
    body: 'Whether ChatGPT, Claude, Perplexity and Google’s AI are allowed to read your site, and whether an AI assistant names you when a customer asks.',
  },
  {
    title: 'Speed',
    body: 'How fast your pages load and respond on a phone and on a computer, measured by Google PageSpeed Insights.',
  },
  {
    title: 'Getting in touch',
    body: 'How easy it is to call, message, book or enquire — and whether the next step is obvious on every page.',
  },
  {
    title: 'Tracking',
    body: 'Which analytics and advertising tags are installed, and so what you can and can’t measure about your visitors today.',
  },
  {
    title: 'Trust',
    body: 'Security, privacy policy, cookie consent, contact details and the proof that makes a stranger comfortable getting in touch.',
  },
] as const;

export const auditDeliverables = {
  instant: {
    title: 'On screen, straight away',
    points: [
      'Your overall score out of 100',
      'A score for each area',
      'The three issues costing you most',
      'Your speed on mobile and desktop',
    ],
  },
  full: {
    title: 'The full report, by email',
    points: [
      'Every finding, in plain language',
      'What’s working, so you keep it',
      'How an AI assistant answers when your customers ask — and who it names instead',
      'The three things we’d do first',
    ],
    note: 'Leave your name and email to unlock it. A person at N3XUS reads every report before it’s sent.',
  },
};

export const auditFaqs: Faq[] = [
  {
    q: 'Is the website audit really free?',
    a: 'Yes. Your score and top three issues appear on screen without an email address. The full report is free too; we ask for your name and email so we can send it.',
  },
  {
    q: 'What does the audit check?',
    a: 'Search visibility, AI visibility, page speed, how easy it is to get in touch, which tracking tags are installed, and trust signals such as security, privacy policy and contact details. Scores come from a fixed checklist, so the same site scores the same way every time.',
  },
  {
    q: 'How do you check whether AI assistants recommend me?',
    a: 'We ask an AI assistant with web search the kind of questions your customers would ask, without mentioning your business, and record whether you are named and who is named instead. Answers vary from day to day, so treat it as a snapshot rather than a ranking.',
  },
  {
    q: 'Do you need access to my website?',
    a: 'No. We only read pages anyone can visit, never logged-in areas, and we follow the rules in your robots.txt file. Nothing on your site is changed.',
  },
  {
    q: 'What can’t the audit see?',
    a: 'Anything behind the scenes: how quickly enquiries are answered, how quotes are sent, your sales numbers or your CRM. The full report lists questions about those for a follow-up call, if you want one.',
  },
  {
    q: 'What happens to my details?',
    a: 'They are used to send your report and to follow up about it. We don’t add you to a mailing list. Our privacy policy explains what we keep and how to ask us to delete it.',
  },
];
