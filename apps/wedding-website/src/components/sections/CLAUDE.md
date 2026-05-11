# CLAUDE.md — src/components/sections/

## Sections & Their Namespaces

| File               | Section ID     | i18n namespace | Notes                                                      |
| ------------------ | -------------- | -------------- | ---------------------------------------------------------- |
| Hero.tsx           | #home          | home           | Fullscreen, countdown, floating petals, mandala bg         |
| Blessings.tsx      | #blessings     | home           | Ganesh & Lakshmi cards, Sanskrit shlokas                   |
| OurStory.tsx       | #our-story     | story          | Alternating L/R scroll timeline                            |
| CeremoniesGrid.tsx | #ceremonies    | ceremonies     | 7 cards → /ceremony/:slug routes                           |
| Schedule.tsx       | #schedule      | schedule       | Day-wise event timeline                                    |
| Gallery.tsx        | #gallery       | gallery        | Masonry grid + lightbox (photos in public/assets/gallery/) |
| WeddingParty.tsx   | #wedding-party | party          | Bride & groom sides with member cards                      |
| Travel.tsx         | #travel        | travel         | Venue + airport + train cards with map link                |
| RSVP.tsx           | #rsvp          | rsvp           | react-hook-form + zod, UI only (no backend yet)            |
| FAQ.tsx            | #faq           | faq            | Animated accordion                                         |

## Order in Home.tsx

Hero → Blessings → OurStory → CeremoniesGrid → Schedule → Gallery → WeddingParty → Travel → RSVP → FAQ
