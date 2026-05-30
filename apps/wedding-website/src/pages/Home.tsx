import { lazy, Suspense, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { AmbientPlayer } from '@app/components/layout/AmbientPlayer'
import { Footer } from '@app/components/layout/Footer'
import { Navbar } from '@app/components/layout/Navbar'
import { WeddingCharacters } from '@app/components/effects/WeddingCharacters'
import { Hero } from '@app/components/sections/Hero'

// Hero is above-the-fold — eager. All others lazy-loaded to reduce initial parse cost.
const Blessings = lazy(() =>
  import('@app/components/sections/Blessings').then((m) => ({ default: m.Blessings }))
)
const OurStory = lazy(() =>
  import('@app/components/sections/OurStory').then((m) => ({ default: m.OurStory }))
)
const CeremoniesGrid = lazy(() =>
  import('@app/components/sections/CeremoniesGrid').then((m) => ({ default: m.CeremoniesGrid }))
)
const Schedule = lazy(() =>
  import('@app/components/sections/Schedule').then((m) => ({ default: m.Schedule }))
)
const Gallery = lazy(() =>
  import('@app/components/sections/Gallery').then((m) => ({ default: m.Gallery }))
)
const DivineBlessings = lazy(() =>
  import('@app/components/sections/DivineBlessings').then((m) => ({ default: m.DivineBlessings }))
)

// ── Available story variants (swap by changing the import below) ───────────
// const OurStory = lazy(() => import('@app/components/sections/OurStory').then(m => ({ default: m.OurStory })))       ← original (light bg, alternating cards)
// const OurStoryV2 = lazy(() => import('@app/components/sections/OurStoryV2').then(m => ({ default: m.OurStoryV2 }))) ← v2 (dark bg, scroll-driven thread)

// ── Removed sections (files kept, not rendered) ───────────────────────────
// Travel    → private, not on website
// RSVP      → managed by family
// Reception → no reception
// WeddingParty → replaced by DivineBlessings (2026-05-30)

// Minimal section skeleton — just keeps layout stable while lazy chunks load
const SectionSkeleton = () => (
  <div className="section-padding mandala-bg" aria-hidden="true">
    <div className="section-container">
      <div className="mx-auto h-8 w-48 animate-pulse rounded-full bg-gold/10" />
    </div>
  </div>
)

export const Home = () => {
  const { hash } = useLocation()

  // Handle hash navigation (e.g. /#ceremonies from ceremony pages)
  // Retries up to 10 times with 100ms interval to wait for lazy sections to mount
  useEffect(() => {
    if (hash === '') return undefined
    const id = hash.replace('#', '')
    let attempts = 0
    const MAX_ATTEMPTS = 10
    const timers: ReturnType<typeof setTimeout>[] = []

    const tryScroll = (): void => {
      const el = document.getElementById(id)
      if (el !== null) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      attempts += 1
      if (attempts < MAX_ATTEMPTS) {
        timers.push(setTimeout(tryScroll, 100))
      }
    }

    timers.push(setTimeout(tryScroll, 50))
    return () => timers.forEach(clearTimeout)
  }, [hash])
  return (
    <>
      <Navbar />
      <main>
        {/* Hero is always eager — above the fold */}
        <Hero />

        {/* All below-fold sections are lazy — loaded after Hero paints */}
        <Suspense fallback={<SectionSkeleton />}>
          <Blessings />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <OurStory />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CeremoniesGrid />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Schedule />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Gallery />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <DivineBlessings />
        </Suspense>
      </main>
      <AmbientPlayer />
      <WeddingCharacters />
      <Footer />
    </>
  )
}
