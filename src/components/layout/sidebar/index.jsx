import { NavLink } from 'react-router-dom'
import { APP_ROUTES } from '@/routes.js'
import IconCollapse from '../../icons/IconCollapse.jsx'
import './sidebar.css'

export default function Sidebar({ collapsed, onToggleCollapsed }) {
  return (
    <aside className={`sidebar${collapsed ? ' is-collapsed' : ''}`} aria-label="Admin navigation">
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
        {APP_ROUTES.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => `nav-item${isActive ? ' is-active' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className="nav-icon">
                <Icon />
              </span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
