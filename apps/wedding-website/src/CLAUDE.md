# CLAUDE.md — apps/wedding-website/src/

## Structure

- `config/` — Wedding config & TypeScript types (single source of truth)
- `i18n/` — i18next setup, locale JSONs, typed declaration
- `components/layout/` — Navbar, Footer, PageWrapper
- `components/sections/` — All 10 home page sections
- `components/ceremonies/` — 7 individual ceremony detail components
- `pages/` — Home, CeremonyPage, NotFound
- `router/` — React Router v6 config
- `styles/` — Tailwind directives + custom CSS classes

## Component Rules

- Named exports everywhere (except App.tsx default export)
- Props interface defined above every component
- `cn()` from @shared/utils for conditional Tailwind classes
- All user-visible text via `useTranslation()` — NO hardcoded strings
- Framer Motion variants from `@shared/utils/animations` — never inline

## Section IDs (for nav anchor links)

#home | #blessings | #our-story | #ceremonies | #schedule
#gallery | #wedding-party | #travel | #rsvp | #faq
