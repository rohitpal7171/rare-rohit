import type { MotionProps, Transition, Variants } from 'framer-motion'

// ─── Shared transition presets ─────────────────────────────────────────────
export const transitions = {
  /** Smooth expo-out — for most entrances */
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
  /** Fast expo-out — for small elements */
  fast: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } satisfies Transition,
  /** Spring — for interactive/hover elements */
  spring: { type: 'spring', stiffness: 350, damping: 28 } satisfies Transition,
  /** Soft spring — for page-level transitions */
  springGentle: { type: 'spring', stiffness: 200, damping: 30 } satisfies Transition,
  /** Snappy spring — for micro-interactions */
  springSnappy: { type: 'spring', stiffness: 500, damping: 35 } satisfies Transition,
  /** Exit — always faster than entrance */
  exit: { duration: 0.22, ease: [0.4, 0, 1, 1] } satisfies Transition,
} as const

// ─── Entrance variants ─────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transitions.smooth },
  exit: { opacity: 0, y: -20, transition: transitions.exit },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -36, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: transitions.smooth },
  exit: { opacity: 0, y: 20, transition: transitions.exit },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -56, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { ...transitions.smooth, duration: 0.7 },
  },
  exit: { opacity: 0, x: 20, transition: transitions.exit },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 56, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { ...transitions.smooth, duration: 0.7 },
  },
  exit: { opacity: 0, x: -20, transition: transitions.exit },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: transitions.smooth },
  exit: { opacity: 0, scale: 0.94, transition: transitions.exit },
}

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(16px)', scale: 1.04 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { ...transitions.smooth, duration: 0.8 },
  },
}

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: transitions.springGentle },
  exit: { opacity: 0, y: 40, transition: transitions.exit },
}

// ─── Container / stagger variants ──────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
}

// ─── Page transitions ───────────────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...transitions.smooth, duration: 0.5 },
  },
  exit: { opacity: 0, y: -12, filter: 'blur(2px)', transition: transitions.exit },
}

export const pageSlide: Variants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: transitions.springGentle },
  exit: { opacity: 0, x: -20, transition: transitions.exit },
}

// ─── Loop / ambient animations ─────────────────────────────────────────────

export const floatLoop: Variants = {
  initial: { y: 0, opacity: 0.75 },
  animate: {
    y: [-10, 8, -10],
    opacity: [0.75, 1, 0.75],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const floatLoopSlow: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const rotateLoop: Variants = {
  initial: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
}

export const pulseLoop: Variants = {
  initial: { scale: 1, opacity: 0.8 },
  animate: {
    scale: [1, 1.04, 1],
    opacity: [0.8, 1, 0.8],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ─── Glow / visual effects ─────────────────────────────────────────────────

export const glowPulse: Variants = {
  initial: {
    boxShadow: '0 0 0px rgba(201,168,76,0)',
  },
  animate: {
    boxShadow: [
      '0 0 8px rgba(201,168,76,0.15), 0 0 0px rgba(201,168,76,0)',
      '0 0 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15)',
      '0 0 8px rgba(201,168,76,0.15), 0 0 0px rgba(201,168,76,0)',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glowPulseStrong: Variants = {
  initial: { boxShadow: '0 0 0px rgba(201,168,76,0)' },
  animate: {
    boxShadow: [
      '0 0 10px rgba(201,168,76,0.2)',
      '0 0 40px rgba(201,168,76,0.6), 0 0 80px rgba(201,168,76,0.2)',
      '0 0 10px rgba(201,168,76,0.2)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ─── SVG / drawing animations ───────────────────────────────────────────────

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const drawLineDelayed: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
}

// ─── Interactive (hover/tap) props — use directly on motion elements ────────

export const hoverScale: Pick<MotionProps, 'whileHover' | 'whileTap' | 'transition'> = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.97 },
  transition: transitions.spring,
}

export const hoverLift: Pick<MotionProps, 'whileHover' | 'whileTap' | 'transition'> = {
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { y: 0, scale: 0.99 },
  transition: transitions.spring,
}

export const hoverGlow: Pick<MotionProps, 'whileHover' | 'transition'> = {
  whileHover: {
    boxShadow: '0 0 20px rgba(201,168,76,0.4), 0 0 40px rgba(201,168,76,0.15)',
  },
  transition: { duration: 0.3, ease: 'easeOut' },
}

export const tapPress: Pick<MotionProps, 'whileTap' | 'transition'> = {
  whileTap: { scale: 0.96 },
  transition: transitions.springSnappy,
}
