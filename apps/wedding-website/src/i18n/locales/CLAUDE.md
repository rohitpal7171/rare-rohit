# CLAUDE.md — src/i18n/locales/
# Last updated: 2026-06-14

## Structure

```
locales/
├── en/    — English translations (9 active JSON files)
└── hi/    — Hindi translations (9 JSON files — MUST mirror en/ structure exactly)
```

## Golden Rule

**Every key added to `en/` must be added to `hi/` in the same commit.**
The pre-push check (`npm run pre-push`) enforces this — it will fail if key counts differ.

## Active Namespaces

| Namespace    | en/ file          | hi/ file          | Status           |
|--------------|-------------------|-------------------|------------------|
| `common`     | common.json       | common.json       | Active           |
| `home`       | home.json         | home.json         | Active           |
| `story`      | story.json        | story.json        | Active           |
| `ceremonies` | ceremonies.json   | ceremonies.json   | Active           |
| `schedule`   | schedule.json     | schedule.json     | Placeholder      |
| `gallery`    | gallery.json      | gallery.json      | Placeholder      |
| `faq`        | faq.json          | faq.json          | Active           |
| `travel`     | travel.json       | travel.json       | Section inactive |
| `rsvp`       | rsvp.json         | rsvp.json         | Section inactive |
| `party`      | party.json        | party.json        | Section replaced |
| `wishes`     | wishes.json       | wishes.json       | Feature removed  |

## How Keys Are Typed

`src/i18n/react-i18next.d.ts` imports EN JSON as the type source.
TypeScript will catch missing/misspelled keys at compile time.
When you add a new namespace: update both `config.ts` and `react-i18next.d.ts`.
