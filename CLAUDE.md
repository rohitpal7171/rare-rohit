# CLAUDE.md — rare-rohit Monorepo

## ⚠️ BEFORE EVERY GIT PUSH — NON-NEGOTIABLE

```bash
npm run pre-push
```

If it fails → fix errors → run again → only push when PASS.
Details: `context/PRE-PUSH-CHECKLIST.md`

## Before Starting Any Session

1. Read `context/TODO.md` — open tasks, verified fixes, what's next
2. Read `context/WEDDING_DETAILS.md` — real names, dates, venues
3. Read `context/PLAN.md` — overall phase status
4. Read `context/DECISIONS.md` — before any architectural change
5. Read relevant `claude-skills/` file for the domain you're working in
6. After working — update `context/TODO.md` + create `context/sessions/YYYY-MM-DD.md`

## Real Wedding Details

- **Groom:** Rohit Singh Pal (रोहित सिंह पाल)
- **Bride:** Priti Pal (प्रीति पाल)
- **Lagun:** 24 November 2026 — Gwalior, MP
- **Baraat:** 25 November 2026, 4:00 PM — Kokapur, Udi Modh, UP
- **Pheras:** 26 November 2026, 9:00 AM — Kokapur, Udi Modh, UP
- **Hashtag:** #RohitWedsPriti

## Project Identity

- **Repo:** rare-rohit — github.com/rohitpal7171/rare-rohit
- **Live:** rohitwedspriti.netlify.app (auto-deploys on push to main)
- **Structure:** `apps/*` · `shared/*` · `claude-skills/` · `context/` (gitignored)
- **Stack:** TypeScript 5 strict · React 18 · Vite 5 SWC · Tailwind v3 · Framer Motion v11

## Claude Skills — Read Before Working

| Domain                   | File                                  |
| ------------------------ | ------------------------------------- |
| Components / logic       | `claude-skills/frontend-developer.md` |
| Visual / CSS / animation | `claude-skills/frontend-designer.md`  |
| Architecture decisions   | `claude-skills/frontend-architect.md` |
| Testing / accessibility  | `claude-skills/frontend-tester.md`    |

## Context Files (gitignored)

```
context/
├── TODO.md                ← open tasks + verified fixes
├── WEDDING_DETAILS.md     ← confirmed real data
├── PRE-PUSH-CHECKLIST.md  ← what to run before every push
├── PLAN.md                ← build phases
├── DECISIONS.md           ← architectural decisions
└── sessions/              ← per-session notes
```

## Key Commands

```bash
npm run pre-push         # ← run before EVERY push
npm run dev:wedding      # → http://localhost:5173
npm run build:wedding    # production build (same as Netlify)
npm run check            # typecheck + lint + format
```

## TypeScript Rules

- `verbatimModuleSyntax` — always `import type` for type-only imports
- `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` enabled
- `noUnusedLocals` + `noUnusedParameters` — zero unused vars/types
- ZERO `.js`/`.jsx` files

## Common TS Errors to Watch

- **TS7030** — useEffect not all paths return → add `return undefined`
- **TS6133** — declared but never used → remove the variable/type
- **TS2339** — property doesn't exist → check types.ts matches config
- **TS7053** — implicit any on index → check slug matches CeremonySlug
- **TS2375** — exactOptionalPropertyTypes → never pass `| undefined` to style
