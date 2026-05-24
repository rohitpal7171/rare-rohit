# CLAUDE.md — apps/wedding-website/src/components/
# Last updated: 2026-05-24

## Folder Structure

```
components/
├── layout/      — App-wide persistent UI (Navbar, Footer, PageWrapper, AmbientPlayer)
├── sections/    — Home page sections rendered in order inside Home.tsx
├── ceremonies/  — Individual ceremony pages rendered via CeremonyPage.tsx
└── effects/     — Visual effects (CursorEffect canvas)
```

## Rules for ALL Components in This Folder

- One component per file — filename = PascalCase matching export name
- Named exports only (except App.tsx — never add default exports here)
- Props interface defined directly above component with explicit name `[ComponentName]Props`
- Every root element accepts `className?: string` for external styling override
- Import aliases only — never `../../` relative paths crossing boundaries:
  - Cross-boundary: use `@shared/*` or `@app/*`
  - Same-folder: relative is fine (`./utils`, `../layout/Navbar`)
- All user-visible text via `useTranslation('namespace')` — zero hardcoded strings
- Framer Motion variants from `@shared/utils/animations` — never inline
- `cn()` from `@shared/utils` for conditional class merging

## z-index Hierarchy (never break)

```
z-20  — regular page content
z-30  — Navbar (always above content)
z-40  — AmbientPlayer (fixed bottom-left, above navbar on mobile)
z-50  — MobileNav drawer
z-60  — Modals / full-screen overlays
```

## Performance Notes

- Large sections (Gallery, WeddingParty) should use `LazyImage` from `@shared/ui`
- AnimatedSection should wrap static content blocks for scroll-reveal
- Never create anonymous functions in JSX props that run on every render for complex components
