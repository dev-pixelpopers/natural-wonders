import type { LegalSection } from "@/components/layout/LegalPage";

/*
 * Starter legal copy. Have it reviewed by counsel before launch; it is written to
 * fit the site's tone and structure, not as legal advice.
 */

export const LEGAL_UPDATED = "November 6, 2026";

export const terms: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using the Natural Wunderz website, you agree to these Terms of Use. If you do not agree, please do not use the site.",
    ],
  },
  {
    heading: "Use of the site",
    body: [
      "You may use this site for lawful purposes only. You agree not to interfere with the site’s operation, attempt to gain unauthorized access, or use the site to transmit harmful or unlawful material.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "All content on this site, including brand names, logos, product images, text and design, is owned by Natural Wunderz or its licensors and is protected by intellectual-property laws. You may not reproduce or distribute it without our written permission.",
    ],
  },
  {
    heading: "Product information",
    body: [
      "We aim to describe our products accurately, but packaging, formulas and availability may change. Always read the product label before use. Product information on this site is not medical advice.",
    ],
  },
  {
    heading: "Inquiries and communications",
    body: [
      "Information you send through our contact form is used to respond to your inquiry. Submitting an inquiry does not create a business relationship or obligate either party until a written agreement is in place.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "The site is provided “as is”. To the fullest extent permitted by law, Natural Wunderz is not liable for any indirect or consequential loss arising from your use of the site.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last revised. Continued use of the site means you accept the updated terms.",
    ],
  },
];

export const privacy: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "When you contact us, we collect the details you provide, such as your name, company email, area of interest and message.",
      "Like most websites, we may also collect basic technical information such as browser type, device and pages visited, to keep the site running well.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "We use your information to respond to inquiries, share information you have requested, and improve our website and services. We do not sell your personal information.",
    ],
  },
  {
    heading: "Sharing",
    body: [
      "We share information only with service providers who help us operate the site and respond to you (for example, our email provider), and when required by law.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "We keep inquiry details for as long as needed to respond and maintain a record of our business communications, then delete or anonymize them.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us to access, correct or delete the personal information we hold about you. California residents may have additional rights under the CCPA/CPRA. To make a request, contact us using the details below.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reasonable safeguards to protect your information. No method of transmission over the internet is completely secure, so we cannot guarantee absolute security.",
    ],
  },
];

export const returns: LegalSection[] = [
  {
    heading: "Retail purchases",
    body: [
      "Natural Wunderz products bought in stores or online are covered by the retailer’s own return policy. Please contact the store or marketplace where you made your purchase.",
    ],
  },
  {
    heading: "Product concerns",
    body: [
      "If a product arrives damaged, leaks, or doesn’t perform as expected, we want to know. Contact us with the product name, batch code (printed on the pack) and a photo, and we’ll make it right.",
    ],
  },
  {
    heading: "Wholesale and private-label orders",
    body: [
      "Returns, shortages and damages on wholesale or private-label orders are handled under the terms of your purchase agreement. Please report any issues within the timeframe stated in your agreement.",
    ],
  },
  {
    heading: "Allergic reactions",
    body: [
      "Always patch test new products. If you experience irritation, stop using the product immediately and consult a healthcare professional, then let us know so we can follow up.",
    ],
  },
];
