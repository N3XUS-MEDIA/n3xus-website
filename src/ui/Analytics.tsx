import Script from 'next/script';

/**
 * The Google tag, loaded twice by two different URLs.
 *
 * ── The double-count scare, resolved 2026-09-08 ─────────────────────────────
 * This file used to warn that GT-57S4GH8K was a GTM container which probably
 * also held a GA4 tag for G-223R7S2381, meaning every pageview was counted
 * twice and historic traffic was inflated ~2x. It told Jared to open the
 * container and check. That instruction was wrong, and so was the premise.
 *
 * With access to the Tag Manager account, the "Google tags" tab shows:
 *
 *     N3XUS MEDIA    →    G-223R7S2381, GT-57S4GH8K
 *
 * They are TWO IDS FOR ONE TAG, not two tags. Loading both URLs loads the same
 * tag twice; gtag.js shares one global and de-duplicates the config call.
 * Measured on the live site by counting requests to
 * google-analytics.com/g/collect: exactly one page_view per page load.
 *
 * Corroborated in GA4 itself — 42 page_view against 37 session_start over
 * seven days. A genuine 2x double-count could not produce that ratio.
 *
 * So there is nothing to fix, historic traffic is not inflated, and
 * STANDALONE_GA4 must stay true. Setting it false is not a "cleanup": it
 * removes a working loader on a false premise, and the failure mode is silent.
 *
 * ── The other container, which is a separate thing ──────────────────────────
 * There IS a real GTM container, GTM-NV7LGFQ7, under the N3XUS account for
 * www.n3xus.media. It is NOT installed here and nothing is missing because of
 * that: it is empty (zero tags, zero workspace changes) and Tag Manager reports
 * "No data has been received from your tag."
 *
 * If it is ever wanted, install GTM-NV7LGFQ7 *as well* — it is a different
 * mechanism from the Google tag below, not a replacement for it. If it is not
 * wanted, delete it, so the next person does not spend an afternoon working
 * out why a container they can see has no data in it.
 *
 * ── One known limitation ────────────────────────────────────────────────────
 * In-site navigation is client-side. Enhanced Measurement reports those
 * through the browser-history listener rather than on load, which does fire
 * but lags, and coalesces under rapid navigation. Do NOT "fix" this by sending
 * a page_view on route change: that listener is already active, and a manual
 * event would create the exact double-count this comment spent years being
 * wrong about. Judge content on entry pages and Search Console impressions.
 */

/** Two IDs for the same Google tag. See the comment above before changing either. */
const GTM_ID = 'GT-57S4GH8K';
const GA4_ID = 'G-223R7S2381';

/**
 * Keep true. Verified 2026-09-08 that both IDs are one tag and that only one
 * page_view is sent per load, so this is redundant rather than duplicated —
 * and removing it would stop analytics silently if that ever stopped being so.
 */
const STANDALONE_GA4 = true;

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      {STANDALONE_GA4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}

/** The <noscript> half of GTM. Must be the first thing inside <body>. */
export function AnalyticsNoScript() {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
