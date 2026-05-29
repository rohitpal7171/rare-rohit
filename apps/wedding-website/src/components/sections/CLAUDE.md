# CLAUDE.md — apps/wedding-website/src/components/sections/
# Last updated: 2026-05-29

## All Sections

| File               | Section ID      | Namespace    | BG     | Status   | Notes                             |
|--------------------|-----------------|--------------|--------|----------|-----------------------------------|
| `Hero.tsx`         | `#home`         | `home`       | Dark   | ACTIVE   | Fullscreen, countdown, petals     |
| `Blessings.tsx`    | `#blessings`    | `home`       | Dark   | ACTIVE   | Ganesh + Lakshmi shloka cards     |
| `OurStory.tsx`     | `#our-story`    | `story`      | Light  | ACTIVE   | Arranged marriage timeline        |
| `OurStoryV2.tsx`   | `#our-story`    | `story`      | Dark   | INACTIVE | Dark bg variant — swap in if needed|
| `CeremoniesGrid.tsx`| `#ceremonies`  | `ceremonies` | Dark   | ACTIVE   | 6 ceremony cards (not reception)  |
| `Schedule.tsx`     | `#schedule`     | `schedule`   | Light  | PARTIAL  | Needs real ceremony times         |
| `Gallery.tsx`      | `#gallery`      | `gallery`    | Dark   | PARTIAL  | Needs photos                      |
| `WeddingParty.tsx` | `#wedding-party`| `party`      | Light  | PARTIAL  | Needs party list + bios           |
| `WishesWall.tsx`   | —               | —            | —      | REMOVED  | Stub file only — feature removed      |
| `Travel.tsx`       | `#travel`       | `travel`     | Dark   | INACTIVE | Travel info private               |
| `RSVP.tsx`         | `#rsvp`         | `rsvp`       | Light  | INACTIVE | No RSVP for this wedding          |
| `FAQ.tsx`          | `#faq`          | `faq`        | Dark   | ACTIVE   | Accordion, veg-only food          |

---

## Section Order in Home.tsx (current)

```
Hero → Blessings → OurStory → CeremoniesGrid → Schedule → Gallery → WeddingParty → FAQ
```
(WishesWall removed, Travel + RSVP not rendered)

---

## Background Alternation Rule — NEVER break

```
DARK  sections (mandala-bg class): Hero, Blessings, CeremoniesGrid, Gallery, FAQ
LIGHT sections (bg-ivory):         OurStory, Schedule, WeddingParty, RSVP
```
Visual flow: dark → light → dark → light — no two same-bg sections adjacent.

---

## Section-Specific Notes

### Hero.tsx
- Fullscreen (100vh) with mandala-bg
- Floating rose petal animation — CSS only (no Framer Motion conflict)
- `Countdown` component from `@shared/ui` targeting `weddingConfig.wedding.date`
- Location shown below countdown (Kokapur, Udi Modh, UP)
- Names: Rohit Singh Pal & Priti Pal (from `weddingConfig`, not hardcoded)

### OurStory.tsx
- **Arranged marriage** — content must never suggest love-at-first-sight narrative
- Timeline: First Meeting (20 Jan 2026) → Roka (30 Jan 2026) → Wedding (Nov 2026)
- Alternating left/right cards on desktop, single column on mobile
- Light bg (bg-ivory) — use `.card-light` not `.card-divine`

### CeremoniesGrid.tsx
- Shows 6 ceremony cards: Haldi, Mehendi, Sangeet, Baraat, Pheras, Vidaai
- **Reception NOT shown** (no reception event)
- Cards link to `/ceremony/[slug]`
- "View details" text — hardcoded EN, add to `common.json` when Hindi ready

### Schedule.tsx
- Day-wise timeline: 4 days (23 Nov → 26 Nov)
- Currently uses placeholder times — needs real ceremony times from Rohit
- Day labels from `schedule.json` (both en + hi)

### Gallery.tsx
- Masonry grid + lightbox
- Photos go in `public/assets/gallery/`
- Currently empty / placeholder state

### WeddingParty.tsx
- Bride's side + Groom's side member cards
- Needs real party list with names, roles, bios, photos

### WishesWall.tsx
- **REMOVED** — stub file only, do not use or import
- JSONBin-based feature was removed on 2026-05-29

### FAQ.tsx
- Animated accordion
- Key answers: Veg food only, no RSVP needed, dress code info
- Remove any RSVP or travel questions (those sections are not on site)

---

## Rules

- All text via `useTranslation('namespace')` — zero hardcoded strings (except noted TODOs)
- Use `AnimatedSection` from `@shared/ui` for scroll-reveal on section content
- Framer Motion variants from `@shared/utils/animations` — never inline
- `cn()` for conditional Tailwind classes
- Never import `weddingConfig` indirectly — import directly from `@app/config/wedding.config`
