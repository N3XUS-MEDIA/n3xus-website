/**
 * Privacy Policy — text ported verbatim from privacy.html.
 *
 * Legal copy is NOT paraphrased. The only edits are the two marked FIXED
 * below, where the original had gaps that made a sentence meaningless.
 * Anything else that reads oddly is how it reads on the live site today and
 * should be changed deliberately, not in passing.
 */

export interface LegalBlock {
  kind: 'p' | 'li';
  text: string;
}

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export const privacySections: LegalSection[] = [
  {
    "heading": "1. Who We Are",
    "blocks": [
      {
        "kind": "p",
        "text": "N3XUS Media (Pty) Ltd (“N3XUS Media”, “we”, “us”, or “our”) is a full-service AI development and marketing agency headquartered in South Africa. We operate the website at n3xus.media and associated subdomains."
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
        "text": "Payment and billing information when you engage our services"
      },
      {
        "kind": "p",
        "text": "We also collect information automatically when you visit our website, including:"
      },
      {
        "kind": "li",
        "text": "Usage data via Google Analytics 4 (pages visited, time on site, referral source)"
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
        "text": "Service providers — including Formspree (form submissions), Google (Analytics, Ads), Meta (advertising), and our booking platform"
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
    "heading": "6. Cookies",
    "blocks": [
      {
        "kind": "p",
        "text": "We use cookies and similar technologies to operate our website and understand how it is used. These include:"
      },
      {
        "kind": "li",
        "text": "Essential cookies — required for the website to function correctly"
      },
      {
        "kind": "li",
        "text": "Analytics cookies — Google Analytics 4, to understand visitor behaviour (anonymised)"
      },
      {
        "kind": "li",
        "text": "Marketing cookies — Google Tag Manager and Meta Pixel, to measure campaign effectiveness"
      },
      {
        "kind": "p",
        "text": "You can control cookies through your browser settings. Disabling certain cookies may affect website functionality."
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
        "text": "Lodge a complaint with the Information Regulator () or your local data protection authority"
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
