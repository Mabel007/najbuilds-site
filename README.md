# Naj Builds

A premium animated placeholder landing page for **Naj Builds**, the frontend engineering, quality assurance and technical-writing practice of Chris.

The site introduces the practice, states clearly that the full portfolio is still in development, and routes visitors to the published journal, GitHub, X and email until the case studies are ready.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (design tokens in `src/index.css`)
- Self-hosted Manrope Variable and Instrument Serif via Fontsource
- Lucide icons
- Vitest + Testing Library + jsdom

## Local commands

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run typecheck
npm run lint
npm test
npm run build      # production output in dist/
npm run preview    # serve the built site locally
```

## Structure

```text
public/
  brand/                    official horizontal, compact and monogram SVGs (dark + light)
  icons/                    PWA-sized app icons
  og/naj-og-1200x630.png    official Open Graph image
  favicon.ico, favicon.svg, favicon-16/32/48/64.png, apple-touch-icon-180.png
  site.webmanifest          browser-display manifest pointing at the supplied icons
src/
  components/               Header, Hero, Practice, Connect, Footer, shared UI
  hooks/useTheme.ts         dark-first theme with localStorage persistence
  lib/brand.ts              theme-aware asset paths
  lib/site.ts               approved links and copy data
  index.css                 design tokens, layout, motion, reduced-motion rules
```

## Brand and assets

All 17 official asset files were copied byte-for-byte from the supplied brand pack at `C:\Dev-Per\Naj Builds Branding Assets`. Their SHA-256 hashes match the source files. No source asset was renamed, edited or removed.

Brand colours follow the supplied token guide:

| Token | Value |
| --- | --- |
| Black (dark canvas) | `#090A0D` |
| Gold (dark accent) | `#E0AB58` |
| Ivory (light canvas / dark text) | `#F8F5EF` |
| Gold on light | `#8B6A37` |
| Ring | `#5B452B` |
| Silver | `#C9CED6` |

## Behaviour notes

- **Themes:** dark-first with a manual light/dark toggle. The choice is stored in `localStorage` (`naj-theme`) and applied before paint to avoid a flash. The header, hero monogram and footer horizontal logo switch to the matching official logo variant.
- **Motion:** a finite kinetic introduction, pointer-reactive rings, pause/resume and replay controls, and three replayable process illustrations. Every moving element is disabled or resolved to its final state under `prefers-reduced-motion: reduce`.
- **Accessibility:** semantic landmarks, a skip link that moves focus to `main`, visible focus styles, labelled icon buttons, Escape-to-close mobile navigation with focus return, and screen-reader-only “opens in a new tab” text on external links.
- **Manifest:** `display: "browser"` and no service worker. The supplied app icons are referenced correctly, but the site is deliberately **not** presented as an installable PWA.

## Deployment caveats

Before any public deploy, the owner must confirm:

1. **Canonical origin.** The owner confirms `https://najbuilds.com/` for canonical, Open Graph, social image URLs and JSON-LD. Live hosting, HTTPS and crawler retrieval remain unverified.
2. **Asset upload.** Vite copies `public/` into `dist/`; publish the contents of `dist/` so the icons, manifest and OG image resolve at the site root.
3. **Release.** The owner has approved this version for publication. Operational release reports remain local in the ignored `.codex/` directory. Domain/DNS changes require separate approval.

## Links used

Only the approved destinations appear in the UI:

- Blog — https://najbuilds.hashnode.dev/
- GitHub — https://github.com/Mabel007
- X — https://x.com/najbuilds
- Email — mailto:contact@najbuilds.com
