import { useState } from 'react'
import AppShell from './components/AppShell'
import type { NavigationItem } from './components/Sidebar'
import ApprovalQueue from './routes/ApprovalQueue'
import Dashboard from './routes/Dashboard'
import RenewalCalendar from './routes/RenewalCalendar'
import Reports from './routes/Reports'
import Savings from './routes/Savings'
import Settings from './routes/Settings'
import SubscriptionDetail from './routes/SubscriptionDetail'
import Subscriptions from './routes/Subscriptions'

const screenCopy: Record<NavigationItem, { subtitle: string; title: string }> = {
  Dashboard: {
    subtitle: 'Review renewals, approvals, risk, and potential savings from one calm workspace.',
    title: 'Dashboard',
  },
  Subscriptions: {
    subtitle: 'Compare software tools, owners, renewal risk, and approval status.',
    title: 'Subscriptions',
  },
  Renewals: {
    subtitle: 'Track upcoming renewals, risk, ownership, and approval deadlines.',
    title: 'Renewal calendar',
  },
  Approvals: {
    subtitle: 'Review renewal decisions, owner requests, and finance approvals.',
    title: 'Approval queue',
  },
  Savings: {
    subtitle: 'Review potential SaaS savings from mock usage and renewal signals.',
    title: 'Savings opportunities',
  },
  Reports: {
    subtitle: 'Summarise spend, renewals, approvals, and estimated savings for finance review.',
    title: 'Reports',
  },
  Settings: {
    subtitle: 'Manage company preferences, renewal alerts, approval rules, and team roles.',
    title: 'Settings',
  },
}

type ActiveScreen = NavigationItem | 'SubscriptionDetail'

const renderScreen = (
  activeScreen: ActiveScreen,
  setActiveScreen: (screen: ActiveScreen) => void,
) => {
  switch (activeScreen) {
    case 'Dashboard':
      return <Dashboard />
    case 'Subscriptions':
      return <Subscriptions onOpenDetail={() => setActiveScreen('SubscriptionDetail')} />
    case 'SubscriptionDetail':
      return <SubscriptionDetail />
    case 'Renewals':
      return <RenewalCalendar />
    case 'Approvals':
      return <ApprovalQueue />
    case 'Savings':
      return <Savings />
    case 'Reports':
      return <Reports />
    case 'Settings':
      return <Settings />
  }
}

function App() {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('Dashboard')
  const activeNavItem: NavigationItem =
    activeScreen === 'SubscriptionDetail' ? 'Subscriptions' : activeScreen
  const activeCopy =
    activeScreen === 'SubscriptionDetail'
      ? { subtitle: 'Review one subscription before making a renewal decision.', title: 'Forge Analytics' }
      : screenCopy[activeScreen]

  return (
    <AppShell
      activeNavItem={activeNavItem}
      onNavigate={(item) => setActiveScreen(item)}
      subtitle={activeCopy.subtitle}
      title={activeCopy.title}
    >
      {renderScreen(activeScreen, setActiveScreen)}
    </AppShell>
  )
}

export default App
