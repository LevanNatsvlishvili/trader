import { IconBell, IconMenu, IconSearch } from '../icons.jsx'
import { getNavItem } from '../nav.js'

export default function Topbar({ currentPage, onToggleMobile, search, onSearchChange }) {
  const current = getNavItem(currentPage)

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
          <h1>{current?.label ?? 'Dashboard'}</h1>
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
