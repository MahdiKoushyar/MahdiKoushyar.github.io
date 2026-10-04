# Mahdi Koushyar — Portfolio & Resume

A bilingual (English/Persian), SSR-ready Angular portfolio with theme persistence, responsive RTL/LTR layouts, accessible interactions, localized metadata, and case-study-ready project architecture.

## Local development

```bash
npm install
npm start
```

## Production verification

```bash
npm run build
npm test
```

Personal links, resume URL, metrics, experience, and projects are intentionally centralized in `src/app/data/portfolio.data.ts`. Empty values are never rendered as fake links or claims.

## GitHub Pages build

```bash
npm run build:pages
```

Publish only `dist/github-pages/browser`, not the project root or Node server.
This separate build prerenders the homepage and uses client rendering for other
routes, retaining the existing Node SSR build. The `404.html` fallback boots
Angular on direct route visits, while GitHub retains an HTTP 404 status for
unpublished paths. Future project pages should be prerendered before publishing.

The intended repository is `MahdiKoushyar/MahdiKoushyar.github.io`, with public
URL `https://mahdikoushyar.github.io/`. Canonical URLs, structured metadata,
sitemap, and robots.txt use this address. No contact backend is provided by
GitHub Pages; the contact form remains a preview until an external service is configured.

### First deployment

1. Create the public repository `MahdiKoushyar.github.io` in the `MahdiKoushyar` account.
2. In Settings → Pages, select **GitHub Actions** as the publishing source.
3. Push this source to `main`; `.github/workflows/pages.yml` tests, builds, and deploys it.
4. Confirm the Pages workflow succeeds and verify the public URL in a browser.

Only the generated browser folder is deployed. Node SSR remains available through
the separate `npm run build:ssr` command. A successful local build alone does not
mean the website has been published.
