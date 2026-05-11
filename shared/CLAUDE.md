# CLAUDE.md — shared/

## Purpose

Pure TypeScript source shared across all apps in this monorepo.
No `package.json` here — accessed via Vite path aliases `@shared/*`.

## Structure

- `ui/` — Reusable React components (Button, Modal, Countdown, etc.)
- `hooks/` — Reusable custom hooks (useCountdown, useScrollAnimation, etc.)
- `utils/` — Utilities, Framer Motion variants, constants, date helpers

## Rules

- No `package.json` in any subfolder
- No app-specific logic here — shared code must be generic
- Every folder has an `index.ts` barrel export
- All exports are named (no default exports)
- Fully typed — no `any`
- No direct Tailwind class usage — accept `className` props instead
- Framer Motion variants live in `utils/animations.ts`
