'use client'

import { usePathname } from 'next/navigation'
import { getRoute } from '@/routes.js'
import './topbar.css'

export default function Topbar() {
  const pathname = usePathname()
  const current = getRoute(pathname)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          <p>Admin</p>
          <h1>{current.label}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="user-chip">
          <span className="user-avatar" aria-hidden="true">
            LN
          </span>
          <div className="user-meta">
            <strong>Levan N.</strong>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  )
}
