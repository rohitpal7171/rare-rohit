import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // No external error reporting configured — errors surface via getDerivedStateFromError
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
