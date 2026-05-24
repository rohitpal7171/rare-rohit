# CLAUDE.md — rare-rohit Monorepo Root
# Last updated: 2026-05-24

## ⚠️ BEFORE EVERY GIT PUSH — NON-NEGOTIABLE
```bash
npm run pre-push
```
If it fails → fix errors → run again → only push when PASS.

---

## Project Identity

| Field     | Value                                           |
|-----------|-------------------------------------------------|
| Project   | rare-rohit                                      |
| Type      | Indian wedding website (static SPA)             |
| Live URL  | rohitwedspriti.netlify.app (auto-deploy → main) |
| Repo      | github.com/rohitpal7171/rare-rohit              |
| Local     | C:\Dev_Zone\Projects\rare-rohit                 |

---

## Real Wedding Details (Single Source of Truth)

| Role  | Name            | Hindi               |
|-------|-----------------|---------------------|
| Groom | Rohit Singh Pal | रोहित सिंह पाल      |
| Bride | Priti Pal       | प्रीति पाल           |

| Event   | Date         | Time    | Location                            |
|---------|--------------|---------|-------------------------------------|
| Haldi   | 23 Nov 2026  | TBD     | Bride's Residence, Gwalior, MP      |
| Mehendi | 23 Nov 2026  | TBD     | Bride's Residence, Gwalior, MP      |
| Sangeet | 23 Nov 2026  | TBD     | Venue TBD, Gwalior, MP              |
| Lagun   | 24 Nov 2026  | —       | Gwalior, Madhya Pradesh             |
| Baraat  | 25 Nov 2026  | 4:00 PM | Kokapur, Udi Modh, Uttar Pradesh ✅ |
| Pheras  | 26 Nov 2026  | 9:00 AM | Kokapur, Udi Modh, Uttar Pradesh ✅ |
| Vidaai  | 26 Nov 2026  | TBD     | Kokapur, Udi Modh, Uttar Pradesh ✅ |

- **Marriage type:** Arranged marriage — story content must ALWAYS reflect this
- **No reception** | **No RSVP** | **Veg food only** | **No Travel section**
- **Hashtag:** #RohitWedsPriti
- **First Meeting:** 20 Jan 2026 | **Roka:** 30 Jan 2026
- Full details with changelog: `context/WEDDING_DETAILS.md` (gitignored)

---

## Monorepo Structure

```
rare-rohit/
├── apps/
│   └── wedding-website/         ← Only deployed app
│       ├── src/
│       │   ├── config/          ← wedding.config.ts + types.ts (domain source of truth)
│       │   ├── components/
│       │   │   ├── layout/      ← Navbar, Footer, PageWrapper, AmbientPlayer, ThemeToggle
│       │   │   ├── sections/    ← All home page sections
│       │   │   ├── ceremonies/  ← 7 ceremony detail components + helpers
│       │   │   └── effects/     ← CursorEffect
│       │   ├── i18n/            ← i18next config + locales/en/ + locales/hi/
│       │   ├── pages/           ← Home, CeremonyPage, NotFound
│       │   ├── router/          ← createBrowserRouter config
│       │   ├── styles/          ← Tailwind directives + CSS custom properties
│       │   └── test/            ← Vitest tests + setup files
│       ├── public/
│       │   ├── audio/sangeet.mp3  ← 5.1MB ambient player audio (EXISTS ✅)
│       │   ├── favicon.svg
│       │   ├── 404.html
│       │   ├── sitemap.xml
│       │   ├── robots.txt
│       │   └── _redirects         ← Netlify SPA routing rule
│       ├── netlify.toml
│       ├── tailwind.config.ts
│       ├── vite.config.ts
│       └── vitest.config.ts
├── shared/                      ← No package.json — Vite path aliases only
│   ├── hooks/                   ← useAudioPlayer, useCountdown, useScrollAnimation,
│   │                               useLocalStorage, useMediaQuery, useTheme, useWishes
│   ├── ui/components/           ← AnimatedSection, Button, Countdown, LanguageToggle,
│   │                               LazyImage, MobileNav, Modal
│   └── utils/                   ← animations.ts, cn.ts, constants.ts, formatDate.ts
├── claude-skills/               ← Read before working in a domain
├── context/                     ← Gitignored — ephemeral planning files
│   ├── WEDDING_DETAILS.md
│   ├── PLAN.md
│   ├── TODO.md
│   ├── DECISIONS.md
│   └── sessions/
├── scripts/pre-commit-check.mjs
├── CLAUDE.md                    ← This file
├── tsconfig.base.json
└── package.json
```

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Language   | TypeScript 5 strict                     |
| Framework  | React 18                                |
| Build      | Vite 5 + SWC (@vitejs/plugin-react-swc) |
| Styling    | Tailwind CSS v3 + custom plugin         |
| Animation  | Framer Motion v11                       |
| i18n       | i18next + react-i18next                 |
| Routing    | React Router v6 (createBrowserRouter)   |
| Icons      | Lucide React (tree-shakeable)           |
| Testing    | Vitest + React Testing Library          |
| Deploy     | Netlify (auto-deploy on push to main)   |
| Node       | 20                                      |

---

## Key Commands

```bash
npm run dev:wedding      # Dev server → http://localhost:5173
npm run build:wedding    # Production build (mirrors Netlify)
npm run check            # typecheck + lint + format:check
npm run pre-push         # MUST pass before every git push
```

---

## Import Aliases (Vite + TypeScript)

```ts
@shared/ui     → shared/ui/index.ts
@shared/hooks  → shared/hooks/index.ts
@shared/utils  → shared/utils/index.ts
@app/*         → apps/wedding-website/src/*
```
Never use relative `../` paths crossing the app/shared boundary.

---

## TypeScript Strict Rules — Know These Cold

| Flag                         | Impact                                                             |
|------------------------------|--------------------------------------------------------------------|
| `verbatimModuleSyntax`       | Always `import type` for type-only imports. No exceptions.         |
| `exactOptionalPropertyTypes` | Never pass `prop={value | undefined}` to optional props            |
| `noUncheckedIndexedAccess`   | Array/Record index access returns `T | undefined`                  |
| `noUnusedLocals`             | Unused vars = TS6133 = build error. Remove or prefix with `_`      |
| `noUnusedParameters`         | Unused params = build error. Prefix with `_` if intentionally unused |

### Common TS Errors & Fixes

| Code   | Cause                                             | Fix                                             |
|--------|---------------------------------------------------|-------------------------------------------------|
| TS2375 | `exactOptionalPropertyTypes` + `prop={x|undefined}` | `{...(cond ? { prop: x } : {})}`              |
| TS6133 | Declared but never read                           | Remove or prefix with `_`                       |
| TS7030 | useEffect not all paths return undefined          | Add explicit `return undefined`                 |
| TS2339 | Property doesn't exist on type                   | Check types.ts matches config shape             |
| TS7053 | Element implicitly has 'any' type (index access)  | Use `CeremonySlug` union for slug keys          |

---

## Design System

### Color Tokens

| Token      | Hex       | Usage                              |
|------------|-----------|------------------------------------|
| `saffron`  | #FF6B00   | CTAs, active states                |
| `maroon`   | #800020   | Headers, primary text on light bg  |
| `gold`     | #C9A84C   | Borders, dividers, gold accents    |
| `ivory`    | #FDF6EC   | Light section backgrounds          |
| `divine`   | #2D1B4E   | Dark section backgrounds           |
| `marigold` | #FFBE00   | Haldi/ceremony accent              |

### Section Background Alternation — NEVER break this rule
```
Dark (mandala-bg): Hero, Blessings, CeremoniesGrid, Gallery, Travel, FAQ
Light (bg-ivory):  OurStory, Schedule, WeddingParty, RSVP
```
Never two dark or two light sections in a row.

### Typography
- `font-display` — Playfair Display (section headings)
- `font-body`    — Poppins (body, UI)
- `font-hindi`   — Noto Sans Devanagari (Hindi text)
- `font-script`  — Dancing Script (decorative/romantic text)

### Tailwind Component Classes
- `.section-padding`    — responsive py/px for sections
- `.section-container`  — max-w-6xl auto-centered container
- `.card-divine`        — glassmorphism card for dark sections
- `.card-light`         — ivory card for light sections
- `.input-divine`       — styled form input
- `.gold-divider`       — thin gold horizontal rule
- `.gold-divider-wide`  — wider shimmer gold rule
- `.mandala-bg`         — dark purple-maroon radial bg
- `.text-gradient-gold` — animated shimmer gold text
- `.glow-gold`          — gold drop-shadow filter

---

## Animation System Rules

- All Framer Motion variants live ONLY in `shared/utils/animations.ts`
- Never define variants inline inside components
- Always `viewport={{ once: true }}` for scroll-triggered animations

```ts
import { fadeInUp, staggerContainer, scaleInBounce } from '@shared/utils'
```

---

## i18n System

- **10 namespaces:** common, home, story, ceremonies, schedule, gallery, party, travel, rsvp, faq
- **2 languages:** `en` (dev default) → `hi` (prod default, change before launch)
- **RULE:** Add keys to BOTH `en/` and `hi/` simultaneously, always
- **Type safety:** `react-i18next.d.ts` uses EN JSON as source of truth for typed `t()`
- **Language persistence:** stored in `localStorage` key `i18nextLng`

---

## AmbientPlayer — Current State (2026-05-24)

**File:** `src/components/layout/AmbientPlayer.tsx`
**Audio:** `public/audio/sangeet.mp3` (5.1MB ✅)
**Hook:** `shared/hooks/useAudioPlayer.ts`

### Behaviour
- Audio starts **muted** on load (browser always allows muted autoplay)
- First `click` or `touchstart` anywhere → `play()` then 300ms → `toggleMute()` (unmutes)
- ॐ button: first click triggers audio start (via document listener, not toggle)
- Subsequent ॐ clicks → `toggle()` for pause/resume
- `hasError` → button disabled + `cursor-not-allowed opacity-40`
- `isLoading` → spinner ring around button, `whileHover` not applied

### Critical Implementation Notes
```ts
// DO NOT add 'scroll' to triggers — scroll fires on page load, breaks click
const triggers = ['click', 'touchstart'] as const

// startedRef prevents double-fire: document listener + button onClick same click
if (!startedRef.current) return  // in onClick — lets document listener handle first click

// playRef/toggleMuteRef avoid stale closures in effects
const playRef = useRef(play)
const toggleMuteRef = useRef(toggleMute)
```

### Audio Cache
`useAudioPlayer` uses a module-level `Map<string, HTMLAudioElement>` — one Audio element per src.
On page refresh the cache is cleared. On HMR it persists (expected behavior in dev).

---

## Inactive Files (keep, do not delete)

| File                                  | Why kept                              |
|---------------------------------------|---------------------------------------|
| `sections/RSVP.tsx`                   | No RSVP on this wedding               |
| `sections/Travel.tsx`                 | Travel info is private                |
| `sections/Reception.tsx`              | No reception ceremony                 |
| `sections/OurStoryV2.tsx`             | Dark bg variant — swap in if needed   |
| `layout/ThemeToggle.tsx`              | Light-theme-only decision             |
| `shared/hooks/useTheme.ts`            | Light-theme-only decision             |

---

## Open TODOs (as of 2026-05-24)

- [ ] Exact times for Haldi, Mehendi, Sangeet ceremonies
- [ ] Full addresses + Google Maps pins for all venues
- [ ] Add 6 ceremony MP3s to `public/audio/` (haldi/mehendi/sangeet/baraat/pheras/vidaai.mp3)
- [ ] Real Instagram / Facebook URLs in `wedding.config.ts`
- [ ] JSONBin account + API keys → `.env` (for WishesWall)
- [ ] Engagement photos → `public/assets/gallery/`
- [ ] Schedule.tsx — connect to real ceremony times
- [ ] Gallery.tsx — masonry grid + lightbox (needs photos)
- [ ] WeddingParty.tsx — member cards (needs party list + bios)
- [ ] Switch `fallbackLng: 'en'` → `'hi'` before production
- [ ] GitHub push → Netlify connect → confirm domain rohitwedspriti.netlify.app

---

## Claude Skills — Read Before Working

| Domain                    | File                                   |
|---------------------------|----------------------------------------|
| Components / hooks / logic| `claude-skills/frontend-developer.md`  |
| Visual / CSS / animation  | `claude-skills/frontend-designer.md`   |
| Architecture decisions    | `claude-skills/frontend-architect.md`  |
| Testing / accessibility   | `claude-skills/frontend-tester.md`     |

---

## Session Start Checklist

1. Read `context/TODO.md` — open tasks + verified fixes
2. Read `context/WEDDING_DETAILS.md` — confirmed real data only
3. Read relevant `claude-skills/` file for your domain
4. After session → update `context/TODO.md` + create `context/sessions/YYYY-MM-DD.md`
