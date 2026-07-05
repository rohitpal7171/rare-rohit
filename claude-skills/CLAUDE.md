# CLAUDE.md — claude-skills/

# Last updated: 2026-06-14

## Purpose

Senior reference guides for working in this codebase. Read the relevant file **before** starting work in a domain — it contains patterns, rules, and gotchas specific to this project.

## Files

| File                    | Read When...                                                              |
| ----------------------- | ------------------------------------------------------------------------- |
| `frontend-developer.md` | Writing TypeScript, React components, hooks, Framer Motion, i18n          |
| `frontend-designer.md`  | Touching CSS, Tailwind, animations, colors, typography, spacing           |
| `frontend-architect.md` | Making structural decisions — file organization, bundle strategy, aliases |
| `frontend-tester.md`    | Writing or updating tests — Vitest, RTL, accessibility, i18n testing      |

## How to Use

```markdown
# Before working on a new component:

→ Read frontend-developer.md

# Before touching tailwind.config.ts or index.css:

→ Read frontend-designer.md

# Before restructuring folders or changing imports:

→ Read frontend-architect.md

# Before writing tests:

→ Read frontend-tester.md
```

## These Are NOT Docs

These files describe how to work in THIS project — not generic how-tos.
They contain project-specific patterns, invariants, and prior decisions that explain WHY the code is shaped the way it is.
