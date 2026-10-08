import fr from '../content/fr.json';
import en from '../content/en.json';
import { site } from '../../site.config';

export type Lang = 'fr' | 'en';
export type Dict = typeof fr;

const dicts: Record<Lang, Dict> = { fr, en };

export const routes = {
  fr: { home: '/', legal: '/mentions-legales/', privacy: '/confidentialite/' },
  en: { home: '/en/', legal: '/en/legal-notice/', privacy: '/en/privacy/' },
} as const;

const { legal } = site;
const address = `${legal.streetAddress}, ${legal.postalCode} ${legal.city}`;

const vars: Record<string, string> = {
  brand: site.brand,
  email: site.email,
  founder: site.founder.name,
  companyName: legal.companyName,
  legalForm: legal.legalForm,
  shareCapital: legal.shareCapital,
  address,
  siren: legal.siren,
  rcs: legal.rcs,
  publicationDirector: legal.publicationDirector,
  hostName: legal.host.name,
  hostAddress: legal.host.address,
  hostPhone: legal.host.phone,
};

/** French typography: non-breaking spaces before high punctuation and inside guillemets. */
const frenchSpacing = (s: string) =>
  s
    .replace(/ ([:;?!»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/(\d) %/g, '$1 %');

/** Returns a translator that interpolates `{var}` tokens from site.config.ts. */
export function useTranslations(lang: Lang) {
  const dict = dicts[lang];
  const t = (s: string) => {
    const out = s.replace(/\{([a-zA-Z]+)\}/g, (m, key) => vars[key] ?? m);
    return lang === 'fr' ? frenchSpacing(out) : out;
  };
  return { dict, t };
}
