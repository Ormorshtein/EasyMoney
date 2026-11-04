import { createContext, useContext, useState } from 'react'

export const THEMES = {
  rose:   { id: 'rose',   name: 'Rose',   swatch: '#f43f5e', pageBg: 'bg-rose-50',   cardGrad: 'bg-gradient-to-br from-rose-400 to-rose-600',     cardMuted: 'text-rose-100',   cardBorder: 'border-rose-300/50',   accent: 'text-rose-500',   accentBg: 'bg-rose-500',   accentHover: 'hover:bg-rose-600',   accentLight: 'bg-rose-50',   accentLightText: 'text-rose-600',   ring: 'focus:ring-rose-200',   progress: 'bg-rose-400',   check: 'text-rose-400',   tagBg: 'bg-rose-50',   tagText: 'text-rose-500',   navActive: 'text-rose-500' },
  blue:   { id: 'blue',   name: 'Blue',   swatch: '#3b82f6', pageBg: 'bg-blue-50',   cardGrad: 'bg-gradient-to-br from-blue-400 to-blue-600',     cardMuted: 'text-blue-100',   cardBorder: 'border-blue-300/50',   accent: 'text-blue-500',   accentBg: 'bg-blue-500',   accentHover: 'hover:bg-blue-600',   accentLight: 'bg-blue-50',   accentLightText: 'text-blue-600',   ring: 'focus:ring-blue-200',   progress: 'bg-blue-400',   check: 'text-blue-400',   tagBg: 'bg-blue-50',   tagText: 'text-blue-500',   navActive: 'text-blue-500' },
  purple: { id: 'purple', name: 'Purple', swatch: '#a855f7', pageBg: 'bg-purple-50', cardGrad: 'bg-gradient-to-br from-purple-400 to-purple-600', cardMuted: 'text-purple-100', cardBorder: 'border-purple-300/50', accent: 'text-purple-500', accentBg: 'bg-purple-500', accentHover: 'hover:bg-purple-600', accentLight: 'bg-purple-50', accentLightText: 'text-purple-600', ring: 'focus:ring-purple-200', progress: 'bg-purple-400', check: 'text-purple-400', tagBg: 'bg-purple-50', tagText: 'text-purple-500', navActive: 'text-purple-500' },
  green:  { id: 'green',  name: 'Green',  swatch: '#22c55e', pageBg: 'bg-green-50',  cardGrad: 'bg-gradient-to-br from-green-400 to-green-600',   cardMuted: 'text-green-100',  cardBorder: 'border-green-300/50',  accent: 'text-green-500',  accentBg: 'bg-green-500',  accentHover: 'hover:bg-green-600',  accentLight: 'bg-green-50',  accentLightText: 'text-green-600',  ring: 'focus:ring-green-200',  progress: 'bg-green-400',  check: 'text-green-400',  tagBg: 'bg-green-50',  tagText: 'text-green-500',  navActive: 'text-green-500' },
  teal:   { id: 'teal',   name: 'Teal',   swatch: '#14b8a6', pageBg: 'bg-teal-50',   cardGrad: 'bg-gradient-to-br from-teal-400 to-teal-600',     cardMuted: 'text-teal-100',   cardBorder: 'border-teal-300/50',   accent: 'text-teal-500',   accentBg: 'bg-teal-500',   accentHover: 'hover:bg-teal-600',   accentLight: 'bg-teal-50',   accentLightText: 'text-teal-600',   ring: 'focus:ring-teal-200',   progress: 'bg-teal-400',   check: 'text-teal-400',   tagBg: 'bg-teal-50',   tagText: 'text-teal-500',   navActive: 'text-teal-500' },
  orange: { id: 'orange', name: 'Orange', swatch: '#f97316', pageBg: 'bg-orange-50', cardGrad: 'bg-gradient-to-br from-orange-400 to-orange-600', cardMuted: 'text-orange-100', cardBorder: 'border-orange-300/50', accent: 'text-orange-500', accentBg: 'bg-orange-500', accentHover: 'hover:bg-orange-600', accentLight: 'bg-orange-50', accentLightText: 'text-orange-600', ring: 'focus:ring-orange-200', progress: 'bg-orange-400', check: 'text-orange-400', tagBg: 'bg-orange-50', tagText: 'text-orange-500', navActive: 'text-orange-500' },
  amber:  { id: 'amber',  name: 'Amber',  swatch: '#f59e0b', pageBg: 'bg-amber-50',  cardGrad: 'bg-gradient-to-br from-amber-400 to-amber-500',   cardMuted: 'text-amber-100',  cardBorder: 'border-amber-300/50',  accent: 'text-amber-500',  accentBg: 'bg-amber-500',  accentHover: 'hover:bg-amber-600',  accentLight: 'bg-amber-50',  accentLightText: 'text-amber-600',  ring: 'focus:ring-amber-200',  progress: 'bg-amber-400',  check: 'text-amber-400',  tagBg: 'bg-amber-50',  tagText: 'text-amber-500',  navActive: 'text-amber-500' },
  indigo: { id: 'indigo', name: 'Indigo', swatch: '#6366f1', pageBg: 'bg-indigo-50', cardGrad: 'bg-gradient-to-br from-indigo-400 to-indigo-600', cardMuted: 'text-indigo-100', cardBorder: 'border-indigo-300/50', accent: 'text-indigo-500', accentBg: 'bg-indigo-500', accentHover: 'hover:bg-indigo-600', accentLight: 'bg-indigo-50', accentLightText: 'text-indigo-600', ring: 'focus:ring-indigo-200', progress: 'bg-indigo-400', check: 'text-indigo-400', tagBg: 'bg-indigo-50', tagText: 'text-indigo-500', navActive: 'text-indigo-500' },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => localStorage.getItem('appTheme') || 'rose')

  function applyTheme(id) {
    localStorage.setItem('appTheme', id)
    setThemeId(id)
  }

  const theme = THEMES[themeId] || THEMES.rose

  return (
    <ThemeContext.Provider value={{ theme, themeId, applyTheme, themes: Object.values(THEMES) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
