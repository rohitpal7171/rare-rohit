# CLAUDE.md — shared/

# Last updated: 2026-05-24

## Purpose

Pure TypeScript/React source shared across all apps in this monorepo.
**No `package.json` here** — accessed exclusively via Vite path aliases.

## Structure

```
shared/
├── hooks/          → useAudioPlayer, useCountdown, useScrollAnimation,
│                     useLocalStorage, useMediaQuery, useTheme, useWishes
├── ui/
│   └── components/ → AnimatedSection, Button, Countdown, LanguageToggle,
│                     LazyImage, MobileNav, Modal
└── utils/          → animations.ts, cn.ts, constants.ts, formatDate.ts
```

## How Aliases Work

```ts
// Vite resolves at build time — zero runtime overhead
@shared/hooks  → shared/hooks/index.ts
@shared/ui     → shared/ui/index.ts
@shared/utils  → shared/utils/index.ts
```

TypeScript paths in `tsconfig.base.json` provide full type safety + autocomplete.

## Rules

- **No `package.json`** in any subfolder — never add one
- **No app-specific logic** — all code must be generic and reusable
- **No imports from `@app/*`** — that creates circular dependencies
- Every folder has an `index.ts` barrel — import from barrel only
- All exports are named — no default exports
- Fully typed — no `any`, no `unknown` without narrowing
- No hardcoded Tailwind classes in components — accept `className` props
- Framer Motion variants defined only in `utils/animations.ts`

## When to Add Something to shared/

✅ Add to shared/ when:

- Used by 2+ apps
- Has zero app-specific business logic
- Has a stable API unlikely to change frequently

❌ Keep in apps/ when:

- References `weddingConfig` or any app-specific data
- Only used in one app
- Subject to frequent app-specific changes
