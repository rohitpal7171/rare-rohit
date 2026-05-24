# CLAUDE.md — apps/wedding-website/src/
# Last updated: 2026-05-24

## Directory Map

```
src/
├── App.tsx               — Root component: i18n init + router provider + AmbientPlayer
├── main.tsx              — Entry point: ReactDOM.createRoot
├── config/               — Domain types + wedding data (source of truth)
├── i18n/                 — i18next config + 10 namespace JSON files (en + hi)
├── components/
│   ├── layout/           — Navbar, Footer, PageWrapper, AmbientPlayer, ThemeToggle
│   ├── sections/         — All home page sections
│   ├── ceremonies/       — 7 ceremony detail components + helpers
│   └── effects/          — CursorEffect (canvas cursor trail)
├── pages/                — Home, CeremonyPage, NotFound
├── router/               — createBrowserRouter config
├── styles/               — index.css (Tailwind directives + CSS custom properties)
└── test/                 — Vitest tests + setup
```

---

## App.tsx — Root Component

- Provides `RouterProvider` wrapping the entire app
- Syncs `document.documentElement.lang` on i18n language change
- Renders `AmbientPlayer` globally (outside router, always visible)
- No `useTheme` (light-theme-only decision — removed)
- Default export (exception to named-export rule — App is always default)

---

## main.tsx

- `ReactDOM.createRoot(document.getElementById('root')!).render(<App />)`
- Imports `./styles/index.css`
- Initializes i18n (side-effect import of `./i18n/config`)

---

## styles/index.css

Contains:
1. Tailwind directives: `@tailwind base`, `@tailwind components`, `@tailwind utilities`
2. CSS custom properties on `:root` — mirrors all Tailwind design tokens for JS/CSS use
3. Font face declarations (Google Fonts are loaded via `<link>` in `index.html`)
4. Global base styles (html, body, *, scrollbar)
5. Custom utility classes that can't be done in Tailwind plugin

**Note:** CSS custom properties here and Tailwind tokens in `tailwind.config.ts` must stay in sync.
Tailwind config is source of truth — CSS vars mirror it.

---

## Component Rules (All Files in src/)

- Named exports everywhere — only `App.tsx` uses default export
- Props interface defined directly above every component
- `cn()` from `@shared/utils` for all conditional Tailwind class merging
- All user-visible text via `useTranslation('namespace')` — no hardcoded strings
- Framer Motion variants from `@shared/utils/animations` — never inline
- Never import from `../../` — use `@shared/*` or `@app/*` aliases
- `import type` for all type-only imports (`verbatimModuleSyntax`)

---

## effects/CursorEffect.tsx

- Global canvas-based cursor trail effect (sparkles/petals following cursor)
- Rendered in `App.tsx` or `Home.tsx` at root level
- Pointer-events-none — never blocks interaction
- Uses `requestAnimationFrame` loop — cleaned up on unmount
