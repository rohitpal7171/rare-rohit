# CLAUDE.md — shared/ui/

## Purpose

Reusable React UI components shared across all apps.

## Components

- `Button.tsx` — Base button with variants (primary, secondary, ghost)
- `Modal.tsx` — Accessible modal with backdrop + escape key close
- `Countdown.tsx` — Animated wedding day countdown timer
- `AnimatedSection.tsx` — Scroll-reveal wrapper using Framer Motion
- `LazyImage.tsx` — IntersectionObserver lazy loading with blur placeholder
- `MobileNav.tsx` — Hamburger drawer navigation
- `LanguageToggle.tsx` — EN ↔ हिंदी language switcher

## Rules

- Accept `className` prop on every component for external styling
- Use `cn()` (clsx + tailwind-merge) for class merging
- Never hardcode colors — use Tailwind tokens or CSS variables
- All components fully typed with explicit prop interfaces
- Export all from `index.ts`
