import type { ReactNode } from 'react'

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

const navMeta: Record<
  NavigationItem,
  { badge?: string; icon: IconName; label: string; section: 'Admin' | 'Workspace' }
> = {
  Dashboard: { icon: 'grid', label: 'Dashboard', section: 'Workspace' },
  Subscriptions: { badge: '16', icon: 'list', label: 'Subscriptions', section: 'Workspace' },
  Renewals: { icon: 'calendar', label: 'Renewal calendar', section: 'Workspace' },
  Approvals: { badge: '5', icon: 'check', label: 'Approval queue', section: 'Workspace' },
  Savings: { badge: 'New', icon: 'trend', label: 'Savings opportunities', section: 'Workspace' },
  Reports: { icon: 'flag', label: 'Reports', section: 'Workspace' },
  Settings: { icon: 'settings', label: 'Settings', section: 'Admin' },
}

type IconName =
  | 'calendar'
  | 'check'
  | 'chevronDown'
  | 'flag'
  | 'grid'
  | 'help'
  | 'list'
  | 'settings'
  | 'trend'

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevronDown: <path d="m7 10 5 5 5-5" />,
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 5h12l-2 4 2 4H5" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.7 2.7 0 0 1 5.1 1.3c0 1.8-1.8 2.2-2.4 3.3" />
        <path d="M12 17h.01" />
      </>
    ),
    list: (
      <>
        <path d="M5 7h14" />
        <path d="M5 12h14" />
        <path d="M5 17h14" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .36 1.98l.05.05a2.1 2.1 0 0 1-2.97 2.97l-.05-.05a1.8 1.8 0 0 0-1.98-.36 1.8 1.8 0 0 0-1.1 1.65V21a2.1 2.1 0 0 1-4.2 0v-.08A1.8 1.8 0 0 0 8.4 19.3a1.8 1.8 0 0 0-1.98.36l-.05.05a2.1 2.1 0 0 1-2.97-2.97l.05-.05A1.8 1.8 0 0 0 3.8 14.7 1.8 1.8 0 0 0 2.15 13H2a2.1 2.1 0 0 1 0-4.2h.08A1.8 1.8 0 0 0 3.7 7.6a1.8 1.8 0 0 0-.36-1.98l-.05-.05A2.1 2.1 0 0 1 6.26 2.6l.05.05a1.8 1.8 0 0 0 1.98.36H8.4A1.8 1.8 0 0 0 9.5 1.36V1a2.1 2.1 0 0 1 4.2 0v.08a1.8 1.8 0 0 0 1.1 1.65 1.8 1.8 0 0 0 1.98-.36l.05-.05A2.1 2.1 0 0 1 19.8 5.3l-.05.05a1.8 1.8 0 0 0-.36 1.98v.1A1.8 1.8 0 0 0 21 8.5h.08a2.1 2.1 0 0 1 0 4.2H21a1.8 1.8 0 0 0-1.6 1.1Z" />
      </>
    ),
    trend: <path d="m4 16 5-5 4 4 7-7M16 8h4v4" />,
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}

function BrandMark() {
  return (
    <svg aria-hidden="true" className="sidebar__brand-symbol" viewBox="0 0 32 32">
      <path d="M7 19.5a9.5 9.5 0 0 1 16.7-6.2" />
      <path d="M23.7 13.3V8h-5.4" />
      <path d="M25 12.5a9.5 9.5 0 0 1-16.7 6.2" />
      <path d="M8.3 18.7V24h5.4" />
    </svg>
  )
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
          <Icon name={meta.icon} />
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
          <BrandMark />
        </div>
        <div className="sidebar__product">Renewly</div>
        <span className="sidebar__chevron" aria-hidden="true">
          <Icon name="chevronDown" />
        </span>
      </div>

      <nav className="sidebar__nav">
        <p className="sidebar__section-label">Workspace</p>
        {workspaceItems.map(renderNavItem)}
        <p className="sidebar__section-label sidebar__section-label--admin">Admin</p>
        {adminItems.map(renderNavItem)}
        <button className="sidebar__link" type="button">
          <span className="sidebar__icon" aria-hidden="true">
            <Icon name="help" />
          </span>
          <span className="sidebar__label">Help</span>
        </button>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar-user">
          <span className="sidebar-user__avatar" aria-hidden="true">
            PR
          </span>
          <div>
            <strong>Priya Patel</strong>
            <span>Finance · Admin</span>
          </div>
          <span className="sidebar-user__menu" aria-hidden="true">
            ...
          </span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
