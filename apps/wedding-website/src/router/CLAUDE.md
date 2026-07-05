# CLAUDE.md — apps/wedding-website/src/router/

# Last updated: 2026-05-24

## File: index.tsx

Defines all routes using React Router v6 `createBrowserRouter`.

## Routes

| Path              | Component      | Notes                              |
| ----------------- | -------------- | ---------------------------------- |
| `/`               | `Home`         | All sections                       |
| `/ceremony/:slug` | `CeremonyPage` | Slug validated inside CeremonyPage |
| `*`               | `NotFound`     | 404 fallback                       |

## Why createBrowserRouter (not createHashRouter)

Clean URLs (`/ceremony/haldi` not `/#/ceremony/haldi`).
Netlify's `_redirects` + `netlify.toml` handle SPA routing for hard refreshes.

```
/* /index.html 200   ← in public/_redirects
```

## Rules

- Do NOT add slug validation here — it lives in `CeremonyPage.tsx`
- Do NOT add lazy loading yet — app is small, premature optimization
- When lazy loading is added: wrap each lazy component in `<Suspense fallback={<PageSkeleton />}>`
- All route components imported from `@app/pages/`
