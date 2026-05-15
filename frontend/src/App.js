import { useState, useEffect } from 'react'
import { MemoryRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import SubmitFeedback from './pages/SubmitFeedback'
import FeedbackList from './pages/FeedbackList'
import FeedbackDetail from './pages/FeedbackDetail'
import RoleSelect from './pages/RoleSelect'
import './index.css'

function App() {
  const [role, setRole] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    if (!showMenu) return
    const close = () => setShowMenu(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [showMenu])

  if (!role) {
    return <RoleSelect onSelect={setRole} />
  }

  return (
    <MemoryRouter>
      <nav className="navbar">
        <span className="brand">FMS</span>
        {role === 'admin' && <NavLink to="/">Dashboard</NavLink>}
        {role === 'admin' && <NavLink to="/feedback">All Feedback</NavLink>}
        {role !== 'admin' && <NavLink to="/submit">Submit Feedback</NavLink>}
        {role !== 'admin' && <NavLink to="/feedback">View Feedback</NavLink>}
        <div className="user-menu">
          <button
            className="user-icon-btn"
            onClick={e => { e.stopPropagation(); setShowMenu(m => !m) }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
          {showMenu && (
            <div className="user-dropdown" onClick={e => e.stopPropagation()}>
              <div className="user-dropdown-role">Logged in as {role}</div>
              <button onClick={() => { setRole(null); setShowMenu(false) }}>Logout</button>
            </div>
          )}
        </div>
      </nav>
      <main>
        <Routes>
          {role === 'admin' ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/feedback" element={<FeedbackList />} />
              <Route path="/feedback/:id" element={<FeedbackDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/submit" replace />} />
              <Route path="/submit" element={<SubmitFeedback />} />
              <Route path="/feedback" element={<FeedbackList readonly />} />
              <Route path="/feedback/:id" element={<FeedbackDetail readonly />} />
              <Route path="*" element={<Navigate to="/submit" replace />} />
            </>
          )}
        </Routes>
      </main>
    </MemoryRouter>
  )
}

export default App
