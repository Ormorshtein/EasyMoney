import { useState } from 'react'
import { nurseryList, laborBagList } from '../data/shoppingList'
import { CheckCircle2, Circle, Plus, Trash2, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})
}

function CheckList({ storageKey, customKey, initialItems, theme }) {
  const [checks, setChecks] = useState(() => JSON.parse(localStorage.getItem(storageKey) || '{}'))
  const [customItems, setCustomItems] = useState(() => JSON.parse(localStorage.getItem(customKey) || '[]'))
  const [newItem, setNewItem] = useState('')
  const [showInput, setShowInput] = useState(false)

  const allItems = [
    ...initialItems.map((item) => ({ ...item, checked: checks[item.id] ?? false, isCustom: false })),
    ...customItems.map((item) => ({ ...item, checked: checks[item.id] ?? false, isCustom: true })),
  ]

  function toggle(id) {
    const updated = { ...checks, [id]: !checks[id] }
    setChecks(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  function addCustomItem() {
    const text = newItem.trim()
    if (!text) return
    const item = { id: `custom_${Date.now()}`, item: text, category: 'My Items' }
    const updated = [...customItems, item]
    setCustomItems(updated)
    localStorage.setItem(customKey, JSON.stringify(updated))
    setNewItem('')
    setShowInput(false)
  }

  function deleteCustomItem(id) {
    const updated = customItems.filter((i) => i.id !== id)
    setCustomItems(updated)
    localStorage.setItem(customKey, JSON.stringify(updated))
    const updatedChecks = { ...checks }
    delete updatedChecks[id]
    setChecks(updatedChecks)
    localStorage.setItem(storageKey, JSON.stringify(updatedChecks))
  }

  const grouped = groupByCategory(allItems)
  const total = allItems.length
  const done = allItems.filter((i) => i.checked).length

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500 whitespace-nowrap">{done}/{total} items</span>
        <div className="bg-gray-100 rounded-full h-2 flex-1 overflow-hidden">
          <div className={`${theme.progress} h-full rounded-full transition-all duration-300`} style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
        </div>
      </div>

      {Object.entries(grouped).map(([category, catItems]) => (
        <div key={category} className="mb-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{category}</p>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {catItems.map((item, idx) => (
              <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${idx !== catItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <button onClick={() => toggle(item.id)} className="flex items-center gap-3 flex-1 text-left">
                  {item.checked
                    ? <CheckCircle2 size={20} className={`${theme.check} flex-shrink-0`} />
                    : <Circle size={20} className="text-gray-300 flex-shrink-0" />
                  }
                  <span className={`text-sm ${item.checked ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                    {item.item}
                  </span>
                </button>
                {item.isCustom && (
                  <button onClick={() => deleteCustomItem(item.id)} className="ml-auto flex-shrink-0">
                    <Trash2 size={14} className="text-gray-300 hover:text-red-400 transition-colors" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add custom item */}
      {showInput ? (
        <div className="bg-white rounded-2xl shadow-sm p-3 flex gap-2 items-center mt-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder="New item name..."
            autoFocus
            className={`flex-1 text-sm text-gray-700 focus:outline-none border-b border-gray-200 pb-1 focus:border-current ${theme.accent}`}
          />
          <button onClick={addCustomItem} className={`${theme.accentBg} text-white px-3 py-1.5 rounded-xl text-sm font-medium ${theme.accentHover} transition-colors`}>
            Add
          </button>
          <button onClick={() => { setShowInput(false); setNewItem('') }}>
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className={`w-full mt-2 border-2 border-dashed rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${theme.tagBg} ${theme.tagText} border-current hover:opacity-80`}
        >
          <Plus size={16} />
          Add your own item
        </button>
      )}
    </div>
  )
}

export default function Shopping() {
  const { theme } = useTheme()
  const [tab, setTab] = useState('nursery')

  return (
    <div className={`min-h-screen ${theme.pageBg} transition-colors duration-300 p-5 max-w-lg mx-auto`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Shopping Lists</h1>
      <p className="text-sm text-gray-400 mb-5">Track what you still need to get</p>

      <div className="flex gap-2 mb-5">
        {[['nursery', 'Nursery'], ['labor', 'Labor Bag']].map(([value, label]) => (
          <button key={value} onClick={() => setTab(value)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${tab === value ? `${theme.accentBg} text-white` : 'bg-white text-gray-500'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'nursery' && (
        <CheckList storageKey="nursery_checks" customKey="nursery_custom" initialItems={nurseryList} theme={theme} />
      )}
      {tab === 'labor' && (
        <CheckList storageKey="labor_checks" customKey="labor_custom" initialItems={laborBagList} theme={theme} />
      )}
    </div>
  )
}
