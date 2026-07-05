# CLAUDE.md — apps/wedding-website/src/components/sections/

# Last updated: 2026-05-30

## Active Sections

| File                  | Section ID        | Background | i18n NS      | Lazy | Status |
| --------------------- | ----------------- | ---------- | ------------ | ---- | ------ |
| `Hero.tsx`            | `#home`           | mandala-bg | `home`       | No   | ACTIVE |
| `Blessings.tsx`       | `#blessings`      | mandala-bg | `home`       | Yes  | ACTIVE |
| `OurStory.tsx`        | `#our-story`      | bg-ivory   | `story`      | Yes  | ACTIVE |
| `CeremoniesGrid.tsx`  | `#ceremonies`     | mandala-bg | `ceremonies` | Yes  | ACTIVE |
| `Schedule.tsx`        | `#schedule`       | bg-ivory   | `schedule`   | Yes  | ACTIVE |
| `Gallery.tsx`         | `#gallery`        | mandala-bg | `gallery`    | Yes  | ACTIVE |
| `DivineBlessings.tsx` | `#divine-invites` | bg-white   | `common`     | Yes  | ACTIVE |

### Background alternation rule

Dark → Light → Dark → Light → Dark → Dark (DivineBlessings breaks the strict rule with white bg — acceptable as final section before Footer)

---

## Inactive Sections (files kept, not rendered)

| File               | Replaced by / Reason               |
| ------------------ | ---------------------------------- |
| `WeddingParty.tsx` | Replaced by `DivineBlessings.tsx`  |
| `WishesWall.tsx`   | Feature removed (stub only)        |
| `OurStoryV2.tsx`   | Dark bg variant, swap in if needed |
| `RSVP.tsx`         | No RSVP on this wedding            |
| `Travel.tsx`       | Travel info is private             |
| `Reception.tsx`    | No reception ceremony              |

---

## DivineBlessings.tsx — Key Notes

**Manifest:** `public/wedding_pics/deities/manifest.json`

```json
{ "deities": ["ganesha.png", "shiva.png", ...] }
```

- Add/remove filenames from the array to control which images appear
- Supports PNG, JPG, GIF, WebP
- Section renders nothing if manifest is missing or empty
- Uses `common` namespace keys: `divineInvites.eyebrow`, `divineInvites.title`, `divineInvites.subtitle`

**Marquee:**

- Two identical track divs side by side (`track-A` + `track-B`)
- CSS `@keyframes divineMarquee` animates wrapper left by 50% (= one track width)
- At -50%, `track-B` is exactly where `track-A` started → seamless infinite loop
- `animationPlayState: paused` on hover/touch
- Each image has staggered float animation (`y: 0 → -12 → 0`)
- Container box is `height + 24px` — extra 24px prevents float from being clipped

---

## Hero.tsx — Key Notes

- `min-h-screen` — always full viewport height
- `OmSymbol` and `FloatingPetal` are `memo()` — never re-render from AmbientPlayer state
- Countdown via `<Countdown targetDate={wedding.date} />` from `@shared/ui`
- Floating petals: 6 positions, CSS `animate-petal-fall` keyframe

---

## OurStory.tsx — Key Notes

- Timeline keys: `met`, `friendship`, `love`, `proposal`, `wedding`
- Alternating left/right layout on md+, stacked on mobile
- Uses `fadeInLeft` / `fadeInRight` from `@shared/utils`
- Light section (`bg-ivory`) — uses `card-light` not `card-divine`

---

## CeremoniesGrid.tsx — Key Notes

- Reads slugs from `CEREMONY_SLUGS` constant in `@shared/utils`
- Each card links to `/ceremony/:slug`
- Active slugs: `haldi`, `mehendi`, `sangeet`, `baraat`, `pheras`, `vidaai`
- `reception` slug exists in config but NOT in `CEREMONY_SLUGS` — not shown

---

## Schedule.tsx — Key Notes

- 4 hardcoded days: Day1 (23 Nov), Day2 (24 Nov Lagun), Day3 (25 Nov Baraat), Day4 (26 Nov Wedding)
- Reads ceremony times from `weddingConfig.ceremonies[slug].time`
- TODO: ceremony times are TBD for Haldi, Mehendi, Sangeet

---

## Gallery.tsx — Key Notes

- Currently shows "Photos coming soon" placeholder
- TODO: Add masonry grid + lightbox when engagement photos are available
- Photos go in `public/assets/gallery/`

---

## Blessings.tsx — Key Notes

- Two cards: Lord Ganesha + Goddess Lakshmi
- Sanskrit shloka + English meaning
- Uses `glowPulse` animation variant from `@shared/utils`
- Dark section (`mandala-bg`) — uses `card-divine`
