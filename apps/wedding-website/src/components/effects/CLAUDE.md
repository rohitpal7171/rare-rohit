# CLAUDE.md — apps/wedding-website/src/components/effects/
# Last updated: 2026-05-30

## Components in This Folder

| File                    | Status | Purpose                                              |
|-------------------------|--------|------------------------------------------------------|
| `CursorEffect.tsx`      | ACTIVE | Canvas petal/diya particle trail on mouse + touch    |
| `WeddingCharacters.tsx` | ACTIVE | Couple PNG fixed bottom-right, animated              |

---

## WeddingCharacters.tsx

**Image:** `public/wedding_pics/namaste/bride_groom_namaste.png` (transparent PNG)
**Position:** `fixed bottom-0 right-0 z-[24]`
**Visible:** All screen sizes (responsive sizing via clamp)

### Size Formula
```
height: clamp(90px, calc(10vw + 8vh), 320px)
```
| Screen         | Approx height |
|----------------|---------------|
| 390×844 mobile | ~107px        |
| 768×1024 tablet| ~159px        |
| 1440×900 desktop| ~216px       |
| 1920×1080 large | ~278px       |
| 2560×1440 2K   | ~320px (cap)  |

Max scale on click is capped to `window.innerHeight / baseH` — image never exceeds viewport height.

### Interactions
| Action | Result |
|--------|--------|
| Hover | `cursor: grab` |
| Drag | Freely repositionable anywhere on screen |
| Click × 1 (no drag) | Scale 1× → 2× |
| Click × 2 (no drag) | Scale 2× → 4× (capped to window height) |
| Click × 3 (no drag) | Reset to 1× (original size) |
| Section change | Gentle scale pulse reaction |
| Always | Idle float bob (y: 0 → -10 → 0, 3.5s loop) |

### Drag vs Click detection
```ts
const DRAG_CLICK_THRESHOLD = 5  // px
// onPointerDown: record start position
// onPointerUp: if moved < 5px → treat as click, else treat as drag
```

### Section Reactions
```
home       → scale [1, 1.04, 1]        1.0s
our-story  → scale [1, 1.03, 1]        1.2s
ceremonies → scale [1, 1.06, 1.02, 1]  1.6s
schedule   → scale [1, 1.03, 1]        0.9s
gallery    → scale [1, 1.04, 1]        1.1s
```

### Section Detection
Uses `getBoundingClientRect().top` (NOT `offsetTop`) — reliable for lazy-loaded sections.
Retries at 400ms and 1500ms after mount to wait for lazy sections.

### Z-index (in context of full stack)
```
z-[24] — WeddingCharacters (below Navbar z-30)
z-30   — Navbar
z-40   — AmbientPlayer
z-50   — Mobile nav drawer
z-[60] — Ceremony color flash
z-[70] — ScrollProgress
z-50   — CursorEffect canvas
```

### Overflow Prevention
- `body class="overflow-x-hidden"` in `index.html`
- `overflow-x-hidden` on root App div
- `dragConstraints.right: 0` — can't drag rightward past origin
- `touch-none` Tailwind class — required for drag on mobile

---

## CursorEffect.tsx

- Canvas `fixed inset-0 z-50 pointer-events-none`
- Mouse move → petal trail (🌸 🌼 ✨ 🌺)
- Click → diya burst (🪔 🌸 ✨ 🌼 🌺 💛)
- Touch → finger trail
- Disabled when `prefers-reduced-motion: reduce`
- Max 40 particles at once (older removed)
- RAF-based animation loop, cleaned up on unmount
