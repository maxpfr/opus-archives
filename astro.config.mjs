import { defineConfig } from 'astro/config';

// BASE_PATH lets the site be served under a sub-path (GitHub Pages project site).
// Leave unset for a root deployment (Netlify, Vercel, Cloudflare Pages, custom domain).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
});
