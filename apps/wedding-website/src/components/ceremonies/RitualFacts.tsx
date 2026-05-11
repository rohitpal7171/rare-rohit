import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { cn, type CeremonySlug } from '@shared/utils'

// ── Fact index type ────────────────────────────────────────────────────────
// Each ceremony has exactly 3 facts (fact0, fact1, fact2) in ceremonies.json
const FACT_INDICES = [0, 1, 2] as const
type FactIndex = (typeof FACT_INDICES)[number]

export interface RitualFactsProps {
  slug: CeremonySlug
  className?: string
}

interface FlipCardProps {
  slug: CeremonySlug
  index: FactIndex
}

const FlipCard = ({ slug, index }: FlipCardProps) => {
  const { t } = useTranslation('ceremonies')
  const [flipped, setFlipped] = useState(false)

  const question = t(`${slug}.facts.${index}.q`)
  const answer = t(`${slug}.facts.${index}.a`)
  const icon = t(`${slug}.facts.${index}.icon`)

  return (
    <div
      className={cn('flip-card h-44', flipped && 'flipped')}
      onClick={() => {
        setFlipped((v) => !v)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setFlipped((v) => !v)
      }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Fact ${index + 1}: ${flipped ? 'showing answer' : 'tap to reveal'}`}
    >
      <div className="flip-card-inner">
        {/* Front — question */}
        <div className="flip-card-front gap-3">
          <span className="text-3xl" aria-hidden="true">
            {icon}
          </span>
          <p className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {question}
          </p>
          <p className="font-body text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>
            Tap to reveal
          </p>
        </div>

        {/* Back — answer */}
        <div className="flip-card-back gap-3">
          <p className="font-body text-sm leading-relaxed text-ivory/85">{answer}</p>
          <p className="font-body text-xs text-gold/60">Tap to flip back</p>
        </div>
      </div>
    </div>
  )
}

/**
 * RitualFacts
 * 3 flip cards per ceremony with "Did You Know?" facts.
 * Each card flips independently on click/tap/keyboard.
 * Data comes from ceremonies.json — slug.facts[0..2].{q, a, icon}
 */
export const RitualFacts = ({ slug, className }: RitualFactsProps) => {
  const { t } = useTranslation('common')

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="font-display text-xl font-bold text-gold">{t('ceremony.didYouKnow')}</h2>
      <p className="font-body text-xs text-ivory/40">{t('ceremony.tapToReveal')}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {FACT_INDICES.map((i) => (
          <FlipCard key={i} slug={slug} index={i} />
        ))}
      </div>
    </div>
  )
}
