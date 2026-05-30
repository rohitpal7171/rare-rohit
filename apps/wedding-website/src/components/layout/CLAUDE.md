# CLAUDE.md — apps/wedding-website/src/components/layout/
# Last updated: 2026-05-30

## Components in This Folder

| File                  | Status   | Purpose                                          |
|-----------------------|----------|--------------------------------------------------|
| `AmbientPlayer.tsx`   | ACTIVE   | Floating ॐ button + ambient music player         |
| `Navbar.tsx`          | ACTIVE   | Fixed top navigation bar                         |
| `Footer.tsx`          | ACTIVE   | Footer with hashtag, share button, credits       |
| `PageWrapper.tsx`     | ACTIVE   | Scroll-to-top + page transition + color flash    |
| `ScrollProgress.tsx`  | ACTIVE   | Gold progress line at top of viewport            |
| `ShareButton.tsx`     | ACTIVE   | Web Share API + clipboard fallback button        |
| `ThemeToggle.tsx`     | INACTIVE | Light/dark toggle — kept, not rendered           |

---

## AmbientPlayer.tsx — Deep Documentation

**Audio file:** `public/audio/sangeet.mp3` (5.1MB — EXISTS ✅)
**Hook:** `useAudioPlayer` from `@shared/hooks`
**Position:** `fixed bottom-6 left-6 z-40`

### Current Autoplay Strategy (as of 2026-05-29)
Browser autoplay policy blocks unmuted audio without user gesture.
Solution: start muted, unmute on first real interaction.

```
Page loads
  → Audio element created (muted, not playing)
  → document listeners attached: click + touchstart
First user interaction fires
  → startedRef.current = true
  → all listeners removed (prevents double-fire)
  → play() called (muted — browser always allows)
  → setTimeout 300ms → toggleMute() (unmutes)
Subsequent ॐ button clicks
  → startedRef.current is true → toggle() runs (pause/resume)
```

### Critical Rules for AmbientPlayer
- **DO NOT add `scroll` to triggers** — scroll fires on programmatic page scrolls, triggers audio before real user interaction
- **DO NOT use `once: true`** on multiple event types — leads to orphaned listeners
- **DO NOT call `play()` on mount** without a user gesture — sets `hasError: true`, permanently disables the button
- **startedRef guard** in onClick is essential — prevents toggle() from pausing audio that handleFirstInteraction just started

### useAudioPlayer Hook API
```ts
const {
  isPlaying,    // boolean — is audio currently playing
  isMuted,      // boolean — is audio muted
  volume,       // number — 0 to 1
  isLoaded,     // boolean — audio canplay event fired
  hasError,     // boolean — audio failed entirely (disables button)
  play,         // () => void — plays (muted fallback if browser blocks)
  pause,        // () => void
  toggle,       // () => void — play if paused, pause if playing
  toggleMute,   // () => void
  setVolume,    // (v: number) => void
  seek,         // (seconds: number) => void
} = useAudioPlayer(src, { startMuted, loop, initialVolume })
```

### Visual States
| State          | Visual                                                             |
|----------------|--------------------------------------------------------------------|
| Loading        | Spinning gold border ring around button                            |
| Active+unmuted | Gold glow border + pulsing ring + ॐ glows gold                    |
| Muted/paused   | Dim gold ॐ, no glow                                               |
| Error          | `cursor-not-allowed opacity-40`                                    |
| Pill           | Shows "Tap to unmute" or "Ambient Music" + mute button             |

---

## ScrollProgress.tsx

- `fixed top-0 left-0 z-[70]` — above everything including Navbar (z-30)
- `useScroll()` → `scrollYProgress` (0 to 1)
- `useSpring()` → smooth spring-physics lag on the bar
- `useMotionValueEvent` — correct v11 API for subscribing to MotionValue changes
- Fades in after 1% scroll, fades out at top
- Gold gradient: `#A07830 → #C9A84C → #E2C97E → #C9A84C`
- Rendered globally in `App.tsx` — persists across all route changes

---

## PageWrapper.tsx

- Wraps all non-Home pages (ceremony pages only)
- Scrolls to top on route change
- `pageTransition` variant from `@shared/utils/animations` — fade + slide up on enter
- **Ceremony color flash:** brief colored overlay fades from `opacity 0.18 → 0` in 500ms
  - Only renders when `accentColor` prop is passed (null = no flash)
  - Color map: `marigold → #FFBE00` | `saffron → #FF6B00` | `maroon → #800020` | `divine → #2D1B4E` | `gold → #C9A84C`
- Does NOT wrap Home page

---

## ShareButton.tsx

- Renders in `Footer.tsx`
- 4 share options: Copy Link / WhatsApp / Facebook / Instagram
- **Copy Link** — `navigator.clipboard.writeText(SITE_URL)`
- **WhatsApp** — `wa.me/?text=...` — opens app on mobile, web.whatsapp.com on desktop
- **Facebook** — `facebook.com/sharer/sharer.php?u=...` — opens app on mobile, website on desktop
- **Instagram** — no web share API exists. Copies link to clipboard + opens Instagram app via `instagram://` URI on mobile, opens instagram.com on desktop
- Click-outside closes the dropdown panel (`useRef` + `mousedown` listener)
- Panel opens upward (`bottom-full`) — correct since button is in Footer at page bottom

---

## Navbar.tsx — Key Notes

- **Fixed top, z-30** — always visible
- **Transparent** on hero section → `bg-divine/95 backdrop-blur` on scroll + all other pages
- Uses `useMotionTemplate` (NOT `.get()`) for reactive MotionValue background
- Nav anchor links use `<a href="/#section-id">` — NOT React Router `<Link>`
- Desktop: inline links | Mobile: hamburger → drawer
- **ThemeToggle removed** — do not add back without explicit instruction

### Z-index Hierarchy (full stack)
```
z-[24] — WeddingCharacters (fixed bottom-right)
z-30   — Navbar
z-40   — AmbientPlayer (fixed bottom-left)
z-50   — Mobile nav drawer
z-[60] — Ceremony color flash overlay (PageWrapper)
z-[70] — ScrollProgress bar (above everything)
z-50   — CursorEffect canvas (pointer-events: none)
```

---

## Footer.tsx

- Hashtag `#RohitWedsPriti`
- `ShareButton` — Web Share / clipboard copy
- Blessings text (Hindi)
- "Made with ❤️ and love" credits
