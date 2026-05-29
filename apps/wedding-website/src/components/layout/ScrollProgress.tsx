import { useState } from 'react'

import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'

/**
 * ScrollProgress
 * Thin gold shimmer line at the very top of the viewport.
 * scaleX goes from 0 (top) to 1 (bottom of page).
 * useSpring adds smooth lag. useMotionValueEvent handles subscription cleanup.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setVisible(v > 0.01)
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, #A07830 0%, #C9A84C 40%, #E2C97E 70%, #C9A84C 100%)',
        boxShadow: '0 0 8px rgba(201,168,76,0.6)',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.25 } }}
      className="fixed left-0 top-0 z-[70] h-[3px] w-full"
    />
  )
}
