# CLAUDE.md — apps/wedding-website/src/config/

# Last updated: 2026-05-24

## Files

| File                | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `types.ts`          | All TypeScript interfaces for wedding domain          |
| `wedding.config.ts` | All personal wedding details — single source of truth |

---

## types.ts — Domain Interfaces

```ts
Person {
  name: string             // English name
  nameHindi: string        // Hindi name
  family: string           // Family name EN
  familyHindi: string      // Family name HI
  bio?: string             // Optional short bio EN
  bioHindi?: string        // Optional short bio HI
}

Venue {
  name: string             // EN venue name
  nameHindi: string        // HI venue name
  address: string          // EN full address
  addressHindi: string     // HI full address
  city: string             // EN city
  cityHindi: string        // HI city
  mapUrl: string           // Google Maps link
}

CeremonyConfig {
  slug: CeremonySlug       // Typed union from @shared/utils
  date: string             // ISO 8601 e.g. '2026-11-26T09:00:00+05:30'
  time: string             // Display string e.g. '9:00 AM'
  timeHindi: string        // Display string e.g. 'प्रातः ९ बजे'
  venue: Venue
  color: string            // Tailwind color token e.g. 'maroon', 'divine'
  icon: string             // Emoji
}

WeddingConfig {
  bride: Person
  groom: Person
  wedding: { date: string, venue: Venue }   // Countdown targets this date
  ceremonies: Record<CeremonySlug, CeremonyConfig>
  hashtag: string
  socialLinks: { instagram?: string, facebook?: string }
}
```

---

## wedding.config.ts — Current State (2026-05-24)

### Confirmed ✅

- Groom: Rohit Singh Pal / रोहित सिंह पाल
- Bride: Priti Pal / प्रीति पाल
- Baraat: 25 Nov 2026, 4:00 PM, Kokapur, Udi Modh, UP
- Pheras: 26 Nov 2026, 9:00 AM, Kokapur, Udi Modh, UP
- Vidaai: 26 Nov 2026 (time TBD), Kokapur
- Hashtag: #RohitWedsPriti
- `wedding.date`: '2026-11-26T09:00:00+05:30' (Pheras — countdown target)

### Still TODO ❌

- Haldi/Mehendi/Sangeet exact times (currently placeholders)
- Full addresses + real Google Maps pins for all venues
- Sangeet venue name
- Real Instagram / Facebook URLs (currently placeholder URLs)

### Placeholder Values to Replace Before Launch

```ts
socialLinks.instagram: 'https://instagram.com'    // → real profile URL
socialLinks.facebook: 'https://facebook.com'      // → real profile URL
ceremonies.haldi.time: '10:00 AM'                 // → confirm
ceremonies.mehendi.time: '6:00 PM'                // → confirm
ceremonies.sangeet.time: '7:00 PM'                // → confirm
ceremonies.vidaai.time: '2:00 PM'                 // → confirm
```

---

## Critical Rules

- `wedding.config.ts` is the ONLY place personal details are defined
- Components NEVER hardcode names, dates, venues — always use `weddingConfig`
- Never import `weddingConfig` in `shared/` — that creates a circular dependency
- `CeremonySlug` type is defined in `shared/utils/constants.ts` — not here
- When adding/removing ceremonies, update BOTH `types.ts` (`CeremonySlug`) AND `wedding.config.ts`

---

## Ceremony Slugs (CeremonySlug union type)

```ts
type CeremonySlug = 'haldi' | 'mehendi' | 'sangeet' | 'baraat' | 'pheras' | 'vidaai' | 'reception'
```

`reception` exists in the type but there is no reception event — keep for routing completeness.
