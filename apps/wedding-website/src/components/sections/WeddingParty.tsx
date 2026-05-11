import { motion } from 'framer-motion'

import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

export const WeddingParty = () => {
  const { t } = useTranslation('party')
  return (
    <section id="wedding-party" className="section-padding bg-ivory">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-maroon">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-maroon/60">
            {t('subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" />
        </AnimatedSection>
        {/* TODO: Add wedding party member cards with photos and bios */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card-divine text-center">
            <p className="font-display text-xl font-bold text-gold">{t('bridesSide')}</p>
          </div>
          <div className="card-divine text-center">
            <p className="font-display text-xl font-bold text-gold">{t('groomsSide')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
