import { cn } from '@shared/utils'

interface SectionEdgeProps {
  className?: string
}

const WIDTH = 1440
const SCALLOPS = 48
const STEP = WIDTH / SCALLOPS
const BAND = 4 // solid band before the scallops begin

/**
 * Builds the toran path once at module scope:
 * a solid band across the top with semicircular scallops hanging below,
 * like a garland strung across a doorway.
 */
const buildToranPath = (): string => {
  let d = `M0,0 H${WIDTH} V${BAND} `
  for (let i = 0; i < SCALLOPS; i++) {
    d += `a${STEP / 2},${STEP / 2.6} 0 0 1 -${STEP},0 `
  }
  return `${d}Z`
}

const TORAN_PATH = buildToranPath()

/**
 * SectionEdge — a scalloped toran garland rendered at the TOP of a light
 * section that follows a dark (mandala-bg) section, so the boundary reads
 * as a hung garland instead of a hard 90° cut. The stroke doubles as a
 * fine gold hairline along the seam.
 *
 * Usage: parent section must be `relative`; place as its first child.
 * Pure static SVG — zero runtime cost.
 */
export const SectionEdge = ({ className }: SectionEdgeProps) => (
  <div
    aria-hidden="true"
    className={cn('pointer-events-none absolute inset-x-0 top-0 leading-[0]', className)}
  >
    <svg
      viewBox={`0 0 ${WIDTH} 16`}
      preserveAspectRatio="none"
      className="block h-3 w-full sm:h-4"
    >
      <path d={TORAN_PATH} fill="#2D1B4E" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1" />
    </svg>
  </div>
)
