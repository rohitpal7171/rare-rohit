# CLAUDE.md — apps/
# Last updated: 2026-06-14

## Purpose

Workspace apps directory. Each subdirectory is one deployable application.

## Apps

| Directory         | Description                           | Status   |
|-------------------|---------------------------------------|----------|
| `wedding-website/`| Rohit & Priti wedding website (React) | Active   |

This is a monorepo. Only one app exists today — `wedding-website`.
Do not create sibling apps here without first updating the root `package.json` workspaces field.

## Rules

- Each app has its own `package.json`, `vite.config.ts`, `tsconfig.json`
- Apps import shared code only via `@shared/*` path aliases — never via relative `../../../shared/`
- Shared code lives in `shared/` at the repo root — never duplicate it inside an app
- Each app owns its own `public/`, `src/`, deployment config
