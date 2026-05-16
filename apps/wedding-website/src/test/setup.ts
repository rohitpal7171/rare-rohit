/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'

// Vitest v4 hoists vi.mock() before ALL imports.
// Use async factory with dynamic import to get React safely.

vi.mock('framer-motion', async () => {
  const { createElement, forwardRef, Fragment } = await import('react')

  const makeEl = (tag: string) =>
    forwardRef(({ children, ...props }: Record<string, unknown>, ref) => {
      const {
        initial, animate, exit, variants, transition,
        whileHover, whileTap, whileInView, whileFocus,
        drag, dragConstraints, layoutId, layout,
        onAnimationComplete, onAnimationStart, viewport, style,
        ...domProps
      } = props
      void initial; void animate; void exit; void variants; void transition
      void whileHover; void whileTap; void whileInView; void whileFocus
      void drag; void dragConstraints; void layoutId; void layout
      void onAnimationComplete; void onAnimationStart; void viewport
      return createElement(tag, { ...domProps, style, ref }, children as never)
    })

  return {
    motion: {
      div:     makeEl('div'),
      button:  makeEl('button'),
      span:    makeEl('span'),
      p:       makeEl('p'),
      header:  makeEl('header'),
      section: makeEl('section'),
      a:       makeEl('a'),
    },
    AnimatePresence: ({ children }: { children: unknown }) =>
      createElement(Fragment, null, children as never),
    useScroll:         () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform:      (_v: unknown, _i: unknown, output: unknown[]) => output[0],
    useSpring:         (v: unknown) => v,
    useMotionTemplate: (...args: unknown[]) => String(args.join('')),
    useMotionValue:    (v: unknown) => ({ get: () => v, set: vi.fn() }),
  }
})

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
  Trans: ({ children }: { children: unknown }) => children,
}))

vi.mock('lucide-react', async () => {
  const { createElement } = await import('react')
  const icon = (id: string) => () => createElement('span', { 'data-testid': id })
  return {
    Volume2:     icon('icon-volume2'),
    VolumeX:     icon('icon-volumex'),
    X:           icon('icon-x'),
    Music:       icon('icon-music'),
    ChevronDown: icon('icon-chevron-down'),
    MapPin:      icon('icon-map-pin'),
    Play:        icon('icon-play'),
    Pause:       icon('icon-pause'),
    ArrowLeft:   icon('icon-arrow-left'),
    Clock:       icon('icon-clock'),
    Send:        icon('icon-send'),
  }
})
