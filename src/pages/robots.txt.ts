import type { APIRoute } from 'astro';
import { siteUrl } from '../../site.config';

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];
  // TODO: the Sitemap line appears once `domain` is set in site.config.ts.
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
