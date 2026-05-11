# CLAUDE.md — src/components/ceremonies/

## Ceremony Components
Each file corresponds to one ceremony route: `/ceremony/:slug`

| File | Slug | Emoji |
|------|------|-------|
| Haldi.tsx | haldi | 🌼 |
| Mehendi.tsx | mehendi | 🌿 |
| Sangeet.tsx | sangeet | 🎶 |
| Baraat.tsx | baraat | 🐎 |
| Pheras.tsx | pheras | 🔥 |
| Vidaai.tsx | vidaai | 🌸 |
| Reception.tsx | reception | 🥂 |

## Each Component Renders
1. Back button → `/#ceremonies`
2. Hero: emoji + ceremony name + tagline
3. Date / Time / Venue summary card (from `weddingConfig.ceremonies[slug]`)
4. Description card (from `t('slug.description')` in ceremonies namespace)
5. Significance card (from `t('slug.significance')`)
6. Full venue details + Get Directions button

## Data Sources
- Dates, times, venue: `weddingConfig.ceremonies[slug]` from `@app/config/wedding.config`
- Text content: `useTranslation('ceremonies')` — supports EN + HI
- Language-aware: use `i18n.language === 'hi'` to switch between Hindi/English venue fields
