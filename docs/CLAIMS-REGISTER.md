# Claims register — n3xus.media rebuild

Every factual claim on the old site that needs a human to confirm before it
ships again. CLAUDE.md non-negotiable #5: *no unverifiable stats or invented
precision anywhere client-facing.*

**Rule for this rebuild:** a claim ships **confirmed** or **omitted**. It does
not ship softened by guesswork — "hundreds of campaigns" is not a safe version
of "528 campaigns", it is the same claim with the evidence removed.

Mark each row `CONFIRM` (ships as-is), `AMEND` (ships with the wording in the
Amended column), or `CUT` (does not ship).

---

## A. Numeric performance claims

| # | Claim | Where it appears | Verdict | Amended wording |
|---|---|---|---|---|
| A1 | "528 campaigns delivered" / "528 Campaigns & Counting" | `index.html:338`, `:388` (animated count-up), `:551`; `about.html` stat row | | |
| A2 | "0% media markup" / "Zero media markup" | `index.html:188` (JSON-LD FAQ), `:658`; `about.html` differentiator 06 | | |
| A3 | "1 screen instead of six logins" | `index.html`, `services/website-os.html` | | |
| A4 | "Free 45-minute website audit" / "45 minutes. No pitch." | `index.html:259`, `:391`, `:548`; `about.html` CTA; `.well-known/ai-plugin.json` | | |
| A5 | "Limited strategy call slots available this month" | `index.html` closing CTA | **CUT** (not ported) | Manufactured scarcity, unverifiable |
| A6 | Fabricated "live dashboard" — 247 leads, 1,840 AI responses today, "#1" ranking, 38/21/12/0 pipeline strip | `index.html` hero | **CUT** (not ported) | Invented figures shown as a real product screenshot |
| A7 | Fabricated Intelligence dashboard — 38 enquiries, 21 quotes, 12 booked, channel scores 78/92/66/71/55, "Updated just now" | `intelligence.html` hero | **CUT** (not ported) | As above. Replace with a real screenshot once `apps/intelligence` boots — see `docs/context/STATE.md` |

**Note on A2:** this is a billing *policy*, not a performance statistic — N3XUS
can confirm it from its own contracts. It is listed here because it is stated as
an absolute ("always", "zero") in client-facing copy and in JSON-LD, where an
exception would matter.

## B. Superlative / market-position claims

These are the highest-risk rows: they are unfalsifiable as written, and a
competitor or regulator reading them would ask for evidence.

| # | Claim | Where | Verdict | Amended wording |
|---|---|---|---|---|
| B1 | "one of the few agencies in the world that genuinely operates across Traditional, Digital and AI at enterprise level" | `about.html` mission | | |
| B2 | "Among the first agencies globally specialising in Generative Engine Optimisation" | `about.html` differentiator 03 | | |
| B3 | "Only truly integrated full-service agency" | `about.html` differentiator 01 | | |

## C. Pricing inconsistencies

Superseded by `src/content/pricing.ts` for **monthly retainers**, which is now
the single source. These rows are the historical contradictions — listed so the
old figures are not reintroduced from an unported page.

| # | Conflict | Where | Resolution |
|---|---|---|---|
| C1 | Retainers quoted as Launch/Growth/Dominate $500/$1,000/$2,000 | `pricing.html:233,246,261` | Superseded by the retainer builder |
| C2 | Same tiers quoted $500/$1,025/$2,025 | `assets/script.js:~590` (legacy Aria system prompt) | Superseded; prompt no longer quotes prices |
| C3 | Website OS tiers $950/$2,400/$5,500 | `pricing.html:101,116,131`; `index.html` JSON-LD; `.well-known/ai-plugin.json` | Superseded by the retainer builder |
| C4 | AI Chatbot $1,500 vs $500/$1,160/$2,370 | `index.html:99` vs `blog/index.html:432` | **Open** — one-off project pricing, not covered by the retainer matrix |
| C5 | "Individual services from $135/mo" but table floor is $160/mo | `index.html:188,208` vs `pricing.html:302-333` | **Open** — one-off/à-la-carte pricing |

| C6 | "Retainer plans start at $500/mo with a 3-month minimum" | `contact.html` FAQ | Contradicted the configurator twice: base is $450 / R6,500, and the terms specify 30 days notice with no minimum term. Rewritten to match the terms |
| C7 | Rate card: SEO $185/$345/$630, ads management $160/$290/$500, social $240/$395/$630, LLM marketing $345/$630/$950 | `services/digital.html` | Superseded by the retainer builder; removed |
| C8 | Website OS "monthly retainer from $950" | `index.html` Website OS section | Superseded; now "from the modules you pick" |

**C4 and C5 still need a decision.** The retainer builder replaced monthly
pricing only; one-off project figures still contradict each other. C4 in
particular is blocking: the AI chatbot is currently quoted "per build" on both
`/services/ai` and the ported blog article because there is no single agreed
price to publish.

**One-off project pricing that IS live** (unchanged, not superseded): LLM
application development from $3,500, RAG systems from $5,500, AI agents from
$6,000, custom AI software from $8,000. Confirm these are still current.

## D. Configurator PDF errors

`N3XUS_Media_Custom_Retainer_Configurator.pdf` (Ref: N3X-2026-8842), page 2.
If this has gone to any client, it under-quotes by roughly $400/mo.

| # | Error | Printed | Correct |
|---|---|---|---|
| D1 | Worked-example subtotal (USD) | $1,500 / mo | **$1,750 / mo** |
| D2 | Worked-example subtotal (ZAR) | R22,200 / mo | **R25,200 / mo** |
| D3 | Applies the 10% bundle discount | Applied | **Does not qualify** — nothing selected from section 5 (Performance), and the rule requires all four modular pillars |

The five ticked modules are Base OS $450 + Technical SEO $250 + GEO $350 +
Growth Social $500 + Website Bot $200.

Pinned by tests in `src/lib/retainer.test.ts` so the wrong figures cannot
reappear in the product. **The document itself still needs reissuing.**

## E. Brand separation

CLAUDE.md non-negotiable #4: never claim N3XUS built, owns, or operates Syrax,
Fortitude, or Lava Concepts.

| # | Item | Where | Verdict |
|---|---|---|---|
| E1 | "Crypto payments via Syrax" in the site footer | every page footer | |

This does **not** assert ownership — it names a payment route — so it is not a
breach on its face. It is flagged because it is the only Syrax mention in
client-facing copy, and whether N3XUS wants a visible commercial association
with a separate business on every page is a founder decision, not a porting
decision. Not carried into the rebuilt footer pending that call.

## F. Structured-data claims

`index.html` JSON-LD and `about.html` JSON-LD assert facts that are invisible on
the page but are machine-read by search and AI crawlers — so they carry the same
standard.

| # | Claim | Where | Verdict |
|---|---|---|---|
| F1 | `foundingDate: 2022` | `about.html` JSON-LD | |
| F2 | `numberOfEmployees: 5–20` | `about.html` JSON-LD | |
| F3 | `sameAs` social profiles (LinkedIn, Instagram, Facebook, Twitter) | `about.html` JSON-LD | Confirm each URL still resolves and is owned |
| F4 | FAQPage with 12 Q&As, including the zero-markup answer | `index.html:92-208` | Depends on A2 |

## G. Content bugs found while porting

Not claims — straightforward errors to fix.

| # | Bug | Where |
|---|---|---|
| G1 | Incomplete sentence: "headquartered in." — country name missing | `privacy.html` §1 |
| G2 | Article opens "`<p>` has a growing number of digital marketing agencies." — subject stripped | `blog/index.html:434` |
| G3 | `.well-known/ai-plugin.json` references `/.well-known/openapi.yaml`, which does not exist | `.well-known/ai-plugin.json` |
| G4 | GTM container `GT-57S4GH8K` **and** standalone gtag `G-223R7S2381` both load on every page — pageviews may be double-counted | every page |
| G5 | `n3xus-img-1.svg` is byte-identical to `n3xus-icon.svg` (sha256 `93da379a…`) | `assets/` — duplicate dropped in rebuild |
| G6 | All three logo SVGs are base64 PNGs in an SVG wrapper (~2.9MB total); cannot inherit `currentColor` | `assets/` — needs a real vector redraw |
| G7 | privacy §1 ended "Contact us at any time: info@n3xus.media •" — trailing separator where a phone number used to be | fixed in `src/content/privacy.ts` |
| G8 | `/api/chat` was an open proxy to the Anthropic account: `Access-Control-Allow-Origin: *`, no validation beyond "messages exists", and the entire client body forwarded — so any origin could pick the model and `max_tokens` and bill it to N3XUS | fixed; also patched on the old static site in branch `fix/chat-proxy-hardening` |
| G10 | Deploying a Next.js app into a Vercel project created for static HTML returns 404 site-wide until `framework: nextjs` is declared | fixed in `vercel.json`; the project's dashboard preset should also be set to Next.js |
| G9 | `/api/contact` returned `200 {ok:true}` when `RESEND_API_KEY` was unset — enquiries would vanish while the sender saw success | fixed: returns 503, form shows a `mailto:` fallback |

---

## H. How claims are enforced in the rebuild

Not a checklist item — worth knowing where the guard rails actually are, so
they are not removed by accident.

| Guard | Where |
|---|---|
| Each gated claim is a single boolean; flipping it publishes the claim everywhere at once | `CLAIMS` in `src/content/about.ts` |
| A `stats` block refuses to render without a `source` string | `src/ui/marketing/Blocks.tsx` |
| The Aria system prompt is generated from `pricing.ts`, so the assistant cannot quote a price the site disagrees with; it also carries the brand-separation rule and a no-invented-statistics instruction | `src/server/aria/systemPrompt.ts`, tested |
| The configurator PDF's wrong figures are pinned by tests so they cannot reappear in the product | `src/lib/retainer.test.ts` |
| The contested chatbot tiers cannot return via the blog | `src/content/routes.test.ts` |
| The leak calculator is asserted to be pure arithmetic on visitor input, with no multiplier | `src/lib/leakCalc.test.ts` |
| FAQ structured data is generated from the same array the page renders, so JSON-LD cannot describe an answer nobody can see | `src/content/structuredData.ts` |
