# CLAUDE.md — apps/wedding-website/
# Last updated: 2026-05-29

## App Identity

Indian wedding website for **Rohit Singh Pal & Priti Pal**.
- **Pheras (main event):** 26 November 2026, 9:00 AM — Kokapur, Udi Modh, Uttar Pradesh
- **Baraat:** 25 November 2026, 4:00 PM — Kokapur, Udi Modh, Uttar Pradesh
- **Lagun:** 24 November 2026 — Gwalior, Madhya Pradesh
- **Marriage type:** Arranged — story content must always reflect this
- **Stack:** React 18 + TypeScript 5 strict + Vite 8 + @vitejs/plugin-react + Tailwind v3 + Framer Motion v11
- **Bilingual:** EN (dev default) / HI (prod default) via react-i18next
- **Theme:** divine (dark purple) + maroon + gold + ivory + saffron
- **Deployed at:** rohitwedspriti.netlify.app (auto-deploy on push to main)

---

## Key Files — Single Sources of Truth

| File                          | Purpose                                      |
|-------------------------------|----------------------------------------------|
| `src/config/wedding.config.ts`| ALL personal details (names, dates, venues)  |
| `src/config/types.ts`         | TypeScript interfaces for wedding domain     |
| `src/i18n/config.ts`          | i18next init (fallbackLng: 'en' → 'hi' prod) |
| `src/i18n/react-i18next.d.ts` | Typed t() via declaration merging (EN basis) |
| `src/router/index.tsx`        | All routes (createBrowserRouter)             |
| `tailwind.config.ts`          | Design tokens + component classes            |
| `src/styles/index.css`        | CSS custom properties mirroring Tailwind     |

---

## Routes

| Path               | Component      | Notes                                     |
|--------------------|----------------|-------------------------------------------|
| `/`                | `Home`         | All sections stacked vertically           |
| `/ceremony/:slug`  | `CeremonyPage` | Slug validated in component               |
| `*`                | `NotFound`     | 404 fallback                              |

Valid slugs: `haldi` | `mehendi` | `sangeet` | `baraat` | `pheras` | `vidaai` | `reception`
Note: `reception` slug exists but Reception ceremony is not shown (no reception event).

---

## Import Aliases

```ts
@shared/ui     → shared/ui/index.ts        (Button, Modal, Countdown, AnimatedSection, etc.)
@shared/hooks  → shared/hooks/index.ts     (useAudioPlayer, useCountdown, etc.)
@shared/utils  → shared/utils/index.ts     (cn, animations, constants, formatDate)
@app/*         → src/*                     (config, pages, components, i18n, router)
```

---

## i18n Namespaces

| Namespace    | File              | Used in                               |
|--------------|-------------------|---------------------------------------|
| `common`     | common.json       | Navbar, Footer, shared buttons/labels |
| `home`       | home.json         | Hero, Blessings sections              |
| `story`      | story.json        | OurStory section                      |
| `ceremonies` | ceremonies.json   | CeremoniesGrid + all ceremony pages   |
| `schedule`   | schedule.json     | Schedule section                      |
| `gallery`    | gallery.json      | Gallery section                       |
| `party`      | party.json        | WeddingParty section                  |
| `travel`     | travel.json       | Travel section (inactive)             |
| `rsvp`       | rsvp.json         | RSVP section (inactive)               |
| `faq`        | faq.json          | FAQ section                           |

Both `en/` and `hi/` must have IDENTICAL key structure at all times.

---

## Netlify Deployment Config

```toml
[build]
  base    = "apps/wedding-website"
  command = "npm run build"
  publish = "dist"
```
- Node version: 20
- SPA routing: handled by `public/_redirects` (`/* /index.html 200`)
- Environment vars: set in Netlify dashboard (never in committed code)
- `.env.example` — documents required vars (commit this)
- `.env` — local only (gitignored)

---

## Vite Config — Key Points

- `@vitejs/plugin-react` v6 — Oxc/Rolldown native, zero build warnings on Vite 8
- Path aliases match tsconfig paths exactly
- `manualChunks` splits: vendor-react, vendor-motion, vendor-i18n, vendor-form, vendor-ui
- Build output: `dist/`

---

## TypeScript Config Chain

```
tsconfig.base.json (root)
  └── tsconfig.json (app — extends base, adds @app/* alias)
        └── tsconfig.node.json (Vite config only)
        └── tsconfig.test.json (Vitest only)
```

---

## Testing (Vitest)

- Test files: `src/test/*.test.{ts,tsx}`
- Setup files: `src/test/setup.ts` + `src/test/setup.tsx`
- Mocks: `src/test/__mocks__/`
- Run: `npm run test` (from app directory)
- Current tests: `AmbientPlayer.test.tsx`, `useAudioPlayer.test.ts`

---

## Before Editing Any Content

1. Read `context/WEDDING_DETAILS.md` — all confirmed real details
2. Never use old placeholder names (Rohit Verma, Priya Sharma)
3. Marriage is **arranged** — never use love-story language
4. No reception, no RSVP, no travel info on website
