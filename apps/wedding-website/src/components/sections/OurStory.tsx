import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { cn, fadeInLeft, fadeInRight, fadeInUp } from '@shared/utils'

const TIMELINE_KEYS = ['met', 'friendship', 'love', 'proposal', 'wedding'] as const

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
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </AnimatedSection>

        <div className="relative">
          {/* Centre timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 md:block"
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
                    <div className={cn('card-light max-w-md', isLeft ? 'md:ml-auto' : 'md:mr-auto')}>
                      <div className="mb-2 font-script text-3xl text-gold">
                        {t(`timeline.${key}.year`)}
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-maroon">
                        {t(`timeline.${key}.title`)}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-maroon/60">
                        {t(`timeline.${key}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    aria-hidden="true"
                    className="timeline-dot"
                  >
                    <div className="h-2 w-2 rounded-full bg-gold" />
                  </div>

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
