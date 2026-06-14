# CLAUDE.md — apps/wedding-website/src/styles/
# Last updated: 2026-06-14

## File

| File         | Purpose                                                             |
|--------------|---------------------------------------------------------------------|
| `index.css`  | Global styles: Tailwind directives, CSS variables, base resets, animations |

## index.css Structure

```css
/* 1. Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 2. CSS custom properties (:root) — mirrors Tailwind design tokens */
:root {
  --color-saffron: #FF6B00;
  --color-maroon:  #800020;
  --color-gold:    #C9A84C;
  ...
}

/* 3. Font face / global typography */

/* 4. Base resets (html, body, *, scrollbar) */

/* 5. Custom utility classes not expressible as Tailwind plugins */
```

## Critical Sync Rule

`tailwind.config.ts` is the **source of truth** for design tokens.
`index.css` CSS custom properties **mirror** those tokens for use in vanilla CSS.

When you change a color/spacing/font in `tailwind.config.ts`, update the matching CSS variable in `index.css` too. They must stay in sync.

## Tailwind Component Classes Defined Here

The following classes are declared in `@layer components` and used across the app:

| Class               | Description                                    |
|---------------------|------------------------------------------------|
| `.section-padding`  | Responsive `py`/`px` for full-width sections   |
| `.section-container`| `max-w-6xl mx-auto px-*` container             |
| `.card-divine`      | Glassmorphism card for dark (mandala-bg) sections |
| `.card-light`       | Ivory card for light sections                  |
| `.input-divine`     | Styled form input                              |
| `.gold-divider`     | Thin gold `<hr>` divider                       |
| `.gold-divider-wide`| Wider shimmer gold divider                     |
| `.mandala-bg`       | Dark purple-maroon radial gradient background  |
| `.text-gradient-gold`| Animated shimmer gold text effect             |
| `.glow-gold`        | Gold drop-shadow filter                        |

## Rules

- No component-specific CSS here — all component styling via Tailwind classes in TSX
- New design tokens → add to `tailwind.config.ts` first, then mirror in `:root` here
- Never use `filter: blur()` in animation variants — causes GPU compositing storm on mobile
