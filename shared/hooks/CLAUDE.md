# CLAUDE.md — shared/hooks/
# Last updated: 2026-05-24

## Hooks in This Folder

| File                   | Export              | Purpose                                        |
|------------------------|---------------------|------------------------------------------------|
| `useAudioPlayer.ts`    | `useAudioPlayer`    | Full-featured HTML5 audio controller           |
| `useCountdown.ts`      | `useCountdown`      | Days/hours/minutes/seconds until target date   |
| `useScrollAnimation.ts`| `useScrollAnimation`| IntersectionObserver-based inView detection    |
| `useLocalStorage.ts`   | `useLocalStorage`   | Typed localStorage with SSR safety             |
| `useMediaQuery.ts`     | `useMediaQuery`     | Reactive breakpoint detection                  |
| `useTheme.ts`          | `useTheme`          | Dark/light toggle — INACTIVE (kept for future) |
| `useWishes.ts`         | `useWishes`         | JSONBin CRUD for WishesWall                    |
| `index.ts`             | —                   | Barrel exports — import from here only         |

---

## useAudioPlayer — Full Documentation

**File:** `useAudioPlayer.ts`
**Used by:** `AmbientPlayer.tsx`, `CeremonyMusicPlayer.tsx`

### Audio Cache Architecture
```ts
// Module-level cache — ONE Audio element per src, never created twice
const audioCache = new Map<string, HTMLAudioElement>()
```
- Cache persists for the browser session
- On HMR in dev: cache survives, which is expected
- On page refresh: cache is cleared
- Prevents double-download when two components use same src

### Options
```ts
interface UseAudioPlayerOptions {
  startMuted?: boolean      // default: false
  loop?: boolean            // default: true
  initialVolume?: number    // default: 0.6
}
```

### Return Value
```ts
interface UseAudioPlayerReturn {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  isLoaded: boolean         // true when 'canplay' event fires
  hasError: boolean         // true when audio fails — play() becomes a no-op
  play: () => void          // muted fallback if browser blocks unmuted play
  pause: () => void
  toggle: () => void
  toggleMute: () => void
  setVolume: (v: number) => void
  seek: (seconds: number) => void
}
```

### play() Behaviour
```
play() called
  → if hasError: return immediately (no-op)
  → audioRef.current.play() [unmuted attempt]
    → success: setIsPlaying(true)
    → browser blocks: audioRef.current.muted = true, setIsMuted(true)
      → retry play() [muted]
        → success: setIsPlaying(true) [muted]
        → fails again: setHasError(true)
```
**Critical:** Once `hasError` is true, the button is permanently disabled for this session.
Only way to recover: page refresh (clears audio cache).

### Important: Why We Don't Call play() on Mount
Browser autoplay policy requires a user gesture before unmuted play.
Calling `play()` immediately on mount → browser blocks → retry muted → if muted also fails (some strict browsers) → `hasError = true` → button disabled forever.

**Correct pattern:** Wait for `click` or `touchstart`, then call `play()` — see `AmbientPlayer.tsx`.

### Event Listeners Managed by Hook
- `canplay` → setIsLoaded(true)
- `error` → setHasError(true), setIsLoaded(false)
- `ended` → setIsPlaying(false) (only when loop=false)
- `play` → setIsPlaying(true)
- `pause` → setIsPlaying(false)

All listeners cleaned up on unmount.

---

## useCountdown

```ts
const { days, hours, minutes, seconds } = useCountdown(targetDate: string)
// targetDate: ISO date string e.g. '2026-11-26T09:00:00+05:30'
// Updates every second via setInterval
// Returns zeros when target date is passed
```

---

## useScrollAnimation

```ts
const { ref, inView } = useScrollAnimation({ threshold?: number, rootMargin?: string })
// Attach ref to any DOM element
// inView becomes true when element enters viewport
// Used by AnimatedSection component
```

---

## useLocalStorage

```ts
const [value, setValue] = useLocalStorage<T>(key: string, initialValue: T)
// Typed generic — provide T for full type safety
// SSR-safe: checks for window before accessing localStorage
// Falls back to initialValue if key doesn't exist or JSON.parse fails
```

---

## useMediaQuery

```ts
const isMobile = useMediaQuery('(max-width: 768px)')
const isTablet = useMediaQuery('(max-width: 1024px)')
// Reactive — updates on window resize
// Uses matchMedia API
```

---

## useWishes

```ts
const { wishes, addWish, isLoading, error } = useWishes()
// Reads/writes to JSONBin via JSONBIN_BIN_ID + JSONBIN_API_KEY from import.meta.env
// Requires .env setup — not functional until JSONBin account created
// See context/TODO.md for setup steps
```

---

## Rules for This Folder

- Every hook starts with `use` prefix
- Fully typed return values — no `any`
- Clean up ALL side effects in useEffect return
- Export everything from `index.ts` barrel — never deep-import
- No app-specific logic — hooks must be generic and reusable
