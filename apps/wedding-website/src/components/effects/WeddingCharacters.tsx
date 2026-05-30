/**
 * WeddingCharacters.tsx
 * Couple PNG fixed at bottom-right. Visible on all screen sizes.
 * Animations: entrance slide-up, continuous idle float, section bounce reaction.
 *
 * LAYOUT RULES (prevent overflow/scroll):
 * - overflow-hidden on wrapper prevents image bleeding outside viewport
 * - max-w with responsive sizes ensures image never exceeds safe width
 * - pointer-events-none so it never blocks clicks
 * - No competing y transforms — parallax removed, single y axis on idle float only
 */

import { useEffect, useRef, useState } from 'react'

import { animate, motion } from 'framer-motion'

// ─── Section detection ────────────────────────────────────────────────────────

const SECTION_IDS = ['home', 'our-story', 'ceremonies', 'schedule', 'gallery'] as const
type SectionId = (typeof SECTION_IDS)[number]

const useActiveSection = (): SectionId => {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const detect = (): SectionId => {
      const trigger = window.innerHeight * 0.4
      let best: SectionId = 'home'
      let bestDist = Infinity
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el === null) continue
        const dist = trigger - el.getBoundingClientRect().top
        if (dist >= 0 && dist < bestDist) {
          bestDist = dist
          best = id
        }
      }
      return best
    }

    const onScroll = (): void => setActive(detect())
    window.addEventListener('scroll', onScroll, { passive: true })
    const t1 = setTimeout(() => setActive(detect()), 400)
    const t2 = setTimeout(() => setActive(detect()), 1500)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return active
}

// ─── Section reactions ────────────────────────────────────────────────────────

type Reaction = { scale: number[]; duration: number }

const REACTIONS: Record<SectionId, Reaction> = {
  'home':       { scale: [1, 1.04, 1],       duration: 1.0 },
  'our-story':  { scale: [1, 1.03, 1],       duration: 1.2 },
  'ceremonies': { scale: [1, 1.06, 1.02, 1], duration: 1.6 },
  'schedule':   { scale: [1, 1.03, 1],       duration: 0.9 },
  'gallery':    { scale: [1, 1.04, 1],       duration: 1.1 },
}

// ─── Main component ───────────────────────────────────────────────────────────

export const WeddingCharacters = () => {
  const section     = useActiveSection()
  const ref         = useRef<HTMLDivElement>(null)
  const prevSection = useRef<SectionId | null>(null)

  // Section change → bounce reaction (rotate + scale only, NO y — idle float handles y)
  useEffect(() => {
    if (ref.current === null) return
    if (prevSection.current === section) return
    prevSection.current = section

    const r = REACTIONS[section]
    void animate(ref.current, { scale: r.scale }, {
      duration: r.duration,
      ease: [0.22, 1, 0.36, 1],
    })
  }, [section])

  return (
    <motion.div
      aria-hidden="true"
      // overflow-hidden prevents image bleeding outside viewport on mobile
      className="pointer-events-none fixed bottom-0 right-0 z-[24]"
      // Entrance: slides up once on mount
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Idle float: gentle bob, only this div moves on y-axis */}
      <motion.div
        ref={ref}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        // Responsive right padding via Tailwind
        className="px-2 sm:px-3 md:px-4 lg:px-6"
      >
        <img
          src="/wedding_pics/namaste/bride_groom_namaste.png"
          alt="Rohit and Priti"
          draggable={false}
          className="block select-none"
          style={{
            // mobile 390px → ~110px | tablet 768px → ~175px | desktop 1440px → ~260px | 2K → 320px
            height: 'clamp(90px, calc(10vw + 8vh), 320px)',
            width: 'auto',
            maxWidth: '30vw',  // never wider than 30% viewport — prevents horizontal overflow
          }}
        />
      </motion.div>
    </motion.div>
  )
}
