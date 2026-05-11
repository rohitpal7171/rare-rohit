import { Footer } from '@app/components/layout/Footer'
import { Navbar } from '@app/components/layout/Navbar'
import { Blessings } from '@app/components/sections/Blessings'
import { CeremoniesGrid } from '@app/components/sections/CeremoniesGrid'
import { FAQ } from '@app/components/sections/FAQ'
import { Gallery } from '@app/components/sections/Gallery'
import { Hero } from '@app/components/sections/Hero'
import { OurStory } from '@app/components/sections/OurStory' // original — keep
import { Schedule } from '@app/components/sections/Schedule'
import { WeddingParty } from '@app/components/sections/WeddingParty'
import { WishesWall } from '@app/components/sections/WishesWall'

// ── Available story variants (swap by changing the import below) ───────────
// import { OurStory } from '@app/components/sections/OurStory'       ← original (light bg, alternating cards)
// import { OurStoryV2 } from '@app/components/sections/OurStoryV2'   ← v2 (dark bg, scroll-driven thread)

// ── Removed sections (files kept, not rendered) ───────────────────────────
// Travel    → private, not on website
// RSVP      → managed by family
// Reception → no reception

export const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Blessings />
        <OurStory />
        <CeremoniesGrid />
        <Schedule />
        <Gallery />
        <WeddingParty />
        <WishesWall />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
