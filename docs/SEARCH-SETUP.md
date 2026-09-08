# Search setup — what is done, and the few things left

Most of this is now done. What remains is listed at the bottom and is short.

---

## Done on 2026-09-08, verified

**Google Search Console** — property `https://n3xus.media/`, owned by
`deacon@n3xus.media`.

- Verified by HTML file (`public/googled33c617bcf056e7c.html`), with the
  meta-tag token committed in `app/layout.tsx` as a second route. **Do not
  delete either.** Google re-checks, and a property that silently unverifies
  stops reporting without raising an error.
- `sitemap.xml` submitted. Status **Success**, **25 URLs discovered**.
- Indexing requested on 10 URLs: the homepage, `/services/strategy`,
  `/pricing`, `/intelligence`, `/about`, `/services` and four articles. That is
  Google's daily quota; the rest are covered by the sitemap.
- Linked to GA4 (Admin → Product links → Search Console links).

**Why a URL-prefix property rather than a Domain property.** A Domain property
needs a DNS TXT record at GoDaddy, which was not available. It costs nothing
here: `www` and `http` both 308 to the apex, so the prefix covers every live
URL.

**Why a new property at all.** One already existed on this domain, on a
different Google account. Workspace admin does **not** inherit Search Console
access — it is granted per property by an existing owner. Same for Analytics,
Tag Manager and Ads. If the historical data matters, ask the current owner to
add `deacon@n3xus.media` as an Owner on the old property; nothing else depends
on it.

**What the inspections showed, which justified the exercise.**
`/services/strategy` came back *"URL is unknown to Google"* — never crawled, no
referring sitemap. The rebuilt pages were invisible. Within minutes of
submission, later inspections showed `sitemap.xml` as the referring source.

**Bing Webmaster Tools** — site added and the sitemap imported automatically
with the Search Console connection. Status **Success**, 25 URLs, 0 errors,
0 warnings, crawled 2026-09-08. Nothing further needed.

**Google Business Profile** — the name and category edits Google previously
declined have been **approved**: the profile reads *N3XUS* /
*Business management consultant*. Nothing to resubmit.

Also fixed on the profile:

- The description was empty. Now 741/750 characters covering the three
  disciplines, both audiences and buyer search language.
- The website field pointed at `https://www.n3xus.media/` — a redirect hop
  rather than the canonical. Now `https://n3xus.media/`.

The profile is a **service-area listing with no address**, which is why the
site's schema declares country only. It confirmed two things the site was
missing, now published in `structuredData.ts`: the phone number
`+27 21 002 8515` and opening hours. Name/address/phone consistency between
profile and site is a local ranking factor, and the site was publishing no
phone at all. Service areas on the profile are South Africa and United States,
matching `src/content/markets.ts`.

---

## 3b. The booking link is dead — restore it or leave it routed to /contact

Found on 2026-09-07 while checking DNS for the section above, and worth
treating as more urgent than anything else on this page.

`link.n3xus.media` **does not exist.** NXDOMAIN from GoDaddy's own
authoritative nameserver and from 1.1.1.1, 8.8.8.8 and 9.9.9.9. Every
"Book a free call" button on the site pointed at

```
https://link.n3xus.media/widget/bookings/jared-sinclair-calendar
```

so the primary call to action was a browser DNS error — on 22 pages, in
`llms.txt`, and in the answers the assistant gives. The previous static site
carried the same URL, so this was not introduced by the rebuild and has been
losing enquiries quietly for some time. A dead external link produces no build
failure, no test failure and no 404 in our own logs, which is why nothing
surfaced it.

**Already done:** every booking CTA now goes to `https://n3xus.media/contact`,
which works and reaches the same inbox. The contact page and the post-submit
confirmation offer email instead of linking to themselves. Tests now fail if
that host ever returns.

**To restore real self-serve booking:**

1. Sign into the booking provider (the `/widget/bookings/…` path is a
   white-label scheduler) and find the CNAME it wants for `link`.
2. Add it in **GoDaddy → Domain → DNS → Records**.
3. Confirm it resolves — `dig +short link.n3xus.media` must return something.
4. Set `NEXT_PUBLIC_BOOKING_URL` in Vercel to the full booking URL and
   redeploy. No code change; the buttons, `llms.txt` and the assistant all read
   that one value, and the new-tab behaviour switches back on by itself.

If self-serve booking is not coming back, nothing further is needed — `/contact`
is a working destination and the copy no longer promises a calendar.

## 4. Analytics — resolved, plus one click left for you

**The double-count warning was wrong, and so was its premise.** This document
and `src/ui/Analytics.tsx` both told Jared to open "GTM container GT-57S4GH8K"
and look for a GA4 tag inside it. No such container exists. Tag Manager's
"Google tags" tab shows:

```
N3XUS MEDIA    →    G-223R7S2381, GT-57S4GH8K
```

**Two IDs for one tag.** Loading both URLs loads the same tag twice and
gtag.js de-duplicates. Confirmed twice over: one `/g/collect` page_view per
load measured in the browser, and 42 `page_view` against 37 `session_start`
over seven days in GA4 — a ratio a real 2x count cannot produce.

Historic traffic is **not** inflated. `STANDALONE_GA4` stays `true`; setting it
false is not a cleanup, it is a silent outage.

**The real Tag Manager container is `GTM-NV7LGFQ7`**, under the N3XUS account
for www.n3xus.media. It is **not installed** on the site and nothing is missing
because of it: zero tags, zero workspace changes, and Tag Manager reports "No
data has been received from your tag." Two honest options — install it
*alongside* the Google tag if you want tag management, or delete it so nobody
loses an afternoon to a container with no data in it.

### The one click left: mark `generate_lead` as a key event

GA4 reported **Key events: 0**. The property counted pageviews and nothing
else, so a completed enquiry looked identical to a bounce. `src/lib/track.ts`
now fires GA4's recommended `generate_lead` event once an enquiry is confirmed
delivered.

GA4 will not let an event be starred until it has fired at least once, so:

1. **Submit one real test enquiry** through `n3xus.media/contact`. Worth doing
   regardless — it is the only way to confirm the whole lead path works end to
   end, and nobody has verified whether `RESEND_API_KEY` is set in Vercel.
   Check the enquiry actually lands in the inbox.
2. Wait up to 24 hours, then **GA4 → Admin → Data display → Events → Key
   events**, and click the star next to `generate_lead`.

From then on leads are counted, and the event can be imported into Google Ads
as a conversion.

**One limitation, deliberately not "fixed".** In-site navigation is
client-side; Enhanced Measurement reports it through the browser-history
listener, which fires but lags and coalesces under rapid clicking. Do not send
a page_view on route change to compensate — that listener is already active and
a manual event would create a genuine double-count. Judge content on entry
pages and Search Console impressions.

---

## 5. Baseline the AI answers — do this before anything ranks

There is no tooling for this yet, so it is a manual record, and it is the only
way to prove the GEO work did anything.

Ask **ChatGPT, Gemini, Claude and Perplexity** the questions a buyer would
actually ask, and save the answers with today's date:

- "Who should I use for business consulting in Johannesburg?"
- "Best consultancy for automating quotes and invoicing"
- "Who can help get my business recommended by AI assistants?"
- "Business systems consultant South Africa"
- "Consultancy that does strategy and implementation"

Record whether N3XUS is named, how it is described, and who is named instead.
Repeat monthly. Three outcomes are all informative: absent, present but
described wrongly, or a competitor named consistently.

---

## What to expect, and when

Worth setting expectations so nobody concludes it failed in week two.

- **Days**: pages get discovered and indexed. Check Search Console coverage.
- **Weeks**: impressions appear for long-tail queries — the specific questions
  the articles answer, not the competitive head terms.
- **Months**: rankings on anything contested. Anyone promising faster is
  selling something they do not control.

The leading indicator to watch is **impressions**, not clicks or position.
Impressions rising means Google is showing the pages for real queries; clicks
follow once position improves. Judging this on clicks in month one will read as
failure regardless of how well it is going.

---

## Still outstanding

Short list, in order of what it costs you to leave undone.

1. **`ANTHROPIC_API_KEY` in Vercel.** `/api/chat` returns 502, which is an
   Anthropic-side rejection rather than a missing key — the route returns 503
   when the key is absent. Invalid key or no credit. Aria answers common
   questions from the knowledge base for free, but every follow-up and every
   question outside it fails. Vercel is on another person's account, so this
   needs either their access or the project moved to a team you own.
2. **One test enquiry**, per section 4 — confirms the lead path and unlocks the
   key-event star.
3. **`NEXT_PUBLIC_BOOKING_URL`**, if self-serve booking is coming back. See
   section 3b.
4. **Ask for access to the old Search Console property** if its history
   matters. Nothing depends on it.
5. **Baseline the AI answers**, section 5. Nothing has ranked yet, so this is
   the moment the baseline is worth taking.
