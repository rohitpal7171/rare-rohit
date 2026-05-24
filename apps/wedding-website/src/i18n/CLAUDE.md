# CLAUDE.md — apps/wedding-website/src/i18n/
# Last updated: 2026-05-24

## Files

| File                  | Purpose                                                          |
|-----------------------|------------------------------------------------------------------|
| `config.ts`           | i18next init — language detection, namespaces, fallback          |
| `react-i18next.d.ts`  | Declaration merging — types `t()` based on EN JSON shapes        |
| `locales/en/`         | English translations (10 JSON files)                             |
| `locales/hi/`         | Hindi translations (10 JSON files — identical key structure)     |

---

## Namespaces & Files

| Namespace    | en/ file           | hi/ file           | Status         |
|--------------|--------------------|--------------------|----------------|
| `common`     | common.json        | common.json        | Active         |
| `home`       | home.json          | home.json          | Active         |
| `story`      | story.json         | story.json         | Active         |
| `ceremonies` | ceremonies.json    | ceremonies.json    | Active         |
| `schedule`   | schedule.json      | schedule.json      | Placeholder    |
| `gallery`    | gallery.json       | gallery.json       | Placeholder    |
| `party`      | party.json         | party.json         | Placeholder    |
| `travel`     | travel.json        | travel.json        | Section inactive|
| `rsvp`       | rsvp.json          | rsvp.json          | Section inactive|
| `faq`        | faq.json           | faq.json           | Active         |

---

## Language Configuration

```ts
// src/i18n/config.ts
fallbackLng: 'en'   ← DEV default (change to 'hi' before production launch)
```

### Language Detection Order
1. `localStorage` key: `i18nextLng`
2. Browser `navigator.language`
3. Fallback to `fallbackLng`

### Language Persistence
User's choice saved automatically to `localStorage` key `i18nextLng`.

---

## Typed t() — How It Works

`react-i18next.d.ts` uses TypeScript declaration merging:
```ts
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof import('./locales/en/common.json')
      home:   typeof import('./locales/en/home.json')
      // ... etc
    }
  }
}
```
This gives full autocomplete on `t('key.subkey')` and catches typos at compile time.

**If `t()` loses autocomplete or shows TypeScript errors:**
- Check that EN JSON files are valid JSON
- Check that `react-i18next.d.ts` imports match actual file paths
- Check both `en/` and `hi/` have identical key structures

---

## Rules — CRITICAL

1. **Always add keys to BOTH `en/` AND `hi/` at the same time** — never one without the other
2. Never hardcode user-visible strings in components — always use `t()`
3. Namespace per section — never dump everything into `common`
4. `common.json` = only truly global strings (nav labels, button text, error messages, shared ceremony labels)
5. Never use `t('key')` without `useTranslation('namespace')` at top of component
6. When adding new namespace: add to `config.ts` ns array AND update `react-i18next.d.ts`

---

## Adding a New Translation Key

```bash
# 1. Add to en/
# 2. Add to hi/ (same key, Hindi value)
# 3. TypeScript will immediately catch usage via typed t()
```

Example:
```json
// en/common.json
{ "backToCeremonies": "Back to Ceremonies" }

// hi/common.json
{ "backToCeremonies": "समारोहों पर वापस जाएं" }
```

---

## Pre-Production Checklist

- [ ] Change `fallbackLng: 'en'` → `'hi'` in `config.ts`
- [ ] Audit all EN/HI JSON files for missing keys
- [ ] Replace all placeholder content with real bilingual content
- [ ] Test language toggle in both directions
- [ ] Verify `react-i18next.d.ts` has no TypeScript errors
