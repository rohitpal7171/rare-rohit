# CLAUDE.md — public/audio/

# Last updated: 2026-06-14

## Audio Files

| File          | Status     | Used By                            | Notes                     |
| ------------- | ---------- | ---------------------------------- | ------------------------- |
| `sangeet.mp3` | EXISTS ✅  | AmbientPlayer (global background)  | 5.1MB, loops continuously |
| `haldi.mp3`   | MISSING ❌ | CeremonyMusicPlayer (Haldi page)   | Needed before launch      |
| `mehendi.mp3` | MISSING ❌ | CeremonyMusicPlayer (Mehendi page) | Needed before launch      |
| `baraat.mp3`  | MISSING ❌ | CeremonyMusicPlayer (Baraat page)  | Needed before launch      |
| `pheras.mp3`  | MISSING ❌ | CeremonyMusicPlayer (Pheras page)  | Needed before launch      |
| `vidaai.mp3`  | MISSING ❌ | CeremonyMusicPlayer (Vidaai page)  | Needed before launch      |

## Format Requirements

- Format: MP3 (broadest browser support)
- Bitrate: 128kbps is enough for ambient background music
- Max size per file: ~8MB
- Must loop cleanly — trim silence at start/end before adding

## How Audio Is Referenced

```ts
// Always root-relative URL — never import or require audio files
const src = '/audio/sangeet.mp3'
```

`CeremonyMusicPlayer.tsx` uses `useAudioPlayer(src)` where `src` is built from ceremony slug:

```ts
const src = `/audio/${slug}.mp3`
```

Until the MP3 file exists, `CeremonyMusicPlayer` renders nothing / shows an error state gracefully.
