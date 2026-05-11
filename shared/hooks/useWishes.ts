import { useCallback, useEffect, useRef, useState } from 'react'

export interface Wish {
  id: string
  name: string
  message: string
  language: 'en' | 'hi'
  createdAt: string  // ISO timestamp
}

export interface UseWishesReturn {
  wishes: Wish[]
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
  submitWish: (wish: Omit<Wish, 'id' | 'createdAt'>) => Promise<boolean>
  refresh: () => void
}

// ── JSONBin configuration ─────────────────────────────────────────────────
// Set VITE_JSONBIN_BIN_ID and VITE_JSONBIN_API_KEY in .env
// Free tier at jsonbin.io — stores a JSON array, appended on each wish
const BIN_URL = () =>
  `https://api.jsonbin.io/v3/b/${import.meta.env['VITE_JSONBIN_BIN_ID'] ?? ''}`
const API_KEY = () => import.meta.env['VITE_JSONBIN_API_KEY'] ?? ''

const CACHE_KEY = 'wishes_cache'
const CACHE_TTL_MS = 60_000 // 1 minute — re-fetch at most once per minute

export const useWishes = (): UseWishesReturn => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastFetchRef = useRef<number>(0)

  const fetchWishes = useCallback(async (force = false) => {
    const now = Date.now()

    // Return cached data if still fresh
    if (!force && now - lastFetchRef.current < CACHE_TTL_MS) {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached !== null) {
        try {
          setWishes(JSON.parse(cached) as Wish[])
          return
        } catch { /* ignore parse error, re-fetch */ }
      }
    }

    if (API_KEY() === '' || import.meta.env['VITE_JSONBIN_BIN_ID'] === undefined) {
      // Dev mode: show mock wishes if no API key configured
      setWishes(MOCK_WISHES)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${BIN_URL()}/latest`, {
        headers: {
          'X-Master-Key': API_KEY(),
          'X-Access-Key': API_KEY(),
        },
      })

      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)

      const data = await res.json() as { record: Wish[] }
      const fetched = Array.isArray(data.record) ? data.record : []
      setWishes(fetched)
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(fetched))
      lastFetchRef.current = now
    } catch (err) {
      console.error('useWishes fetch error:', err)
      setError('Could not load wishes. Please refresh.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const submitWish = useCallback(async (wish: Omit<Wish, 'id' | 'createdAt'>): Promise<boolean> => {
    setIsSubmitting(true)
    setError(null)

    const newWish: Wish = {
      ...wish,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    // Optimistic update
    const updated = [newWish, ...wishes]
    setWishes(updated)
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(updated))

    if (API_KEY() === '' || import.meta.env['VITE_JSONBIN_BIN_ID'] === undefined) {
      // Dev mode: just show optimistic update
      setIsSubmitting(false)
      return true
    }

    try {
      const res = await fetch(BIN_URL(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY(),
          'X-Bin-Versioning': 'false',
        },
        body: JSON.stringify(updated),
      })

      if (!res.ok) throw new Error(`Submit failed: ${res.status}`)

      lastFetchRef.current = Date.now()
      return true
    } catch (err) {
      console.error('useWishes submit error:', err)
      // Revert optimistic update on error
      setWishes(wishes)
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(wishes))
      setError('Could not save wish. Please try again.')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [wishes])

  useEffect(() => {
    void fetchWishes()
  }, [fetchWishes])

  return {
    wishes,
    isLoading,
    isSubmitting,
    error,
    submitWish,
    refresh: () => void fetchWishes(true),
  }
}

// ── Mock data for dev (no API key required) ───────────────────────────────
const MOCK_WISHES: Wish[] = [
  {
    id: '1',
    name: 'Sharma Uncle',
    message: 'Bahut bahut badhai ho! May your life together be filled with love, laughter and prosperity. Khush raho, abaad raho! 🙏',
    language: 'hi',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    name: 'Priya Didi',
    message: 'Wishing you both a lifetime of happiness. You make such a beautiful couple! Can\'t wait to celebrate with you. 💛',
    language: 'en',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '3',
    name: 'Ravi Bhaiya',
    message: 'Rohit aur Priti ji, aap dono ko hamare dil se ashirwad. Bhagwan aap ko har khushi de. 🌸',
    language: 'hi',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
]
