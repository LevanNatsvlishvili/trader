import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar/index.jsx'
import Topbar from './topbar/index.jsx'
import './layout.css'

function MainPane({ onToggleMobile }) {
  const [search, setSearch] = useState('')

  return (
    <div className="admin-main">
      <Topbar
        onToggleMobile={onToggleMobile}
        search={search}
        onSearchChange={setSearch}
      />
      <main className="admin-content">
        <Outlet context={{ query: search }} />
      </main>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <MainPane key={pathname} onToggleMobile={() => setMobileOpen((value) => !value)} />
    </div>
  )
}
