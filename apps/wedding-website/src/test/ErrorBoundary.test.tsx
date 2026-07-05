import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '../components/layout/ErrorBoundary'

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('Test render error')
  return React.createElement('div', null, 'Rendered OK')
}

// React dev mode re-dispatches caught errors to window — prevent jsdom from
// treating them as unhandled and failing the test runner.
const suppressWindowError = (e: ErrorEvent) => {
  e.preventDefault()
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  window.addEventListener('error', suppressWindowError)
})

afterEach(() => {
  window.removeEventListener('error', suppressWindowError)
  vi.restoreAllMocks()
})

describe('ErrorBoundary — normal render', () => {
  it('renders children when no error is thrown', () => {
    render(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(ThrowError, { shouldThrow: false })
      )
    )
    expect(screen.getByText('Rendered OK')).toBeInTheDocument()
  })
})

describe('ErrorBoundary — error fallback', () => {
  it('renders fallback UI when a child throws', () => {
    render(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(ThrowError, { shouldThrow: true })
      )
    )
    expect(screen.getByText("Something didn't load")).toBeInTheDocument()
    expect(screen.getByText(/connection hiccup/i)).toBeInTheDocument()
  })

  it('renders OM symbol in fallback', () => {
    render(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(ThrowError, { shouldThrow: true })
      )
    )
    expect(screen.getByText('ॐ')).toBeInTheDocument()
  })

  it('renders a Refresh Page button in fallback', () => {
    render(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(ThrowError, { shouldThrow: true })
      )
    )
    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument()
  })

  it('Refresh Page button calls window.location.reload', () => {
    const reloadMock = vi.fn()
    vi.stubGlobal('location', { reload: reloadMock })

    render(
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(ThrowError, { shouldThrow: true })
      )
    )
    fireEvent.click(screen.getByRole('button', { name: /refresh page/i }))
    expect(reloadMock).toHaveBeenCalledTimes(1)
  })
})
