import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar/index.jsx'
import Topbar from './topbar/index.jsx'
import './layout.css'

function MainPane() {
  return (
    <div className="admin-main">
      <Topbar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />
      <MainPane key={pathname} />
    </div>
  )
}
