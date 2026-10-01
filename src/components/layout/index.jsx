'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './sidebar/index.jsx'
import Topbar from './topbar/index.jsx'
import './layout.css'

export default function AppShell({ user, children }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />
      <div className="admin-main" key={pathname}>
        <Topbar user={user} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}
