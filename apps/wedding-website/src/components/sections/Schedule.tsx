import { motion } from 'framer-motion'

import { Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { cn, fadeInUp, formatDate, scaleIn, staggerContainer } from '@shared/utils'

import { weddingConfig } from '@app/config/wedding.config'

const SCHEDULE_DAYS = [
  {
    labelKey: 'day1' as const,
    date: '2026-11-23',
    ceremonies: ['haldi', 'mehendi', 'sangeet'] as const,
  },
  {
    labelKey: 'day2' as const,
    date: '2026-11-24',
    ceremonies: [] as const,
    isLagun: true as const,
  },
  {
    labelKey: 'day3' as const,
    date: '2026-11-25',
    ceremonies: ['baraat'] as const,
  },
  {
    labelKey: 'day4' as const,
    date: '2026-11-26',
    ceremonies: ['pheras', 'vidaai'] as const,
  },
] as const

export const Schedule = () => {
  const { t, i18n } = useTranslation('schedule')
  const { t: tCeremonies } = useTranslation('ceremonies')
  const isHindi = i18n.language.startsWith('hi')
  const locale = isHindi ? 'hi' : 'en'

  return (
    <section id="schedule" className="section-padding bg-ivory">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-maroon">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-maroon/60">
            {t('subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SCHEDULE_DAYS.map((day) => {
            const formattedDate = formatDate(`${day.date}T00:00:00+05:30`, locale, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            })

            return (
              <motion.div key={day.labelKey} variants={scaleIn} className="card-light space-y-4">
                <div className="space-y-1 border-b border-gold/15 pb-3">
                  <p className="font-body text-xs uppercase tracking-widest text-gold/70">
                    {formattedDate}
                  </p>
                  <p className="font-display text-lg font-bold text-maroon">{t(day.labelKey)}</p>
                </div>

                {'isLagun' in day ? (
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-xl" aria-hidden="true">
                      🪔
                    </span>
                    <div>
                      <p className="font-body text-sm font-semibold text-maroon">{t('lagun')}</p>
                      <p className="font-body text-xs text-maroon/50">{t('lagunLocation')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {day.ceremonies.map((slug) => {
                      const ceremony = weddingConfig.ceremonies[slug]
                      return (
                        <div key={slug} className="flex items-start gap-2">
                          <span className="mt-0.5 text-xl" aria-hidden="true">
                            {ceremony.icon}
                          </span>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <p
                              className={cn(
                                'font-body text-sm font-semibold text-maroon',
                                isHindi ? 'font-hindi' : ''
                              )}
                            >
                              {tCeremonies(`${slug}.name`)}
                            </p>
                            <div className="flex items-center gap-1 text-maroon/50">
                              <Clock size={11} aria-hidden="true" />
                              <p className="font-body text-xs">
                                {isHindi ? ceremony.timeHindi : ceremony.time}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-maroon/40">
                              <MapPin size={11} aria-hidden="true" />
                              <p className="truncate font-body text-xs">
                                {isHindi ? ceremony.venue.cityHindi : ceremony.venue.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
