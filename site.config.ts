/**
 * Single source of truth for every company fact and placeholder.
 *
 * Rule: never invent a value. Anything not confirmed stays as a `{{PLACEHOLDER}}`
 * string with a TODO comment. `npm run placeholders` lists what is left to fill,
 * and the build prints a warning while any placeholder remains.
 */

export const site = {
  // Confirmed: brand chosen by the owner.
  brand: 'Opus Archives',

  // Bare host, no protocol.
  domain: 'opus-archives.com',

  email: 'maxime@opus-archives.com',

  // TODO: phone number not supplied. '' hides the phone line on the site.
  phone: '',

  // Whether the English version is linked from the language switch.
  englishEnabled: true,

  founder: {
    // Confirmed.
    name: 'Maxime Pfrimmer',
    // TODO: LinkedIn profile URL not supplied.
    linkedin: '{{LINKEDIN_URL}}',
  },

  legal: {
    // Confirmed company facts (operating entity; final legal entity not decided yet).
    companyName: 'Opus MP',
    legalForm: 'SASU',
    siren: '991 303 975',
    streetAddress: '35 rue Vital',
    postalCode: '75016',
    city: 'Paris',
    country: 'FR',
    // Source: company record on Pappers (capital after the increase decided on 07/11/2025).
    shareCapital: '31 298,50 €',
    rcs: 'RCS Paris',
    // Président of the SASU.
    publicationDirector: 'Maxime Pfrimmer',
    // Address as published in Netlify's own privacy policy and terms of use. Netlify publishes no
    // phone number, so its contact page is given instead.
    host: {
      name: 'Netlify, Inc.',
      address: '101 2nd Street, San Francisco, CA 94105, United States',
      contact: 'https://www.netlify.com/contact/',
    },
  },

  documents: {
    // TODO: PDF to be supplied. Put the file in public/docs/ and set the path, e.g. '/docs/protocole.pdf'.
    // Leave '' to hide the link.
    dataProtocolPdf: '',
    // TODO: optional two-page PDF "Présentation de la démarche". Leave '' to hide the link.
    presentationPdf: '',
  },

  // TODO: NOT TRUE YET. Switch to true only once a lawyer has actually validated the protocol.
  protocolValidatedByLawyer: false,
} as const;

export const isPlaceholder = (value: string) => /\{\{[A-Z_]+\}\}/.test(value);

/** Absolute site URL, or null while the domain is still a placeholder. */
export const siteUrl = isPlaceholder(site.domain) ? null : `https://${site.domain}`;
