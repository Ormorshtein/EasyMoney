import { useState } from 'react'
import { calculateWeek } from '../utils/pregnancy'
import { commonSymptoms, symptomAdvice } from '../data/symptoms'
import { Plus, X, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Symptoms({ lastPeriodDate }) {
  const { theme } = useTheme()
  const week = calculateWeek(lastPeriodDate)
  const storageKey = `symptoms_week_${week}`
  const [logged, setLogged] = useState(() => JSON.parse(localStorage.getItem(storageKey) || '[]'))
  const [expanded, setExpanded] = useState(null)
  const [showPicker, setShowPicker] = useState(false)

  function addSymptom(symptom) {
    if (logged.includes(symptom)) return
    const updated = [...logged, symptom]
    setLogged(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    setShowPicker(false)
  }

  function removeSymptom(symptom) {
    const updated = logged.filter((s) => s !== symptom)
    setLogged(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
    if (expanded === symptom) setExpanded(null)
  }

  return (
    <div className={`min-h-screen ${theme.pageBg} transition-colors duration-300 p-5 max-w-lg mx-auto`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Symptom Tracker</h1>
      <p className="text-sm text-gray-400 mb-5">Week {week} — log what you're feeling</p>

      {logged.length === 0 && !showPicker && (
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm mb-4">
          <p className="text-gray-400 text-sm">No symptoms logged this week.</p>
        </div>
      )}

      <div className="flex flex-col gap-3 mb-4">
        {logged.map((symptom) => {
          const advice = symptomAdvice[symptom]
          const isExpanded = expanded === symptom
          return (
            <div key={symptom} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <button className="flex-1 text-left font-medium text-gray-800 text-sm" onClick={() => setExpanded(isExpanded ? null : symptom)}>
                  {symptom}
                </button>
                <button onClick={() => setExpanded(isExpanded ? null : symptom)}>
                  {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                <button onClick={() => removeSymptom(symptom)}>
                  <X size={16} className="text-gray-300 hover:text-red-400 transition-colors" />
                </button>
              </div>
              {isExpanded && advice && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2">
                  <div className={`${theme.accentLight} rounded-xl p-3`}>
                    <p className={`text-xs font-semibold ${theme.accentLightText} mb-1`}>What helps</p>
                    <p className="text-sm text-gray-600">{advice.tip}</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 flex gap-2">
                    <AlertCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-600 mb-1">See a doctor if</p>
                      <p className="text-sm text-gray-600">{advice.seeDoctor}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showPicker ? (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-gray-700 text-sm">Select a symptom</p>
            <button onClick={() => setShowPicker(false)}>
              <X size={16} className="text-gray-400" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.filter((s) => !logged.includes(s)).map((s) => (
              <button key={s} onClick={() => addSymptom(s)}
                className={`text-xs ${theme.tagBg} ${theme.tagText} px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button onClick={() => setShowPicker(true)}
          className={`w-full ${theme.accentBg} ${theme.accentHover} text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors`}>
          <Plus size={18} />
          Log a symptom
        </button>
      )}
    </div>
  )
}
