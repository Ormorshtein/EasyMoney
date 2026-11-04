import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Activity, FileText, ShoppingBag, Palette } from 'lucide-react'
import { calculateWeek, calculateDueDate, trimester } from '../utils/pregnancy'
import { getWeekFact } from '../data/weekFacts'
import { useTheme } from '../context/ThemeContext'

const GENDER_OPTIONS = [
  { value: 'boy',     label: 'Boy',            emoji: '👦' },
  { value: 'girl',    label: 'Girl',           emoji: '👧' },
  { value: 'unknown', label: "Don't know yet", emoji: '🤫' },
]

export default function Home({ lastPeriodDate, gender, name, onGenderChange }) {
  const navigate = useNavigate()
  const { theme, themeId, applyTheme, themes } = useTheme()
  const week = calculateWeek(lastPeriodDate)
  const dueDate = calculateDueDate(lastPeriodDate)
  const { size, emoji: fruitEmoji, fact } = getWeekFact(week)
  const [showGenderPicker, setShowGenderPicker] = useState(false)
  const [showPalette, setShowPalette] = useState(false)

  const currentGender = GENDER_OPTIONS.find((g) => g.value === gender)

  const quickLinks = [
    { label: 'Medical Calendar', icon: Calendar,    path: '/calendar',  color: 'bg-blue-50 text-blue-500' },
    { label: 'Symptoms',         icon: Activity,    path: '/symptoms',  color: 'bg-purple-50 text-purple-500' },
    { label: 'Documents',        icon: FileText,    path: '/documents', color: 'bg-green-50 text-green-500' },
    { label: 'Shopping Lists',   icon: ShoppingBag, path: '/shopping',  color: 'bg-yellow-50 text-yellow-500' },
  ]

  return (
    <div className={`min-h-screen ${theme.pageBg} transition-colors duration-300 p-5 max-w-lg mx-auto`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-400 text-sm">Welcome back</p>
          <h1 className="text-2xl font-bold text-gray-800">{name ? `Hi, ${name} 👋` : 'Your Pregnancy'}</h1>
        </div>
        <div className="flex gap-2">
          {/* Palette button */}
          <button
            onClick={() => { setShowPalette(!showPalette); setShowGenderPicker(false) }}
            className="bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Palette size={20} className={theme.accent} />
          </button>
          {/* Gender button */}
          <button
            onClick={() => { setShowGenderPicker(!showGenderPicker); setShowPalette(false) }}
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm text-sm font-medium text-gray-600 hover:shadow-md transition-shadow"
          >
            <span className="text-xl">{currentGender ? currentGender.emoji : '❓'}</span>
            <span className="hidden sm:inline">{currentGender ? currentGender.label : 'Set gender'}</span>
          </button>
        </div>
      </div>

      {/* Color palette */}
      {showPalette && (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <p className="text-sm font-medium text-gray-500 mb-3">Choose app color</p>
          <div className="flex gap-3 flex-wrap">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { applyTheme(t.id); setShowPalette(false) }}
                title={t.name}
                className={`w-9 h-9 rounded-full transition-transform hover:scale-110 ${themeId === t.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                style={{ backgroundColor: t.swatch }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Gender picker */}
      {showGenderPicker && (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <p className="text-sm font-medium text-gray-500 mb-3">Select gender</p>
          <div className="flex flex-col gap-2">
            {GENDER_OPTIONS.map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => { onGenderChange(value); setShowGenderPicker(false) }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-left ${
                  gender === value ? `${theme.accentLight} ${theme.accentLightText}` : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-medium text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Week card */}
      <div className={`${theme.cardGrad} rounded-3xl p-6 text-white mb-5 shadow-md transition-all duration-300`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`${theme.cardMuted} text-sm font-medium`}>{trimester(week)}</p>
            <p className="text-6xl font-bold mt-1">{week}</p>
            <p className={`${theme.cardMuted} text-lg`}>weeks pregnant</p>
          </div>
          <div className="bg-white/20 rounded-2xl p-3 text-5xl leading-none">{fruitEmoji}</div>
        </div>
        <div className={`mt-4 pt-4 border-t ${theme.cardBorder}`}>
          <p className={`${theme.cardMuted} text-xs`}>Due date</p>
          <p className="font-semibold">{dueDate}</p>
        </div>
      </div>

      {/* Baby size card */}
      <div className="bg-white rounded-2xl p-5 mb-5 shadow-sm flex gap-4 items-center">
        <span className="text-6xl">{fruitEmoji}</span>
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Baby this week</p>
          <p className="text-gray-800 font-semibold mb-1">Size of a <span className={theme.accent}>{size}</span></p>
          <p className="text-gray-500 text-sm leading-relaxed">{fact}</p>
        </div>
      </div>

      {/* Quick access */}
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-3">Quick Access</p>
      <div className="grid grid-cols-2 gap-3">
        {quickLinks.map(({ label, icon: Icon, path, color }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-2 text-left hover:shadow-md transition-shadow"
          >
            <div className={`p-2 rounded-xl w-fit ${color}`}>
              <Icon size={20} />
            </div>
            <span className="text-gray-700 text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
