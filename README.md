# rare-rohit — Personal Monorepo

A monorepo housing all personal projects by Rohit. Each app is independently deployable.

## Structure

```
rare-rohit/
├── apps/
│   ├── wedding-website/     # Indian wedding website
│   └── trips/               # Future: travel memories app
├── shared/
│   ├── ui/                  # Shared React components
│   ├── hooks/               # Shared custom hooks
│   └── utils/               # Shared utilities & animation variants
└── claude-skills/           # Senior skill guides for Claude
```

## Apps

| App | Description | Status |
|-----|-------------|--------|
| [wedding-website](./apps/wedding-website/README.md) | Indian wedding website — bilingual (Hindi + English) | 🚧 In Progress |
| trips | Travel memories & trip planner | 📋 Planned |

## Getting Started

```bash
npm install
npm run dev:wedding        # → http://localhost:5173
npm run build:wedding
npm run check              # typecheck + lint + format:check
```

## Tech Stack
React 18 · TypeScript 5 strict · Vite 5 SWC · Tailwind CSS v3 · Framer Motion v11
React Router v6 · i18next · react-hook-form + zod · Netlify

## Planning Context
All planning files, decisions log, and session notes live in `context/` (gitignored).
Read `context/PLAN.md` for current status and `context/DECISIONS.md` for architecture decisions.
