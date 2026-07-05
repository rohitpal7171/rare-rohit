# CLAUDE.md — shared/ui/components/

# Last updated: 2026-06-14

## Components

| File                  | Export            | Purpose                                                           |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| `Button.tsx`          | `Button`          | Motion-enabled button — variants: primary, secondary, ghost, gold |
| `Countdown.tsx`       | `Countdown`       | Days/hours/minutes/seconds display until target date              |
| `LanguageToggle.tsx`  | `LanguageToggle`  | EN / HI language switcher button                                  |
| `Modal.tsx`           | `Modal`           | Reusable modal/dialog with backdrop                               |
| `MobileNav.tsx`       | `MobileNav`       | Mobile hamburger drawer menu                                      |
| `LazyImage.tsx`       | `LazyImage`       | Lazy-loaded `<img>` with IntersectionObserver + blur-up           |
| `AnimatedSection.tsx` | `AnimatedSection` | Wraps children in scroll-triggered Framer Motion reveal           |

## Import — Always Via Barrel

```ts
import { Button, Countdown, LazyImage } from '@shared/ui'
// Never deep-import: import Button from '@shared/ui/components/Button'
```

## Button Variants

```ts
<Button variant="primary" />   // Saffron fill — primary CTA
<Button variant="secondary" /> // Gold border, transparent fill
<Button variant="ghost" />     // No border, text only
<Button variant="gold" />      // Gold shimmer — ceremonial accent
```

All variants support `size` prop: `sm | md | lg`.

## AnimatedSection

Wraps any content block to animate in on scroll:

```tsx
<AnimatedSection>
  <p>Animates on scroll into view</p>
</AnimatedSection>
```

Uses `useScrollAnimation` hook internally. `viewport={{ once: true }}` — animates once, not on re-entry.

## LazyImage

```tsx
<LazyImage src="/wedding_pics/namaste/bride_groom_namaste.png" alt="Rohit and Priti" />
```

Renders a blurred placeholder until the image enters the viewport. Fallback on error.

## Rules for This Folder

- No app-specific logic, no imports from `@app/*`
- Every component accepts `className?: string` for external overrides
- Named exports only — no default exports
- Framer Motion variants from `@shared/utils/animations` — never inline inside these components
- No hardcoded colors — use Tailwind classes that consume design tokens
