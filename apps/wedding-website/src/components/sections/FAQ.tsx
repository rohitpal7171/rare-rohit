import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimatedSection } from '@shared/ui'
import { fadeInUp } from '@shared/utils'

// 'rsvp' removed — no RSVP on this website
const FAQ_KEYS = ['dresscode', 'kids', 'parking', 'photos', 'gifts', 'food'] as const

export const FAQ = () => {
  const { t } = useTranslation('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section-padding mandala-bg">
      <div className="section-container max-w-3xl">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.h2 variants={fadeInUp} className="section-title text-gold">{t('title')}</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-ivory/60">{t('subtitle')}</motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </AnimatedSection>

        <div className="space-y-3">
          {FAQ_KEYS.map((key, index) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card-divine overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-display text-base font-semibold text-ivory">
                  {t(`questions.${key}.q`)}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-gold"
                  aria-hidden="true"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="mt-3 border-t border-gold/20 pt-3 font-body text-sm leading-relaxed text-ivory/60">
                      {t(`questions.${key}.a`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
