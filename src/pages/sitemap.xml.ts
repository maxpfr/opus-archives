import type { APIRoute } from 'astro';
import { site, siteUrl } from '../../site.config';
import { routes } from '../i18n';

export const GET: APIRoute = () => {
  // Sitemaps need absolute URLs; until the domain is set, a placeholder host is used.
  const base = siteUrl ?? 'https://{{DOMAIN}}';
  const langs = site.englishEnabled ? (['fr', 'en'] as const) : (['fr'] as const);
  const pages = Object.keys(routes.fr) as (keyof typeof routes.fr)[];

  const urls = langs.flatMap((lang) =>
    pages.map((page) => {
      const alternates = langs
        .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${base}${routes[l][page]}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${base}${routes[lang][page]}</loc>\n${alternates}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
