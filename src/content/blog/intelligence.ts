import type { Article } from './types';

const p = (text: string) => ({ kind: 'p' as const, text });
const h2 = (text: string) => ({ kind: 'h2' as const, text });
const li = (text: string) => ({ kind: 'li' as const, text });

export const intelligenceArticles: Article[] = [
  {
    slug: 'why-your-website-isnt-generating-leads',
    title: 'Why your website isn’t generating leads',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'problem',
    market: 'both',
    keyphrase: 'why is my website not generating leads',
    published: '2026-09-02',
    displayDate: 'September 2026',
    readingMinutes: 8,
    standfirst:
      'The usual assumption is a traffic problem. Often it is not — the visitors arrive, find nothing they can act on, and leave without ever appearing in a report.',
    blocks: [
      p(
        'When a website is not producing enquiries, the first instinct is to send more people to it. Sometimes that is right. Frequently it is the most expensive available option, because the traffic was never the constraint.',
      ),
      p('Work through these in order before spending anything on ads.'),

      h2('Can a visitor actually do anything?'),
      p(
        'Most business websites offer exactly one action: fill in a form and wait. That is a poor trade for somebody ready to buy. They wanted to check availability, get a rough price, or book — and instead they are asked to submit a request and hope.',
      ),
      p(
        'The sites that convert let people do the thing: see real availability, book a slot, get an indicative price, ask a question and get an answer. Each of those removes a wait, and waits are where intent decays.',
      ),

      h2('What happens to an enquiry after 5pm?'),
      p(
        'A meaningful share of enquiries arrive outside working hours. If yours land in an inbox until the next morning, then for a large part of every week your website is a message-taking service competing against suppliers who answer immediately.',
      ),
      p(
        'Response speed is not a nice-to-have in this category — it is frequently the whole contest. The business that replies while the buyer is still deciding wins work that had nothing to do with being better.',
      ),

      h2('Is it obvious within seconds what you do and who for?'),
      p(
        'Open your homepage and read only what is visible without scrolling. If it could describe four competitors, it is not saying anything. Visitors are not reading — they are checking whether they are in the right place, and giving up quickly if that is unclear.',
      ),

      h2('Are you asking for too much, too early?'),
      p(
        'Every field on a form is a reason to leave. Phone number, company size, budget range, "how did you hear about us" — each one added for internal convenience, each one costing enquiries. Ask for what you need to reply, and get the rest in the conversation.',
      ),

      h2('Can people find you where they are now looking?'),
      p(
        'Search is no longer only Google. A growing share of buyers open ChatGPT, Gemini or Perplexity and ask who they should use. Those tools recommend businesses whose sites they can read, parse and trust — and most sites are not built for that at all.',
      ),
      p(
        'This is a genuinely new failure mode. A site can rank respectably and still be invisible in the channel that is growing fastest.',
      ),

      h2('Do you know which enquiries you already lost?'),
      p(
        'If enquiries arrive in an inbox, nobody can answer this. There is no record of what came in, what was replied to, or what went quiet. Businesses in that position usually assume they have a traffic problem, because the follow-up problem is invisible by construction.',
      ),
      p(
        'This is worth fixing before anything else, for a reason beyond the leads themselves: until enquiries are tracked, you cannot tell whether any later change worked.',
      ),

      h2('The order that usually makes sense'),
      li('Make every enquiry land somewhere with a name against it'),
      li('Answer outside office hours, even if only to acknowledge and qualify'),
      li('Remove the waits — availability, pricing, booking'),
      li('Then, and only then, spend money increasing traffic'),
      p(
        'Done in this order, each step makes the next one worth more. Done in reverse, the first thing you buy is a bigger leak.',
      ),
    ],
    faqs: [
      {
        q: 'Should I rebuild my website to fix this?',
        a: 'Usually not. Most of these are additions to the site you already have — booking, tracking, an assistant that answers after hours — rather than reasons to start again. A rebuild is worth it when the site itself is the constraint, and that is rarer than it is sold.',
      },
      {
        q: 'How quickly can this change?',
        a: 'The lead-tracking and after-hours pieces can be live in a couple of weeks and change things immediately. Search and paid campaigns compound over months, not days.',
      },
      {
        q: 'Is this a traffic problem or a conversion problem?',
        a: 'You can tell by whether you know what happened to the enquiries you already received. If you cannot answer that, it is a conversion and follow-up problem, and buying traffic will make it more expensive rather than better.',
      },
    ],
    related: ['stop-losing-after-hours-enquiries', 'get-recommended-by-ai-assistants'],
  },

  {
    slug: 'stop-losing-after-hours-enquiries',
    title: 'How to stop losing the enquiries that arrive after hours',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'solution',
    market: 'both',
    keyphrase: 'how to handle enquiries after hours automatically',
    published: '2026-09-05',
    displayDate: 'September 2026',
    readingMinutes: 6,
    standfirst:
      'A large share of enquiries arrive when nobody is there to answer them. By Monday the buyer has usually booked whoever replied first.',
    blocks: [
      p(
        'Consider a specific, ordinary situation. Friday, twelve minutes after your last person logs off. Somebody who is ready to buy finds you, has two questions, and no way to get them answered. They fill in a form, or they do not, and they carry on looking.',
      ),
      p(
        'By the time anyone reads that on Monday, they have usually booked whoever answered first. Nothing about your marketing failed. The enquiry arrived. It simply had nowhere to go.',
      ),

      h2('The options, in ascending order of effort'),

      h2('1. Acknowledge automatically, and mean it'),
      p(
        'The lowest-effort fix: an immediate reply that confirms receipt, says specifically when a human will respond, and gives one useful thing in the meantime — a price range, a booking link, an answer to the most common question.',
      ),
      p(
        'This is not sophisticated and it is not nothing. It converts "no response" into "response pending", which holds attention for hours rather than minutes.',
      ),

      h2('2. Let them book without you'),
      p(
        'If your business runs on appointments, real availability on the site removes the exchange entirely. They pick a slot, it disappears from your calendar, they get a confirmation and a reminder. Add a deposit if no-shows are a problem — they usually stop being one.',
      ),

      h2('3. An assistant that can actually answer'),
      p(
        'Not a decision tree that asks which department. An assistant that knows your services, coverage, rough pricing and constraints, can answer a specific question, and can qualify — then hands to a human at the right moment with the conversation attached.',
      ),
      p(
        'The bar for this is worth being clear about: if it cannot answer "do you cover my area and roughly what does this cost", it is a form with a chat interface, and buyers can tell within one exchange.',
      ),

      h2('4. Route by urgency'),
      p(
        'Some enquiries genuinely should wake somebody. Most should not. Once enquiries are qualified as they arrive, it becomes possible to escalate the small number that warrant it and let the rest wait until morning — which is a better outcome than either treating everything as urgent or nothing.',
      ),

      h2('What this is worth'),
      p(
        'Estimate it with your own numbers rather than taking anyone’s word. Take the enquiries you receive in a month, the share that arrive outside working hours, your existing close rate and your average job value. That product is the annual figure at stake, and it is usually enough to fund the fix several times over.',
      ),
      p(
        'Two cautions on that sum. Use your current close rate, not an improved one — the claim is that you would have converted these at the rate you already achieve, not that answering faster makes you better at selling. And not every after-hours enquiry is lost today; some do wait. The honest version of this number is a ceiling, and it is still normally large.',
      ),

      h2('What not to do'),
      p(
        'Do not put a chat widget on the site and consider it handled. An assistant that cannot answer anything specific is worse than no assistant, because it converts a maybe into a demonstrated disappointment.',
      ),
    ],
    faqs: [
      {
        q: 'Will customers mind talking to an AI assistant?',
        a: 'Mostly they mind not getting an answer. What they object to is an assistant that cannot answer and will not hand over — so the two things that matter are that it knows your business properly and that it escalates cleanly to a human.',
      },
      {
        q: 'What should the assistant not do?',
        a: 'Quote prices it has inferred, promise timelines, or claim capabilities. Ours is constrained to answer from approved content and to say plainly when it does not know, which is a design decision rather than a limitation.',
      },
      {
        q: 'How long does this take to set up?',
        a: 'Automatic acknowledgement and booking are usually a couple of weeks. An assistant that answers properly takes longer, because the work is in the knowledge behind it rather than the chat window.',
      },
    ],
    related: ['why-your-website-isnt-generating-leads', 'whatsapp-for-south-african-business'],
  },

  {
    slug: 'custom-software-vs-off-the-shelf',
    title: 'Custom software or off-the-shelf: how to decide',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'solution',
    market: 'both',
    keyphrase: 'custom software vs off the shelf which to choose',
    published: '2026-09-06',
    displayDate: 'September 2026',
    readingMinutes: 7,
    standfirst:
      'Building is usually the wrong answer, and occasionally the only one. The question is not which is better but which failure you would rather have.',
    blocks: [
      p(
        'Most businesses asking this should buy. Off-the-shelf products are cheaper, faster, maintained by somebody else, and improve without you paying for it. Anyone who tells you otherwise as a general rule is selling development.',
      ),
      p('The interesting question is where that stops being true.'),

      h2('Buy when the process is normal'),
      p(
        'Accounting, payroll, email, scheduling, basic CRM — these are solved. Your version of them is not special, however it feels internally, and building your own means paying to reach a standard that a subscription already exceeds.',
      ),
      p(
        'A useful test: if you can describe the process to another business in your industry and they nod, buy it.',
      ),

      h2('Build when the process is the business'),
      p(
        'Sometimes the way you do a thing is the reason customers choose you. A pricing model nobody else runs, a workflow that lets you turn work around faster, a way of handling a job that competitors cannot copy easily.',
      ),
      p(
        'Force that into a product built for the standard approach and you either lose the advantage or spend years fighting the software. That is when building is not indulgence.',
      ),

      h2('The middle case, which is most cases'),
      p(
        'Usually the answer is neither. You buy the standard components and build the small piece that joins them in your particular way — the layer that moves a booking into the job system, applies your pricing rules, and writes the invoice.',
      ),
      p(
        'That integration layer is often a fraction of a full build, and it captures most of the value people imagine they need a bespoke system for.',
      ),

      h2('Questions that decide it'),
      li('Could a competitor buy the same product and get the same result? If yes, buy it.'),
      li('Are you working around the product more than with it? That is the signal to build.'),
      li('Is the workaround a spreadsheet somebody maintains by hand? That is a build waiting to be scoped.'),
      li('Would this still matter in three years, or is it this year’s problem?'),

      h2('What building actually commits you to'),
      p(
        'The build is the smaller half. Custom software needs hosting, updating, securing, and someone who understands it when something breaks. Budget for that at the start, or you will discover it later at a worse moment.',
      ),
      p(
        'Two things to insist on if you do build. You own the code, in your own repository, with documentation — anything else is a hostage arrangement. And it should be written so somebody other than the original developer can maintain it, because eventually somebody else will.',
      ),

      h2('The honest summary'),
      p(
        'Buy the boring parts. Build the part that is genuinely yours. Be suspicious of anyone whose recommendation happens to match the largest thing they sell — including us.',
      ),
    ],
    faqs: [
      {
        q: 'Is custom software more expensive than a subscription?',
        a: 'Almost always upfront, and not always over several years — subscriptions scale with seats and usage while a build is mostly a fixed cost plus maintenance. The comparison worth doing is total cost over three years including the hours people currently spend working around the product.',
      },
      {
        q: 'Do we own custom software you build?',
        a: 'You should own any custom software anyone builds you — the code, in your repository, with documentation and tests. If a supplier is vague about this, that is the answer to a different and more important question.',
      },
      {
        q: 'What is the middle option between buying and building?',
        a: 'Buying the standard components and building only the layer that connects them in the way your business actually works. It is usually a fraction of a full build and captures most of the value.',
      },
    ],
    related: ['what-a-business-diagnostic-involves', 'signs-your-business-has-outgrown-its-systems'],
  },
];
