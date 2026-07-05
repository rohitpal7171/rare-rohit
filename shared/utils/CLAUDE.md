# CLAUDE.md — shared/utils/

# Last updated: 2026-05-24

## Files

| File            | Purpose                                                    |
| --------------- | ---------------------------------------------------------- |
| `animations.ts` | ALL Framer Motion variants — single source of truth        |
| `cn.ts`         | clsx + tailwind-merge helper for conditional class merging |
| `constants.ts`  | App-wide constants + `CeremonySlug` type                   |
| `formatDate.ts` | Date formatting for EN and HI locales                      |
| `index.ts`      | Barrel exports — import from here only                     |

---

## animations.ts — Framer Motion Variants

This is the ONLY file where Framer Motion variants are defined.
Never define variants inline in components.

### Available Variants

```ts
// Entrance animations
fadeInUp // fade + slide up (most common)
fadeInDown // fade + slide down
fadeInLeft // fade + slide from left
fadeInRight // fade + slide from right
scaleIn // scale from 0.88 → 1
scaleInBounce // scale with spring overshoot

// Container/stagger
staggerContainer // parent with staggerChildren: 0.1
staggerFast // parent with staggerChildren: 0.06

// Loop animations
floatLoop // gentle float up/down
glowLoop // gold box-shadow pulse
shimmerLoop // shimmer left-right

// Interactive
hoverLift // translateY -4px on hover
hoverScale // scale 1.03 on hover
tapScale // scale 0.97 on tap

// Page transitions
pageEnter // full-page fade+slide entrance
pageExit // full-page fade+slide exit
```

### Usage Pattern

```tsx
import { fadeInUp, staggerContainer } from '@shared/utils'
;<motion.ul
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {items.map((item) => (
    <motion.li variants={fadeInUp} key={item.id}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

---

## cn.ts

```ts
import { cn } from '@shared/utils'

// Combines clsx (conditional classes) + tailwind-merge (resolves conflicts)
cn('base-class', isActive && 'active-class', hasError ? 'error' : 'normal')
```

Always use `cn()` for conditional Tailwind classes — never string interpolation or ternary string concat.

---

## constants.ts

Key exports:

```ts
// Ceremony slugs — single source of type truth
export type CeremonySlug = 'haldi' | 'mehendi' | 'sangeet' | 'baraat' | 'pheras' | 'vidaai' | 'reception'
export const CEREMONY_SLUGS: readonly CeremonySlug[] = [...]

// Breakpoints (mirrors Tailwind)
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }

// Z-index scale
export const Z = { navbar: 30, player: 40, drawer: 50, modal: 60 }
```

---

## formatDate.ts

```ts
import { formatDate } from '@shared/utils'

formatDate('2026-11-26T09:00:00+05:30', 'en') // "26 November 2026"
formatDate('2026-11-26T09:00:00+05:30', 'hi') // "२६ नवंबर २०२६"

formatDateShort('2026-11-26T09:00:00+05:30', 'en') // "26 Nov"
formatDateShort('2026-11-26T09:00:00+05:30', 'hi') // "२६ नव"
```

---

## Rules

- Pure functions only — no React, no side effects, no DOM access
- Export everything from `index.ts` barrel — never deep-import
- `animations.ts` is the ONLY place Framer Motion variants are defined
- No `any` — all functions fully typed with explicit return types
