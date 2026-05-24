# CLAUDE.md — apps/wedding-website/src/pages/
# Last updated: 2026-05-24

## Pages

| File               | Route              | Purpose                                     |
|--------------------|--------------------|---------------------------------------------|
| `Home.tsx`         | `/`                | Composes all active sections                |
| `CeremonyPage.tsx` | `/ceremony/:slug`  | Dynamic ceremony detail page                |
| `NotFound.tsx`     | `*`                | 404 fallback                                |

---

## Home.tsx

Renders Navbar + all active sections in order + Footer.

### Current Section Order
```tsx
<Navbar />
<main>
  <Hero />          // #home       — dark
  <Blessings />     // #blessings  — dark
  <OurStory />      // #our-story  — light
  <CeremoniesGrid/> // #ceremonies — dark
  <Schedule />      // #schedule   — light
  <Gallery />       // #gallery    — dark
  <WeddingParty />  // #wedding-party — light
  <WishesWall />    // #wishes     — varies
  <FAQ />           // #faq        — dark
</main>
<Footer />
```

NOT rendered (inactive): Travel, RSVP, Reception.

### Section ID Anchors
Nav links use `<a href="/#section-id">` — section IDs must match exactly.
IDs: `home`, `blessings`, `our-story`, `ceremonies`, `schedule`, `gallery`, `wedding-party`, `faq`

---

## CeremonyPage.tsx

Handles `/ceremony/:slug` dynamic route.

### Slug Validation
```ts
const VALID_SLUGS = new Set(Object.keys(ceremonyMap))
// If slug not in set → navigate('/', { replace: true })
```

### ceremonyMap
```ts
const ceremonyMap: Record<CeremonySlug, FC> = {
  haldi:     Haldi,
  mehendi:   Mehendi,
  sangeet:   Sangeet,
  baraat:    Baraat,
  pheras:    Pheras,
  vidaai:    Vidaai,
  reception: Reception,   // exists but not linked from site
}
```

### Structure
```tsx
<Navbar />
<PageWrapper>
  <DynamicCeremonyComponent />
</PageWrapper>
<Footer />
```

### Import Notes
- Must `import type { FC } from 'react'` — required by `verbatimModuleSyntax`
- `useNavigate` for invalid slug redirect
- `useParams` for slug extraction

---

## NotFound.tsx

- Renders a 404 page with link back to `/`
- Also: `public/404.html` exists for Netlify to serve on hard 404s before React loads
