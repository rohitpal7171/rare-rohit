import { motion } from 'framer-motion'

import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AnimatedSection } from '@shared/ui'
import {
  CEREMONY_SLUGS,
  cardReveal3D,
  fadeInUp,
  floatLoopSlow,
  formatDate,
  hoverLift,
  staggerContainer,
} from '@shared/utils'

import { OrnamentDivider } from '@app/components/ornaments/OrnamentDivider'
import { CEREMONY_ACCENTS } from '@app/config/ceremonyAccents'
import { weddingConfig } from '@app/config/wedding.config'

export const CeremoniesGrid = () => {
  const { t, i18n } = useTranslation('ceremonies')
  const { t: tCommon } = useTranslation('common')
  const locale = i18n.language === 'hi' ? 'hi' : 'en'

  return (
    <section id="ceremonies" className="section-padding mandala-bg">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-gold">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-ivory/60">
            {t('subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <OrnamentDivider tone="gold" className="mt-4" />
          </motion.div>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ perspective: '1200px' }}
        >
          {CEREMONY_SLUGS.map((slug) => {
            const ceremony = weddingConfig.ceremonies[slug]
            const accent = CEREMONY_ACCENTS[slug]
            return (
              <motion.div key={slug} variants={cardReveal3D} {...hoverLift}>
                <Link to={`/ceremony/${slug}`} className="group block h-full">
                  <div className="card-divine card-ornate flex h-full flex-col items-center gap-3 text-center transition-all duration-300 hover:border-gold/50 hover:shadow-gold">
                    {/* Ceremony-coloured top hairline */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-8 top-0 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent.hairline}, transparent)`,
                      }}
                    />
                    {/* Ornamental medallion — ring tinted per ceremony, icon floats gently */}
                    <motion.div
                      className="medallion-gold h-16 w-16 text-3xl"
                      aria-hidden="true"
                      style={{ borderColor: accent.border }}
                      variants={floatLoopSlow}
                      initial="initial"
                      animate="animate"
                    >
                      {ceremony.icon}
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-gold">
                      {t(`${slug}.name`)}
                    </h3>
                    <p className="font-script text-base text-ivory/50">{t(`${slug}.tagline`)}</p>
                    <div className="gold-divider my-1" aria-hidden="true" />
                    <div className="flex items-center gap-1.5 font-body text-xs text-ivory/45">
                      <CalendarDays size={12} className="shrink-0 text-gold/40" aria-hidden="true" />
                      <span>
                        {formatDate(ceremony.date, locale, {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-body text-xs text-ivory/45">
                      <Clock size={12} className="shrink-0 text-gold/40" aria-hidden="true" />
                      <span>{locale === 'hi' ? ceremony.timeHindi : ceremony.time}</span>
                    </div>
                    <div className="mt-auto flex items-center gap-1 pt-2 text-gold/60 transition-colors group-hover:text-gold">
                      <span className="font-body text-xs">{tCommon('buttons.viewDetails')}</span>
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
