import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AmbientPlayer } from '../components/layout/AmbientPlayer'

vi.mock('@shared/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}))

const mockPlay = vi.fn()
const mockToggle = vi.fn()
const mockToggleMute = vi.fn()

const defaultState = {
  isPlaying: false,
  isMuted: false,
  isLoaded: false,
  hasError: false,
  volume: 0.3,
  play: mockPlay,
  pause: vi.fn(),
  toggle: mockToggle,
  toggleMute: mockToggleMute,
  setVolume: vi.fn(),
  seek: vi.fn(),
}

let hookState = { ...defaultState }

vi.mock('@shared/hooks', () => ({
  useAudioPlayer: () => hookState,
}))

beforeEach(() => {
  hookState = { ...defaultState, play: mockPlay, toggle: mockToggle, toggleMute: mockToggleMute }
  mockPlay.mockReset()
  mockToggle.mockReset()
  mockToggleMute.mockReset()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

// ── Rendering ─────────────────────────────────────────────────────────────────

describe('AmbientPlayer — rendering', () => {
  it('renders the OM button', () => {
    render(React.createElement(AmbientPlayer))
    expect(screen.getByRole('button', { name: /play ambient music/i })).toBeInTheDocument()
  })

  it('shows OM symbol', () => {
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('ॐ')).toBeInTheDocument()
  })

  it('button is disabled when hasError=true', () => {
    hookState = { ...hookState, hasError: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByRole('button', { name: /play ambient music/i })).toBeDisabled()
  })

  it('shows audio.ambientMusic key when playing unmuted', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: false }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('audio.ambientMusic')).toBeInTheDocument()
  })

  it('shows audio.tapToUnmute key when playing muted', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('audio.tapToUnmute')).toBeInTheDocument()
  })

  it('does not show pill when not playing', () => {
    hookState = { ...hookState, isPlaying: false, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.queryByText('audio.ambientMusic')).not.toBeInTheDocument()
  })

  it('shows mute toggle button inside pill when playing', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: false }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByRole('button', { name: /mute/i })).toBeInTheDocument()
  })
})

// ── First-interaction triggers ────────────────────────────────────────────────

describe('AmbientPlayer — first interaction triggers play', () => {
  it('does NOT call play() without any user interaction', () => {
    render(React.createElement(AmbientPlayer))
    act(() => {
      vi.advanceTimersByTime(10_000)
    })
    expect(mockPlay).not.toHaveBeenCalled()
  })

  it('calls play() on document click', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('calls play() on document touchstart', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.touchStart(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('does NOT call play() on scroll (scroll is not a registered trigger)', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.scroll(document)
    expect(mockPlay).not.toHaveBeenCalled()
  })

  it('only calls play() once for multiple interactions', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    fireEvent.touchStart(document)
    fireEvent.click(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })
})

// ── 300ms unmute timer ────────────────────────────────────────────────────────

describe('AmbientPlayer — 300ms unmute after first interaction', () => {
  it('does NOT call toggleMute() before 300ms', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(mockToggleMute).not.toHaveBeenCalled()
  })

  it('calls toggleMute() exactly at 300ms after first interaction', () => {
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(mockToggleMute).toHaveBeenCalledTimes(1)
  })

  it('does NOT call toggleMute() without any interaction even after 300ms', () => {
    render(React.createElement(AmbientPlayer))
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(mockToggleMute).not.toHaveBeenCalled()
  })
})

// ── Button interactions ───────────────────────────────────────────────────────

describe('AmbientPlayer — button interactions', () => {
  it('OM button calls toggle() after first interaction is established', () => {
    render(React.createElement(AmbientPlayer))
    // Establish first interaction via document (not the button itself)
    fireEvent.click(document.body)
    // Now the OM button click should call toggle()
    fireEvent.click(screen.getByRole('button', { name: /play ambient music/i }))
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  it('mute button calls toggleMute()', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: false }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(screen.getByRole('button', { name: /mute/i }))
    expect(mockToggleMute).toHaveBeenCalledTimes(1)
  })
})
