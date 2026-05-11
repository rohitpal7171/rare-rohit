import { motion } from 'framer-motion'

import { ChevronDown, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Countdown } from '@shared/ui'
import { cn, fadeInUp, staggerContainer } from '@shared/utils'

import { weddingConfig } from '@app/config/wedding.config'

const PETAL_POSITIONS = [
  { x: '8%', delay: 0 },
  { x: '22%', delay: 1.5 },
  { x: '38%', delay: 0.8 },
  { x: '55%', delay: 2.2 },
  { x: '70%', delay: 0.4 },
  { x: '85%', delay: 1.8 },
] as const

interface FloatingPetalProps {
  x: string
  delay: number
}

const FloatingPetal = ({ x, delay }: FloatingPetalProps) => (
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
    🌸
  </div>
)

export const Hero = () => {
  const { t, i18n } = useTranslation('home')
  const { bride, groom, wedding } = weddingConfig
  const isHindi = i18n.language.startsWith('hi')

  return (
    <section
      id="home"
      className="mandala-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {PETAL_POSITIONS.map(({ x, delay }) => (
          <FloatingPetal key={x} x={x} delay={delay} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 opacity-30"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 opacity-20"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 px-4 text-center"
      >
        {/* ॐ — inline style used intentionally: font-hindi !important overrides color */}
        <motion.div
          variants={fadeInUp}
          aria-hidden="true"
          className="text-6xl"
          style={{
            color: '#FF6B00',
            textShadow:
              '0 0 12px rgba(255,107,0,0.9), 0 0 30px rgba(255,107,0,0.5), 0 0 60px rgba(255,107,0,0.2)',
          }}
        >
          ॐ
        </motion.div>

        <motion.div variants={fadeInUp} className="space-y-2">
          <h1 className="font-display text-5xl font-bold text-ivory sm:text-6xl lg:text-7xl">
            <span className="text-gold-shimmer">{groom.name}</span>
            <span className="mx-4 font-script text-gold/60" aria-hidden="true">
              &amp;
            </span>
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

        <motion.div variants={fadeInUp} className="gold-divider w-32" aria-hidden="true" />

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
            {/* cn() used — avoids template literal string which violates strict-boolean-expressions */}
            <p className={cn('text-sm text-ivory/60', isHindi ? 'font-hindi' : 'font-body')}>
              {isHindi ? wedding.venue.nameHindi : wedding.venue.name}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/40"
        aria-hidden="true"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
