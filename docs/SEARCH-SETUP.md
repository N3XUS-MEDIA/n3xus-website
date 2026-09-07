# Search setup — what's done, and what needs your accounts

The site is ready to be indexed. What remains needs a Google account and DNS
access, which is why it is written as a runbook rather than done.

Nothing here is urgent in the "site is broken" sense. It is urgent in the sense
that **nine new articles currently exist and nobody has told Google they exist.**

---

## Already done, no action needed

- `sitemap.xml` — 25 URLs, generated from the routes and articles rather than
  hand-kept, so it cannot fall behind. Every URL returns 200 and its own
  canonical agrees with the sitemap entry (verified).
- `robots.txt` — declares the sitemap, allows the AI crawlers (GPTBot,
  ClaudeBot, PerplexityBot, Google-Extended), disallows `/api/`.
- Retired blog URLs 308-redirect to their closest replacement; none of them
  appear in the sitemap.
- Structured data: Organization/ProfessionalService, one Service per pillar
  with `areaServed`, FAQPage on the homepage and on most articles,
  BreadcrumbList, Article.
- Nothing on the site carries `noindex`.

---

## 0. Before you start — two facts checked against live DNS

**The domain is already verified.** `n3xus.media` carries two
`google-site-verification` TXT records:

```
google-site-verification=Wg0yLOlGEs42yPVaTxfyHXk9RG3bNtzNRq08aacQgnw
google-site-verification=uH93MZ-Fqi_SOZm90_iVGXx0uT52iIr-9sZkh6bjHgI
```

So a Search Console property exists already and there is nothing to verify.
Two tokens usually means either two properties (often a legacy URL-prefix
alongside a domain property) or two Google accounts with access. Sign in and
look — if the property you land in is a URL-prefix one, add a **Domain**
property as well, since that is the one that covers every subdomain and
protocol.

**DNS is at GoDaddy, not Cloudflare.** Live nameservers are
`ns07.domaincontrol.com` / `ns08.domaincontrol.com`. The monorepo's
`CLAUDE.md` lists Cloudflare for DNS; that is stale and worth correcting there,
because it will send the next person to the wrong control panel. Any TXT record
work happens in **GoDaddy → Domain → DNS → Records**.

---

## 1. Google Search Console — 10 minutes

**Use a Domain property, not a URL prefix.** A domain property covers
`https://`, `http://`, `www.` and every subdomain in one place. A URL-prefix
property covers exactly one of those, which is how people end up with four
properties and no complete picture.

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
   and sign in with the account that should own this long-term — not a personal
   address that leaves with somebody.
2. **Add property → Domain →** `n3xus.media`
3. **You will probably not be asked to verify** — the domain already carries
   two verification records (see section 0). If you are asked, the TXT record
   goes in **GoDaddy → Domain → DNS → Records** (not Cloudflare):
   - Type `TXT`, Name `@`, Value = the `google-site-verification=…` string
   - Save, then click Verify. Usually instant; occasionally up to an hour.
4. Once verified: **Sitemaps** → enter `sitemap.xml` → Submit.
5. **URL Inspection** → paste `https://n3xus.media/` → **Request indexing**.
   Do the same for two or three of the new articles. This does not jump a
   queue, but it does tell Google the pages exist rather than waiting to be
   discovered.

**If DNS access is the blocker**, there is a fallback already wired in: set
`GOOGLE_SITE_VERIFICATION` in Vercel to the token from Google's *HTML tag*
method (the `content="..."` value only, not the whole tag), redeploy, and
verify. The DNS method is better where possible — it survives redeploys and
covers subdomains — but this needs no DNS and no code change.

## 2. Bing Webmaster Tools — 5 minutes

Worth doing despite the traffic share, because **Copilot and several AI
assistants draw on Bing's index**. For a firm selling AI visibility this is not
optional.

[bing.com/webmasters](https://www.bing.com/webmasters) → Add site →
**Import from Google Search Console** (fastest, carries the verification over)
→ submit the same sitemap.

Or set `BING_SITE_VERIFICATION` in Vercel and redeploy — same mechanism as
Google above.

## 3. Google Business Profile — connect it to the site

The profile exists but carries **no address**, so this is a service-area
listing rather than a mappable location. That is legitimate for a firm
delivering remotely, and it is weaker for local ranking than a verified
premises would be — worth knowing rather than working around.

The site's schema therefore declares **country only**, deliberately. Publishing
an address the business does not trade from is exactly the field Google
verifies, so it was left incomplete rather than guessed.

**If an address is ever added to the profile**, send these and the schema can
be completed to match:

- [ ] Full street address, city, province, postal code
- [ ] Public phone number
- [ ] The profile's share URL (`g.page/…` or the Maps listing)

They must match the profile character for character — "Street" and "St." are
different strings to a machine, and NAP consistency (name, address, phone)
between profile and site is a real local ranking factor.

**The name and category changes** — N3XUS Media → N3XUS, Marketing agency →
Business management consultant — were declined because the site did not reflect
them. That is fixed: the category now appears verbatim in the homepage title,
description, schema and both machine-readable files, and /about carries a
"Who you're dealing with" block stating the trading name, the registered
entity and the type of business. Resubmit; if it is declined again, point the
reviewer at `n3xus.media/about`.

**Also worth doing inside the profile:**

- Add the service areas that match the site: the nine provinces, and the US
  states if the listing type supports it.
- Link the profile to `https://n3xus.media`.

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

## 4. Analytics — one thing to check, not to add

Both a GTM container (`GT-57S4GH8K`) and a standalone GA4 tag
(`G-223R7S2381`) load on every page. If GA4 is *also* configured inside the
container, every pageview has been counted twice and historic traffic is
inflated roughly 2×.

Open GTM, look for a GA4 Configuration tag for that property. If it is there,
set `STANDALONE_GA4` to `false` in `src/ui/Analytics.tsx`. That is the whole
fix. It was left in place rather than guessed at, because guessing wrong in the
other direction silently stops all analytics.

While in Search Console, link it to GA4 (Admin → Property → Search Console
links). That is what lets you see which queries produced sessions rather than
only impressions.

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
