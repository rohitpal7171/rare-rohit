# CLAUDE.md — src/router/

## File

- `index.tsx` — All routes defined with `createBrowserRouter`.

## Routes

| Path              | Component      | Notes                                    |
| ----------------- | -------------- | ---------------------------------------- |
| `/`               | `Home`         | All sections                             |
| `/ceremony/:slug` | `CeremonyPage` | Slug validated in CeremonyPage, not here |
| `*`               | `NotFound`     | 404 fallback                             |

## Notes

- `createBrowserRouter` is required (not `createHashRouter`) for clean URLs on Netlify
- Netlify `_redirects` + `netlify.toml` redirect handles SPA routing
- Do NOT add lazy loading here yet — app is small enough that it's premature
- When adding lazy loading: wrap in `Suspense` with a page-level skeleton loader
