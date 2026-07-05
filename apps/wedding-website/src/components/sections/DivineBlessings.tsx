/**
 * DivineBlessings.tsx
 * "Special Invites To" section — infinite horizontal marquee of deity images.
 *
 * Dynamic — reads filenames from:
 *   public/wedding_pics/deities/manifest.json
 *
 * Performance fixes (2026-05-30):
 * - Section header shows immediately — no flash of missing content
 * - Skeleton placeholder shown while manifest loads
 * - loading="lazy" + decoding="async" on all images
 * - Marquee animation only starts after images are loaded
 * - Images fade in smoothly once ready
 */

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

// ─── Manifest loader ──────────────────────────────────────────────────────────

const MANIFEST_URL = '/wedding_pics/deities/manifest.json'
const BASE_PATH = '/wedding_pics/deities/'

type LoadState = 'loading' | 'ready' | 'error'

const useDeities = (): { files: string[]; state: LoadState } => {
  const [files, setFiles] = useState<string[]>([])
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    fetch(MANIFEST_URL)
      .then((r) => r.json())
      .then((data: { deities: string[] }) => {
        if (Array.isArray(data.deities) && data.deities.length > 0) {
          setFiles(data.deities)
          setState('ready')
        } else {
          setState('error')
        }
      })
      .catch(() => setState('error'))
  }, [])

  return { files, state }
}

// ─── Responsive height ────────────────────────────────────────────────────────

const useImgHeight = (): number => {
  const [h, setH] = useState(220)
  useEffect(() => {
    const calc = (): void => {
      const w = window.innerWidth
      if (w < 480) setH(130)
      else if (w < 768) setH(170)
      else if (w < 1280) setH(220)
      else setH(280)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return h
}

// ─── Single deity image ───────────────────────────────────────────────────────

interface DeityImageProps {
  file: string
  index: number
  height: number
  onLoad: () => void
}

const DeityImage = ({ file, index, height, onLoad }: DeityImageProps) => (
  <motion.div
    className="relative flex shrink-0 items-end justify-center px-3"
    style={{ height: height + 24 }}
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
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      className="block select-none"
      style={{
        height,
        width: 'auto',
        maxWidth: height * 1.2,
        objectFit: 'contain',
      }}
    />
  </motion.div>
)

// ─── Skeleton placeholder ─────────────────────────────────────────────────────
// Shown while manifest loads — matches the marquee height so no layout shift.

const MarqueeSkeleton = ({ height }: { height: number }) => (
  <div
    className="flex items-end gap-6 overflow-hidden px-4"
    style={{ height: height + 24 }}
    aria-hidden="true"
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="shrink-0 animate-pulse rounded-xl bg-gold/10"
        style={{
          height,
          width: height * 0.75,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ))}
  </div>
)

// ─── Infinite marquee ─────────────────────────────────────────────────────────

interface MarqueeProps {
  files: string[]
  height: number
  paused: boolean
}

const Marquee = ({ files, height, paused }: MarqueeProps) => {
  // Count how many images (from first track only) have loaded
  const [loadedCount, setLoadedCount] = useState(0)
  const totalImages = files.length
  // Start animation only when at least half the first-track images are loaded
  const isReady = loadedCount >= Math.ceil(totalImages * 0.5)

  const handleLoad = (): void => {
    setLoadedCount((c) => c + 1)
  }

  const track = (key: string, countLoads: boolean) => (
    <div key={key} className="flex shrink-0 items-end">
      {files.map((file, i) => (
        <DeityImage
          key={`${file}-${i}`}
          file={file}
          index={i}
          height={height}
          onLoad={countLoads ? handleLoad : () => undefined}
        />
      ))}
    </div>
  )

  return (
    <motion.div
      // Fade the whole marquee in once images are ready
      initial={{ opacity: 0 }}
      animate={{ opacity: isReady ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ overflowX: 'hidden', overflowY: 'visible' }}
    >
      <div
        className="flex w-max items-end"
        style={{
          // Only start scrolling once images are ready
          animation: isReady ? 'divineMarquee 30s linear infinite' : 'none',
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {track('a', true)} {/* count loads only on first track */}
        {track('b', false)} {/* second track is a duplicate — no double counting */}
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export const DivineBlessings = () => {
  const { t } = useTranslation('common')
  const { files, state } = useDeities()
  const [paused, setPaused] = useState(false)
  const height = useImgHeight()

  return (
    <>
      <style>{`
        @keyframes divineMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      <section id="divine-invites" className="overflow-visible bg-white py-16 sm:py-20 lg:py-24">
        {/* Header always renders immediately — no flash */}
        <div className="section-container mb-12 text-center">
          <AnimatedSection stagger>
            <motion.p variants={fadeInUp} className="font-script text-lg text-gold sm:text-xl">
              {t('divineInvites.eyebrow')}
            </motion.p>
            <motion.h2 variants={fadeInUp} className="section-title mt-2 text-maroon">
              {t('divineInvites.title')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-body text-base text-maroon/60 sm:text-lg"
            >
              {t('divineInvites.subtitle')}
            </motion.p>
            <motion.div variants={fadeInUp} className="gold-divider mt-4" />
          </AnimatedSection>
        </div>

        {/* Marquee area — skeleton while loading, marquee when ready */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setPaused(false), 2000)
          }}
          className="cursor-grab active:cursor-grabbing"
          style={{ paddingTop: '20px', paddingBottom: '16px' }}
        >
          {state === 'loading' && <MarqueeSkeleton height={height} />}
          {state === 'ready' && <Marquee files={files} height={height} paused={paused} />}
          {/* error state → renders nothing, section still shows header */}
        </div>

        <div aria-hidden="true" className="pointer-events-none mt-10 flex justify-center">
          <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </div>
      </section>
    </>
  )
}
