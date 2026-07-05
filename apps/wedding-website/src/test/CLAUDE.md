# CLAUDE.md — apps/wedding-website/src/test/

# Last updated: 2026-06-14

## Files

| File                     | Purpose                                                 |
| ------------------------ | ------------------------------------------------------- |
| `setup.ts`               | Vitest setup: mock framer-motion, i18next, lucide-react |
| `setup.tsx`              | Alternative setup with JSX — used when setup needs JSX  |
| `useAudioPlayer.test.ts` | Unit tests for `useAudioPlayer` hook                    |
| `AmbientPlayer.test.tsx` | Component tests for `AmbientPlayer`                     |

## Test Stack

- **Runner:** Vitest
- **Environment:** jsdom (browser-like DOM in Node)
- **Component testing:** React Testing Library (`@testing-library/react`)
- **Run command:** `npm run test` (from `apps/wedding-website/`)

## Global Mocks (set up in setup.ts)

| Mocked Module   | Reason                                                    |
| --------------- | --------------------------------------------------------- |
| `framer-motion` | Animations use timers that conflict with test environment |
| `i18next`       | Returns key as-is — no real translation in tests          |
| `lucide-react`  | SVG icons cause jsdom warnings — mocked to `<span>`       |

## Writing New Tests

```ts
// Component test pattern
import { render, screen } from '@testing-library/react'
import { AmbientPlayer } from '@app/components/layout/AmbientPlayer'

test('renders mute button', () => {
  render(<AmbientPlayer />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

```ts
// Hook test pattern
import { renderHook, act } from '@testing-library/react'
import { useAudioPlayer } from '@shared/hooks'

test('starts muted', () => {
  const { result } = renderHook(() => useAudioPlayer('/audio/test.mp3', { startMuted: true }))
  expect(result.current.isMuted).toBe(true)
})
```

## What to Test

- Hooks: state transitions, cleanup on unmount, error states
- Components: renders without crash, key accessible elements, conditional rendering
- Do NOT test animation values or CSS class names — those are visual, not behavioral

## TypeScript Config

Tests use `tsconfig.test.json` which extends the app tsconfig.
Test files are excluded from the production build via `tsconfig.json` `exclude`.
