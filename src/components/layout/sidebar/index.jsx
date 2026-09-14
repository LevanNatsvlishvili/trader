import { NAV_ITEMS } from '../nav.js'
import IconCollapse from '../../icons/IconCollapse.jsx'
import './sidebar.css'

export default function Sidebar({
  currentPage,
  onNavigate,
  collapsed,
  onToggleCollapsed,
  mobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="sidebar-backdrop is-visible"
          aria-label="Close navigation"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={`sidebar${collapsed ? ' is-collapsed' : ''}${mobileOpen ? ' is-open' : ''}`}
        aria-label="Admin navigation"
      >
        <div className="sidebar-brand">
          <span className="brand-mark" aria-hidden="true">
            T
          </span>
          <div className="brand-text">
            <strong>Trader</strong>
            <span>Admin console</span>
          </div>
          <button
            type="button"
            className="sidebar-collapse"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <IconCollapse />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item${isActive ? ' is-active' : ''}`}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                <span className="nav-icon">
                  <Icon />
                </span>
                <span className="nav-label">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-dot" aria-hidden="true" />
          <div className="sidebar-footer-text">
            <strong>Markets open</strong>
            <span>NYSE · 09:32 ET</span>
          </div>
        </div>
      </aside>
    </>
  )
}
