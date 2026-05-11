import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@shared/ui'
import { fadeInUp, formatDate, scaleIn, staggerContainer } from '@shared/utils'

import { CeremonyMusicPlayer } from '@app/components/ceremonies/CeremonyMusicPlayer'
import { RitualFacts } from '@app/components/ceremonies/RitualFacts'
import { weddingConfig } from '@app/config/wedding.config'

export const Mehendi = () => {
  const { t, i18n } = useTranslation('ceremonies')
  const { t: tCommon } = useTranslation('common')
  const locale = i18n.language === 'hi' ? 'hi' : 'en'
  const ceremony = weddingConfig.ceremonies['mehendi']

  return (
    <section className="mandala-bg section-padding min-h-screen pt-24">
      <CeremonyMusicPlayer slug="mehendi" />
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
          {/* Hero */}
          <motion.div variants={fadeInUp} className="space-y-4 text-center">
            <div className="text-7xl" aria-hidden="true">🌿</div>
            <h1 className="section-title font-display text-gold">{t('mehendi.name')}</h1>
            <p className="font-script text-2xl text-ivory/60">{t('mehendi.tagline')}</p>
            <div className="gold-divider" aria-hidden="true" />
          </motion.div>

          {/* Date / Time — no venue column */}
          <motion.div variants={scaleIn} className="card-divine grid gap-4 text-center sm:grid-cols-2">
            <div className="space-y-1">
              <p className="font-body text-xs uppercase tracking-widest text-gold/60">{tCommon('ceremony.date')}</p>
              <p className="font-display font-semibold text-ivory">
                {formatDate(ceremony.date, locale, { day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="space-y-1">
              <Clock size={16} className="mx-auto text-gold/60" aria-hidden="true" />
              <p className="font-body text-xs uppercase tracking-widest text-gold/60">{tCommon('ceremony.time')}</p>
              <p className="font-display font-semibold text-ivory">
                {locale === 'hi' ? ceremony.timeHindi : ceremony.time}
              </p>
            </div>
          </motion.div>

          {/* Bride's home note */}
          <motion.div variants={fadeInUp} className="card-divine flex items-start gap-4 border-gold/30">
            <span className="mt-1 text-2xl" aria-hidden="true">👰</span>
            <div>
              <p className="font-display text-base font-semibold text-gold">
                {locale === 'hi' ? 'दुल्हन के घर पर' : "At the Bride's Home"}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-ivory/60">
                {locale === 'hi'
                  ? 'मेहंदी की रस्म दुल्हन के घर पर उसके परिवार और सखियों के साथ मनाई जाती है।'
                  : 'The Mehendi ceremony takes place at the bride\'s home, surrounded by her family and close friends.'}
              </p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={fadeInUp} className="card-divine space-y-4">
            <h2 className="font-display text-xl font-bold text-gold">{tCommon('ceremony.about')}</h2>
            <p className="font-body leading-relaxed text-ivory/70">{t('mehendi.description')}</p>
          </motion.div>

          {/* Significance */}
          <motion.div variants={fadeInUp} className="card-divine space-y-4 border-gold/40">
            <h2 className="font-display text-xl font-bold text-gold">{tCommon('ceremony.significance')}</h2>
            <p className="font-body italic leading-relaxed text-ivory/70">{t('mehendi.significance')}</p>
          </motion.div>

          {/* Did You Know — flip cards */}
          <motion.div variants={fadeInUp} className="card-divine">
            <RitualFacts slug="mehendi" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
