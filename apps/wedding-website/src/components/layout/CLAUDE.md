# CLAUDE.md — apps/wedding-website/src/components/layout/
# Last updated: 2026-05-24

## Components in This Folder

| File               | Status  | Purpose                                      |
|--------------------|---------|----------------------------------------------|
| `AmbientPlayer.tsx`| ACTIVE  | Floating ॐ button + ambient music player     |
| `Navbar.tsx`       | ACTIVE  | Fixed top navigation bar                     |
| `Footer.tsx`       | ACTIVE  | Page footer with hashtag and credits         |
| `PageWrapper.tsx`  | ACTIVE  | Scroll-to-top + page transition wrapper      |
| `ThemeToggle.tsx`  | INACTIVE| Light/dark toggle — kept, not rendered       |

---

## AmbientPlayer.tsx — Deep Documentation

**Audio file:** `public/audio/sangeet.mp3` (5.1MB — EXISTS ✅)
**Hook:** `useAudioPlayer` from `@shared/hooks`
**Position:** `fixed bottom-6 left-6 z-40`

### Current Autoplay Strategy (as of 2026-05-24)
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
| State         | Visual                                              |
|---------------|-----------------------------------------------------|
| Loading       | Spinning gold border ring around button             |
| Active+unmuted| Gold glow border + pulsing ring + ॐ glows gold      |
| Muted/paused  | Dim gold ॐ, no glow                                |
| Error         | `cursor-not-allowed opacity-40`                     |
| Pill (shown when isPlaying + isLoaded) | Shows "Tap to unmute" or "Ambient Music" + mute button |

---

## Navbar.tsx — Key Notes

- **Fixed top, z-30** — always visible
- **Transparent** on hero section → `bg-divine/95 backdrop-blur` on scroll + all other pages
- Uses `useMotionTemplate` (NOT `.get()`) for reactive MotionValue background — this is critical
- Nav anchor links use `<a href="/#section-id">` — NOT React Router `<Link>` (Link causes full reload on anchor nav)
- Desktop: inline links | Mobile: hamburger → drawer
- **ThemeToggle removed** — do not add back without explicit instruction

### Z-index Hierarchy
```
z-20 — page content
z-30 — Navbar
z-40 — AmbientPlayer (fixed bottom-left)
z-50 — Mobile nav drawer
z-60 — Modals / overlays
```

---

## Footer.tsx

- Shows hashtag `#RohitWedsPriti`
- "Made with ❤️" credits line
- No nav links (hashtag only)

---

## PageWrapper.tsx

- Wraps all non-Home pages (ceremony pages)
- Scrolls to top on route change via `useEffect` watching `location.pathname`
- Applies page entrance animation via Framer Motion
- Does NOT wrap Home page (Home handles its own sections)
