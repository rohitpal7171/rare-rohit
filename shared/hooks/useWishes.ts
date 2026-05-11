import { useCallback, useEffect, useRef, useState } from 'react'

export interface Wish {
  id: string
  name: string
  message: string
  language: 'en' | 'hi'
  createdAt: string
}

export interface UseWishesReturn {
  wishes: Wish[]
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
  submitWish: (wish: Omit<Wish, 'id' | 'createdAt'>) => Promise<boolean>
  refresh: () => void
}

// Vite injects import.meta.env — typed via /// <reference types="vite/client" />
// which is included in tsconfig via "types": ["vite/client"] in tsconfig.json
const getBinUrl = () =>
  `https://api.jsonbin.io/v3/b/${(import.meta.env['VITE_JSONBIN_BIN_ID'] as string | undefined) ?? ''}`
const getApiKey = () =>
  (import.meta.env['VITE_JSONBIN_API_KEY'] as string | undefined) ?? ''

const CACHE_KEY = 'wishes_cache'
const CACHE_TTL_MS = 60_000

export const useWishes = (): UseWishesReturn => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastFetchRef = useRef<number>(0)

  const fetchWishes = useCallback(async (force = false) => {
    const now = Date.now()

    if (!force && now - lastFetchRef.current < CACHE_TTL_MS) {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached !== null) {
        try {
          setWishes(JSON.parse(cached) as Wish[])
          return
        } catch { /* ignore, re-fetch */ }
      }
    }

    const apiKey = getApiKey()
    const binId = (import.meta.env['VITE_JSONBIN_BIN_ID'] as string | undefined)
    if (apiKey === '' || binId === undefined || binId === '') {
      setWishes(MOCK_WISHES)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(`${getBinUrl()}/latest`, {
        headers: {
          'X-Master-Key': apiKey,
          'X-Access-Key': apiKey,
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

    const updated = [newWish, ...wishes]
    setWishes(updated)
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(updated))

    const apiKey = getApiKey()
    const binId = (import.meta.env['VITE_JSONBIN_BIN_ID'] as string | undefined)
    if (apiKey === '' || binId === undefined || binId === '') {
      setIsSubmitting(false)
      return true
    }

    try {
      const res = await fetch(getBinUrl(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': apiKey,
          'X-Bin-Versioning': 'false',
        },
        body: JSON.stringify(updated),
      })
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`)
      lastFetchRef.current = Date.now()
      return true
    } catch (err) {
      console.error('useWishes submit error:', err)
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

  return { wishes, isLoading, isSubmitting, error, submitWish, refresh: () => void fetchWishes(true) }
}

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
    message: "Wishing you both a lifetime of happiness. You make such a beautiful couple! Can't wait to celebrate with you. 💛",
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
