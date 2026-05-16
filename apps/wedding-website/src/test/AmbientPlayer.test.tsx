import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AmbientPlayer } from '../components/layout/AmbientPlayer'

// ── Mock @shared/utils ────────────────────────────────────────────────────
vi.mock('@shared/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}))

// ── Mock @shared/hooks ────────────────────────────────────────────────────
const mockPlay       = vi.fn()
const mockToggle     = vi.fn()
const mockToggleMute = vi.fn()

const defaultState = {
  isPlaying: false, isMuted: false, isLoaded: false, hasError: false, volume: 0.2,
  play: mockPlay, pause: vi.fn(), toggle: mockToggle,
  toggleMute: mockToggleMute, setVolume: vi.fn(), seek: vi.fn(),
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

describe('AmbientPlayer — rendering', () => {
  it('renders the OM button', () => {
    render(React.createElement(AmbientPlayer))
    expect(screen.getByRole('button', { name: /play ambient music/i })).toBeInTheDocument()
  })

  it('shows OM symbol', () => {
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('ॐ')).toBeInTheDocument()
  })

  it('does not render after dismissed', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: false }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByText('ॐ')).not.toBeInTheDocument()
  })

  it('button is disabled when hasError=true', () => {
    hookState = { ...hookState, hasError: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByRole('button', { name: /play ambient music/i })).toBeDisabled()
  })

  it('shows Ambient Music when playing unmuted', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: false }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('Ambient Music')).toBeInTheDocument()
  })

  it('shows Tap to unmute when playing muted', () => {
    hookState = { ...hookState, isPlaying: true, isLoaded: true, isMuted: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.getByText('Tap to unmute')).toBeInTheDocument()
  })

  it('does not show pill when not playing', () => {
    hookState = { ...hookState, isPlaying: false, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    expect(screen.queryByText('Ambient Music')).not.toBeInTheDocument()
  })
})

describe('AmbientPlayer — autoplay', () => {
  it('does NOT call play() before loaded', () => {
    hookState = { ...hookState, isLoaded: false }
    render(React.createElement(AmbientPlayer))
    act(() => { vi.advanceTimersByTime(5000) })
    expect(mockPlay).not.toHaveBeenCalled()
  })

  it('calls play() after exactly 3 seconds', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    act(() => { vi.advanceTimersByTime(2999) })
    expect(mockPlay).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(1) })
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('does not call play() twice when interaction fires first', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    act(() => { vi.advanceTimersByTime(1000) })
    fireEvent.click(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
    act(() => { vi.advanceTimersByTime(3000) })
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })
})

describe('AmbientPlayer — interaction triggers', () => {
  it('plays on click', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('plays on scroll', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.scroll(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('plays on keydown', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.keyDown(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('plays on touchstart', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.touchStart(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('plays on mousemove', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.mouseMove(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })

  it('only calls play() once for multiple events', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    fireEvent.scroll(document)
    fireEvent.keyDown(document)
    expect(mockPlay).toHaveBeenCalledTimes(1)
  })
})

describe('AmbientPlayer — muted fallback', () => {
  it('calls toggleMute() when playing muted and user interacts', () => {
    hookState = { ...hookState, isPlaying: true, isMuted: true, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    expect(mockToggleMute).toHaveBeenCalledTimes(1)
  })

  it('does NOT call toggleMute() when already unmuted', () => {
    hookState = { ...hookState, isPlaying: true, isMuted: false, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    expect(mockToggleMute).not.toHaveBeenCalled()
  })

  it('does NOT call toggleMute() when not playing', () => {
    hookState = { ...hookState, isPlaying: false, isMuted: true, isLoaded: true }
    render(React.createElement(AmbientPlayer))
    fireEvent.click(document)
    expect(mockToggleMute).not.toHaveBeenCalled()
  })
})

describe('AmbientPlayer — button interactions', () => {
  it('OM button calls toggle()', () => {
    hookState = { ...hookState, isLoaded: true }
    render(React.createElement(AmbientPlayer))
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
