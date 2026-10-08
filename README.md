# Opus Archives — site vitrine

One-pager statique (FR/EN) + mentions légales + politique de confidentialité.
Astro 7, aucun JavaScript en dehors des onglets du processus, aucun cookie, aucun traceur, polices auto-hébergées.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # génère dist/ (affiche les placeholders restants)
npm run preview      # sert dist/ en local
npm run placeholders # liste les {{PLACEHOLDER}} encore à remplir
npm run build:strict # échoue tant qu'un placeholder subsiste (à utiliser pour la mise en ligne)
```

Node 20+ requis.

## Où modifier quoi

| Quoi | Fichier |
| --- | --- |
| Marque, domaine, e-mail, téléphone, LinkedIn, mentions légales, PDF, drapeaux | `site.config.ts` |
| Tous les textes FR | `src/content/fr.json` |
| Tous les textes EN | `src/content/en.json` |
| Sections de la page d'accueil | `src/components/Home.astro` |
| Styles (couleurs, typo, mode sombre) | `src/styles/global.css` |
| PDF à télécharger | `public/docs/` puis `site.config.ts` > `documents` |

Les textes peuvent contenir `{brand}`, `{email}`, `{founder}`… remplacés à la compilation depuis `site.config.ts`.
En français, les espaces insécables avant `: ; ? ! »` sont ajoutés automatiquement.

## Placeholders à remplir avant la mise en ligne (TODO)

Tous sont centralisés dans `site.config.ts` :

- `{{DOMAIN}}` — domaine (active canonical, hreflang, `og:url`, sitemap, ligne `Sitemap:` de robots.txt, `url` du JSON-LD)
- `{{EMAIL}}` — adresse de contact (mailto, mentions légales, politique de confidentialité)
- `{{PHONE}}` — téléphone (mettre `''` pour masquer la ligne)
- `{{LINKEDIN_URL}}` — profil LinkedIn du fondateur (le lien est masqué tant qu'il n'est pas rempli)
- `{{CAPITAL_SOCIAL}}`, `{{RCS}}` — mentions obligatoires de l'éditeur
- `{{DIRECTEUR_DE_PUBLICATION}}`
- `{{HEBERGEUR_ADRESSE}}`, `{{HEBERGEUR_TELEPHONE}}` (hébergeur : Netlify, Inc.)
- `documents.dataProtocolPdf` — « protocole de traitement des données » (lien masqué tant que vide)
- `documents.presentationPdf` — « Présentation de la démarche » (lien masqué tant que vide)
- `protocolValidatedByLawyer` — **laisser à `false`** tant qu'un avocat n'a pas réellement validé le protocole

Points de contenu à valider :

- Durée de conservation des échanges (3 ans après le dernier contact) dans la politique de confidentialité.
- Formulation de la licence : sous revue d'avocat, le site décrit l'intention en langage courant et ne renvoie vers aucun document contractuel.
- Publication de l'anglais : `englishEnabled` dans `site.config.ts` masque le sélecteur de langue et retire l'EN du sitemap et des hreflang (les pages `/en/` restent générées).

## Garde-fous éditoriaux

Ne jamais ajouter : clients, partenaires, acquisitions déjà réalisées, chiffres, prix, délais, exclusivité, témoignages, certifications, noms d'acheteurs ou de concurrents. Slack, Teams et l'e-mail n'apparaissent que dans les exclusions.

## Structure

```
site.config.ts          faits et placeholders
src/content/{fr,en}.json textes
src/i18n/               chargement des textes, routes, interpolation
src/layouts/Base.astro  <head>, meta, OpenGraph, hreflang, JSON-LD Organization
src/components/         Header, Footer, Home, LegalPage
src/pages/              /, /en/, /mentions-legales/, /confidentialite/, /en/legal-notice/, /en/privacy/, 404, robots.txt, sitemap.xml
public/                 favicon, _headers, docs/
```

## Déploiement

**Production : Netlify**, relié au dépôt GitHub. Chaque push sur `main` est déployé automatiquement (config dans `netlify.toml`).

Autres hébergeurs possibles :

Site 100 % statique : commande `npm run build`, dossier publié `dist/`. Aucune variable d'environnement n'est nécessaire (`.env.example` est vide à dessein).

- **Netlify** (déjà en place) : New site → importer le dépôt → Build command `npm run build`, Publish directory `dist`. Les en-têtes de `public/_headers` sont appliqués automatiquement. Domaine : Domain management → Add custom domain.
- **Cloudflare Pages** : Workers & Pages → Create → Pages → connecter le dépôt → preset *Astro* (build `npm run build`, output `dist`). `_headers` est pris en charge. Domaine : Custom domains.
- **Vercel** : Add New → Project → importer le dépôt, preset *Astro* détecté automatiquement. `_headers` n'est pas lu par Vercel : recopier les en-têtes dans un `vercel.json` (`"headers": [{ "source": "/(.*)", "headers": [...] }]`) si souhaité. Domaine : Settings → Domains.

Après avoir choisi l'hébergeur, renseigner ses coordonnées dans `site.config.ts` (`legal.host`) : elles sont obligatoires dans les mentions légales.

## Qualité

Mesuré en local (Lighthouse 13, mobile et desktop) sur `/`, `/en/` et `/mentions-legales/` : 100 en performance, accessibilité, bonnes pratiques et SEO.
