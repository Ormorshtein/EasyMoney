import { useState } from 'react'
import { Heart, ChevronRight } from 'lucide-react'

const GENDER_OPTIONS = [
  { value: 'boy',     label: 'Boy',            emoji: '👦' },
  { value: 'girl',    label: 'Girl',           emoji: '👧' },
  { value: 'unknown', label: "Don't know yet", emoji: '🤫' },
]

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  function handleNameSubmit(e) {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    setError('')
    setStep(2)
  }

  function handleDateSubmit(e) {
    e.preventDefault()
    if (!date) { setError('Please enter a date.'); return }
    if (new Date(date) > new Date()) { setError('Date cannot be in the future.'); return }
    setError('')
    setStep(3)
  }

  function handleGenderSelect(value) {
    onComplete(name.trim(), date, value)
  }

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-sm p-8 max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-rose-100 p-4 rounded-full">
            <Heart className="text-rose-500" size={40} fill="#f43f5e" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Pregnancy Companion</h1>
        <p className="text-gray-500 text-sm mb-8">Your personal guide through every week of pregnancy.</p>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${step === s ? 'w-6 bg-rose-500' : 'w-2 bg-rose-200'}`}
            />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleNameSubmit} className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">What's your name?</label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder="e.g. Sarah"
              autoFocus
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-300 mb-2"
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <p className="text-xs text-gray-400 mb-6">We'll use this to greet you.</p>
            <button
              type="submit"
              className="w-full bg-rose-500 text-white font-semibold py-3 rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight size={18} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleDateSubmit} className="text-left">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First day of your last period
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setError('') }}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-300 mb-2"
            />
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <p className="text-xs text-gray-400 mb-6">
              Used to calculate your pregnancy week. You can update it later.
            </p>
            <button
              type="submit"
              className="w-full bg-rose-500 text-white font-semibold py-3 rounded-xl hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
            >
              Continue <ChevronRight size={18} />
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-left">
            <p className="text-sm font-medium text-gray-700 mb-4 text-center">Do you know the gender?</p>
            <div className="flex flex-col gap-3 mb-4">
              {GENDER_OPTIONS.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  onClick={() => handleGenderSelect(value)}
                  className="flex items-center gap-4 border border-gray-200 rounded-xl px-4 py-3 hover:border-rose-300 hover:bg-rose-50 transition-colors text-left"
                >
                  <span className="text-3xl">{emoji}</span>
                  <span className="font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => onComplete(name.trim(), date, null)}
              className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
            >
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
