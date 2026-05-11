# Senior Frontend Architect Skill

## Identity

You are a senior frontend architect. You think about how the codebase scales as it grows,
how new developers onboard, how the build stays fast, and how decisions made today avoid
pain 12 months from now.

---

## Monorepo Architecture

### Structure rationale

```
rare-rohit/
├── apps/          — Deployable applications (each has own package.json)
├── shared/        — Pure TS source, no package.json, accessed via aliases
└── claude-skills/ — AI context files (this folder)
```

**Why `shared/` has no `package.json`:**

- No publish/version complexity for internal packages
- Vite path aliases resolve at build time — zero runtime overhead
- TypeScript path mapping gives full type safety + autocomplete
- Changing shared code triggers rebuild in all consuming apps (correct behavior)

**When to move something to `shared/`:**

- Used by 2+ apps
- Has no app-specific business logic
- Has stable API (changes are rare)

**When to keep something in `apps/`:**

- App-specific (wedding config, ceremony routes)
- Subject to frequent changes
- References app-specific dependencies

---

## Bundle Architecture

### Chunk strategy (vite.config.ts)

```ts
manualChunks: {
  'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
  'vendor-motion': ['framer-motion'],
  'vendor-i18n':   ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
  'vendor-form':   ['react-hook-form', 'zod', '@hookform/resolvers'],
  'vendor-ui':     ['lucide-react'],
}
```

**Why separate chunks:**

- React/router is cached long-term — changes rarely
- Motion is large (150KB+) — only loaded once per session
- i18n is large — separate caching lifecycle
- Parallel loading of independent chunks

### Code splitting strategy

```ts
// Route-level lazy loading (add when app grows)
const CeremonyPage = lazy(() => import('./pages/CeremonyPage'))
const Home = lazy(() => import('./pages/Home'))

// Wrap with Suspense in router
{
  path: '/ceremony/:slug',
  element: (
    <Suspense fallback={<PageLoader />}>
      <CeremonyPage />
    </Suspense>
  )
}
```

### Asset optimization

- SVGs: use `vite-plugin-svgr` for React components (inline, themeable)
- Images: WebP format, explicit width/height, loading="lazy"
- Fonts: preconnect to fonts.googleapis.com in index.html
- Icons: Lucide React (tree-shakeable, no icon font)

---

## TypeScript Architecture

### Config inheritance chain

```
tsconfig.base.json          ← Root — strictest possible settings
  └── apps/wedding-website/tsconfig.json    ← extends base, adds app paths
        └── apps/wedding-website/tsconfig.node.json  ← Vite config only
```

### Path alias contract

```ts
// These aliases are the public API of each module
@shared/ui     → single export point (index.ts)
@shared/hooks  → single export point (index.ts)
@shared/utils  → single export point (index.ts)
@app/*         → any file inside apps/wedding-website/src/

// Never deep-import:
// ❌ import { cn } from '../../shared/utils/cn'
// ✅ import { cn } from '@shared/utils'
```

### Type discipline

- `types.ts` in config/ is the source of truth for domain types
- Never define the same type in two places — one canonical location
- Prefer `satisfies` over `as` for type checking without widening
- `Record<K, V>` over index signatures when keys are finite and known

---

## ESLint Architecture

### Plugin philosophy

- **unicorn** — enforces modern JS patterns (no `arguments`, prefer `Array.from`, etc.)
- **sonarjs** — cognitive complexity, duplicate code detection
- **@typescript-eslint/strict** — no unsafe operations
- **import** — import ordering, no unused imports, no circular deps
- **jsx-a11y** — accessibility at lint time
- **react-hooks** — hook rules enforced

### Rule severity

- `error` — must fix before commit (blocks CI)
- `warn` — should fix (allowed in CI but tracked)
- `off` — explicitly disabled (never just forgotten)

### What to never disable

- `@typescript-eslint/no-explicit-any` — use `unknown`
- `@typescript-eslint/no-unsafe-*` — these catch real bugs
- `react-hooks/exhaustive-deps` — stale closure bugs
- `jsx-a11y/alt-text` — accessibility

---

## Netlify Deployment Architecture

### Per-app deployment

Each app in `apps/` gets its own Netlify site:

```
wedding-website → yournames.netlify.app
trips           → yourtrips.netlify.app  (future)
```

Each has its own `netlify.toml`:

```toml
[build]
  base    = "apps/wedding-website"   ← monorepo root-relative
  command = "npm run build"          ← runs from base dir
  publish = "dist"                   ← relative to base
```

### CI/CD strategy (GitHub Actions)

```yaml
# Trigger only when relevant app or shared/ changes
on:
  push:
    paths:
      - 'apps/wedding-website/**'
      - 'shared/**'
```

### Environment variables

- `.env` — gitignored, local dev only
- `.env.example` — committed, documents required vars
- Netlify dashboard — production vars set there, never in code

---

## Scalability Decisions

### Adding a new app

1. `cp -r apps/wedding-website apps/new-app`
2. Update `package.json` name field
3. Add `dev:new-app` script to root `package.json`
4. Create `netlify.toml` for new app
5. Update root `README.md`

### Adding a shared component

1. Create in `shared/ui/components/`
2. Export from `shared/ui/index.ts`
3. Type it fully — no `any`, explicit prop interfaces
4. Keep it generic — no app-specific logic, no hardcoded strings

### When NOT to put something in shared

- It imports from `@app/*` — that's a circular dependency
- It has hardcoded wedding-specific content — it belongs in the app
- It's only used once — YAGNI, add to shared when second use appears
