/**
 * DivineBlessings.tsx
 * "Special Invites To" section — infinite horizontal marquee of deity images.
 *
 * Dynamic — reads filenames from:
 *   public/wedding_pics/deities/manifest.json
 *
 * To add/remove deities: edit manifest.json only.
 * Supports PNG, JPG, GIF, WebP — any format browser can display.
 *
 * Marquee behaviour:
 * - Auto-scrolls left continuously (CSS animation — no JS fighting)
 * - Pauses on hover or touch
 * - Each image has a gentle idle float (staggered, Framer Motion)
 * - No names, no cards — images only
 */

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

// ─── Manifest loader ──────────────────────────────────────────────────────────

const MANIFEST_URL = '/wedding_pics/deities/manifest.json'
const BASE_PATH    = '/wedding_pics/deities/'

const useDeities = (): string[] => {
  const [files, setFiles] = useState<string[]>([])

  useEffect(() => {
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: { deities: string[] }) => {
        if (Array.isArray(data.deities)) setFiles(data.deities)
      })
      .catch(() => setFiles([]))
  }, [])

  return files
}

// ─── Single deity image with idle float ──────────────────────────────────────

interface DeityImageProps {
  file: string
  index: number
  height: number
}

const DeityImage = ({ file, index, height }: DeityImageProps) => (
  <motion.div
    className="relative shrink-0 flex items-end justify-center px-3"
    style={{ height: height + 24 }}  // taller box, image stays same height
    animate={{ y: [0, -12, 0] }}
    transition={{
      duration: 2.8 + (index % 5) * 0.35,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: (index % 7) * 0.45,
    }}
  >
    <img
      src={`${BASE_PATH}${file}`}
      alt=""
      draggable={false}
      className="block select-none"
      style={{
        height,             // image height unchanged
        width: 'auto',
        maxWidth: height * 1.2,
        objectFit: 'contain',
        filter: 'none',
      }}
    />
  </motion.div>
)

// ─── Infinite marquee ─────────────────────────────────────────────────────────
// Pure CSS animation — no JS position tracking, no fighting with drag.
// The track is duplicated so the loop is seamless.

interface MarqueeProps {
  files: string[]
  height: number
  paused: boolean
}

const Marquee = ({ files, height, paused }: MarqueeProps) => {
  // Single track rendered twice as separate sibling divs.
  // wrapper = track-A + track-B (same width).
  // Animation moves wrapper left by 50% of its own width.
  // At -50%, track-B is exactly where track-A started — reset is invisible.
  const track = (key: string) => (
    <div key={key} className="flex shrink-0 items-end">
      {files.map((file, i) => (
        <DeityImage key={`${file}-${i}`} file={file} index={i} height={height} />
      ))}
    </div>
  )

  return (
    <div style={{ overflowX: 'hidden', overflowY: 'visible' }}>
      <div
        className="flex w-max items-end"
        style={{
          animation: 'divineMarquee 30s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {track('a')}
        {track('b')}
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export const DivineBlessings = () => {
  const { i18n } = useTranslation('common')
  const isHindi  = i18n.language.startsWith('hi')
  const files    = useDeities()
  const [paused, setPaused]     = useState(false)
  const [imgHeight, setImgHeight] = useState(220)

  useEffect(() => {
    const update = (): void => {
      const w = window.innerWidth
      if      (w < 480)  setImgHeight(130)
      else if (w < 768)  setImgHeight(170)
      else if (w < 1280) setImgHeight(220)
      else               setImgHeight(280)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (files.length === 0) return null

  return (
    <>
      {/* Keyframe injected once via a style tag */}
      <style>{`
        @keyframes divineMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <section
        id="divine-invites"
        className="overflow-visible bg-white py-16 sm:py-20 lg:py-24"
      >
        {/* Header */}
        <div className="section-container mb-12 text-center">
          <AnimatedSection stagger>
            <motion.p
              variants={fadeInUp}
              className="font-script text-lg text-gold sm:text-xl"
            >
              {isHindi ? 'विशेष निमंत्रण' : 'Special Invites To'}
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="section-title mt-2 text-maroon"
            >
              {isHindi ? 'देवी देवताओं को' : 'The Divine Ones'}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-body text-base text-maroon/60 sm:text-lg"
            >
              {isHindi
                ? 'हम इस पवित्र बंधन की शुरुआत देवी-देवताओं के आशीर्वाद से करते हैं'
                : 'We begin this sacred union under the blessings of the divine'}
            </motion.p>
            <motion.div variants={fadeInUp} className="gold-divider mt-4" />
          </AnimatedSection>
        </div>

        {/* Marquee — pause on hover or touch */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => { setTimeout(() => setPaused(false), 2000) }}
          className="cursor-grab active:cursor-grabbing"
          style={{ paddingTop: '20px', paddingBottom: '16px' }}  // room for float animation
        >
          <Marquee files={files} height={imgHeight} paused={paused} />
        </div>

        {/* Bottom gold line */}
        <div aria-hidden="true" className="pointer-events-none mt-10 flex justify-center">
          <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      </section>
    </>
  )
}
