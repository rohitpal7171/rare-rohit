import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCountdown } from '@shared/hooks'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

// ── Initial values ────────────────────────────────────────────────────────────

describe('useCountdown — initial values', () => {
  it('returns correct days/hours/minutes/seconds for a future date', () => {
    // Current: 2026-01-01 00:00:00 UTC
    // Target:  2026-01-02 12:30:45 UTC  → 1d 12h 30m 45s
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-01-02T12:30:45.000Z'))

    expect(result.current.days).toBe(1)
    expect(result.current.hours).toBe(12)
    expect(result.current.minutes).toBe(30)
    expect(result.current.seconds).toBe(45)
    expect(result.current.isExpired).toBe(false)
  })

  it('returns zeros and isExpired=true when target is in the past', () => {
    vi.setSystemTime(new Date('2027-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-11-26T09:00:00.000Z'))

    expect(result.current.days).toBe(0)
    expect(result.current.hours).toBe(0)
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(0)
    expect(result.current.isExpired).toBe(true)
  })

  it('returns zeros and isExpired=true when target equals current time', () => {
    vi.setSystemTime(new Date('2026-11-26T09:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-11-26T09:00:00.000Z'))

    expect(result.current.isExpired).toBe(true)
  })
})

// ── Tick behaviour ────────────────────────────────────────────────────────────

describe('useCountdown — tick behaviour', () => {
  it('decrements seconds by 1 after 1000ms', () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-01-01T00:00:10.000Z'))

    expect(result.current.seconds).toBe(10)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.seconds).toBe(9)
  })

  it('carries over from seconds to minutes correctly', () => {
    // 1 minute and 1 second away
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-01-01T00:01:01.000Z'))

    expect(result.current.minutes).toBe(1)
    expect(result.current.seconds).toBe(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.minutes).toBe(1)
    expect(result.current.seconds).toBe(0)

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.minutes).toBe(0)
    expect(result.current.seconds).toBe(59)
  })

  it('sets isExpired=true once target is reached', () => {
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const { result } = renderHook(() => useCountdown('2026-01-01T00:00:01.000Z'))

    expect(result.current.isExpired).toBe(false)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(result.current.isExpired).toBe(true)
  })
})

// ── Cleanup ───────────────────────────────────────────────────────────────────

describe('useCountdown — cleanup', () => {
  it('clears interval on unmount', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const { unmount } = renderHook(() => useCountdown('2026-12-31T00:00:00.000Z'))
    unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
