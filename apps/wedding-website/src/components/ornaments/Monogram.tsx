interface MonogramProps {
  size?: number
  className?: string
}

/**
 * Monogram — the #RohitWedsPriti brand mark.
 * "R & P" in Dancing Script inside a double mandala ring with
 * diamond marks at the cardinal points and dots at the diagonals.
 *
 * currentColor-driven: color it with a text-* class (e.g. text-gold).
 * Pure static SVG — zero runtime cost. Decorative → aria-hidden.
 */
export const Monogram = ({ size = 48, className }: MonogramProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
    {...(className !== undefined ? { className } : {})}
  >
    {/* Outer ring */}
    <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.9" />
    {/* Inner dashed ring */}
    <circle
      cx="50"
      cy="50"
      r="41"
      stroke="currentColor"
      strokeWidth="0.75"
      strokeOpacity="0.65"
      strokeDasharray="1.5 3.5"
    />
    {/* Diamond marks — N / E / S / W, sitting between the two rings */}
    <g fill="currentColor" fillOpacity="0.85">
      <path d="M50 2.5 L52.3 6 L50 9.5 L47.7 6 Z" />
      <g transform="rotate(90 50 50)">
        <path d="M50 2.5 L52.3 6 L50 9.5 L47.7 6 Z" />
      </g>
      <g transform="rotate(180 50 50)">
        <path d="M50 2.5 L52.3 6 L50 9.5 L47.7 6 Z" />
      </g>
      <g transform="rotate(270 50 50)">
        <path d="M50 2.5 L52.3 6 L50 9.5 L47.7 6 Z" />
      </g>
    </g>
    {/* Dots at the diagonals */}
    <g fill="currentColor" fillOpacity="0.55">
      <circle cx="81.1" cy="18.9" r="1.1" />
      <circle cx="81.1" cy="81.1" r="1.1" />
      <circle cx="18.9" cy="81.1" r="1.1" />
      <circle cx="18.9" cy="18.9" r="1.1" />
    </g>
    {/* The initials */}
    <text
      x="50"
      y="61"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="'Dancing Script', cursive"
      fontWeight="600"
    >
      <tspan fontSize="32">R</tspan>
      <tspan fontSize="17" dx="2" dy="-4" fillOpacity="0.8">
        &amp;
      </tspan>
      <tspan fontSize="32" dx="2" dy="4">
        P
      </tspan>
    </text>
  </svg>
)
