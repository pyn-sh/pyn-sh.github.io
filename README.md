# Pyn website

Source of <https://pyn-sh.github.io/>, the website of the [Pyn project](https://github.com/pyn-sh/pyn). Pyn is in planning; there is no release yet.

Built with Astro, Tailwind CSS v4, Manrope and Lucide icons.

## Develop

Clone this repository into `pyn-website`, next to a checkout of `pyn`:

```bash
git clone git@github.com:pyn-sh/pyn.git pyn
git clone git@github.com:pyn-sh/pyn-sh.github.io.git pyn-website
cd pyn-website
npm ci
npm run dev
```

Node 22.23.4 or later is required. To read the documents from another folder, set `PYN_DOCS_DIR`.

| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run check` | Type checks |
| `npm run build` | Production build in `dist/` |
| `npm run check:links` | Verify internal links and anchors of the build |
| `node scripts/brand-assets.mjs` | Regenerate icons and the social image from the logo |

## Content

Documentation pages are generated from the Markdown and Gherkin files in `pyn-sh/pyn`. Edit documents there, not here. The roadmap on the home page is read from the milestone files.

## Deployment

Pushing to `main` builds and deploys through GitHub Actions. A daily scheduled run picks up document changes; start the workflow manually to publish them sooner. GitHub disables scheduled workflows in repositories without activity for 60 days.

## License

No license has been chosen yet.
