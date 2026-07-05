import { cn } from '@shared/utils'

interface OrnamentDividerProps {
  tone?: 'gold' | 'maroon'
  className?: string
}

/**
 * OrnamentDivider — replaces plain 1px gold lines and emoji dividers
 * (emoji render differently on every OS). Hairlines meet a lotus-diamond
 * centre flanked by curls and dots.
 *
 * tone="gold"   → for dark (mandala-bg) sections
 * tone="maroon" → for light (ivory) sections
 *
 * Pure static SVG, currentColor-driven — zero runtime cost.
 */
export const OrnamentDivider = ({ tone = 'gold', className }: OrnamentDividerProps) => (
  <div className={cn('flex justify-center', className)} aria-hidden="true">
    <svg
      viewBox="0 0 220 24"
      width="220"
      height="24"
      fill="none"
      className={tone === 'gold' ? 'text-gold' : 'text-maroon/70'}
    >
      {/* Hairlines */}
      <path d="M6 12 H86" stroke="currentColor" strokeOpacity="0.4" strokeLinecap="round" />
      <path d="M134 12 H214" stroke="currentColor" strokeOpacity="0.4" strokeLinecap="round" />
      {/* Flanking dots */}
      <circle cx="93" cy="12" r="1.4" fill="currentColor" fillOpacity="0.7" />
      <circle cx="127" cy="12" r="1.4" fill="currentColor" fillOpacity="0.7" />
      {/* Side curls */}
      <path
        d="M98 12 C100.5 7.5 105.5 7.5 107.5 11"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />
      <path
        d="M122 12 C119.5 7.5 114.5 7.5 112.5 11"
        stroke="currentColor"
        strokeOpacity="0.75"
        strokeLinecap="round"
      />
      {/* Centre lotus diamond */}
      <path
        d="M110 5.5 L114.5 12 L110 18.5 L105.5 12 Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="110" cy="12" r="1.3" fill="currentColor" />
    </svg>
  </div>
)
