import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { cn, fadeInLeft, fadeInRight, fadeInUp } from '@shared/utils'

// Timeline keys match story.json exactly
const TIMELINE_KEYS = ['met', 'friendship', 'love', 'proposal', 'wedding'] as const

// Emoji per milestone
const MILESTONE_ICONS: Record<typeof TIMELINE_KEYS[number], string> = {
  met:        '🤝',
  friendship: '🌸',
  love:       '💛',
  proposal:   '🪔',
  wedding:    '🔥',
}

// Colour accent per milestone (Tailwind arbitrary colour tokens)
const MILESTONE_COLOURS: Record<typeof TIMELINE_KEYS[number], string> = {
  met:        'text-gold',
  friendship: 'text-saffron',
  love:       'text-marigold',
  proposal:   'text-gold-light',
  wedding:    'text-saffron',
}

interface MilestoneCardProps {
  keyName: typeof TIMELINE_KEYS[number]
  index: number
}

const MilestoneCard = ({ keyName, index }: MilestoneCardProps) => {
  const { t } = useTranslation('story')
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={isLeft ? fadeInLeft : fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      className={cn(
        'flex flex-col items-center gap-6 md:gap-10',
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Card */}
      <div className="flex-1">
        <div
          className={cn(
            'relative max-w-sm space-y-3 rounded-2xl p-6',
            'border border-gold/20 bg-gradient-to-br from-divine/40 to-maroon/20',
            'backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:shadow-gold',
            isLeft ? 'md:ml-auto' : 'md:mr-auto'
          )}
        >
          {/* Floating year badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-divine/60 px-3 py-1">
            <span className="font-body text-xs uppercase tracking-widest text-gold/70">
              {t(`timeline.${keyName}.year`)}
            </span>
          </div>

          {/* Icon */}
          <div className="text-3xl" aria-hidden="true">{MILESTONE_ICONS[keyName]}</div>

          {/* Title */}
          <h3 className={cn('font-display text-xl font-bold', MILESTONE_COLOURS[keyName])}>
            {t(`timeline.${keyName}.title`)}
          </h3>

          {/* Description */}
          <p className="font-body text-sm leading-relaxed text-ivory/65">
            {t(`timeline.${keyName}.description`)}
          </p>

          {/* Decorative corner */}
          <div
            aria-hidden="true"
            className="absolute -right-1 -top-1 h-5 w-5 rounded-full border border-gold/40 bg-gold/20"
          />
        </div>
      </div>

      {/* Centre dot with connecting line glow */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
        aria-hidden="true"
        className="relative hidden h-6 w-6 shrink-0 md:block"
      >
        <div className="absolute inset-0 animate-glow rounded-full bg-gold/30" />
        <div className="absolute inset-1 rounded-full bg-gold" />
      </motion.div>

      <div className="hidden flex-1 md:block" />
    </motion.div>
  )
}

/**
 * OurStoryV2
 * Scroll-driven timeline with animated connecting thread, glowing dots,
 * hover-depth cards, and per-milestone colour accents.
 *
 * Original: OurStory.tsx (left/right cards, ivory bg)
 * This version: dark mandala bg, richer card styling, animated dot connectors.
 *
 * To switch: in Home.tsx replace `<OurStory />` with `<OurStoryV2 />`
 */
export const OurStoryV2 = () => {
  const { t } = useTranslation('story')
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-driven progress for the connecting thread line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  })
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 80, damping: 20 }
  )

  return (
    <section id="our-story" className="mandala-bg section-padding" ref={containerRef}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.p variants={fadeInUp} className="font-script text-2xl text-gold">
            {t('subtitle')}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-title mt-2 text-ivory">
            {t('title')}
          </motion.h2>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </motion.div>

        <div className="relative">
          {/* Scroll-driven connecting thread */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          >
            {/* Static track */}
            <div className="h-full w-full bg-gold/10" />
            {/* Animated fill */}
            <motion.div
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b from-gold/60 to-gold/20"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-14">
            {TIMELINE_KEYS.map((key, index) => (
              <MilestoneCard key={key} keyName={key} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
