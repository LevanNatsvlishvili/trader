import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Markets from './pages/Markets.jsx'
import Orders from './pages/Orders.jsx'
import Positions from './pages/Positions.jsx'
import Traders from './pages/Traders.jsx'
import Settings from './pages/Settings.jsx'
import './App.css'

const PAGES = {
  dashboard: Dashboard,
  markets: Markets,
  orders: Orders,
  positions: Positions,
  traders: Traders,
  settings: Settings,
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')

  const Page = PAGES[currentPage] ?? Dashboard

  function handleNavigate(pageId) {
    setCurrentPage(pageId)
    setMobileOpen(false)
    setSearch('')
  }

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}`}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="admin-main">
        <Topbar
          currentPage={currentPage}
          onToggleMobile={() => setMobileOpen((value) => !value)}
          search={search}
          onSearchChange={setSearch}
        />
        <main className="admin-content">
          <Page query={search} />
        </main>
      </div>
    </div>
  )
}

export default App
