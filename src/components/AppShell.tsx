import type { ReactNode } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

type AppShellProps = {
  activeNavItem?: string
  children: ReactNode
  subtitle?: string
  title?: string
}

function AppShell({ activeNavItem, children, subtitle, title }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeItem={activeNavItem} />
      <div className="app-shell__main">
        <TopBar subtitle={subtitle} title={title} />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  )
}

export default AppShell
