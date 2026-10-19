/**
 * Privacy Policy — text ported verbatim from privacy.html.
 *
 * Legal copy is NOT paraphrased. The only edits are the two marked FIXED
 * below, where the original had gaps that made a sentence meaningless, and
 * three list items added deliberately for the free website audit (2026-10-09):
 * what it collects (section 2), why (section 3) and who processes it
 * (section 5). Review those three before /audit launches.
 * Anything else that reads oddly is how it reads on the live site today and
 * should be changed deliberately, not in passing.
 *
 * 2026-10-15 — deliberate edit, made alongside the cookie consent banner
 * (src/lib/consent.ts): the policy described things the site does not do (Meta
 * Pixel, Google Ads, Meta advertising, a booking platform) and left out things
 * it does (the chat assistant, Resend, Vercel, the theme and consent storage).
 * Sections 1, 2, 5, 6 and 8 were corrected to match the site as built. NOT
 * legal advice and not reviewed by a lawyer: Jared should have this checked
 * before relying on it, and update section 6 whenever anything that stores data
 * in a visitor's browser is added.
 */

export interface LegalBlock {
  kind: 'p' | 'li';
  text: string;
}

export interface LegalSection {
  /** Optional anchor, so a banner can link straight to this section. */
  id?: string;
  heading: string;
  blocks: LegalBlock[];
}

export const privacySections: LegalSection[] = [
  {
    "heading": "1. Who We Are",
    "blocks": [
      {
        "kind": "p",
        "text": "N3XUS Media (Pty) Ltd (“N3XUS Media”, “we”, “us”, or “our”) is a full-service marketing agency headquartered in South Africa. We operate the website at n3xus.media and associated subdomains."
      },
      {
        "kind": "p",
        "text": "Contact us at any time: info@n3xus.media"
      }
    ]
  },
  {
    "heading": "2. Information We Collect",
    "blocks": [
      {
        "kind": "p",
        "text": "We collect information you provide directly to us, including:"
      },
      {
        "kind": "li",
        "text": "Contact details (name, email address, phone number) when you submit our contact form or book a strategy call"
      },
      {
        "kind": "li",
        "text": "Business information you share during consultations or enquiries"
      },
      {
        "kind": "li",
        "text": "Messages and correspondence you send to us"
      },
      {
        "kind": "li",
        "text": "Messages you type into the assistant on our website, and any details you choose to leave in it. If you ask to be contacted, the conversation is sent to us with your details"
      },
      {
        "kind": "li",
        "text": "Your website address when you use our free website audit, together with the publicly available pages of that website, which we read in order to audit it; and, if you ask for the full report, your name, email address and, optionally, your business name and phone number"
      },
      {
        "kind": "li",
        "text": "Payment and billing information when you engage our services"
      },
      {
        "kind": "p",
        "text": "We also collect information automatically when you visit our website, including:"
      },
      {
        "kind": "li",
        "text": "Usage data via Google Analytics 4 (pages visited, time on site, referral source), only if you accept analytics cookies"
      },
      {
        "kind": "li",
        "text": "Technical data (browser type, device type, IP address, operating system)"
      },
      {
        "kind": "li",
        "text": "Cookie and tracking data as described in Section 6 below"
      }
    ]
  },
  {
    "heading": "3. How We Use Your Information",
    "blocks": [
      {
        "kind": "p",
        "text": "We use the information we collect to:"
      },
      {
        "kind": "li",
        "text": "Respond to your enquiries and provide requested services"
      },
      {
        "kind": "li",
        "text": "Run the website audit you request, send you its report, and follow up with you about it"
      },
      {
        "kind": "li",
        "text": "Send proposals, invoices, and service-related communications"
      },
      {
        "kind": "li",
        "text": "Improve our website and understand how visitors use it"
      },
      {
        "kind": "li",
        "text": "Send marketing communications (only with your consent, and you may opt out at any time)"
      },
      {
        "kind": "li",
        "text": "Comply with legal obligations"
      }
    ]
  },
  {
    "heading": "4. Legal Basis for Processing (POPIA & GDPR)",
    "blocks": [
      {
        "kind": "p",
        "text": "We process your personal information on the following grounds:"
      },
      {
        "kind": "li",
        "text": "Contractual necessity — to provide services you have requested"
      },
      {
        "kind": "li",
        "text": "Legitimate interests — to improve our services and communicate with prospective clients"
      },
      {
        "kind": "li",
        "text": "Consent — for marketing communications and non-essential cookies"
      },
      {
        "kind": "li",
        "text": "Legal obligation — where required by global law (POPIA) or applicable regulations"
      }
    ]
  },
  {
    "heading": "5. Sharing Your Information",
    "blocks": [
      {
        "kind": "p",
        "text": "We do not sell your personal information. We may share it with:"
      },
      {
        "kind": "li",
        "text": "Service providers that help us run the website and handle your enquiry — Resend (email delivery of enquiries sent through our forms and chat), Formspree (a back-up route for form submissions), Vercel (website hosting) and, only if you accept analytics, Google (Analytics)"
      },
      {
        "kind": "li",
        "text": "Service providers for our website audit — Cloudflare (bot protection on our forms, and hosting), Google PageSpeed Insights (speed testing of the website you submit), Anthropic (AI analysis of the website you submit, and help drafting our replies to you) and Supabase (storing audits and enquiries)"
      },
      {
        "kind": "li",
        "text": "Professional advisors — accountants, lawyers, and auditors where necessary"
      },
      {
        "kind": "li",
        "text": "Authorities — where required by law or legal process"
      },
      {
        "kind": "p",
        "text": "All third-party service providers are required to protect your information in accordance with applicable data protection law."
      }
    ]
  },
  {
    "id": "cookies",
    "heading": "6. Cookies",
    "blocks": [
      {
        "kind": "p",
        "text": "We use cookies and similar technologies (small items of data stored in your browser). A notice asks for your choice the first time you visit. Nothing optional is used until you accept it, and you can change your mind at any time using “Cookie settings” in the footer of every page."
      },
      {
        "kind": "p",
        "text": "Strictly necessary — always on, because the site cannot remember your choices without them:"
      },
      {
        "kind": "li",
        "text": "n3xus-consent — stored in your browser (local storage) for up to 12 months. Remembers your cookie choice."
      },
      {
        "kind": "li",
        "text": "n3xus-theme — stored in your browser (local storage) until you clear it. Remembers whether you chose the light or dark display."
      },
      {
        "kind": "p",
        "text": "Analytics — only if you accept:"
      },
      {
        "kind": "li",
        "text": "_ga and _ga_G-223R7S2381 — set by Google Analytics 4, for up to two years. They tell us, in aggregate, which pages are visited and how visitors reach us."
      },
      {
        "kind": "li",
        "text": "n3xus:source — stored in your browser for the visit only (session storage), and removed when you close the tab. It notes how you arrived (for example search, an AI assistant or a link) and the first page you saw, so that an enquiry you send can show where it came from. It holds no personal details."
      },
      {
        "kind": "p",
        "text": "We do not use advertising or marketing cookies, and we do not run advertising pixels such as Meta Pixel on this website."
      },
      {
        "kind": "p",
        "text": "If you decline, or later withdraw your consent, we stop analytics, remove the analytics cookies we can, and keep nothing in session storage. You can also control cookies in your browser settings; blocking the strictly necessary items means the site may not remember your choices."
      }
    ]
  },
  {
    "heading": "7. Data Retention",
    "blocks": [
      {
        "kind": "p",
        "text": "We retain your personal information for as long as necessary to provide our services, comply with legal obligations, and resolve disputes. Enquiry data is typically retained for 3 years. Client data is retained for 7 years for accounting and legal purposes."
      }
    ]
  },
  {
    "heading": "8. Your Rights",
    "blocks": [
      {
        "kind": "p",
        "text": "Under POPIA and where applicable GDPR, you have the right to:"
      },
      {
        "kind": "li",
        "text": "Access the personal information we hold about you"
      },
      {
        "kind": "li",
        "text": "Request correction of inaccurate information"
      },
      {
        "kind": "li",
        "text": "Request deletion of your information (subject to legal obligations)"
      },
      {
        "kind": "li",
        "text": "Object to or restrict certain processing"
      },
      {
        "kind": "li",
        "text": "Withdraw consent at any time (without affecting prior processing)"
      },
      {
        "kind": "li",
        "text": "Lodge a complaint with the Information Regulator of South Africa (inforegulator.org.za) or your local data protection authority"
      },
      {
        "kind": "p",
        "text": "To exercise any of these rights, contact us at info@n3xus.media."
      }
    ]
  },
  {
    "heading": "9. Security",
    "blocks": [
      {
        "kind": "p",
        "text": "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. All data transmitted to our website is encrypted via HTTPS/TLS."
      }
    ]
  },
  {
    "heading": "10. Changes to This Policy",
    "blocks": [
      {
        "kind": "p",
        "text": "We may update this privacy policy from time to time. The “Last updated” date at the top of this page will reflect any changes. Continued use of our website after changes are posted constitutes acceptance of the updated policy."
      }
    ]
  },
  {
    "heading": "11. Contact",
    "blocks": [
      {
        "kind": "p",
        "text": "For any questions about this privacy policy or how we handle your personal information:"
      },
      {
        "kind": "li",
        "text": "Email: info@n3xus.media"
      },
      {
        "kind": "li",
        "text": "Phone:"
      },
      {
        "kind": "li",
        "text": "Post: N3XUS Media (Pty) Ltd"
      }
    ]
  }
];
