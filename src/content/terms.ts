/**
 * Terms of Service — text ported verbatim from terms.html.
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

export const termsSections: LegalSection[] = [
  {
    "heading": "1. Agreement to Terms",
    "blocks": [
      {
        "kind": "p",
        "text": "By accessing or using the website at n3xus.media or engaging the services of N3XUS Media (Pty) Ltd (“N3XUS Media”, “we”, “us”, or “our”), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services."
      }
    ]
  },
  {
    "heading": "2. Our Services",
    "blocks": [
      {
        "kind": "p",
        "text": "N3XUS Media provides AI development, software development, and marketing services including but not limited to:"
      },
      {
        "kind": "li",
        "text": "LLM application development, RAG systems, AI agents, and custom AI software"
      },
      {
        "kind": "li",
        "text": "Web application and software development"
      },
      {
        "kind": "li",
        "text": "Digital marketing (SEO, Google Ads, Meta Ads, social media management)"
      },
      {
        "kind": "li",
        "text": "TV and brand marketing campaigns"
      },
      {
        "kind": "li",
        "text": "Access to the N3XUS Intelligence platform"
      },
      {
        "kind": "p",
        "text": "Specific service terms, deliverables, timelines, and pricing are governed by individual service agreements or statements of work agreed in writing."
      }
    ]
  },
  {
    "heading": "3. Intellectual Property",
    "blocks": [
      {
        "kind": "p",
        "text": "All content on this website — including text, design, graphics, logos, and code — is the property of N3XUS Media (Pty) Ltd and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent."
      },
      {
        "kind": "p",
        "text": "For client projects, intellectual property ownership is governed by the terms of your individual service agreement. Unless otherwise agreed in writing, upon full payment N3XUS Media assigns ownership of custom deliverables to the client, while retaining ownership of pre-existing tools, frameworks, and methodologies."
      }
    ]
  },
  {
    "heading": "4. Client Responsibilities",
    "blocks": [
      {
        "kind": "p",
        "text": "You agree to:"
      },
      {
        "kind": "li",
        "text": "Provide accurate and complete information required to deliver services"
      },
      {
        "kind": "li",
        "text": "Respond to reasonable requests for feedback, approvals, or materials in a timely manner"
      },
      {
        "kind": "li",
        "text": "Ensure you have the rights to any materials, assets, or data you provide to us"
      },
      {
        "kind": "li",
        "text": "Use our services and deliverables in compliance with all applicable laws"
      }
    ]
  },
  {
    "heading": "5. Payment Terms",
    "blocks": [
      {
        "kind": "p",
        "text": "Payment terms are specified in individual service agreements. Unless otherwise agreed:"
      },
      {
        "kind": "li",
        "text": "Project work requires a deposit before commencement"
      },
      {
        "kind": "li",
        "text": "Invoices are payable within 7 days of issue"
      },
      {
        "kind": "li",
        "text": "Retainer fees are billed monthly in advance"
      },
      {
        "kind": "li",
        "text": "Late payments may incur interest at the applicable prime rate plus 2%"
      }
    ]
  },
  {
    "heading": "6. Limitation of Liability",
    "blocks": [
      {
        "kind": "p",
        "text": "To the fullest extent permitted by law, N3XUS Media shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services, including loss of profits, data, or business opportunities."
      },
      {
        "kind": "p",
        "text": "Our total liability for any claim arising from our services shall not exceed the fees paid by you to N3XUS Media in the three months preceding the claim."
      }
    ]
  },
  {
    "heading": "7. Disclaimer of Warranties",
    "blocks": [
      {
        "kind": "p",
        "text": "Our website and services are provided “as is” without warranties of any kind, express or implied. We do not guarantee specific results from marketing campaigns, SEO, or AI systems — performance depends on many factors outside our control. Any performance estimates or case study results are illustrative and not guaranteed."
      }
    ]
  },
  {
    "heading": "8. Confidentiality",
    "blocks": [
      {
        "kind": "p",
        "text": "We treat all client information as confidential and will not disclose it to third parties without your consent, except where required by law or to deliver agreed services. We expect the same confidentiality regarding our proprietary methodologies, tools, and pricing."
      }
    ]
  },
  {
    "heading": "9. Termination",
    "blocks": [
      {
        "kind": "p",
        "text": "Either party may terminate a service agreement with written notice as specified in the relevant agreement. Upon termination, you remain liable for fees accrued up to the termination date. We reserve the right to suspend or terminate website access for any breach of these terms."
      }
    ]
  },
  {
    "heading": "10. Governing Law",
    "blocks": [
      {
        "kind": "p",
        "text": "These terms are governed by the laws of the Republic of . Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of the , ."
      }
    ]
  },
  {
    "heading": "11. Changes to These Terms",
    "blocks": [
      {
        "kind": "p",
        "text": "We may update these terms from time to time. The “Last updated” date at the top of this page will reflect changes. Continued use of our website or services after changes are posted constitutes acceptance of the updated terms."
      }
    ]
  },
  {
    "heading": "12. Contact",
    "blocks": [
      {
        "kind": "p",
        "text": "For any questions about these terms:"
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
