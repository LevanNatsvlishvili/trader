import { useLocation } from 'react-router-dom'
import IconBell from '../../icons/IconBell.jsx'
import IconMenu from '../../icons/IconMenu.jsx'
import IconSearch from '../../icons/IconSearch.jsx'
import { getNavItem } from '../nav.js'
import './topbar.css'

export default function Topbar({ onToggleMobile, search, onSearchChange }) {
  const { pathname } = useLocation()
  const current = getNavItem(pathname)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="icon-button mobile-menu"
          onClick={onToggleMobile}
          aria-label="Open navigation"
        >
          <IconMenu />
        </button>
        <div className="topbar-title">
          <p>Admin</p>
          <h1>{current.label}</h1>
        </div>
      </div>

      <label className="topbar-search">
        <IconSearch />
        <input
          type="search"
          placeholder="Search markets, orders, traders"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="topbar-right">
        <button type="button" className="icon-button" aria-label="Notifications">
          <IconBell />
          <span className="badge" aria-hidden="true" />
        </button>
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
