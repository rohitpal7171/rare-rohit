# CLAUDE.md — src/pages/

## Pages
- `Home.tsx` — Composes all 10 sections in order. Renders Navbar + main + Footer.
- `CeremonyPage.tsx` — Dynamic route `/ceremony/:slug`. Validates slug against `VALID_SLUGS` set, redirects to `/` if invalid. Renders Navbar + PageWrapper + ceremony component + Footer.
- `NotFound.tsx` — 404 fallback for `*` route.

## Section Order in Home.tsx
Hero → Blessings → OurStory → CeremoniesGrid → Schedule → Gallery → WeddingParty → Travel → RSVP → FAQ

## Section Background Alternation
Dark (mandala-bg): Hero, Blessings, CeremoniesGrid, Gallery, Travel, FAQ
Light (bg-ivory):  OurStory, Schedule, WeddingParty, RSVP
— Never two dark or two light sections in a row.

## CeremonyPage slug validation
Uses `VALID_SLUGS = new Set(Object.keys(ceremonyMap))` — type-safe guard.
Import `FC` from 'react' explicitly — required by `verbatimModuleSyntax`.
