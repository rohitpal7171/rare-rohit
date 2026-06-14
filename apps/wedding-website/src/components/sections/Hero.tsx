import { memo } from 'react'
import { motion } from 'framer-motion'

import { ChevronDown, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Countdown } from '@shared/ui'
import { cn, fadeInUp, orbitReverse, orbitSlow, staggerContainer } from '@shared/utils'

import { weddingConfig } from '@app/config/wedding.config'

const PETAL_POSITIONS = [
  { x: '8%',  delay: 0,   emoji: '🌸' },
  { x: '22%', delay: 1.5, emoji: '🌺' },
  { x: '38%', delay: 0.8, emoji: '🌼' },
  { x: '55%', delay: 2.2, emoji: '🌸' },
  { x: '70%', delay: 0.4, emoji: '🌻' },
  { x: '85%', delay: 1.8, emoji: '🌷' },
] as const

const SPARKLES = [
  { x: '12%', y: '22%', delay: 0,   dur: 3.5 },
  { x: '82%', y: '18%', delay: 0.9, dur: 4   },
  { x: '35%', y: '75%', delay: 1.6, dur: 3.2 },
  { x: '68%', y: '58%', delay: 0.3, dur: 4.2 },
  { x: '8%',  y: '52%', delay: 2.1, dur: 3.8 },
  { x: '92%', y: '40%', delay: 0.7, dur: 3   },
  { x: '55%', y: '88%', delay: 1.3, dur: 4.5 },
  { x: '23%', y: '10%', delay: 1.8, dur: 3.7 },
] as const

const HEARTS = [
  { x: '18%', delay: 1.2, dur: 5.5 },
  { x: '52%', delay: 2.8, dur: 6.5 },
  { x: '75%', delay: 0.6, dur: 5.0 },
] as const

interface FloatingPetalProps {
  x: string
  delay: number
  emoji: string
}

const FloatingPetal = memo(({ x, delay, emoji }: FloatingPetalProps) => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute animate-petal-fall text-2xl opacity-60"
    style={{
      left: x,
      top: '-20px',
      animationDelay: `${delay}s`,
      animationDuration: `${8 + delay}s`,
    }}
  >
    {emoji}
  </div>
))
FloatingPetal.displayName = 'FloatingPetal'

// Memoized ॐ so AmbientPlayer state changes never cause it to re-animate
const OmSymbol = memo(() => (
  <div className="relative flex items-center justify-center" aria-hidden="true">
    {/* Expanding aura ring 1 */}
    <motion.div
      className="absolute h-16 w-16 rounded-full"
      style={{ backgroundColor: 'rgba(255, 107, 0, 0.18)' }}
      animate={{ scale: [1, 2.8], opacity: [0.55, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
    />
    {/* Expanding aura ring 2 — offset phase */}
    <motion.div
      className="absolute h-16 w-16 rounded-full"
      style={{ backgroundColor: 'rgba(255, 107, 0, 0.1)' }}
      animate={{ scale: [1, 2.2], opacity: [0.35, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
    />
    {/* OM text — decoupled from all parent state via memo */}
    <motion.span
      className="relative z-10 text-6xl"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      style={{
        color: '#FF6B00',
        textShadow:
          '0 0 12px rgba(255,107,0,0.9), 0 0 30px rgba(255,107,0,0.5), 0 0 60px rgba(255,107,0,0.2)',
      }}
    >
      ॐ
    </motion.span>
  </div>
))
OmSymbol.displayName = 'OmSymbol'

export const Hero = () => {
  const { t, i18n } = useTranslation('home')
  const { bride, groom, wedding } = weddingConfig
  const isHindi = i18n.language.startsWith('hi')

  return (
    <section
      id="home"
      className="mandala-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      {/* Mixed flower petals — fall from top */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {PETAL_POSITIONS.map(({ x, delay, emoji }) => (
          <FloatingPetal key={x} x={x} delay={delay} emoji={emoji} />
        ))}
      </div>

      {/* Floating hearts — drift upward */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {HEARTS.map(({ x, delay, dur }) => (
          <motion.div
            key={x}
            className="absolute text-xl"
            style={{ left: x, bottom: '15%' }}
            animate={{ y: [0, -40, -80, -120], opacity: [0, 0.7, 0.5, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeOut' }}
          >
            💕
          </motion.div>
        ))}
      </div>

      {/* Gold sparkle particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {SPARKLES.map(({ x, y, delay, dur }) => (
          <motion.div
            key={`${x}-${y}`}
            className="absolute h-1 w-1 rounded-full bg-gold"
            style={{ left: x, top: y }}
            animate={{ opacity: [0, 0.85, 0.85, 0], y: [0, -28, -56], scale: [0.5, 1, 0] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* SVG concentric rings — draw in on load */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <svg width="700" height="700" viewBox="0 0 700 700" className="overflow-visible">
          <motion.circle
            cx="350" cy="350" r="330"
            stroke="rgba(201,168,76,0.14)" strokeWidth="1" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          />
          <motion.circle
            cx="350" cy="350" r="265"
            stroke="rgba(201,168,76,0.09)" strokeWidth="0.6" fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          />
          <motion.circle
            cx="350" cy="350" r="185"
            stroke="rgba(255,107,0,0.07)" strokeWidth="0.5" fill="none"
            strokeDasharray="3 7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          />
        </svg>
      </div>

      {/* Rotating dashed rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[580px] w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px dashed rgba(201,168,76,0.09)' }}
        variants={orbitSlow}
        initial="initial"
        animate="animate"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ border: '1px dashed rgba(255,107,0,0.07)' }}
        variants={orbitReverse}
        initial="initial"
        animate="animate"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">

        {/* Save the Date badge */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-5 py-1.5"
        >
          <span aria-hidden="true">💕</span>
          <span className="font-script text-base text-gold/90">{t('hero.badge')}</span>
          <span aria-hidden="true">💕</span>
        </motion.div>

        {/* ॐ — memoized, decoupled from all parent state */}
        <OmSymbol />

        {/* Staggered content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <h1 className="font-display text-5xl font-bold text-ivory sm:text-6xl lg:text-7xl">
              <span className="text-gold-shimmer">{groom.name}</span>
              <span className="mx-3 text-2xl" aria-hidden="true">💕</span>
              <span className="sr-only"> and </span>
              <span className="text-gold-shimmer">{bride.name}</span>
            </h1>
            <p className="font-hindi text-2xl text-gold/70" lang="hi">
              {groom.nameHindi} &amp; {bride.nameHindi}
            </p>
          </motion.div>

          <motion.p variants={fadeInUp} className="font-body text-xl text-ivory/70 sm:text-2xl">
            {t('hero.subtitle')}
          </motion.p>

          <motion.div variants={fadeInUp} className="divider-floral w-full" aria-hidden="true">
            🌸
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Countdown targetDate={wedding.date} />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-2 text-center">
            <p className="font-body text-sm uppercase tracking-widest text-gold/60">
              {new Date(wedding.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <div className="flex items-center justify-center gap-2">
              <MapPin size={14} className="shrink-0 text-gold/50" aria-hidden="true" />
              <p className={cn('text-sm text-ivory/60', isHindi ? 'font-hindi' : 'font-body')}>
                {isHindi ? wedding.venue.nameHindi : wedding.venue.name}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — vertical line + chevron */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1">
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-gold/40" />
          <ChevronDown size={20} className="text-gold/40" />
        </div>
      </motion.div>
    </section>
  )
}
