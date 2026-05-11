# claude-skills/ — Senior Reference Guides

Skills for Claude to read before working in each domain.
Each file is a senior-level reference guide for this specific project.

## When to read which skill

| Task                                       | Read                                             |
| ------------------------------------------ | ------------------------------------------------ |
| Building or editing any component          | `frontend-developer.md` + `frontend-designer.md` |
| Architecture or structural decisions       | `frontend-architect.md`                          |
| Writing tests or auditing accessibility    | `frontend-tester.md`                             |
| Anything visual (layout, color, animation) | `frontend-designer.md`                           |

## Skills

### `frontend-developer.md`

TypeScript standards, React component patterns, hooks discipline,
Framer Motion v11 usage, i18n standards, performance patterns, code quality gates.

### `frontend-designer.md`

Indian wedding aesthetic principles, color usage rules, typography scale,
spacing rhythm, component visual standards, animation design philosophy,
responsive strategy, CSS architecture, quality checklist.

### `frontend-tester.md`

Testing stack (Vitest + RTL + Playwright), what to test and what not to test,
RTL query priority, async patterns, accessibility auditing with axe-core,
i18n completeness testing, Lighthouse performance budgets.

### `frontend-architect.md`

Monorepo structure rationale, bundle chunking strategy, TypeScript config inheritance,
ESLint architecture, Netlify deployment per app, scalability decisions,
when to add to shared/ vs keep in app.

## Related

- `context/DECISIONS.md` — architectural decisions with full reasoning
- `context/PLAN.md` — current build status

## Note

These files are **not gitignored** — they're part of the codebase, not throwaway context.
They document how to work on this project, not just the current state of it.
