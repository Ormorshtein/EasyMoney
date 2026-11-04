import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { calculateWeek, getTestDate, parseLocalDate } from '../utils/pregnancy'
import { medicalTests } from '../data/medicalTests'
import { useTheme } from '../context/ThemeContext'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

function testStatus(test, currentWeek) {
  if (test.week < currentWeek) return 'done'
  if (test.bookBy <= currentWeek) return 'book-now'
  return 'upcoming'
}

export default function Calendar({ lastPeriodDate }) {
  const { theme } = useTheme()
  const today = new Date()
  const currentWeek = calculateWeek(lastPeriodDate)
  const dueDate = useMemo(() => {
    const d = parseLocalDate(lastPeriodDate)
    d.setDate(d.getDate() + 280)
    return d
  }, [lastPeriodDate])

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [expandedTest, setExpandedTest] = useState(null)
  const [filter, setFilter] = useState('all')

  const testsByDateKey = useMemo(() => {
    const map = {}
    medicalTests.forEach((test) => {
      const d = getTestDate(lastPeriodDate, test.week)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map[key]) map[key] = []
      map[key].push(test)
    })
    return map
  }, [lastPeriodDate])

  function dateKey(d) {
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelectedDate(null)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelectedDate(null)
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const startOffset = firstDayOfMonth.getDay()
  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const selectedTests = selectedDate ? (testsByDateKey[dateKey(selectedDate)] || []) : []

  const filteredUpcoming = medicalTests.filter((t) => {
    if (filter === 'upcoming') return testStatus(t, currentWeek) !== 'done'
    if (filter === 'done') return testStatus(t, currentWeek) === 'done'
    return true
  })

  return (
    <div className={`min-h-screen ${theme.pageBg} transition-colors duration-300 p-5 max-w-lg mx-auto`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Medical Calendar</h1>
      <p className="text-sm text-gray-400 mb-5">Week {currentWeek} · tap a marked day to see tests</p>

      {/* Month navigation */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronLeft size={20} className="text-gray-500" />
          </button>
          <div className="text-center">
            <p className="font-bold text-gray-800">{MONTHS[viewMonth]} {viewYear}</p>
            <button onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setSelectedDate(null) }} className={`text-xs ${theme.accent} hover:underline`}>Today</button>
          </div>
          <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
            <ChevronRight size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} />
            const key = dateKey(date)
            const tests = testsByDateKey[key] || []
            const isToday = isSameDay(date, today)
            const isDue = isSameDay(date, dueDate)
            const isSelected = selectedDate && isSameDay(date, selectedDate)
            const hasUrgent = tests.some((t) => t.urgent)
            const hasDone = tests.length > 0 && tests.every((t) => testStatus(t, currentWeek) === 'done')
            const hasBookNow = tests.some((t) => testStatus(t, currentWeek) === 'book-now')

            return (
              <button
                key={key}
                onClick={() => { setSelectedDate(isSelected ? null : date); setExpandedTest(null) }}
                className={`relative flex flex-col items-center py-1.5 rounded-xl transition-colors ${
                  isSelected ? `${theme.accentBg} text-white` : isToday ? `${theme.accentLight} ${theme.accent}` : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <span className={`text-sm font-medium ${isDue && !isSelected ? theme.accent : ''}`}>
                  {date.getDate()}
                </span>
                {isDue && !isSelected && <span className="text-xs leading-none">🍼</span>}
                {tests.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {tests.slice(0, 3).map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-white' : hasDone ? 'bg-green-400' : hasUrgent || hasBookNow ? 'bg-amber-400' : 'bg-blue-400'
                      }`} />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 pt-3 border-t border-gray-50 flex-wrap">
          {[['bg-green-400', 'Done'], ['bg-amber-400', 'Book now'], ['bg-blue-400', 'Upcoming']].map(([cls, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${cls}`} />
              <span className="text-xs text-gray-400">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none">🍼</span>
            <span className="text-xs text-gray-400">Due date</span>
          </div>
        </div>
      </div>

      {/* Selected day tests */}
      {selectedDate && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 mb-3">
            {selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          {selectedTests.length === 0 ? (
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center text-gray-400 text-sm">No tests scheduled on this day.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedTests.map((test) => {
                const s = testStatus(test, currentWeek)
                const isExpanded = expandedTest === test.id
                return (
                  <div key={test.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full p-4 flex items-start gap-3 text-left" onClick={() => setExpandedTest(isExpanded ? null : test.id)}>
                      <div className="mt-0.5">
                        {s === 'done'     && <CheckCircle   size={20} className="text-green-400" />}
                        {s === 'book-now' && <AlertTriangle size={20} className="text-amber-400" />}
                        {s === 'upcoming' && <Clock         size={20} className="text-blue-400"  />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-gray-800 text-sm">{test.name}</p>
                          {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${theme.tagBg} ${theme.tagText}`}>Week {test.week}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${test.coverage === 'HMO covered' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                            {test.coverage}{test.cost ? ` · ${test.cost}` : ''}
                          </span>
                          {test.urgent && <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full">Time-sensitive</span>}
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                        <p className="text-sm text-gray-600 mb-2">{test.description}</p>
                        {s === 'book-now' && <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2">Book now — you are at week {currentWeek} and this test is due at week {test.week}.</p>}
                        {test.urgent && s !== 'done' && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mt-2">This test has a narrow time window. Book as soon as possible.</p>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Filter + upcoming list */}
      {!selectedDate && (
        <div>
          <div className="flex gap-2 mb-3">
            {['all', 'upcoming', 'done'].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${filter === f ? `${theme.accentBg} text-white` : 'bg-white text-gray-500'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {filteredUpcoming.map((test) => {
              const d = getTestDate(lastPeriodDate, test.week)
              const s = testStatus(test, currentWeek)
              return (
                <button key={test.id}
                  onClick={() => { setViewYear(d.getFullYear()); setViewMonth(d.getMonth()); setSelectedDate(d) }}
                  className="bg-white rounded-2xl shadow-sm px-4 py-3 flex justify-between items-center hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="mt-0.5">
                      {s === 'done'     && <CheckCircle   size={16} className="text-green-400" />}
                      {s === 'book-now' && <AlertTriangle size={16} className="text-amber-400" />}
                      {s === 'upcoming' && <Clock         size={16} className="text-blue-400"  />}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">{test.name}</p>
                      <p className="text-xs text-gray-400">Week {test.week} · {d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                    </div>
                  </div>
                  {test.urgent && s !== 'done' && <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full ml-2 flex-shrink-0">Urgent</span>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
