import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp, glowPulse, scaleIn, staggerContainer } from '@shared/utils'

export const Blessings = () => {
  const { t } = useTranslation('home')

  return (
    <section id="blessings" className="mandala-bg section-padding">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.div variants={fadeInUp} className="mb-4 text-5xl">🪔</motion.div>
          <motion.h2 variants={fadeInUp} className="section-title font-display text-gold">
            {t('blessings.titleHindi')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-2 font-script text-2xl text-ivory/60">
            {t('blessings.title')}
          </motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" />
          <motion.p variants={fadeInUp} className="section-subtitle mt-4 text-ivory/60">
            {t('blessings.subtitle')}
          </motion.p>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Ganesh Card */}
          <motion.div variants={scaleIn}>
            <motion.div
              variants={glowPulse}
              initial="initial"
              animate="animate"
              className="card-divine h-full space-y-4 text-center"
            >
              <div className="text-6xl">🐘</div>
              <h3 className="font-display text-2xl font-bold text-gold">
                {t('blessings.ganesh.name')}
              </h3>
              <p className="font-hindi text-lg leading-relaxed text-ivory/80">
                {t('blessings.ganesh.shloka')}
              </p>
              <div className="gold-divider" />
              <p className="font-body text-sm italic text-ivory/50">
                {t('blessings.ganesh.meaning')}
              </p>
            </motion.div>
          </motion.div>

          {/* Lakshmi Card */}
          <motion.div variants={scaleIn}>
            <motion.div
              variants={glowPulse}
              initial="initial"
              animate="animate"
              className="card-divine h-full space-y-4 text-center"
            >
              <div className="text-6xl">🪷</div>
              <h3 className="font-display text-2xl font-bold text-gold">
                {t('blessings.lakshmi.name')}
              </h3>
              <p className="font-hindi text-lg leading-relaxed text-ivory/80">
                {t('blessings.lakshmi.shloka')}
              </p>
              <div className="gold-divider" />
              <p className="font-body text-sm italic text-ivory/50">
                {t('blessings.lakshmi.meaning')}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
