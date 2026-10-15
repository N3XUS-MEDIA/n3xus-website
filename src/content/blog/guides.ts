import type { Article } from './types';

const p = (text: string) => ({ kind: 'p' as const, text });
const h2 = (text: string) => ({ kind: 'h2' as const, text });
const li = (text: string) => ({ kind: 'li' as const, text });

/**
 * Practical guides, each written to answer one question a buyer would type.
 *
 * These sit alongside the first nine articles and deliberately do not repeat
 * them: where an older piece already covers a subject (why a website isn't
 * generating leads, SEO vs GEO, after-hours enquiries) these take the next
 * question a reader would ask — how do I check, what do I do first, how do I
 * decide.
 *
 * Rules that apply here as everywhere (see blog.test.ts and
 * docs/CLAIMS-REGISTER.md): no statistics without a source, no prices, no
 * promises about rankings or AI placement.
 */
export const guideArticles: Article[] = [
  {
    slug: 'check-if-chatgpt-recommends-your-business',
    title: 'How to check whether ChatGPT recommends your business',
    category: 'Growth',
    pillar: 'growth',
    intent: 'problem',
    market: 'both',
    keyphrase: 'how to check if chatgpt recommends my business',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 5,
    standfirst:
      'More buyers now ask an assistant who to use before they ever open a search page. You can find out in an afternoon whether you are in those answers, without any tools, by asking the questions a buyer would ask.',
    blocks: [
      p(
        'Your analytics will not tell you this. When someone asks ChatGPT or Gemini for a recommendation and then goes straight to a supplier, nothing shows up as a visit to your site, and nothing shows up as a lost one either. The only way to find out is to ask the assistants yourself.',
      ),
      p(
        'It takes an afternoon, and it is the most useful hour you can spend on this subject, because it tells you whether any of the advice about AI visibility applies to you yet.',
      ),

      h2('Step 1: write the questions a buyer would type'),
      p(
        'Not the questions you wish they asked. The ones they actually would, in their words, at the stage they are at. Aim for six to ten, across four kinds:',
      ),
      li('The category and the place: “who builds custom software in Cape Town?” or “best accountant for a small manufacturing business in Leeds”.'),
      li('The problem, not the service: “my website gets visitors but no enquiries, who can help?”'),
      li('The comparison: “what should I look for in a marketing agency?” and “[your name] vs [a competitor]”.'),
      li('Your own name: “what does [your business] do?” and “is [your business] any good?”'),

      h2('Step 2: ask each assistant, from a clean start'),
      p(
        'Put every question to ChatGPT, Gemini, Claude and Perplexity. Start a new conversation each time, so earlier questions do not colour the answer, and where you can, ask while logged out or in a private window, because some assistants personalise.',
      ),
      p(
        'Answers vary from one asking to the next. That is normal, and it is why you ask a few different ways rather than relying on one reply.',
      ),

      h2('Step 3: write down what comes back'),
      p('A simple table is enough. For every question and assistant, record:'),
      li('Whether you were named at all.'),
      li('Whether what it said about you was accurate: what you do, where, for whom.'),
      li('Who else was named, and how they were described.'),
      li('Which sources it cited, if it showed any. Those are the pages the assistant relied on.'),

      h2('How to read the result'),
      p(
        'Most businesses land in one of three places. You are absent, which is common and fixable. You are present but described wrongly or thinly, which usually means the assistant is working from an old or vague page. Or a competitor is named again and again, which tells you exactly whose pages the assistants find easiest to use.',
      ),

      h2('What to do about each'),
      li('Absent: look at what the named businesses have that you do not. It is usually plain, specific pages: what they do, where, for whom, with the common questions answered directly.'),
      li('Described wrongly: find the source it cited and fix or replace that page. Check that your own site states the facts in plain sentences, not only in images or buried in a footer.'),
      li('A competitor dominates: read their pages the way an assistant would. Notice what they state outright that you leave implied.'),

      h2('What this will not tell you'),
      p(
        'It is a snapshot, not a ranking. No one can promise you a place in these answers, and we cannot control which businesses an assistant names. What you can control is how easy your site is to read and trust, and whether the facts about you are consistent everywhere they appear.',
      ),
      p(
        'Repeat the exercise monthly with the same questions. A change in who gets named, and why, is the closest thing to a ranking report this channel has.',
      ),
    ],
    faqs: [
      {
        q: 'How often should I check whether AI assistants recommend my business?',
        a: 'Monthly is enough for most businesses. Use the same questions each time so you can compare, and note any change in who is named or how you are described. Checking daily mostly measures normal variation between answers.',
      },
      {
        q: 'Does it matter which assistant I ask?',
        a: 'Yes. ChatGPT, Gemini, Claude and Perplexity draw on different sources and behave differently, so you can be named in one and absent from another. Ask all four, and pay most attention to the ones your own customers say they use.',
      },
      {
        q: 'Can I pay to be recommended by ChatGPT or Gemini?',
        a: 'Not in the organic answer, as far as we can tell. Being named depends on whether the assistant can find, read and trust your pages. Anyone selling guaranteed placement is selling something they cannot control.',
      },
    ],
    related: ['get-recommended-by-ai-assistants', 'seo-vs-geo-what-changed'],
  },

  {
    slug: 'what-is-a-website-operating-system',
    title: 'What is a website operating system, and is your business ready for one?',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'solution',
    market: 'both',
    keyphrase: 'what is a website operating system',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 6,
    standfirst:
      'A website operating system is a business website that does the work your team does by hand today: bookings, quotes, payments, customer records. Here is what it is, what it is not, and how to tell whether you are ready for one.',
    blocks: [
      p(
        'Most business websites describe the business. A website operating system runs part of it. The difference shows up in the things your team does repeatedly: taking a booking, writing a quote, chasing a payment, copying a customer’s details from one place to another.',
      ),

      h2('What it actually connects'),
      p('Depending on the business, a website operating system joins up some or all of these behind the site:'),
      li('Bookings and scheduling, with real availability, deposits and reminders.'),
      li('Quotes, invoices and payments, generated from your own pricing rules.'),
      li('A customer record for every enquiry, so nothing sits in a shared inbox nobody owns.'),
      li('An assistant that answers common questions and passes real enquiries to a person.'),
      li('Automations for the follow-ups, reminders and handovers your team currently does by hand.'),
      li('Portals where customers track their job and staff do theirs.'),
      li('One live view of enquiries, bookings and revenue, instead of five logins and a spreadsheet.'),

      h2('What it is not'),
      p(
        'It is not a redesign. Usually it is built onto the website you already have, so there is nothing to relaunch. It is also not a pile of plug-ins: the point is that the parts share one set of customer records, so nobody types the same details twice.',
      ),
      p(
        'And it is not a product you are locked into. A sensible build keeps the site, the data and the accounts in your name, on your infrastructure, so you can leave.',
      ),

      h2('How to tell whether you are ready'),
      p('You are probably ready if three or more of these sound familiar:'),
      li('Customers phone to book something they could book themselves.'),
      li('Quotes are typed by hand and go out later than they should.'),
      li('The same customer’s details live in more than one place.'),
      li('Enquiries arrive in an inbox and you cannot say how many went cold.'),
      li('Someone chases payments by email.'),
      li('You cannot answer “where did last month’s customers come from?” without an afternoon of work.'),

      h2('Where to start'),
      p(
        'Not with all of it. Start with the single workflow that costs you the most time or loses you the most enquiries, get that live, and add the next one from there. The most valuable piece working early is worth more than everything arriving at once at the end.',
      ),
      p(
        'Because it keeps improving after launch, this is normally delivered as a monthly arrangement rather than a one-off project. A website that stops at launch starts ageing the next day.',
      ),
    ],
    faqs: [
      {
        q: 'Do I need a new website to get a website operating system?',
        a: 'Usually not. In most cases the system is built onto the site you already have. A rebuild is only worth it when the current site is too slow, insecure or limited to build on, and a short diagnostic should establish that before you commit to anything.',
      },
      {
        q: 'Who owns a website operating system once it is built?',
        a: 'You should. The website, the data, the customer records and your accounts with every connected tool should all stay in your name, so you can export everything and leave. Be wary of any arrangement where you cannot.',
      },
      {
        q: 'What should a business automate first on its website?',
        a: 'The one workflow that costs the most time or loses the most enquiries, often bookings or quotes. Get that working properly, measure it, then add the next. Starting small means something is paying off while the rest is still being built.',
      },
    ],
    related: ['why-your-website-isnt-generating-leads', 'signs-your-business-has-outgrown-its-systems'],
  },

  {
    slug: 'move-paper-forms-online',
    title: 'How to move paper forms online without losing control of them',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'problem',
    market: 'both',
    keyphrase: 'how to move paper forms online',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 6,
    standfirst:
      'If your forms still run on download, print, sign, scan and email, you are paying for it in chasing, re-typing and lost paperwork. Moving them online properly is a bigger job than putting a PDF on a website, and worth doing well.',
    blocks: [
      p(
        'Plenty of organisations publish dozens of forms as downloads. The person has to print one, fill it in, sign it, scan it and email it back, and then wait. At your end, someone opens each email, checks the attachment, re-types what is on it and files it somewhere.',
      ),

      h2('What the loop really costs'),
      li('Incomplete forms, because nothing checks the form until a person reads it.'),
      li('Chasing, because the missing page or signature is found days later.'),
      li('Re-typing, because the details have to be keyed into whatever system you use.'),
      li('No visibility, because the person who filed cannot see where their form is, so they phone to ask.'),
      li('Risk, because personal documents sit in inboxes and downloads folders.'),

      h2('What an online form should do'),
      p('A PDF on a web page is not an online form. A proper one should:'),
      li('Check as the person types, so a missing field or a wrongly formatted ID number is caught before it is sent.'),
      li('Save progress, so a long form can be finished later.'),
      li('Accept a signature and the supporting documents in one place.'),
      li('Store everything securely together, instead of scattering it across inboxes.'),
      li('Give the person a reference and a way to see the status.'),
      li('Give your team a queue: what has arrived, who has it, what is overdue.'),

      h2('Two things to check before you build'),
      p(
        'Signatures. The rules for electronic signatures differ by country and by document. In South Africa, for example, the law distinguishes between an ordinary electronic signature and an advanced one, and some documents need more than a typed name. Ask your legal adviser which of your forms need what.',
      ),
      p(
        'Prescribed forms. If a regulator or court requires an official layout, the online version should still produce that exact form from the answers, so the process that follows does not change.',
      ),
      p(
        'Personal information. Forms collect identity numbers, addresses and sometimes much more. Decide up front who can see them, how long you keep them and what happens in a breach. Privacy law, such as POPIA in South Africa, applies from the first submission.',
      ),

      h2('Where to start'),
      p(
        'Pick the one form that arrives most often and has the fewest exceptions. Move that first, watch how people use it, and fix what they trip over before moving the next. A first form that works is worth more than forty half-converted ones.',
      ),
    ],
    faqs: [
      {
        q: 'Is an online form legally as good as a signed paper form?',
        a: 'It depends on the document and the country. Many forms are fine with an ordinary electronic signature, but some need an advanced signature or a specific format. Check the requirement for each form with a legal adviser before you rely on it.',
      },
      {
        q: 'Can an online form still produce the official paper layout?',
        a: 'Yes. If a regulator or court needs a prescribed layout, the system can generate that exact form from the answers, so downstream processes stay the same while the person filling it in gets a guided online experience.',
      },
      {
        q: 'Which form should I move online first?',
        a: 'Choose the form you receive most often that has the fewest special cases. High volume shows the benefit quickly, and few exceptions mean fewer surprises while you learn what your users trip over.',
      },
    ],
    related: ['what-is-a-website-operating-system', 'signs-your-business-has-outgrown-its-systems'],
  },

  {
    slug: 'automate-quotes-and-bookings',
    title: 'How to automate quotes and bookings without losing the personal touch',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'solution',
    market: 'both',
    keyphrase: 'how to automate quotes and bookings for a small business',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 5,
    standfirst:
      'Quotes that go out late and bookings made by phone are two of the most common reasons a ready-to-buy customer goes elsewhere. You can automate both without making the business feel like a machine, if you decide what stays with a person.',
    blocks: [
      p(
        'Someone who wants to buy is usually deciding while they are on your site. If the next step is “fill in a form and wait for a call”, you are asking them to wait while a competitor answers first. Quotes and bookings are where that waiting costs you most.',
      ),

      h2('Quotes: write the rules down first'),
      p(
        'A quote can be automated when the way you price it can be written down. Most businesses find they already have rules, they just live in one person’s head: this much per unit, this extra for that, this discount in these cases.',
      ),
      p('Before you build anything, write down:'),
      li('What you need to know to price a job: size, location, materials, timing.'),
      li('How each answer changes the price.'),
      li('Which situations are too unusual to price automatically.'),
      p(
        'The last point matters. A good system quotes the common jobs instantly and routes the unusual ones to a person, with everything the customer has already told you.',
      ),

      h2('Bookings: show real availability'),
      p(
        'The version that works connects to your actual calendar, so a customer sees only slots you can honour. Add deposits if no-shows are a problem, and reminders by email or WhatsApp. Reminders alone often reduce missed appointments, and they cost your team nothing once they are set up.',
      ),

      h2('What to keep with a person'),
      li('Anything unusual, high value or sensitive.'),
      li('The first conversation with a customer who is clearly unsure.'),
      li('Complaints and anything that needs judgement or an apology.'),
      p(
        'Automation should clear the repetitive requests so your people have time for exactly these. A hand-off that passes the full conversation across, so the customer never has to repeat themselves, is what keeps it feeling personal.',
      ),

      h2('What to measure'),
      p(
        'Track how long a quote takes from request to customer, how many quotes turn into bookings, and how many enquiries arrive outside office hours that you would otherwise have answered the next day. Those three tell you whether it is working.',
      ),
    ],
    faqs: [
      {
        q: 'Can every quote be automated?',
        a: 'No, and it should not try. Standard jobs priced by clear rules can be quoted instantly. Unusual or high-value jobs should go to a person with the customer’s details attached, so they get a considered answer rather than a wrong automatic one.',
      },
      {
        q: 'How do online bookings avoid double-booking?',
        a: 'By reading your real calendar. The system only offers slots that are free, and a slot disappears the moment it is taken. That is why connecting to the calendar you already use matters more than any booking widget.',
      },
      {
        q: 'Will automating quotes and bookings make my business feel impersonal?',
        a: 'Not if people handle what needs judgement. Faster replies and fewer back-and-forth calls usually feel better to customers, and your team spends its time on the conversations where a person genuinely makes the difference.',
      },
    ],
    related: ['stop-losing-after-hours-enquiries', 'what-is-a-website-operating-system'],
  },

  {
    slug: 'small-business-seo-what-still-matters',
    title: 'Small business SEO in 2026: what still matters, and what to skip',
    category: 'Growth',
    pillar: 'growth',
    intent: 'solution',
    market: 'both',
    keyphrase: 'small business seo what still matters',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 6,
    standfirst:
      'Most small-business SEO advice is either outdated or sold by someone who profits from complexity. The basics that still matter are few and unglamorous, and you can check most of them yourself.',
    blocks: [
      p(
        'Search engines have changed a lot, and so have the places people look for answers. But the fundamentals of being found by someone who is already looking for what you sell have changed much less than the advice would suggest.',
      ),

      h2('What still matters'),
      li('A fast site that works on a phone. Most visits start on one.'),
      li('A page for each thing you do, and each place you do it. “Services” on one page is much weaker than a clear page for each service and area.'),
      li('Clear titles and descriptions that say what the page is, in the words a customer would use.'),
      li('A complete, accurate Google Business Profile, if customers find you locally. Same name, address and phone number everywhere.'),
      li('Real reviews, and replies to them.'),
      li('Content that answers the actual questions customers ask, in plain language, under headings that match the question.'),
      li('Other credible sites that mention or link to you, because search engines and AI assistants both treat that as a trust signal.'),

      h2('What you can skip'),
      li('Stuffing a keyword into every sentence. It reads badly and no longer works.'),
      li('Buying links or “SEO packages” that promise a number of them.'),
      li('Dozens of thin pages that say almost the same thing.'),
      li('Chasing every algorithm change. If the basics are sound, most of them do not matter to you.'),
      li('Anyone who promises a ranking. Nobody outside the search engine decides that, and we cannot control it either.'),

      h2('How to tell if it is working'),
      p(
        'Look at three things monthly: how many people reach your site from search, which pages they land on, and how many of them become enquiries. Traffic that never turns into an enquiry is a conversion problem, not an SEO problem, and more traffic will not fix it.',
      ),

      h2('How long it takes'),
      p(
        'Months, not days. A new or improved page usually takes weeks to be picked up and longer to settle. Be suspicious of anyone who shows you dramatic results in a fortnight.',
      ),

      h2('Search is no longer the only place to be found'),
      p(
        'Buyers also ask AI assistants who to use. The good news is that most of the work above helps there too: plain pages, specific facts, and questions answered directly are exactly what an assistant can use.',
      ),
    ],
    faqs: [
      {
        q: 'How long does SEO take to work for a small business?',
        a: 'Usually months. Pages take weeks to be indexed and longer to settle in the results, and competitive terms take longer still. Be cautious of anyone promising results within a few weeks or guaranteeing a position.',
      },
      {
        q: 'Do I need a Google Business Profile?',
        a: 'If customers find you by location, yes. Fill it in completely, keep your name, address and phone number identical everywhere, add real photos and ask happy customers for reviews. It is often the biggest local lever for a small business.',
      },
      {
        q: 'Is SEO still worth doing now that people use AI assistants?',
        a: 'Yes. Clear pages, specific facts and directly answered questions help in both places. SEO is still how most people are found, and the same work makes your site easier for AI assistants to read and cite.',
      },
    ],
    related: ['seo-vs-geo-what-changed', 'get-recommended-by-ai-assistants'],
  },

  {
    slug: 'which-marketing-channel-is-working',
    title: 'How to tell which marketing channel is actually producing your customers',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'problem',
    market: 'both',
    keyphrase: 'how to know which marketing channel is working',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 6,
    standfirst:
      'If you spend on ads, social, search and perhaps TV, you probably cannot say which of them brought in last month’s customers. You can get a usable answer without expensive software, by recording where each enquiry came from at the moment it arrives.',
    blocks: [
      p(
        'The usual problem is not a lack of data. It is that enquiries arrive by phone, WhatsApp, email and a web form, and nothing records how the person found you. By month-end, every channel claims the result.',
      ),

      h2('Start by recording the source at the door'),
      p('Four habits get you most of the way:'),
      li('Ask. “How did you hear about us?” on the form and on the phone. Imperfect, but it catches what tracking cannot, like word of mouth and TV.'),
      li('Tag your links. Campaign tags on your ads and emails let your site tell which one a visitor clicked.'),
      li('Record it automatically. Your site can note how each visitor arrived, such as search, social, an AI assistant or a campaign, and attach that to the enquiry. Ours does this, and the lead email says where the person came from.'),
      li('Keep one list. Every enquiry, from every route, in one place. Otherwise there is nothing to count.'),

      h2('Count customers, not just leads'),
      p(
        'A channel that produces many enquiries and no customers is more expensive than it looks. Follow each enquiry through to whether it became a sale, and what it was worth, even if you do it by hand in a spreadsheet at first.',
      ),

      h2('Know what the numbers cannot show'),
      li('Brand and broadcast work, such as TV, builds recognition over weeks. It rarely shows up as a click, so look for a lift in direct visits, branded searches and enquiries after a flight, not for a tagged link.'),
      li('Someone may see an ad, search for you later and arrive as “search”. The last click gets the credit even though the first one started it.'),
      li('Small numbers swing widely. Do not judge a channel on a handful of enquiries.'),

      h2('A monthly routine'),
      p(
        'Once a month, list enquiries by source, then customers by source, then what each channel cost. Move spend gradually toward what produces customers, and keep a little in channels that build the brand even if they do not show up neatly.',
      ),
    ],
    faqs: [
      {
        q: 'How do I track where my enquiries come from?',
        a: 'Record the source when the enquiry arrives. Ask people how they heard about you, tag your campaign links, let your site note how each visitor arrived, and keep every enquiry in one list so you can count them by source.',
      },
      {
        q: 'Why do all my channels claim the same customers?',
        a: 'Because each platform measures its own contribution and nobody measures them together. A customer might see an ad, search for you later and book through search, and both claim it. One shared record of enquiries fixes this.',
      },
      {
        q: 'Can I measure TV or brand advertising?',
        a: 'Not through clicks. Look for changes after a campaign: more direct visits, more searches for your name and more enquiries mentioning it. Plan the measurement before the campaign runs, so you have a baseline to compare against.',
      },
    ],
    related: ['why-your-website-isnt-generating-leads', 'what-to-fix-first-in-your-business'],
  },

  {
    slug: 'should-you-rebuild-your-website',
    title: 'Should you rebuild your website? A way to decide',
    category: 'Strategy',
    pillar: 'strategy',
    intent: 'decision',
    market: 'both',
    keyphrase: 'should i rebuild my website',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 5,
    standfirst:
      'A rebuild feels like the answer when a website disappoints. Often it is not: the problem is what the site does, not how it looks. Here is a way to decide before you spend anything.',
    blocks: [
      p(
        'Suppliers who sell websites will tell you to rebuild, and suppliers who sell optimisation will tell you to optimise. The honest answer depends on what is actually wrong, and that is usually answerable in a short review.',
      ),

      h2('Reasons to rebuild'),
      li('It is slow, and the cause is the platform or the way it was built, not just heavy images.'),
      li('It is insecure or can no longer be updated safely.'),
      li('Nobody on your side can change the content without calling a developer.'),
      li('It cannot connect to the tools you need, such as booking, payments or your customer records.'),
      li('It does not work properly on a phone and fixing that means rewriting most of it.'),

      h2('Reasons not to'),
      li('You are unhappy with the results, but the site is sound. The problem is that it does not book, quote, answer or follow up, which you can add to what you have.'),
      li('It already ranks for things that matter. A rebuild that changes the address of your pages can lose that unless it is done carefully.'),
      li('The content is the problem. A beautiful new site with the same vague words will perform the same.'),

      h2('Questions to ask first'),
      li('Where, exactly, are visitors dropping out?'),
      li('Which jobs does the site fail to do: booking, quoting, answering questions, capturing details?'),
      li('Can those jobs be added to the current site?'),
      li('If we rebuild, what happens to the pages that already bring us visitors?'),

      h2('The cost nobody mentions'),
      p(
        'A rebuild resets you. Rankings, links and habits built up over years can be lost if addresses change without proper redirects, and the new site starts ageing the day it launches. Adding capability to a sound site compounds instead.',
      ),

      h2('How to decide'),
      p(
        'Do a short diagnostic before you commit: how the site performs, what it fails to do, what it is built on, and whether the gaps can be closed in place. The answer should come with a written recommendation, and it should be yours to keep whoever you decide to work with.',
      ),
    ],
    faqs: [
      {
        q: 'How do I know if my website needs a rebuild or just improvements?',
        a: 'Ask whether the platform itself is the problem: slow for structural reasons, insecure, impossible to update, or unable to connect to what you need. If the site is sound but does not book, quote or follow up, add those instead of rebuilding.',
      },
      {
        q: 'Will a new website hurt my Google rankings?',
        a: 'It can. If page addresses change without proper redirects, pages that already rank can disappear from results. A careful rebuild keeps addresses where possible and redirects the rest, and checks rankings and traffic before and after launch.',
      },
      {
        q: 'Can I add bookings and quotes to my existing website?',
        a: 'Usually, yes. Most sites can have booking, quoting, payments and customer records connected without a rebuild. The exception is a site built on a platform that cannot connect to anything, which a quick review will reveal.',
      },
    ],
    related: ['what-a-business-diagnostic-involves', 'what-is-a-website-operating-system'],
  },

  {
    slug: 'set-up-an-ai-assistant-for-customer-questions',
    title: 'How to set up an AI assistant for customer questions that does not make things up',
    category: 'Intelligence',
    pillar: 'intelligence',
    intent: 'solution',
    market: 'both',
    keyphrase: 'how to set up an ai assistant for customer questions',
    published: '2026-10-15',
    displayDate: 'October 2026',
    readingMinutes: 6,
    standfirst:
      'An assistant on your website is only as good as what it is allowed to say. The ones that make things up, or sound like a machine, usually skipped the same few decisions. Here is how to make them before you build anything.',
    blocks: [
      p(
        'Putting a chat window on your site is easy. Making it useful, and safe to leave answering customers when nobody is watching, is a matter of deciding a handful of things first.',
      ),

      h2('1. Decide its job'),
      p(
        'Pick one or two: answer common questions, qualify enquiries, book appointments, take someone’s details so a person can follow up. An assistant that tries to do everything does most of it badly.',
      ),

      h2('2. Give it a source of truth'),
      p(
        'The assistant should answer from your own approved content: the pages, FAQs and policies you already stand behind. That is what stops it inventing things. The strongest version answers from written copy, so it cannot state a price or a promise that you never wrote.',
      ),
      p(
        'Some questions are better answered with a written answer than generated each time. “How much does it cost?” should always get the same careful reply.',
      ),

      h2('3. Decide what it must not do'),
      li('Quote prices you do not publish.'),
      li('Give legal, medical or financial advice.'),
      li('Promise results, dates or availability it cannot know.'),
      li('Pretend to be a person if someone sincerely asks.'),
      p('When it is not sure, the right answer is “I do not know, let me get someone who does”, not a confident guess.'),

      h2('4. Build the hand-off'),
      p(
        'Every assistant needs a way out: a simple form or a link that gets a real person, with the conversation attached so the customer does not repeat themselves. For a business, this is the point. The assistant answers the easy questions and captures the interested people.',
      ),

      h2('5. Make it sound like someone you would hire'),
      p(
        'Short sentences, plain words, the way your best team member talks. Avoid corporate phrasing and the stiff “I am an AI assistant, how may I help you today” opening. Include links that work, so the answer can lead somewhere.',
      ),

      h2('6. Test it with real questions, then keep reading the logs'),
      p(
        'Collect twenty real questions customers have asked and run them through. Fix what it gets wrong. After launch, read what people actually ask. The questions it could not answer are your next piece of content.',
      ),
    ],
    faqs: [
      {
        q: 'How do I stop an AI assistant from making things up?',
        a: 'Limit it to your own approved content, and have it say it does not know when it is unsure. Answering common questions from written copy rather than generating each reply removes most of the risk, especially for prices and promises.',
      },
      {
        q: 'Should a website assistant be able to give prices?',
        a: 'Only if you publish them. If you quote each customer individually, the assistant should explain how pricing works and offer to take details for a quote. A consistent written answer is safer than letting it improvise a number.',
      },
      {
        q: 'What should an AI assistant do when it cannot answer?',
        a: 'Say so plainly, offer a few related things it can help with, and make it easy to leave details for a person. A graceful hand-off captures an interested customer instead of losing them to a wrong or evasive answer.',
      },
    ],
    related: ['stop-losing-after-hours-enquiries', 'what-is-a-website-operating-system'],
  },
];
