# CLAUDE.md — src/config/

## Files
- `types.ts` — All TypeScript interfaces for wedding data. Source of truth for domain types.
- `wedding.config.ts` — All personal wedding details. **Update this with real data before launch.**

## Types
- `Person` — bride/groom with name (EN + HI), family, bio
- `Venue` — name/address/city in EN + HI, mapUrl
- `CeremonyConfig` — slug, date (ISO), time (EN + HI), venue, color token, emoji icon
- `WeddingConfig` — root config interface

## wedding.config.ts — Placeholder Values
Currently has placeholder data. Update before launch:
1. Replace `bride.name` / `bride.nameHindi` with real bride name
2. Replace `groom.name` with real name (currently 'Rohit Verma' as placeholder)
3. Replace all venue names, addresses, mapUrls
4. Update `wedding.date` ISO string
5. Update `hashtag`
6. Update `rsvpDeadline`

## Never
- Never import `weddingConfig` in `shared/` — that would create a circular dependency
- Never hardcode names/dates/venues in components — always use `weddingConfig`
