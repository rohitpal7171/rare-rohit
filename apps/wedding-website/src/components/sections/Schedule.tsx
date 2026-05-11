import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

export const Schedule = () => {
  const { t } = useTranslation('schedule')
  return (
    <section id="schedule" className="section-padding bg-ivory">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-maroon">{t('title')}</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-maroon/60">{t('subtitle')}</motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" />
        </AnimatedSection>
        {/* TODO: Build detailed day-wise timeline cards using weddingConfig.ceremonies */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(['day1', 'day2', 'day3', 'day4'] as const).map((day) => (
            <div key={day} className="card-divine text-center">
              <p className="font-display text-lg font-bold text-gold">{t(day)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
