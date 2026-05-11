# CLAUDE.md — apps/wedding-website/

## App Identity

Indian wedding website for **Rohit Singh Pal & Priti Pal**.
Wedding: 25 November 2026, Kokapur (near Udi Moad).
Lagun: 24 November 2026, Gwalior.
React 18 + TypeScript strict + Vite SWC + Tailwind v3 + Framer Motion v11.
Bilingual: EN (dev default) / HI (prod default) via react-i18next.
Theme: saffron + maroon + gold + ivory. Ganesh & Lakshmi divine motif.
Marriage type: **Arranged marriage** — story content must reflect this.

## Key Files

- `src/config/wedding.config.ts` — ALL personal details (names, dates, venues)
- `src/config/types.ts` — TypeScript interfaces for config
- `src/i18n/config.ts` — i18next init (change fallbackLng 'en'→'hi' for production)
- `src/i18n/react-i18next.d.ts` — Typed t() via declaration merging
- `src/router/index.tsx` — All routes

## Routes

- `/` → Home.tsx (all sections stacked)
- `/ceremony/:slug` → CeremonyPage.tsx → renders individual ceremony component
- `*` → NotFound.tsx

## Import Aliases

- `@shared/ui` → shared/ui/index.ts
- `@shared/hooks` → shared/hooks/index.ts
- `@shared/utils` → shared/utils/index.ts
- `@app/*` → src/\*

## i18n Namespaces

common | home | story | ceremonies | schedule | gallery | party | travel | rsvp | faq
Both `en/` and `hi/` must have identical keys.

## Before Editing Any Content

Read `context/WEDDING_DETAILS.md` — all confirmed real details are there.
Never use old placeholder names (Rohit Verma, Priya Sharma) anywhere.

## Netlify Deploy

- Site: rohitwedspriti.netlify.app (tentative — confirm when deploying)
- Base: `apps/wedding-website`
- Build: `npm run build`
- Publish: `dist`
- Node: 20
