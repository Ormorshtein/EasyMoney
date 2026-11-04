export function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function calculateWeek(lastPeriodDate) {
  const start = parseLocalDate(lastPeriodDate)
  const today = new Date()
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24))
  return Math.min(Math.max(Math.floor(diffDays / 7) + 1, 1), 42)
}

export function calculateDueDate(lastPeriodDate) {
  const start = parseLocalDate(lastPeriodDate)
  start.setDate(start.getDate() + 280)
  return start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function getTestDate(lastPeriodDate, weekNumber) {
  const start = parseLocalDate(lastPeriodDate)
  start.setDate(start.getDate() + weekNumber * 7)
  return start
}

export function trimester(week) {
  if (week <= 13) return '1st Trimester'
  if (week <= 27) return '2nd Trimester'
  return '3rd Trimester'
}
