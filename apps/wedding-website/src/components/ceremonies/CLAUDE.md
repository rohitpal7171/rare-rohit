# CLAUDE.md — apps/wedding-website/src/components/ceremonies/
# Last updated: 2026-05-24

## Ceremony Components

Each file = one ceremony route at `/ceremony/:slug`

| File                    | Slug        | Emoji | Status  | Notes                                  |
|-------------------------|-------------|-------|---------|----------------------------------------|
| `Haldi.tsx`             | `haldi`     | 🌼    | ACTIVE  | Time TBD                               |
| `Mehendi.tsx`           | `mehendi`   | 🌿    | ACTIVE  | Time TBD                               |
| `Sangeet.tsx`           | `sangeet`   | 🎶    | ACTIVE  | Time TBD, venue TBD                    |
| `Baraat.tsx`            | `baraat`    | 🐎    | ACTIVE  | ✅ 25 Nov, 4:00 PM, Kokapur            |
| `Pheras.tsx`            | `pheras`    | 🔥    | ACTIVE  | ✅ 26 Nov, 9:00 AM, Kokapur            |
| `Vidaai.tsx`            | `vidaai`    | 🌸    | ACTIVE  | ✅ 26 Nov, time TBD, Kokapur           |
| `Reception.tsx`         | `reception` | 🥂    | INACTIVE| Route exists but NO reception event    |
| `CeremonyMusicPlayer.tsx`| —          | —     | ACTIVE  | Per-ceremony ambient audio player      |
| `RitualFacts.tsx`       | —           | —     | ACTIVE  | Flip-card cultural facts per ceremony  |

---

## What Each Ceremony Component Renders

1. **Back button** → navigates to `/#ceremonies`
2. **Hero** — emoji + ceremony name (from i18n) + tagline
3. **Summary card** — Date / Time / Venue (from `weddingConfig.ceremonies[slug]`)
4. **Description card** — `t('slug.description')` from `ceremonies` namespace
5. **Significance card** — `t('slug.significance')` from `ceremonies` namespace
6. **Venue card** — Full address + Get Directions button (opens Google Maps)
7. **RitualFacts** — flip cards with cultural/ritual facts
8. **CeremonyMusicPlayer** — ambient audio for the ceremony (needs MP3 files)

---

## Data Sources

- **Dates, times, venue:** `weddingConfig.ceremonies[slug]` from `@app/config/wedding.config`
- **Text content:** `useTranslation('ceremonies')` — keys: `slug.description`, `slug.significance`, `slug.title`, etc.
- **Language-aware venue names:** use `i18n.language === 'hi'` to switch `nameHindi`/`addressHindi`

---

## CeremonyMusicPlayer.tsx

Plays per-ceremony ambient audio. Requires MP3 files in `public/audio/`:
```
public/audio/
├── sangeet.mp3   ← EXISTS ✅ (used by AmbientPlayer globally too)
├── haldi.mp3     ← MISSING ❌
├── mehendi.mp3   ← MISSING ❌
├── baraat.mp3    ← MISSING ❌
├── pheras.mp3    ← MISSING ❌
└── vidaai.mp3    ← MISSING ❌
```
Until MP3s are added, CeremonyMusicPlayer renders nothing / error state gracefully.

---

## RitualFacts.tsx

- Flip cards showing cultural context for each ceremony
- Facts are hardcoded in the component (not from i18n yet)
- Content: what the ritual means, Hindu significance, what to expect

---

## i18n Keys Expected (ceremonies namespace)

```json
{
  "haldi": {
    "title": "...",
    "tagline": "...",
    "description": "...",
    "significance": "..."
  },
  "mehendi": { ... },
  "sangeet": { ... },
  "baraat": { ... },
  "pheras": { ... },
  "vidaai": { ... }
}
```
Both `en/ceremonies.json` and `hi/ceremonies.json` must have all these keys.

---

## Hardcoded Strings TODO

These strings are still hardcoded EN — add to `common.json` when Hindi translations are ready:
- "Back to Ceremonies"
- "About this Ceremony"
- "Significance"
- "Venue"
- "Get Directions"
- "Date" label on ceremony cards

---

## Rules

- Never access `weddingConfig.ceremonies[slug]` without slug type validation
- `CeremonyPage.tsx` validates the slug using `VALID_SLUGS = new Set(Object.keys(ceremonyMap))`
- Component receives the validated config object as prop — never re-fetch config inside ceremony components
- `Reception.tsx` exists for routing completeness but should never be linked from CeremoniesGrid
