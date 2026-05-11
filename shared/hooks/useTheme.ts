import { useCallback, useEffect, useReducer } from 'react'

import { useLocalStorage } from './useLocalStorage'

export type Theme = 'diya' | 'night'

interface ThemeState {
  theme: Theme
  isTransitioning: boolean
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TRANSITION_START' }
  | { type: 'TRANSITION_END' }

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'TRANSITION_START':
      return { ...state, isTransitioning: true }
    case 'TRANSITION_END':
      return { ...state, isTransitioning: false }
  }
}

export interface UseThemeReturn {
  theme: Theme
  isDiya: boolean
  isNight: boolean
  isTransitioning: boolean
  setTheme: (t: Theme) => void
  toggleTheme: () => void
}

export const useTheme = (): UseThemeReturn => {
  const [stored, setStored] = useLocalStorage<Theme>('theme', 'diya')
  const [state, dispatch] = useReducer(themeReducer, {
    theme: stored,
    isTransitioning: false,
  })

  // Apply data-theme attribute to <html> and persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
    setStored(state.theme)
  }, [state.theme, setStored])

  // Sync on mount in case localStorage had a different value
  useEffect(() => {
    dispatch({ type: 'SET_THEME', payload: stored })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setTheme = useCallback((t: Theme) => {
    dispatch({ type: 'TRANSITION_START' })
    dispatch({ type: 'SET_THEME', payload: t })
    // Short delay so CSS transition completes before removing the class
    setTimeout(() => dispatch({ type: 'TRANSITION_END' }), 400)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(state.theme === 'diya' ? 'night' : 'diya')
  }, [state.theme, setTheme])

  return {
    theme: state.theme,
    isDiya: state.theme === 'diya',
    isNight: state.theme === 'night',
    isTransitioning: state.isTransitioning,
    setTheme,
    toggleTheme,
  }
}
