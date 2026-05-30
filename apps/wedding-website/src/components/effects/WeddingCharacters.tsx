/**
 * WeddingCharacters.tsx
 * Couple PNG fixed at bottom-right.
 *
 * Interactions:
 * - Hover  → cursor grab
 * - Drag   → freely repositionable anywhere on screen
 * - Click (no drag) × 1 → 2× size
 * - Click (no drag) × 2 → 4× size
 * - Click (no drag) × 3 → reset to original size & position
 * - Section change → gentle scale pulse
 * - Always: idle float bob
 */

import { useEffect, useRef, useState } from 'react'

import { animate, motion, useDragControls } from 'framer-motion'

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

// Base height — responsive across all screen sizes
const BASE_HEIGHT = 'clamp(90px, calc(10vw + 8vh), 320px)'

// Drag distance threshold — moves less than this = treated as a click, not a drag
const DRAG_CLICK_THRESHOLD = 5

// ─── Main component ───────────────────────────────────────────────────────────

export const WeddingCharacters = () => {
  const section      = useActiveSection()
  const reactionRef  = useRef<HTMLDivElement>(null)
  const prevSection  = useRef<SectionId | null>(null)
  const dragControls = useDragControls()

  // Size cycle: 0=1×, 1=2×, 2=4× — click at 2 resets to 0
  const [clickCount, setClickCount] = useState(0)

  // Track drag distance to distinguish click from drag
  const dragStartPos = useRef<{ x: number; y: number } | null>(null)

  // Section change → scale pulse
  useEffect(() => {
    if (reactionRef.current === null) return
    if (prevSection.current === section) return
    prevSection.current = section

    const r = REACTIONS[section]
    void animate(reactionRef.current, { scale: r.scale }, {
      duration: r.duration,
      ease: [0.22, 1, 0.36, 1],
    })
  }, [section])

  const sizeScale = Math.pow(2, clickCount)

  // Cap scale so image height never exceeds window height
  // BASE_HEIGHT resolves to clamp(90px, calc(10vw + 8vh), 320px)
  // We approximate the actual rendered height to compute max allowed scale
  const getMaxScale = (): number => {
    const baseH = Math.min(320, Math.max(90, 0.10 * window.innerWidth + 0.08 * window.innerHeight))
    return window.innerHeight / baseH
  }
  const cappedScale = Math.min(sizeScale, getMaxScale())

  const handlePointerDown = (e: React.PointerEvent): void => {
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    dragControls.start(e)
  }

  const handlePointerUp = (e: React.PointerEvent): void => {
    if (dragStartPos.current === null) return
    const dx = Math.abs(e.clientX - dragStartPos.current.x)
    const dy = Math.abs(e.clientY - dragStartPos.current.y)
    const moved = Math.sqrt(dx * dx + dy * dy)

    // Only treat as click if pointer barely moved
    if (moved < DRAG_CLICK_THRESHOLD) {
      // Cycle: 0 → 1 → 2 → 0 (reset)
      setClickCount((c) => (c >= 2 ? 0 : c + 1))
    }
    dragStartPos.current = null
  }

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      // Constrain so image can't be dragged fully off-screen
      dragConstraints={{
        top:    -window.innerHeight * 0.7,
        left:   -window.innerWidth  * 0.7,
        right:  0,
        bottom: 0,
      }}
      className="fixed bottom-0 right-0 z-[24] touch-none"
      style={{ cursor: 'grab' }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Idle float */}
      <motion.div
        ref={reactionRef}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="px-2 sm:px-3 md:px-4 lg:px-6"
      >
        {/* Size scale — grows from bottom-right corner */}
        <motion.div
          animate={{ scale: cappedScale }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'bottom right' }}
        >
          <img
            src="/wedding_pics/namaste/bride_groom_namaste.png"
            alt="Rohit and Priti"
            draggable={false}
            className="block select-none"
            style={{
              height: BASE_HEIGHT,
              width: 'auto',
              maxWidth: '30vw',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
