# CLAUDE.md — apps/wedding-website/public/

# Last updated: 2026-06-14

## Purpose

Static assets served directly by Vite (dev) and Netlify (prod).
Files here are copied to `dist/` as-is — no bundling, no processing.

## Structure

```
public/
├── favicon.svg              — Site favicon (SVG, theme-aware)
├── robots.txt               — SEO robots directives
├── sitemap.xml              — SEO sitemap (update with real URLs before launch)
├── 404.html                 — Netlify 404 fallback page
├── _redirects               — Netlify SPA routing: /* /index.html 200
├── audio/                   — Background/ceremony MP3 files
└── wedding_pics/            — Wedding photos and imagery
    ├── deities/             — Hindu deity images for DivineBlessings section
    ├── namaste/             — Bride & groom photo
    └── others/              — Gallery photos (to be added)
```

## Rules

- Never import from `public/` in TypeScript — reference as root-relative URL strings: `/audio/sangeet.mp3`
- Keep file sizes reasonable: images < 500KB, audio < 10MB
- File names must be lowercase with underscores (no spaces, no special characters)
- Add new image directories only with a corresponding `manifest.json` if dynamically loaded
- `_redirects` and `netlify.toml` together handle all Netlify routing — do not touch unless deploying to a different host
