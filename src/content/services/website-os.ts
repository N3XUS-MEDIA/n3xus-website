import type { ServicePageContent } from '../blocks';

/**
 * /services/website-os — the flagship service page.
 *
 * The tier table ($950 / $2,400 / $5,500 per month) is NOT ported: it is
 * superseded by the modular retainer on /pricing. See
 * docs/CLAIMS-REGISTER.md C3. The three-way cost comparison it sat inside is
 * kept, because that framing does real work — only the figure changed.
 *
 * The "crypto settlement via Syrax" line in the payments capability is also
 * dropped pending the founder decision logged as E1.
 */
export const websiteOsPage: ServicePageContent = {
  eyebrow: 'Website Operating System',
  title: 'Your website should run your business, not just describe it.',
  lede: 'Most business websites are digital brochures — expensive to build, quickly outdated, and responsible for almost none of the work. We convert your website into the operating system your company actually runs on: bookings, quotes, payments, customer records, inventory, reporting and AI agents, all connected behind one system you control.',

  blocks: [
    {
      type: 'prose',
      eyebrow: 'The real problem',
      title: 'You’re paying for a brochure that does nothing.',
      paragraphs: [
        'Your team still books by phone. Quotes are typed by hand. Customer details live in three different spreadsheets. Payments are chased over email. Meanwhile your website — the one asset every customer actually visits — sits there listing your services and doing none of the work.',
        'Every one of those manual steps is a job your website could be doing on its own, including evenings and weekends, when your office is closed but your customers are still deciding.',
      ],
    },

    {
      type: 'compare',
      title: 'Two versions of the same website.',
      before: {
        label: 'A brochure website',
        rows: [
          'Lists services — visitor leaves',
          'Contact form lands in an inbox',
          'Manual quoting, days of delay',
          'Data in spreadsheets, no single truth',
          'Rebuilt every three years, starts over',
        ],
      },
      after: {
        label: 'A Website Operating System',
        rows: [
          'Books, quotes and sells itself',
          'Leads auto-qualified into your CRM',
          'Instant quotes and payments',
          'One live source of truth',
          'Compounds every single month',
        ],
      },
    },

    {
      type: 'features',
      eyebrow: 'What we connect',
      title: 'Everything your business runs on — behind one front door.',
      lede: 'We don’t sell you more tools. We connect the ones you already pay for, and add what’s missing — so your website stops being a separate thing you maintain and becomes the place the business operates from.',
      items: [
        {
          title: 'Bookings & scheduling',
          body: 'Customers book, reschedule and pay deposits themselves. Calendars sync, reminders send automatically, and no-shows drop without anyone lifting a phone.',
          outcome: 'Replaces phone-tag, and the no-show that follows it',
        },
        {
          title: 'CRM & sales pipeline',
          body: 'Every enquiry lands as a tracked record, scored and routed to the right person. Nothing sits forgotten in a shared inbox, and you can see exactly where revenue is stuck.',
          outcome: 'Replaces the shared inbox nobody actually owns',
        },
        {
          title: 'Payments, quotes & invoicing',
          body: 'Generate quotes, take deposits, run subscriptions and reconcile invoices directly from the site. Card and EFT settlement.',
          outcome: 'Turns days of quote turnaround into minutes',
        },
        {
          title: 'AI agents & assistants',
          body: 'An assistant that knows your business, answers real questions, qualifies leads, books jobs and hands off to a human at the right moment — on the site and on WhatsApp.',
          outcome: 'Answers the enquiry that arrives after hours',
        },
        {
          title: 'Workflow automation',
          body: 'Follow-ups, reminders, handovers, escalations and reports. Every repetitive step your staff does by hand becomes a workflow that runs without them.',
          outcome: 'Staff hours back, and steps that never get skipped',
        },
        {
          title: 'Live dashboards',
          body: 'Leads, bookings, revenue, spend and pipeline on one screen, updating as it happens, with attribution back to the channel that produced each sale.',
          outcome: 'Decisions stop waiting on a monthly spreadsheet',
        },
        {
          title: 'Client & staff portals',
          body: 'Secure logins where customers track jobs, download documents and pay, and where your team works — without another per-seat subscription.',
          outcome: 'Fewer “where is my job?” calls, every week',
        },
        {
          title: 'Inventory & operations',
          body: 'Stock, orders, job progress and fulfilment connected to the same system your customers and staff already use, with no double-capturing.',
          outcome: 'One version of the truth, so decisions stop waiting',
        },
      ],
    },

    {
      type: 'timeline',
      eyebrow: 'What it looks like in practice',
      title: 'One enquiry, start to finish, after you’ve closed for the weekend.',
      lede: 'Friday, twelve minutes after the last person in your office logged off. This is the same journey on a brochure site and on an operating system — the difference isn’t the traffic, it’s what happens after someone arrives.',
      steps: [
        {
          time: '17:12',
          actor: 'Customer',
          title: 'They arrive from an AI answer, not a search result',
          body: 'Someone asks an assistant who to use for the work you do. Your site is structured and credible enough to be cited, so you’re in the answer. They land on the page just after five on a Friday.',
        },
        {
          time: '17:14',
          actor: 'Assistant',
          title: 'They get a real answer instead of a contact form',
          body: 'They ask something specific — do you cover their area, can you handle their size of job, roughly what does it cost. The assistant knows your business well enough to answer properly, and asks the two or three questions you’d have asked yourself.',
        },
        {
          time: '17:19',
          actor: 'System',
          title: 'They book, and pay a deposit, without you',
          body: 'A real slot from your live calendar, not a “we’ll be in touch”. Deposit taken, confirmation sent, reminders scheduled. The slot is gone from your availability before you’ve reached the car park.',
        },
        {
          time: '17:19',
          actor: 'System',
          title: 'The record writes itself',
          body: 'They exist in your CRM with everything they said, scored against how you rank a good job, routed to whoever handles that kind of work. Nobody re-types anything, and nothing depends on someone remembering.',
        },
        {
          time: 'Mon 08:10',
          actor: 'You',
          title: 'You find out on Monday — and it’s already handled',
          body: 'The job is on the calendar, the deposit cleared on Friday, the file is prepared, and the dashboard shows where it came from. Your first decision of the week is about the work, not about which weekend enquiries still need chasing.',
        },
      ],
      coda: 'On a brochure site, that same person filled in a form at 17:12 on Friday and waited. By the time anyone read it on Monday morning, they had already booked whoever answered first. Nothing about the traffic changed. Everything about the outcome did.',
    },

    {
      type: 'prose',
      eyebrow: 'Why rankings alone stopped working',
      title: 'Traditional SEO is now the floor, not the strategy.',
      paragraphs: [
        'Ranking on Google used to be the whole game. It isn’t anymore. Buyers now open ChatGPT, Claude, Gemini or Perplexity and ask which company they should use — and those systems recommend businesses whose sites are structured, credible and machine-readable. If your website isn’t built for that, you are invisible in the fastest-growing discovery channel there is.',
        'But visibility is only half of it. Traffic that arrives at a brochure mostly leaves. A site that ranks beautifully but can’t book, quote, qualify or transact is still handing most of its commercial value away. Getting found and getting paid are two different engineering problems — we solve both, in the same system.',
      ],
      points: [
        'Structured data and semantic architecture so AI systems can cite you',
        'Core Web Vitals and performance engineering that protects rankings',
        'Conversion paths that turn arriving traffic into booked, paid work',
        'Attribution that shows which channel actually produced revenue',
      ],
    },

    {
      type: 'features',
      eyebrow: 'What it becomes in your sector',
      title: 'The same system, shaped around how you actually trade.',
      lede: '“Operating system” means something different in a restaurant than it does in a law firm. These are the workflows we typically build first in each — illustrative of the approach, and confirmed against your real operations during the audit.',
      columns: 2,
      items: [
        {
          title: 'Hospitality & venues',
          body: 'Table or room booking with deposits held against no-shows. Automatic reminders and rebooking prompts. Menu, event and availability updates in one place. Reviews requested at the moment guests are happiest.',
        },
        {
          title: 'Trades & field services',
          body: 'Job requests qualified before they reach your phone. Quotes generated from your own pricing rules. Scheduling that respects travel time and crew capacity. Photos, sign-off and payment collected on site.',
        },
        {
          title: 'Professional services',
          body: 'Intake forms that build the matter file automatically. Engagement letters and e-signature without the back-and-forth. A client portal for documents, status and invoices.',
        },
        {
          title: 'E-commerce & retail',
          body: 'Stock, orders and fulfilment connected to the same records your team and customers already use, so nothing is captured twice and the storefront never sells what you don’t have.',
        },
      ],
    },

    {
      type: 'process',
      eyebrow: 'How we do it',
      title: 'From brochure to operating system.',
      lede: 'No disruption to trading, and in most cases no rebuild. We layer the system onto what you already have.',
      steps: [
        {
          n: '01',
          title: 'Audit & map',
          body: 'We map how your business actually operates today — every manual step, every disconnected tool, every place revenue leaks. You get the findings and the opportunity map whether or not you continue with us.',
        },
        {
          n: '02',
          title: 'Connect & build',
          body: 'We wire up the highest-value workflow first — usually the one costing you the most hours or losing the most leads — and get it live fast, so the system pays for itself before the full build finishes.',
        },
        {
          n: '03',
          title: 'Operate & compound',
          body: 'Every month we add capability, tighten conversion and automate another manual process. The system gets more valuable over time instead of ageing towards the next expensive rebuild.',
        },
      ],
    },

    {
      type: 'pricingPointer',
      eyebrow: 'Retainer plans',
      title: 'Built once. Improved every month.',
      lede: 'A website project ends at launch and starts depreciating; an operating system compounds. Every retainer starts on the Website OS base from $450 / R6,500 a month, and you add only the modules you need on top.',
    },

    {
      type: 'faq',
      items: [],
    },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Find out what your website should be doing.',
      lede: 'We map how your business operates today, show you where revenue is leaking and what each fix is worth — and you keep the findings either way.',
      secondary: { href: '/pricing', label: 'Build your retainer' },
    },
  ],

  faqs: [
    {
      q: 'Do you have to rebuild our website?',
      a: 'Usually not. In most cases we layer the system onto the site you already have, so there is no disruption to trading and no starting from scratch. Where a rebuild genuinely is the cheaper path, the audit will say so and show you why.',
    },
    {
      q: 'How long before something is actually live?',
      a: 'We build the highest-value workflow first — normally the one costing you the most hours or losing the most leads — so something measurable is running well before the full build finishes, rather than everything landing at once at the end.',
    },
    {
      q: 'What happens to the tools we already pay for?',
      a: 'They get connected rather than replaced, wherever they are worth keeping. The goal is one system to operate from, not a longer list of subscriptions. If something genuinely is not earning its keep, we will say so.',
    },
    {
      q: 'Who owns the system?',
      a: 'You do. Your site, your data, your customer records and your accounts with every tool we connect, on your infrastructure. There is no box to be locked into, and full data export is always available.',
    },
  ],
};
