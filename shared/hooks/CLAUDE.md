# CLAUDE.md — shared/hooks/

## Purpose
Reusable custom React hooks shared across all apps.

## Hooks
- `useCountdown.ts` — Returns days/hours/minutes/seconds until a target date
- `useScrollAnimation.ts` — Returns ref + inView boolean via IntersectionObserver
- `useMediaQuery.ts` — Reactive breakpoint detection (sm/md/lg/xl)
- `useLocalStorage.ts` — Typed localStorage with SSR safety

## Rules
- Every hook starts with `use` prefix
- Fully typed return values — no `any`
- Clean up side effects in useEffect return
- Export all from `index.ts`
