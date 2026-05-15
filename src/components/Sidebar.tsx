export const navigationItems = [
  'Dashboard',
  'Subscriptions',
  'Renewals',
  'Approvals',
  'Savings',
  'Reports',
  'Settings',
] as const

export type NavigationItem = (typeof navigationItems)[number]

type SidebarProps = {
  activeItem?: NavigationItem
  onNavigate?: (item: NavigationItem) => void
}

const navMeta: Record<NavigationItem, { badge?: string; icon: string; label: string; section: 'Admin' | 'Workspace' }> = {
  Dashboard: { icon: '□', label: 'Dashboard', section: 'Workspace' },
  Subscriptions: { badge: '16', icon: '≡', label: 'Subscriptions', section: 'Workspace' },
  Renewals: { icon: '▣', label: 'Renewal calendar', section: 'Workspace' },
  Approvals: { badge: '5', icon: '✓', label: 'Approval queue', section: 'Workspace' },
  Savings: { badge: 'New', icon: '↗', label: 'Savings opportunities', section: 'Workspace' },
  Reports: { icon: '⚑', label: 'Reports', section: 'Workspace' },
  Settings: { icon: '⚙', label: 'Settings', section: 'Admin' },
}

function Sidebar({ activeItem = 'Dashboard', onNavigate }: SidebarProps) {
  const workspaceItems = navigationItems.filter((item) => navMeta[item].section === 'Workspace')
  const adminItems = navigationItems.filter((item) => navMeta[item].section === 'Admin')

  const renderNavItem = (item: NavigationItem) => {
    const meta = navMeta[item]

    return (
      <button
        aria-current={item === activeItem ? 'page' : undefined}
        className={`sidebar__link${item === activeItem ? ' sidebar__link--active' : ''}`}
        key={item}
        onClick={() => onNavigate?.(item)}
        type="button"
      >
        <span className="sidebar__icon" aria-hidden="true">
          {meta.icon}
        </span>
        <span className="sidebar__label">{meta.label}</span>
        {meta.badge ? <span className="sidebar__badge">{meta.badge}</span> : null}
      </button>
    )
  }

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark" aria-hidden="true">
          ↻
        </div>
        <div className="sidebar__product">Renewly</div>
        <span className="sidebar__chevron" aria-hidden="true">⌄</span>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Workspace</p>
        {workspaceItems.map(renderNavItem)}
        <p className="sidebar__section-label sidebar__section-label--admin">Admin</p>
        {adminItems.map(renderNavItem)}
        <button className="sidebar__link" type="button">
          <span className="sidebar__icon" aria-hidden="true">ⓘ</span>
          <span className="sidebar__label">Help</span>
        </button>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar-user">
          <span className="sidebar-user__avatar" aria-hidden="true">PR</span>
          <div>
            <strong>Priya Patel</strong>
            <span>Finance · Admin</span>
          </div>
          <span className="sidebar-user__menu" aria-hidden="true">...</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
