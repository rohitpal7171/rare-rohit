import { motion } from 'framer-motion'
import { ArrowLeft, Clock, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@shared/ui'
import { fadeInUp, formatDate, scaleIn, staggerContainer } from '@shared/utils'

import { CeremonyMusicPlayer } from '@app/components/ceremonies/CeremonyMusicPlayer'
import { RitualFacts } from '@app/components/ceremonies/RitualFacts'
import { weddingConfig } from '@app/config/wedding.config'

export const Baraat = () => {
  const { t, i18n } = useTranslation('ceremonies')
  const { t: tCommon } = useTranslation('common')
  const locale = i18n.language === 'hi' ? 'hi' : 'en'
  const ceremony = weddingConfig.ceremonies['baraat']
  const venue = ceremony.venue

  return (
    <section className="mandala-bg section-padding min-h-screen pt-24">
      <CeremonyMusicPlayer slug="baraat" />
      <div className="section-container max-w-3xl">
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Link to="/#ceremonies">
            <Button variant="ghost" size="sm" className="mb-8 gap-2">
              <ArrowLeft size={16} aria-hidden="true" />
              {tCommon('buttons.backToCeremonies')}
            </Button>
          </Link>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={fadeInUp} className="space-y-4 text-center">
            <div className="text-7xl" aria-hidden="true">🐎</div>
            <h1 className="section-title font-display text-gold">{t('baraat.name')}</h1>
            <p className="font-script text-2xl text-ivory/60">{t('baraat.tagline')}</p>
            <div className="gold-divider" aria-hidden="true" />
          </motion.div>
          <motion.div variants={scaleIn} className="card-divine grid gap-4 text-center sm:grid-cols-3">
            <div className="space-y-1">
              <p className="font-body text-xs uppercase tracking-widest text-gold/60">{tCommon('ceremony.date')}</p>
              <p className="font-display font-semibold text-ivory">{formatDate(ceremony.date, locale, { day: 'numeric', month: 'long' })}</p>
            </div>
            <div className="space-y-1">
              <Clock size={16} className="mx-auto text-gold/60" aria-hidden="true" />
              <p className="font-body text-xs uppercase tracking-widest text-gold/60">{tCommon('ceremony.time')}</p>
              <p className="font-display font-semibold text-ivory">{locale === 'hi' ? ceremony.timeHindi : ceremony.time}</p>
            </div>
            <div className="space-y-1">
              <MapPin size={16} className="mx-auto text-gold/60" aria-hidden="true" />
              <p className="font-body text-xs uppercase tracking-widest text-gold/60">{tCommon('ceremony.venue')}</p>
              <p className="font-display text-sm font-semibold text-ivory">{locale === 'hi' ? venue.nameHindi : venue.name}</p>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="card-divine space-y-4">
            <h2 className="font-display text-xl font-bold text-gold">{tCommon('ceremony.about')}</h2>
            <p className="font-body leading-relaxed text-ivory/70">{t('baraat.description')}</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="card-divine space-y-4 border-gold/40">
            <h2 className="font-display text-xl font-bold text-gold">{tCommon('ceremony.significance')}</h2>
            <p className="font-body italic leading-relaxed text-ivory/70">{t('baraat.significance')}</p>
          </motion.div>
          <motion.div variants={fadeInUp} className="card-divine">
            <RitualFacts slug="baraat" />
          </motion.div>
          <motion.div variants={fadeInUp} className="card-divine space-y-3">
            <h2 className="font-display text-xl font-bold text-gold">{tCommon('ceremony.venue')}</h2>
            <p className="font-body text-ivory/80">{locale === 'hi' ? venue.nameHindi : venue.name}</p>
            <p className="font-body text-sm text-ivory/50">{locale === 'hi' ? venue.addressHindi : venue.address}</p>
            <p className="font-body text-sm text-ivory/50">{locale === 'hi' ? venue.cityHindi : venue.city}</p>
            <a href={venue.mapUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="mt-2">{tCommon('buttons.getDirections')}</Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
