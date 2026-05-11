import { motion } from 'framer-motion'

import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { AnimatedSection } from '@shared/ui'
import { CEREMONY_SLUGS, fadeInUp, formatDate, scaleIn, staggerContainer } from '@shared/utils'

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
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {CEREMONY_SLUGS.map((slug) => {
            const ceremony = weddingConfig.ceremonies[slug]
            return (
              <motion.div key={slug} variants={scaleIn}>
                <Link to={`/ceremony/${slug}`} className="group block">
                  <div className="card-divine h-full space-y-3 transition-all duration-300 hover:border-gold/50 hover:shadow-gold">
                    <div className="text-4xl" aria-hidden="true">
                      {ceremony.icon}
                    </div>
                    <h3 className="font-display text-xl font-bold text-gold">
                      {t(`${slug}.name`)}
                    </h3>
                    <p className="font-script text-sm text-ivory/50">{t(`${slug}.tagline`)}</p>
                    <div className="gold-divider my-2" aria-hidden="true" />
                    <p className="font-body text-xs text-ivory/40">
                      {formatDate(ceremony.date, locale, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="font-body text-xs text-ivory/40">
                      {locale === 'hi' ? ceremony.timeHindi : ceremony.time}
                    </p>
                    <div className="flex items-center gap-1 pt-1 text-gold/60 transition-colors group-hover:text-gold">
                      <span className="font-body text-xs">{tCommon('buttons.viewDetails')}</span>
                      <ArrowRight size={12} aria-hidden="true" />
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
