import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Symptoms from './pages/Symptoms'
import Documents from './pages/Documents'
import Shopping from './pages/Shopping'
import NavBar from './components/NavBar'

export default function App() {
  const [lastPeriodDate, setLastPeriodDate] = useState(
    () => localStorage.getItem('lastPeriodDate') || null
  )
  const [gender, setGender] = useState(
    () => localStorage.getItem('gender') || null
  )
  const [name, setName] = useState(
    () => localStorage.getItem('userName') || null
  )

  function handleOnboardingComplete(userName, date, selectedGender) {
    localStorage.setItem('userName', userName)
    localStorage.setItem('lastPeriodDate', date)
    setName(userName)
    setLastPeriodDate(date)
    if (selectedGender) {
      localStorage.setItem('gender', selectedGender)
      setGender(selectedGender)
    }
  }

  if (!lastPeriodDate) {
    return (
      <ThemeProvider>
        <Onboarding onComplete={handleOnboardingComplete} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-rose-50 pb-20">
        <Routes>
          <Route path="/" element={<Home lastPeriodDate={lastPeriodDate} gender={gender} name={name} onGenderChange={(g) => { localStorage.setItem('gender', g); setGender(g) }} />} />
          <Route path="/calendar" element={<Calendar lastPeriodDate={lastPeriodDate} />} />
          <Route path="/symptoms" element={<Symptoms lastPeriodDate={lastPeriodDate} />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <NavBar />
      </div>
    </BrowserRouter>
    </ThemeProvider>
  )
}
