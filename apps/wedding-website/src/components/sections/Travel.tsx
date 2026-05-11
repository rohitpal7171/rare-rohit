import { motion } from 'framer-motion'

import { Car, MapPin, Plane, Train } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AnimatedSection, Button } from '@shared/ui'
import { fadeInUp, scaleIn, staggerContainer } from '@shared/utils'

import { weddingConfig } from '@app/config/wedding.config'

export const Travel = () => {
  const { t, i18n } = useTranslation('travel')
  const isHindi = i18n.language === 'hi'
  const venue = weddingConfig.wedding.venue

  return (
    <section id="travel" className="section-padding mandala-bg">
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          <motion.div variants={scaleIn} className="card-divine space-y-3">
            <MapPin className="text-gold" size={28} />
            <h3 className="font-display text-lg font-bold text-gold">{t('venue')}</h3>
            <p className="font-body text-sm text-ivory/70">
              {isHindi ? venue.nameHindi : venue.name}
            </p>
            <p className="font-body text-xs text-ivory/40">
              {isHindi ? venue.addressHindi : venue.address}
            </p>
            <p className="font-body text-xs text-ivory/40">
              {isHindi ? venue.cityHindi : venue.city}
            </p>
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="mt-2 w-full">
                {t('getDirections', { ns: 'common' })}
              </Button>
            </a>
          </motion.div>

          <motion.div variants={scaleIn} className="card-divine space-y-3">
            <Plane className="text-gold" size={28} />
            <h3 className="font-display text-lg font-bold text-gold">{t('airportInfo')}</h3>
            <p className="font-body text-sm text-ivory/70">{t('airport')}</p>
          </motion.div>

          <motion.div variants={scaleIn} className="card-divine space-y-3">
            <Train className="text-gold" size={28} />
            <h3 className="font-display text-lg font-bold text-gold">{t('trainInfo')}</h3>
            <p className="font-body text-sm text-ivory/70">{t('station')}</p>
          </motion.div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-2 font-body text-sm text-ivory/40"
        >
          <Car size={16} />
          {t('parking')}
        </motion.p>
      </div>
    </section>
  )
}
