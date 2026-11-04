import { NavLink } from 'react-router-dom'
import { Home, Calendar, Activity, FileText, ShoppingBag } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/symptoms', icon: Activity, label: 'Symptoms' },
  { to: '/documents', icon: FileText, label: 'Docs' },
  { to: '/shopping', icon: ShoppingBag, label: 'Shopping' },
]

export default function NavBar() {
  const { theme } = useTheme()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2 z-10">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              isActive ? theme.navActive : 'text-gray-400'
            }`
          }
        >
          <Icon size={22} />
          <span className="text-xs">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
