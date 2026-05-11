# CLAUDE.md — src/i18n/

## Files

- `config.ts` — i18next init. Change `fallbackLng: 'en'` → `'hi'` before production launch
- `react-i18next.d.ts` — Declaration merging for fully typed `t()` — based on EN locale JSON shapes
- `locales/en/` — English translations (10 namespace JSON files)
- `locales/hi/` — Hindi translations (10 namespace JSON files, same keys as EN)

## Namespaces

| Namespace  | File            | Used in                               |
| ---------- | --------------- | ------------------------------------- |
| common     | common.json     | Navbar, Footer, buttons, errors       |
| home       | home.json       | Hero, Blessings sections              |
| story      | story.json      | OurStory section                      |
| ceremonies | ceremonies.json | CeremoniesGrid + all 7 ceremony pages |
| schedule   | schedule.json   | Schedule section                      |
| gallery    | gallery.json    | Gallery section                       |
| party      | party.json      | WeddingParty section                  |
| travel     | travel.json     | Travel section                        |
| rsvp       | rsvp.json       | RSVP section                          |
| faq        | faq.json        | FAQ section                           |

## Rules

- ALWAYS add new keys to BOTH `en/` and `hi/` simultaneously
- Never add keys to one language without the other — breaks typed t()
- Never hardcode strings in components — always use t()
- `react-i18next.d.ts` uses EN types as source of truth for all namespaces

## Language Switch

- Dev default: `en` (fallbackLng in config.ts)
- Prod default: `hi` (change fallbackLng to 'hi' before launch)
- User choice persisted in localStorage key: `i18nextLng`
