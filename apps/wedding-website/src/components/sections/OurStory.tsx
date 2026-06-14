import { motion } from 'framer-motion'

import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { cn, fadeInLeft, fadeInRight, fadeInUp, glowPulse, hoverLift } from '@shared/utils'

const TIMELINE_KEYS = ['met', 'friendship', 'love', 'proposal', 'wedding'] as const

const TIMELINE_ICONS: Record<typeof TIMELINE_KEYS[number], string> = {
  met:        '💕',
  friendship: '🌸',
  love:       '🌼',
  proposal:   '🪔',
  wedding:    '💒',
}

export const OurStory = () => {
  const { t } = useTranslation('story')

  return (
    <section id="our-story" className="section-padding bg-ivory">
      <div className="section-container">
        <AnimatedSection className="mb-16 text-center" stagger>
          <motion.p variants={fadeInUp} className="font-script text-2xl text-gold">
            {t('subtitle')}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="section-title mt-2 text-maroon">
            {t('title')}
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-floral mt-4" aria-hidden="true">
            🌸
          </motion.div>
        </AnimatedSection>

        <div className="relative">
          {/* Centre timeline line — draws in from top as section enters view */}
          <motion.div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          />

          <div className="space-y-12">
            {TIMELINE_KEYS.map((key, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={key}
                  variants={isLeft ? fadeInLeft : fadeInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className={cn(
                    'flex flex-col items-center gap-8',
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                >
                  <div className="flex-1">
                    {/* Use card-light on ivory background */}
                    <motion.div
                      className={cn('card-light max-w-md', isLeft ? 'md:ml-auto' : 'md:mr-auto')}
                      {...hoverLift}
                    >
                      <div className="mb-3 text-3xl" aria-hidden="true">
                        {TIMELINE_ICONS[key]}
                      </div>
                      <div className="mb-2 font-script text-3xl text-gold">
                        {t(`timeline.${key}.year`)}
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-maroon">
                        {t(`timeline.${key}.title`)}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-maroon/60">
                        {t(`timeline.${key}.description`)}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline dot — pulsing gold glow */}
                  <motion.div
                    aria-hidden="true"
                    className="timeline-dot"
                    variants={glowPulse}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="h-2 w-2 rounded-full bg-gold" />
                  </motion.div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
