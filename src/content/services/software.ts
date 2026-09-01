import type { ServicePageContent } from '../blocks';

export const softwarePage: ServicePageContent = {
  eyebrow: 'Custom software',
  title: 'Software that actually ships, and scales.',
  lede: 'Custom web applications, production APIs, SaaS products and enterprise systems — scoped, architected, built and deployed, with documentation, tests and code you can hand to somebody else.',

  blocks: [
    {
      type: 'chips',
      eyebrow: 'Our stack',
      title: 'Built on proven, modern technology.',
      lede: 'The technologies strong engineering teams rely on now — not the ones we were comfortable with five years ago.',
      items: [
        'React',
        'Next.js',
        'TypeScript',
        'Vue.js',
        'Tailwind CSS',
        'Node.js',
        'Python',
        'FastAPI',
        'Express',
        'GraphQL',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'Supabase',
        'S3 / R2',
        'Docker',
        'AWS',
        'GCP',
        'Vercel',
        'GitHub Actions',
      ],
    },

    {
      type: 'features',
      eyebrow: 'What we build',
      title: 'Software for the process no product on the market fits.',
      lede: 'From a single-feature web app to a full platform. Every project ships with documentation, tests, and a handover that assumes we might not be the ones maintaining it.',
      columns: 2,
      items: [
        {
          title: 'Custom web applications',
          body: 'The internal tool, customer portal or operational system your business runs on, built around your actual process rather than bent to fit somebody else’s product.',
          outcome: 'The spreadsheet holding the business together retires',
        },
        {
          title: 'APIs & integrations',
          body: 'REST and GraphQL APIs, plus the middleware that makes systems which were never designed to talk to each other behave as one.',
          outcome: 'Data stops being re-keyed between tools',
        },
        {
          title: 'SaaS product development',
          body: 'Multi-tenant products with authentication, billing, roles and permissions built correctly from the start — because retrofitting tenancy is the expensive way to learn about it.',
          outcome: 'A product you can sell, not a prototype',
        },
        {
          title: 'System integration & middleware',
          body: 'Connecting existing platforms — CRM, accounting, inventory, logistics — so a change in one is reflected everywhere without anyone copying it across.',
          outcome: 'One version of the truth, across every tool',
        },
        {
          title: 'Database design',
          body: 'Schema design, migration strategy, indexing and query performance work — the layer that decides whether the application is still fast in two years.',
          outcome: 'Performance that holds as the data grows',
        },
        {
          title: 'DevOps & cloud',
          body: 'Containerisation, CI/CD pipelines, infrastructure-as-code, monitoring and backups. Deploying should be boring.',
          outcome: 'Releases that stop being an event',
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Software + AI',
      title: 'Both halves, under one roof.',
      paragraphs: [
        'Most AI projects fail at the boundary rather than the model: the intelligence works, and then it has nowhere to live. It needs an interface people will actually use, a database that holds the results, permissions that decide who sees what, and a deployment somebody maintains.',
        'Because we build the software as well as the AI, that boundary is not a handover between two suppliers pointing at each other. It is one system, scoped and owned in one place.',
      ],
      points: [
        'AI capability designed into the architecture, not bolted on after',
        'One team accountable for the model and the application around it',
        'Fixed-price scope agreed before the build starts',
        'Documentation and tests, so the code outlives the engagement',
      ],
    },

    {
      type: 'process',
      eyebrow: 'How we work',
      title: 'What exists at the end of each stage.',
      steps: [
        {
          n: '01',
          title: 'Discovery & scope',
          body: 'We map the process the software has to serve, agree what is in and explicitly out, and produce a fixed price. You keep the scope document either way.',
        },
        {
          n: '02',
          title: 'Architecture',
          body: 'Data model, integrations, infrastructure and the decisions that are expensive to reverse — written down and agreed before anything is built on top of them.',
        },
        {
          n: '03',
          title: 'Build & review',
          body: 'Delivered in working increments you can use and react to, rather than one reveal at the end when changing direction is most expensive.',
        },
        {
          n: '04',
          title: 'Deploy & hand over',
          body: 'Live, monitored, backed up, documented. Handover assumes somebody else may maintain it — because eventually somebody else might.',
        },
      ],
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Have a software project in mind?',
      lede: 'Bring the process, not a specification. The discovery call produces a scope and a fixed price, and you keep both.',
      secondary: { href: '/services/ai', label: 'AI & LLM development' },
    },
  ],

  faqs: [
    {
      q: 'Do we own the code?',
      a: 'Yes, outright, in your own repository. Documentation and tests come with it. Nothing is held hostage to keep you on a retainer.',
    },
    {
      q: 'How is it priced?',
      a: 'Fixed price against an agreed scope, produced during discovery. If the scope changes mid-build we price the change before doing it, rather than after.',
    },
    {
      q: 'What if we already have a development team?',
      a: 'Then we work alongside them — a specific subsystem, an integration, or the AI layer — to the same standards, in your repository, reviewed by your people.',
    },
    {
      q: 'What happens after launch?',
      a: 'Whatever you want to happen. Some clients take it in-house immediately, some keep us on for ongoing development. The handover is the same either way, because it is written for someone who isn’t us.',
    },
  ],
};
