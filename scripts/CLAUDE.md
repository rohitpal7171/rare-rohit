# CLAUDE.md — scripts/
# Last updated: 2026-06-14

## Files

| File                      | Purpose                                                        |
|---------------------------|----------------------------------------------------------------|
| `pre-commit-check.mjs`    | Pre-push validation — must pass before every `git push`        |

## pre-commit-check.mjs

Runs automatically via `npm run pre-push`. Validates:

1. **TypeScript** — `tsc -b` across the whole monorepo (zero type errors)
2. **ESLint** — zero errors AND zero warnings in `apps/wedding-website/src/`
3. **Required files** — checks that key files exist (`_redirects`, `netlify.toml`, `404.html`)
4. **i18n key parity** — every key in `en/` must also exist in `hi/` and vice versa
5. **No `console.log`** — warns about leftover debug logs in production code

## How to Run

```bash
# From repo root
npm run pre-push

# Must show PASS before pushing — if it fails, fix and run again
```

## Extending the Script

To add a new validation step:
1. Open `scripts/pre-commit-check.mjs`
2. Add a new async function following the existing pattern (returns `{ pass, message }`)
3. Call it in the main `runChecks()` array
4. Test with `npm run pre-push` before committing the script change itself

## Important

This script is the gate for Netlify auto-deploy.
Pushing broken code deploys broken code to `rohitwedspriti.netlify.app`.
**Never skip it with `--no-verify`.**
