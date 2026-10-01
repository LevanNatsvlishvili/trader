'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getRoute } from '@/routes.js'
import { signOut } from 'next-auth/react'
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
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return

    function onPointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-title">
          <p>Admin</p>
          <h1>{current.label}</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="user-menu" ref={menuRef}>
          <button
            type="button"
            className="user-chip"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="user-avatar" aria-hidden="true">
              {initials(user)}
            </span>
            <div className="user-meta">
              <strong>{user?.name || user?.email}</strong>
              {user?.name ? <span>{user.email}</span> : null}
            </div>
            <span className="user-chip-caret" aria-hidden="true" />
          </button>

          {open ? (
            <div className="user-menu-panel" id={menuId} role="menu">
              {/* Sign out through /api/auth, which middleware skips. Otherwise, on Netlify the
                  middleware's session-refresh cookie can override the deletion and keep the user signed in. */}
              <button
                type="button"
                role="menuitem"
                className="user-menu-item"
                onClick={() => {
                  setOpen(false)
                  signOut({ redirectTo: '/login' })
                }}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
