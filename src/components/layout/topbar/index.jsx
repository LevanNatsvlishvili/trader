'use client'

import { usePathname } from 'next/navigation'
import { getRoute } from '@/routes.js'
import { logout } from '@/lib/authActions.js'
import './topbar.css'

function initials(user) {
  const source = user?.name || user?.email || ''
  const parts = source.split(/[\s@._-]+/).filter(Boolean)
  return parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export default function Topbar({ user }) {
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
            {initials(user)}
          </span>
          <div className="user-meta">
            <strong>{user?.name || user?.email}</strong>
            {user?.name ? <span>{user.email}</span> : null}
          </div>
        </div>
        <form action={logout}>
          <button type="submit" className="topbar-logout">
            Sign out
          </button>
        </form>
      </div>
    </header>
  )
}
