# CLAUDE.md — src/i18n/locales/en/

# Last updated: 2026-06-14

## Purpose

English translations — the **type-source-of-truth** for all i18n keys.
`src/i18n/react-i18next.d.ts` imports these files to provide typed `t()` calls.

## Files

| File              | Section / Component                 | Notes                                              |
| ----------------- | ----------------------------------- | -------------------------------------------------- |
| `common.json`     | Navbar, Footer, shared UI           | Global strings used across multiple sections       |
| `home.json`       | Hero, Blessings sections            |                                                    |
| `story.json`      | OurStory section                    | Arranged marriage — no love-story framing          |
| `ceremonies.json` | CeremoniesGrid + all ceremony pages | title, tagline, description, significance per slug |
| `schedule.json`   | Schedule section                    | Placeholder — needs real content                   |
| `gallery.json`    | Gallery section                     | Placeholder — needs real content                   |
| `faq.json`        | FAQ section                         | Active                                             |
| `travel.json`     | Travel section (inactive)           | Keep file, section not rendered                    |
| `rsvp.json`       | RSVP section (inactive)             | Keep file, section not rendered                    |
| `party.json`      | WeddingParty (replaced)             | Keep file, not in i18n bundle                      |
| `wishes.json`     | WishesWall (removed)                | Keep file, not in i18n bundle                      |

## Adding a New Key

```json
// en/common.json — add here first
{ "backToCeremonies": "Back to Ceremonies" }
```

Then immediately add the same key to `hi/common.json` with the Hindi translation.

## Language

- English only — no Hindi in this folder
- Use natural, warm, celebratory tone appropriate for a wedding website
- Story content: marriage is **arranged** — never use love-story/romance framing
