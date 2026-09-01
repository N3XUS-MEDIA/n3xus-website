# n3xus.media

The N3XUS Media marketing site. Next.js 15 + React 19 + Tailwind, deployed to
Vercel from this repo.

> This is the repo that actually deploys to n3xus.media. The copy under
> `apps/website` in the `n3xus` monorepo is a stale mirror and should be reduced
> to a pointer at this repo.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm build && pnpm start   # production build, for anything you intend to verify
pnpm test                  # vitest
pnpm type-check            # tsc --noEmit
```

Node 22+, pnpm 9+.

Headers are set in `next.config.ts`, not `vercel.json` — Vercel's edge headers
do not apply under `next start`, which meant they could never be checked
locally. They can now:

```bash
curl -sI localhost:3000/about | grep -iE 'x-frame|nosniff|referrer|permissions'
```

## Environment

| Variable | Used by | Without it |
|---|---|---|
| `RESEND_API_KEY` | `/api/contact` | Route returns 503 and the form shows a `mailto:` fallback. It does **not** pretend to succeed |
| `ANTHROPIC_API_KEY` | `/api/chat` | Aria returns 503 |

`website@n3xus.media` must be a verified sender in Resend before the contact
form can deliver.

## Layout

```
app/                    routes; one directory per page, six explicit service pages
src/design/             tokens.ts is the single source of colour, type and radius
src/ui/layout/          Container, Section, SectionHeading, PageHero, header, footer
src/ui/marketing/       Blocks, RetainerBuilder, LeakCalculator, ContactForm, FaqList
src/content/            all copy, as typed data
src/server/             route-handler logic; the Aria prompt lives here, never client-side
public/                 assets, llms.txt, robots.txt, .well-known
docs/CLAIMS-REGISTER.md every factual claim awaiting founder sign-off
```

## Things worth knowing before you change something

**Pricing has one source.** `src/content/pricing.ts` feeds the retainer builder,
the proposal summary, and the Aria system prompt. It exists because the old site
quoted three different figures for the same retainer across the pricing page, a
chat widget prompt and the homepage JSON-LD. Do not hardcode a price in a page.

ZAR is stored explicitly rather than derived — the published rates are
hand-rounded and the implied rate drifts R17.86–R18.13/USD, so computing it
would contradict the signed proposal.

**Claims are gated, not softened.** CLAUDE.md non-negotiable #5 forbids
unverifiable stats client-facing. Unconfirmed claims sit behind a boolean in
`src/content/about.ts` and simply do not render. Ship a claim confirmed or
omitted — "hundreds of campaigns" is not a safe version of "528 campaigns", it
is the same claim with the evidence removed. See `docs/CLAIMS-REGISTER.md`.

**Theming is one set of class names.** Colours resolve to CSS custom properties
generated from `tokens.ts` by the Tailwind preset, so `bg-paper` and `text-ink`
work in both themes without `dark:` variants. Use `on-carbon` for text on a dark
band — `paper` is itself dark in dark mode, so `text-paper` there is invisible.

Every colour pair clears WCAG AA in both themes. The brand teal `#00c8a3`
measures 2.03:1 on light and cannot carry text; `accent-ink` exists for that.

**No icon library, no animation library.** Icons are inline SVG using
`currentColor`. Motion is CSS transitions, with a global `prefers-reduced-motion`
override in `globals.css`.

## Known gaps

- **No vector logo.** All three logo SVGs are base64 PNGs in an SVG wrapper
  (~2.9MB) and cannot recolour for a dark header. `src/ui/brand/Wordmark.tsx` is
  a type-set placeholder until a real vector exists.
- **GA4 may be double-counted.** Both the GTM container and a standalone gtag
  load. See the comment in `src/ui/Analytics.tsx` — the fix is one constant,
  once someone opens the container and checks.
- **Intelligence has no real screenshot.** The old fabricated dashboard was
  removed rather than replaced; `apps/intelligence` cannot currently boot, so
  there is nothing genuine to capture yet.
