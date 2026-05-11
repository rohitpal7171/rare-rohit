# CLAUDE.md — shared/utils/

## Purpose
Shared utilities, Framer Motion animation variants, and constants.

## Files
- `animations.ts` — All Framer Motion variants (fadeInUp, staggerContainer, scaleIn, floatLoop, etc.)
- `formatDate.ts` — Date formatting for both EN and HI locales
- `constants.ts` — App-wide constants (breakpoints, z-index scale, etc.)
- `cn.ts` — clsx + tailwind-merge helper

## Rules
- Pure functions only — no React, no side effects
- Export all from `index.ts`
- `animations.ts` is the ONLY place Framer Motion variants are defined
