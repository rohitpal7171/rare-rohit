# CLAUDE.md — shared/ui/

# Last updated: 2026-05-24

## Components

| File                  | Export            | Purpose                                          |
| --------------------- | ----------------- | ------------------------------------------------ |
| `AnimatedSection.tsx` | `AnimatedSection` | Scroll-reveal wrapper using IntersectionObserver |
| `Button.tsx`          | `Button`          | Base button with variants                        |
| `Countdown.tsx`       | `Countdown`       | Animated wedding day countdown timer             |
| `LanguageToggle.tsx`  | `LanguageToggle`  | EN ↔ हिंदी language switcher                     |
| `LazyImage.tsx`       | `LazyImage`       | Lazy loading with blur placeholder               |
| `MobileNav.tsx`       | `MobileNav`       | Hamburger drawer navigation                      |
| `Modal.tsx`           | `Modal`           | Accessible modal with backdrop + escape key      |
| `index.ts`            | —                 | Barrel — import from here only                   |

---

## AnimatedSection.tsx

Wraps any content in a scroll-reveal animation.

```tsx
<AnimatedSection>
  <div>Content that fades in on scroll</div>
</AnimatedSection>
```

- Uses `useScrollAnimation` hook + Framer Motion
- `viewport={{ once: true }}` — never replays after first reveal
- Default variant: `fadeInUp`
- Accepts custom `variants` prop for different animation styles

---

## Button.tsx

```tsx
<Button variant="primary" | "secondary" | "ghost" size="sm" | "md" | "lg">
  Label
</Button>
```

- Accepts `className` for overrides
- All interactive states: hover, active, focus, disabled
- Uses design tokens — never hardcoded hex colors

---

## Countdown.tsx

```tsx
<Countdown targetDate="2026-11-26T09:00:00+05:30" />
```

- Uses `useCountdown` hook
- Shows DD : HH : MM : SS with animated digit transitions
- `scaleInBounce` animation on mount
- Handles expired target (shows zeros)

---

## LanguageToggle.tsx

- Reads current language from `i18n.language`
- Calls `i18n.changeLanguage()` on toggle
- Shows `EN` / `हिं` labels
- Language persisted to `localStorage` key `i18nextLng`

---

## LazyImage.tsx

```tsx
<LazyImage src="..." alt="..." width={400} height={300} className="..." />
```

- IntersectionObserver triggers src load
- Blurred placeholder until loaded
- Always requires explicit `width` + `height` to prevent CLS

---

## MobileNav.tsx

- Hamburger button → slide-in drawer
- Accepts `links` prop array
- Backdrop click closes drawer
- Focus trap + escape key support

---

## Modal.tsx

- Accessible: focus trap, escape key, ARIA attributes
- Backdrop click closes
- `AnimatePresence` for enter/exit animation
- Accepts `isOpen`, `onClose`, `title`, `children`

---

## Rules for All UI Components

- Accept `className?: string` on every root element for external styling
- Use `cn()` from `@shared/utils` for class merging
- Never hardcode colors — use Tailwind tokens or CSS variables
- Fully typed prop interfaces above every component
- No app-specific logic — no references to `weddingConfig` or wedding-specific data
- Export all from `index.ts` barrel
