import { motion } from 'framer-motion'

import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

export const Gallery = () => {
  const { t } = useTranslation('gallery')
  return (
    <section id="gallery" className="section-padding mandala-bg">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-gold">
            {t('title')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-ivory/60">
            {t('subtitle')}
          </motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" />
        </AnimatedSection>
        {/* Placeholder — add real photos to public/assets/gallery/ */}
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="text-5xl">📸</div>
          <p className="font-display text-2xl text-gold">{t('comingSoon')}</p>
          <p className="max-w-md font-body text-sm text-ivory/50">{t('comingSoonDesc')}</p>
        </div>
      </div>
    </section>
  )
}
