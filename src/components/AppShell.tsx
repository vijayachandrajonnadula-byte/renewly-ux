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

function AppShell({ activeNavItem, children, onNavigate, subtitle, title }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeItem={activeNavItem} onNavigate={onNavigate} />
      <div className="app-shell__main">
        <TopBar subtitle={subtitle} title={title} />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  )
}

export default AppShell
