import { useState, useRef } from 'react'
import { Upload, FileText, Trash2, Eye } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const CATEGORIES = ['Blood Test', 'Ultrasound', 'Referral', 'Prescription', 'Other']

export default function Documents() {
  const { theme } = useTheme()
  const [docs, setDocs] = useState(() => JSON.parse(localStorage.getItem('documents') || '[]'))
  const [category, setCategory] = useState('Blood Test')
  const [note, setNote] = useState('')
  const fileRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const newDoc = { id: Date.now(), name: file.name, category, note, date: new Date().toLocaleDateString('en-GB'), dataUrl: reader.result }
      const updated = [newDoc, ...docs]
      setDocs(updated)
      localStorage.setItem('documents', JSON.stringify(updated))
      setNote('')
      fileRef.current.value = ''
    }
    reader.readAsDataURL(file)
  }

  function deleteDoc(id) {
    const updated = docs.filter((d) => d.id !== id)
    setDocs(updated)
    localStorage.setItem('documents', JSON.stringify(updated))
  }

  return (
    <div className={`min-h-screen ${theme.pageBg} transition-colors duration-300 p-5 max-w-lg mx-auto`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Document Vault</h1>
      <p className="text-sm text-gray-400 mb-5">Store your medical files in one place</p>

      <div className="bg-white rounded-2xl shadow-sm p-4 mb-5">
        <p className="text-sm font-medium text-gray-700 mb-3">Upload a document</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${category === c ? `${theme.accentBg} text-white` : 'bg-gray-100 text-gray-500'}`}>
              {c}
            </button>
          ))}
        </div>
        <input type="text" placeholder="Add a note (optional)" value={note} onChange={(e) => setNote(e.target.value)}
          className={`w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 ${theme.ring} mb-3`} />
        <input type="file" ref={fileRef} onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
        <button onClick={() => fileRef.current.click()}
          className={`w-full border-2 border-dashed rounded-xl py-4 flex flex-col items-center gap-2 transition-colors ${theme.tagBg} border-current ${theme.tagText} hover:opacity-80`}>
          <Upload size={24} />
          <span className="text-sm">Tap to upload file</span>
          <span className="text-xs text-gray-400">PDF, JPG, PNG</span>
        </button>
      </div>

      {docs.length === 0 ? (
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
          <p className="text-gray-400 text-sm">No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {docs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
              <div className={`${theme.accentLight} p-2 rounded-xl`}>
                <FileText size={20} className={theme.accent} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p>
                <p className="text-xs text-gray-400">{doc.category} · {doc.date}</p>
                {doc.note && <p className="text-xs text-gray-500 mt-0.5">{doc.note}</p>}
              </div>
              <div className="flex gap-2">
                <a href={doc.dataUrl} target="_blank" rel="noreferrer">
                  <Eye size={16} className="text-gray-400 hover:text-blue-400 transition-colors" />
                </a>
                <button onClick={() => deleteDoc(doc.id)}>
                  <Trash2 size={16} className="text-gray-300 hover:text-red-400 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
