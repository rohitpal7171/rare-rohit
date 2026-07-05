import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { cn } from '@shared/utils'

import { Monogram } from '@app/components/ornaments/Monogram'
import { weddingConfig } from '@app/config/wedding.config'

// Module-level flag — resets on every full page load (reload / hard reload),
// but survives SPA route changes. So the curtain greets every fresh visit
// (music always gets its user gesture) without re-appearing when the guest
// navigates Home → ceremony page → Home within the same page session.
let shownThisPageLoad = false

/**
 * EntryOverlay — the "Open Invitation" welcome curtain.
 *
 * Browsers never allow autoplay WITH sound without a user gesture
 * (Chrome/Safari/Firefox policy — non-negotiable). This overlay turns that
 * constraint into a ritual: the guest's single tap to enter IS the gesture.
 * The tap bubbles to AmbientPlayer's document-level first-interaction
 * listener, which starts the music and unmutes — sound begins the moment
 * the curtain lifts. No audio wiring needed here.
 *
 * Shown on every full page load; skipped for in-app route remounts
 * (module-level flag above).
 */
export const EntryOverlay = () => {
  const { t, i18n } = useTranslation('common')
  const isHindi = i18n.language.startsWith('hi')

  const [open, setOpen] = useState<boolean>(() => !shownThisPageLoad)

  // Lock page scroll while the curtain is up
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const dismiss = (): void => {
    shownThisPageLoad = true
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={false}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
          onClick={dismiss}
          className="mandala-bg fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center gap-7 px-6 text-center"
        >
          <Monogram size={96} className="text-gold" />

          {/* Warm welcome — हम आपका दिल से स्वागत करते हैं */}
          <p
            className={cn(
              'font-script text-2xl text-ivory/80 sm:text-3xl',
              isHindi && 'font-hindi text-xl sm:text-2xl'
            )}
          >
            {t('entry.welcome')}
          </p>

          <div>
            <p className="font-script text-4xl text-gold sm:text-5xl">
              {weddingConfig.groom.name.split(' ')[0]}
              <span aria-hidden="true"> &amp; </span>
              <span className="sr-only"> and </span>
              {weddingConfig.bride.name.split(' ')[0]}
            </p>
            <p className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-ivory/50">
              {new Date(weddingConfig.wedding.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <button
            onClick={dismiss}
            className={cn(
              'rounded-full border border-gold/50 bg-gold/10 px-9 py-3 font-body text-sm tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold/20',
              isHindi && 'font-hindi tracking-normal'
            )}
          >
            {t('entry.button')}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
