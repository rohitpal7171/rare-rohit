import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

// Detects Vite chunk-load failures caused by stale HTML referencing old content-hash chunk URLs.
// This happens when Netlify deploys a new build but the browser served a cached index.html.
const isChunkLoadError = (error: Error): boolean =>
  error.message.includes('Failed to fetch dynamically imported module') ||
  error.message.includes('Importing a module script failed') ||
  error.name === 'ChunkLoadError'

// Prevent reload loops: only auto-reload once per tab session.
const CHUNK_RELOAD_KEY = 'chunk-reload-attempted'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, _info: ErrorInfo): void {
    if (isChunkLoadError(error)) {
      const alreadyReloaded = sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1'
      if (!alreadyReloaded) {
        sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
        window.location.reload()
        return
      }
    }
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mandala-bg flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <span aria-hidden="true" className="font-hindi text-5xl text-gold">
            ॐ
          </span>
          <h2 className="font-display text-2xl font-bold text-gold">Something didn't load</h2>
          <p className="font-body text-sm text-ivory/60">
            A connection hiccup occurred. Please refresh the page.
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.reload()
            }}
            className="rounded-full border border-gold/40 px-6 py-2 font-body text-sm text-gold transition-colors hover:border-gold hover:bg-gold/10"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
