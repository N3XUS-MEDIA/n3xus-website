import Script from 'next/script';

/**
 * Google Tag Manager + GA4.
 *
 * ── A live measurement bug, deliberately NOT silently "fixed" ───────────────
 * Every page of the old site loaded BOTH the GTM container GT-57S4GH8K and a
 * standalone gtag for GA4 property G-223R7S2381. If that GA4 property is also
 * configured as a tag inside the container — which is the usual setup when the
 * same person deploys both — then every pageview has been counted twice, and
 * the site's historic traffic numbers are inflated by roughly 2×.
 *
 * I cannot see inside the GTM container, so I cannot tell which it is. Both
 * ways of guessing are bad:
 *   - Drop the standalone gtag: if GA4 is NOT in the container, all analytics
 *     silently stop, and nobody notices for a month.
 *   - Keep both: the double-count continues.
 *
 * So this preserves current behaviour exactly — no regression — and makes the
 * fix a one-line change once someone opens the container and looks.
 *
 * ACTION FOR JARED: open GTM container GT-57S4GH8K. If a GA4 Configuration tag
 * for G-223R7S2381 exists in it, set STANDALONE_GA4 to false below. That is the
 * whole fix. See docs/CLAIMS-REGISTER.md G4.
 */

const GTM_ID = 'GT-57S4GH8K';
const GA4_ID = 'G-223R7S2381';

/** Set to false once GA4 is confirmed to be inside the GTM container. */
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
