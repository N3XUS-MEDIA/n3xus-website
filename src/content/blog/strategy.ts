import type { Article } from './types';

const p = (text: string) => ({ kind: 'p' as const, text });
const h2 = (text: string) => ({ kind: 'h2' as const, text });
const li = (text: string) => ({ kind: 'li' as const, text });

export const strategyArticles: Article[] = [
  {
    slug: 'what-to-fix-first-in-your-business',
    title: 'How to work out what to fix first in your business',
    category: 'Strategy',
    pillar: 'strategy',
    intent: 'problem',
    market: 'both',
    keyphrase: 'what should I fix first in my business',
    published: '2026-09-02',
    displayDate: 'September 2026',
    readingMinutes: 7,
    standfirst:
      'Most business owners have a list of things they know they should sort out. What they usually do not have is a way to tell which one is costing the most — so the list stays a list.',
    blocks: [
      p(
        'Most business owners have a list of things they know they should sort out. The website is dated. Quotes take too long. Someone should really be following up the enquiries that go quiet. The list is rarely wrong. What is missing is a way to tell which item on it is actually costing money, and how much — so every option looks equally sensible, and the easiest decision is to do none of them for another quarter.',
      ),
      p(
        'This is a solvable problem, and solving it does not require a consultant. What follows is roughly the process we run, written so you can do it yourself.',
      ),

      h2('Start with the path a customer actually takes'),
      p(
        'Not the one on the process document. The real one. Pick a recent enquiry and follow it end to end: where it arrived, who saw it first, how long it sat, what got typed in and where, who chased it, and how long from first contact to money in the bank.',
      ),
      p(
        'Do this for three or four real jobs — one that went well, one that went badly, one that was lost. The gap between them is usually where your answer is. People are often surprised by how much of the delay is waiting rather than working: a quote that takes twenty minutes to write can still take four days to send.',
      ),

      h2('Put a number against each delay'),
      p(
        'This is the step almost everyone skips, and it is the one that turns a list into an order. You do not need precision. You need enough to compare.',
      ),
      li('How many enquiries do you get a month, and what share never get a proper follow-up?'),
      li('What is an average job worth, and what share of enquiries do you win?'),
      li('How many hours a week does your team spend on admin that a system could do?'),
      li('What does an hour of that person’s time cost you, including everything?'),
      p(
        'Multiply them out. Enquiries that go cold, valued at your existing close rate, is one number. Admin hours times fifty-two times the hourly cost is another. Both are usually larger than people expect, and — this matters — both are calculated entirely from figures you already have. No industry benchmarks, no assumed improvement.',
      ),
      p(
        'Two rules for this to be worth anything. Use your own close rate, not a better one you hope to reach: the point is what the current situation costs, not what a perfect one would earn. And do not include anything you cannot evidence — a number you had to guess at will be the number someone argues with, and the whole exercise dies there.',
      ),

      h2('Sort by cost, then by what has to happen first'),
      p(
        'Now you have a list with numbers on it, order becomes obvious in a way it was not before. Two adjustments to a naive "most expensive first" ranking:',
      ),
      li(
        'Some fixes are prerequisites. Sending more traffic to a site that cannot take a booking makes the leak bigger, not smaller. Plumbing before pressure.',
      ),
      li(
        'Some fixes are cheap and immediate. A single automated follow-up on unanswered enquiries can be live in a week. Doing one of those first funds patience for the longer work.',
      ),

      h2('Write down what you are not doing, and why'),
      p(
        'The value of this exercise is as much in what it rules out. Six months later, when somebody asks why you did not rebuild the website, the answer should exist in writing: because quoting was costing four times as much and the site was not the constraint.',
      ),
      p(
        'Without that, every abandoned idea comes back every quarter, and you re-litigate the same decision with worse recall each time.',
      ),

      h2('When this is worth paying somebody for'),
      p(
        'Do it yourself if you have the time and can be honest about your own operation. Both are harder than they sound — the second more than the first. People who run a business are, reasonably, attached to the way they run it, and the steps that exist because "that is how we have always done it" are exactly the ones that become invisible.',
      ),
      p(
        'The other reason to bring somebody in is that the output has to survive a room. If this has to get past a business partner, a board or a lender, a document with your own numbers in it and an outsider’s name on it carries differently from the same argument made by the person who wants the budget.',
      ),
    ],
    faqs: [
      {
        q: 'How long should working out what to fix first take?',
        a: 'Weeks, not months. If it takes a whole quarter it has stopped being the thing that decides the project and become the project.',
      },
      {
        q: 'Do I need a consultant to do this?',
        a: 'No. The process above is the process, and plenty of owners run it themselves. Bringing someone in helps when you need an outside view of your own operation, or when the plan has to be defended to a board, a partner or a lender.',
      },
      {
        q: 'What if the numbers say we should do nothing?',
        a: 'That is a legitimate outcome and it does happen. Spending money is not the same as making progress, and knowing the current situation costs less than the fix is worth knowing.',
      },
    ],
    related: ['signs-your-business-has-outgrown-its-systems', 'what-a-business-diagnostic-involves'],
  },

  {
    slug: 'signs-your-business-has-outgrown-its-systems',
    title: 'Seven signs your business has outgrown how it works',
    category: 'Strategy',
    pillar: 'strategy',
    intent: 'problem',
    market: 'both',
    keyphrase: 'business outgrown its systems signs',
    published: '2026-09-03',
    displayDate: 'September 2026',
    readingMinutes: 6,
    standfirst:
      'The systems that carried a business to five people usually break somewhere around twenty. It rarely announces itself — it shows up as everyone being busy and nothing moving faster.',
    blocks: [
      p(
        'There is a stage most growing businesses pass through where everything still works, technically, but only because specific people are holding it together. Nothing is on fire. Everyone is busy. And yet the business does not feel faster than it did at half the size.',
      ),
      p(
        'That is what outgrowing your systems looks like from the inside. Here is what it looks like from outside.',
      ),

      h2('1. One person is the system'),
      p(
        'Somebody knows where everything is, who owes what, and which client needs handling carefully. When they are on leave, work slows down measurably. That knowledge is real and valuable, and right now it is stored in one head with no backup.',
      ),

      h2('2. The same information gets typed in more than once'),
      p(
        'A customer gives their details on the website. Someone copies them into a spreadsheet, then into the accounting system, then into a calendar invite. Every retype is a chance to introduce an error, and collectively it is a part-time job nobody applied for.',
      ),

      h2('3. Quotes take days, and you have stopped noticing'),
      p(
        'The work of writing a quote is twenty minutes. The elapsed time is four days, because it waits for someone to be free. Meanwhile the customer has asked two other suppliers, and the fastest reply usually wins work that had nothing to do with being the best option.',
      ),

      h2('4. Nobody can say what happened to last month’s enquiries'),
      p(
        'Not "we lost some" — which specific ones, and why. If the answer requires someone to reconstruct it from an inbox, then enquiries are going cold and the business has no way of knowing how many.',
      ),

      h2('5. Reporting is a person, not a system'),
      p(
        'Once a month, someone spends most of a day pulling numbers from four places into a spreadsheet. By the time anybody reads it, the month is over and the decisions it might have informed have already been made by default.',
      ),

      h2('6. You have bought tools to fix tools'),
      p(
        'A subscription to connect two systems. Another to report across them. Each was sensible on its own, and together they have produced a stack nobody fully understands and a monthly bill nobody has audited in a year.',
      ),

      h2('7. Growth has stopped feeling like progress'),
      p(
        'More enquiries mean more admin. More staff mean more coordination. The revenue line goes up and nothing gets easier — which is the clearest sign that what you have is a business running on effort rather than on systems.',
      ),

      h2('What to do about it'),
      p(
        'None of these need a rebuild. They need someone to work out which of them is costing the most, and to fix that one properly before touching the others. Usually one or two are responsible for most of the damage, and the rest are irritating but survivable for another year.',
      ),
      p(
        'The mistake is treating the list as a project. It is a diagnosis, and diagnoses are meant to be prioritised.',
      ),
    ],
    faqs: [
      {
        q: 'At what size do businesses usually hit this?',
        a: 'There is no fixed headcount — it depends far more on how many things the business does than on how many people do them. The reliable signal is not size but the one above: growth stops making things easier.',
      },
      {
        q: 'Do we need to replace our existing systems?',
        a: 'Usually not. Most of the time the tools are fine and the problem is that they do not talk to each other, so people are the integration. Connecting what you have is normally cheaper and less disruptive than replacing it.',
      },
    ],
    related: ['what-to-fix-first-in-your-business', 'why-your-website-isnt-generating-leads'],
  },

  {
    slug: 'what-a-business-diagnostic-involves',
    title: 'What a business diagnostic actually involves',
    category: 'Strategy',
    pillar: 'strategy',
    intent: 'decision',
    market: 'both',
    keyphrase: 'what does a business diagnostic involve cost',
    published: '2026-09-04',
    displayDate: 'September 2026',
    readingMinutes: 6,
    standfirst:
      'If you are considering paying somebody to tell you what to fix, it is reasonable to want to know what you get, what it costs, and how to tell a good one from an expensive deck.',
    blocks: [
      p(
        '"Diagnostic", "audit", "discovery" and "strategy engagement" all describe roughly the same thing, and the quality varies enormously. Here is what the useful version involves, so you can tell it apart from the other kind.',
      ),

      h2('What actually happens'),
      p(
        'The work is mostly listening and arithmetic. Time with the people who do the job — not only the people who manage it — following real work through the business. Then putting numbers against what that turns up.',
      ),
      li('Interviews with the people who actually handle enquiries, quotes, delivery and invoicing'),
      li('Following several real jobs end to end, including one that was lost'),
      li('A look at the systems in use, what they cost, and where data is re-entered by hand'),
      li('Your own numbers: enquiry volume, close rate, average value, admin hours'),

      h2('What you should get at the end'),
      p(
        'A written picture of how the business currently runs, with a cost attached to each problem, and a recommended order of work with what each step should return. That is the deliverable. If what arrives is a deck of observations without numbers, you have bought an opinion.',
      ),
      p(
        'Two properties matter more than length. It should be actionable by somebody other than the firm that wrote it — otherwise it is a sales document. And it should be explicit about what it recommends against, and why.',
      ),

      h2('How long it should take'),
      p(
        'Weeks, not months. A diagnostic that runs a full quarter has stopped being the thing that decides the project and become the project — you are paying to be studied rather than to be told what to do.',
      ),

      h2('What it should cost'),
      p(
        'This varies with the size and complexity of the operation, so anyone quoting a number without knowing either is guessing. What you can reasonably ask for is a fixed price agreed before it starts, and a defined scope: how many people, over how long, producing what.',
      ),
      p(
        'Open-ended day rates on discovery work are where budgets go quietly. If a firm cannot scope its own diagnostic, that tells you something about how it will scope the build.',
      ),

      h2('Questions worth asking before you commit'),
      li('Do we keep the findings if we do not continue with you?'),
      li('Who exactly will do the work, and will we meet them before signing?'),
      li('What will you tell us not to do?'),
      li('Can our own team act on this without you?'),
      p(
        'That third question is the most revealing. A firm that recommends everything it sells, every time, is not diagnosing anything — it is qualifying you.',
      ),
    ],
    faqs: [
      {
        q: 'Do we keep the findings if we do not go ahead?',
        a: 'You should, and it is worth putting in writing before the work starts. A diagnostic you only keep by continuing to buy is a sales process wearing a different name.',
      },
      {
        q: 'How much does a business diagnostic cost?',
        a: 'It depends on the size and complexity of the operation, which is why an honest answer needs a conversation first. What you can insist on regardless is a fixed price and a defined scope agreed before anything starts, rather than an open-ended day rate.',
      },
      {
        q: 'What is the difference between a diagnostic and a strategy deck?',
        a: 'A diagnostic carries numbers from your own business and a recommended order of work. A strategy deck carries observations. The test is whether somebody outside the firm that wrote it could act on the document.',
      },
    ],
    related: ['what-to-fix-first-in-your-business', 'custom-software-vs-off-the-shelf'],
  },
];
