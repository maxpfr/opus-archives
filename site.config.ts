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

  // TODO: domain not decided. Bare host, no protocol (e.g. "example.fr").
  domain: '{{DOMAIN}}',

  // TODO: contact address not decided.
  email: '{{EMAIL}}',

  // TODO: phone number not decided. Set to '' to hide the phone line entirely.
  phone: '{{PHONE}}',

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
    // TODO: share capital not supplied (required in the mentions légales).
    shareCapital: '{{CAPITAL_SOCIAL}}',
    // TODO: RCS registration city not supplied (e.g. "RCS Paris").
    rcs: '{{RCS}}',
    // TODO: director of publication not confirmed.
    publicationDirector: '{{DIRECTEUR_DE_PUBLICATION}}',
    // Hosting: Netlify (confirmed). TODO: address and phone, to copy from Netlify's own legal pages
    // (third-party legal notices disagree on the current address).
    host: {
      name: 'Netlify, Inc.',
      address: '{{HEBERGEUR_ADRESSE}}',
      phone: '{{HEBERGEUR_TELEPHONE}}',
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
