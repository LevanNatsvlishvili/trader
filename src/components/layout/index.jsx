import { useState } from 'react'
import Sidebar from './sidebar/index.jsx'
import Topbar from './topbar/index.jsx'
import './layout.css'

export default function Layout({
  currentPage,
  onNavigate,
  search,
  onSearchChange,
  children,
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleNavigate(pageId) {
    onNavigate(pageId)
    setMobileOpen(false)
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
          onSearchChange={onSearchChange}
        />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}
