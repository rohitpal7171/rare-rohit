# CLAUDE.md — apps/wedding-website/src/components/

## Folders

- `layout/` — App-wide layout: Navbar, Footer, PageWrapper
- `sections/` — Home page sections (rendered in order inside Home.tsx)
- `ceremonies/` — Individual ceremony detail pages (rendered via CeremonyPage.tsx)

## Rules

- One component per file, filename = PascalCase matching export name
- Every component accepts `className?: string` if it renders a root element
- Never import from `../../` — always use `@shared/*` or `@app/*` aliases
- Animations: use `AnimatedSection` wrapper or explicit `motion.div` with variants from `@shared/utils`
- i18n: `useTranslation('namespace')` at top of every component that renders text
