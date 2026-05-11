# CLAUDE.md — rare-rohit Monorepo

## Before Starting Any Session
1. Read `context/TODO.md` — open tasks, verified fixes, what's next
2. Read `context/WEDDING_DETAILS.md` — real names, dates, venues (before touching any config)
3. Read `context/PLAN.md` — overall phase status
4. Read `context/DECISIONS.md` — before any architectural change
5. Read relevant `claude-skills/` file for the domain you're working in
6. After working — update `context/TODO.md` + `context/PLAN.md` + `context/sessions/YYYY-MM-DD.md`

## Real Wedding Details (quick reference — full details in context/WEDDING_DETAILS.md)
- **Groom:** Rohit Singh Pal (रोहित सिंह पाल)
- **Bride:** Priti Pal (प्रीति पाल)
- **Lagun:** 24 November 2026 — Gwalior, MP
- **Baraat / Pheras:** 25 November 2026 — Kokapur, near Udi Moad
- **Hashtag:** #RohitWedsPriti (confirm before launch)

## Project Identity
- **Repo:** rare-rohit (personal monorepo by Rohit)
- **Structure:** `apps/*` · `shared/*` · `claude-skills/` · `context/` (gitignored)
- **Stack:** TypeScript 5 strict · React 18 · Vite 5 SWC · Tailwind v3 · Framer Motion v11

## Claude Skills — Read Before Working
| Domain | Skill file |
|--------|-----------|
| Building / editing components | `claude-skills/frontend-developer.md` + `claude-skills/frontend-designer.md` |
| Architecture decisions | `claude-skills/frontend-architect.md` |
| Testing | `claude-skills/frontend-tester.md` |
| Any visual work | `claude-skills/frontend-designer.md` |

## Context Files (gitignored — safe to delete entire folder)
```
context/
├── README.md              ← explains the system
├── TODO.md                ← open tasks + verified fixes (read every session)
├── WEDDING_DETAILS.md     ← real names, dates, venues — source of truth
├── PLAN.md                ← build phases + status
├── DECISIONS.md           ← architectural decisions + reasoning
└── sessions/              ← per-session notes (YYYY-MM-DD.md)
```

## Monorepo Rules
- `shared/` has NO `package.json` — pure TypeScript source via Vite path aliases
- Aliases: `@shared/ui` · `@shared/hooks` · `@shared/utils` · `@app/*`
- Never relative imports crossing package boundaries

## TypeScript
- `verbatimModuleSyntax: true` — always `import type` for type-only imports
- `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` — enabled
- ZERO `.js`/`.jsx` files

## Quality Commands
```bash
npm run dev:wedding      # → http://localhost:5173
npm run check            # typecheck + lint + format:check (run before commit)
npm run build:wedding    # production build
```

## Git Commit Format
`feat:` `fix:` `chore:` `docs:` `style:` `refactor:` `perf:`
Always run `npm run check` before committing.
