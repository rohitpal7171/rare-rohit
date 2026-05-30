# CLAUDE.md — apps/wedding-website/src/pages/
# Last updated: 2026-05-30

## Pages

| File               | Route              | Purpose                                     |
|--------------------|--------------------|---------------------------------------------|
| `Home.tsx`         | `/`                | Composes all active sections                |
| `CeremonyPage.tsx` | `/ceremony/:slug`  | Dynamic ceremony detail page                |
| `NotFound.tsx`     | `*`                | 404 fallback                                |

---

## Home.tsx

### Current Section Order
```tsx
<Navbar />
<main>
  <Hero />           // #home        — dark  — EAGER (above fold)
  <Blessings />      // #blessings   — dark  — lazy
  <OurStory />       // #our-story   — light — lazy
  <CeremoniesGrid /> // #ceremonies  — dark  — lazy
  <Schedule />       // #schedule    — light — lazy
  <Gallery />        // #gallery     — dark  — lazy
  <WeddingParty />   // #wedding-party — light — lazy
</main>
<AmbientPlayer />    // fixed bottom-left — always eager
<WeddingCharacters/> // fixed bottom-right — always eager
<Footer />
```

NOT rendered: Travel, RSVP, Reception, WishesWall, FAQ (stubs kept, not imported).

### Lazy Loading Strategy
Hero is eager (above fold). All other sections are `React.lazy()` + `<Suspense>`.
Each section has its own `<Suspense fallback={<SectionSkeleton />}>`.
`SectionSkeleton` uses `mandala-bg` to prevent flash of white during load.

```ts
const OurStory = lazy(() =>
  import('@app/components/sections/OurStory').then((m) => ({ default: m.OurStory }))
)
```

### Hash Navigation (e.g. /#ceremonies from ceremony pages)
`useEffect` watches `useLocation().hash`. Retries up to 10× at 100ms intervals
to wait for lazy sections to mount before scrolling.
All timers stored in array and cleared on cleanup.

```ts
const tryScroll = (): void => {
  const el = document.getElementById(id)
  if (el !== null) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return }
  attempts += 1
  if (attempts < MAX_ATTEMPTS) timers.push(setTimeout(tryScroll, 100))
}
timers.push(setTimeout(tryScroll, 50))
return () => timers.forEach(clearTimeout)
```

### Section ID Anchors
Nav links use `<a href="/#section-id">` — section IDs must match exactly.
IDs: `home`, `blessings`, `our-story`, `ceremonies`, `schedule`, `gallery`, `wedding-party`

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
  haldi, mehendi, sangeet, baraat, pheras, vidaai
  // reception: exists but not linked from site
}
```

### Structure
```tsx
<Navbar />
<PageWrapper accentColor={weddingConfig.ceremonies[slug]?.color}>
  <DynamicCeremonyComponent />
</PageWrapper>
<Footer />
```

### `accentColor` prop
Passed from `weddingConfig.ceremonies[slug].color` — drives ceremony color flash in PageWrapper.
`undefined` → no flash (safe fallback).

---

## NotFound.tsx

- Renders a 404 page with link back to `/`
- `public/404.html` also exists for Netlify to serve on hard 404s before React loads
