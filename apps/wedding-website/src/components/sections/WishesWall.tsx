import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AnimatedSection, Button } from '@shared/ui'
import { cn, fadeInUp, scaleIn, staggerContainer } from '@shared/utils'
import { useWishes } from '@shared/hooks'
import type { Wish } from '@shared/hooks'

// ── Wish Card ─────────────────────────────────────────────────────────────
const WishCard = ({ wish }: { wish: Wish }) => {
  const date = new Date(wish.createdAt)
  const dateStr = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })

  return (
    <motion.div
      variants={scaleIn}
      layout
      className="card-wish space-y-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron/20 to-gold/20 text-sm font-bold text-gold">
            {wish.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {wish.name}
            </p>
            <p className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>{dateStr}</p>
          </div>
        </div>
        <span className="text-lg" aria-hidden="true">{wish.language === 'hi' ? '🇮🇳' : '🙏'}</span>
      </div>
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
        lang={wish.language}
      >
        {wish.message}
      </p>
    </motion.div>
  )
}

// ── Submit Form ────────────────────────────────────────────────────────────
const WishForm = () => {
  const { t } = useTranslation('wishes')
  const { submitWish, isSubmitting } = useWishes()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [language, setLanguage] = useState<'en' | 'hi'>('en')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() === '' || message.trim() === '') return
    const ok = await submitWish({ name: name.trim(), message: message.trim(), language })
    if (ok) {
      setSubmitted(true)
      setName('')
      setMessage('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={(e) => { void handleSubmit(e) }}
      className="card-light space-y-4"
    >
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-2 py-4 text-center"
        >
          <span className="text-4xl">🙏</span>
          <p className="font-display text-lg font-semibold text-gold">{t('thankYou')}</p>
          <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>{t('wishReceived')}</p>
        </motion.div>
      ) : (
        <>
          {/* Language toggle */}
          <div className="flex items-center gap-2">
            <span className="font-body text-xs" style={{ color: 'var(--text-muted)' }}>
              {t('wishIn')}
            </span>
            <button
              type="button"
              onClick={() => setLanguage((l) => l === 'en' ? 'hi' : 'en')}
              className="badge-gold cursor-pointer transition-all hover:bg-gold/20"
            >
              {language === 'en' ? 'English' : 'हिंदी'}
            </button>
          </div>

          {/* Name input */}
          <div>
            <label htmlFor="wish-name" className="font-body text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('yourName')} *
            </label>
            <input
              id="wish-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('namePlaceholder')}
              maxLength={60}
              required
              className={cn('input-divine mt-1', language === 'hi' && 'font-hindi')}
            />
          </div>

          {/* Message input */}
          <div>
            <label htmlFor="wish-message" className="font-body text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {t('yourWish')} *
            </label>
            <textarea
              id="wish-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('wishPlaceholder')}
              maxLength={280}
              rows={3}
              required
              className={cn('input-divine mt-1 resize-none', language === 'hi' && 'font-hindi')}
            />
            <p className="mt-1 text-right font-body text-xs" style={{ color: 'var(--text-muted)' }}>
              {message.length}/280
            </p>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="md"
            className="w-full gap-2"
            isLoading={isSubmitting}
          >
            <Send size={14} aria-hidden="true" />
            {isSubmitting ? t('sending') : t('sendWish')}
          </Button>
        </>
      )}
    </motion.form>
  )
}

// ── Main Section ───────────────────────────────────────────────────────────
/**
 * WishesWall
 * Guests leave blessings — stored in JSONBin, displayed as animated cards.
 * Falls back to mock wishes in dev mode (no API key required).
 * Add VITE_JSONBIN_BIN_ID and VITE_JSONBIN_API_KEY to .env to go live.
 */
export const WishesWall = () => {
  const { t } = useTranslation('wishes')
  const { wishes, isLoading, error } = useWishes()

  return (
    <section id="wishes" className="section-padding mandala-bg">
      <div className="section-container">
        <AnimatedSection className="mb-12 text-center" stagger>
          <motion.div variants={fadeInUp} className="text-4xl" aria-hidden="true">🙏</motion.div>
          <motion.h2 variants={fadeInUp} className="section-title mt-3 text-gold">{t('title')}</motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle mt-2 text-ivory/60">{t('subtitle')}</motion.p>
          <motion.div variants={fadeInUp} className="gold-divider mt-4" aria-hidden="true" />
        </AnimatedSection>

        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Left — submit form */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <WishForm />
          </div>

          {/* Right — wishes list */}
          <div>
            {error !== null && (
              <p className="mb-4 font-body text-sm text-red-400">{error}</p>
            )}

            {isLoading && wishes.length === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton h-32 rounded-2xl" />
                ))}
              </div>
            )}

            <AnimatePresence mode="popLayout">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2"
              >
                {wishes.map((wish) => (
                  <WishCard key={wish.id} wish={wish} />
                ))}
              </motion.div>
            </AnimatePresence>

            {!isLoading && wishes.length === 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-3 py-12 text-center"
              >
                <span className="text-5xl">🌸</span>
                <p className="font-display text-lg text-gold">{t('noWishesYet')}</p>
                <p className="font-body text-sm text-ivory/40">{t('beFirst')}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
