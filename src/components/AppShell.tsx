import type { ReactNode } from 'react'
import Sidebar, { type NavigationItem } from './Sidebar'
import TopBar from './TopBar'

type AppShellProps = {
  activeNavItem?: NavigationItem
  children: ReactNode
  onNavigate?: (item: NavigationItem) => void
  subtitle?: string
  title?: string
}

const mobileNavItems: Array<{ item: NavigationItem; label: string; icon: string }> = [
  { item: 'Dashboard', label: 'Home', icon: 'home' },
  { item: 'Subscriptions', label: 'Subs', icon: 'list' },
  { item: 'Renewals', label: 'Renewals', icon: 'calendar' },
  { item: 'Approvals', label: 'Approvals', icon: 'check' },
  { item: 'Settings', label: 'More', icon: 'more' },
]

function MobileIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    calendar: (
      <>
        <rect x="4.5" y="5.5" width="15" height="14" rx="2" />
        <path d="M8 3.5v4M16 3.5v4M4.5 10h15" />
      </>
    ),
    check: <path d="m5 12 4 4 10-10" />,
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6.5 10.5V20h11v-9.5" />
      </>
    ),
    list: (
      <>
        <path d="M5 7h14M5 12h14M5 17h14" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    more: (
      <>
        <circle cx="6.5" cy="12" r="1.4" />
        <circle cx="12" cy="12" r="1.4" />
        <circle cx="17.5" cy="12" r="1.4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.75" cy="10.75" r="5.75" />
        <path d="m15.2 15.2 4.3 4.3" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 6-2.5 7-2.5 7h17S18 14 18 8" />
        <path d="M13.75 20a2 2 0 0 1-3.5 0" />
      </>
    ),
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}

function AppShell({ activeNavItem, children, onNavigate, subtitle, title }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeItem={activeNavItem} onNavigate={onNavigate} />
      <div className="app-shell__main">
        <header className="mobile-topbar" aria-label="Mobile app header">
          <button className="mobile-icon-button" type="button" aria-label="Open menu">
            <MobileIcon name="menu" />
          </button>
          <div className="mobile-brand" aria-label="Renewly">
            <span className="mobile-brand__mark" aria-hidden="true">
              R
            </span>
            <span>Renewly</span>
          </div>
          <div className="mobile-topbar__actions">
            <button className="mobile-icon-button" type="button" aria-label="Search">
              <MobileIcon name="search" />
            </button>
            <button className="mobile-icon-button mobile-icon-button--notify" type="button" aria-label="Notifications">
              <MobileIcon name="bell" />
            </button>
            <span className="mobile-avatar" aria-hidden="true">
              PP
            </span>
          </div>
        </header>
        <TopBar subtitle={subtitle} title={title} />
        <main className="app-shell__content">{children}</main>
        <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
          {mobileNavItems.map((navItem) => (
            <button
              aria-current={activeNavItem === navItem.item ? 'page' : undefined}
              className={activeNavItem === navItem.item ? 'is-active' : ''}
              key={navItem.item}
              onClick={() => onNavigate?.(navItem.item)}
              type="button"
            >
              <MobileIcon name={navItem.icon} />
              <span>{navItem.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default AppShell
