import { useState } from 'react'
import AppShell from './components/AppShell'
import Reports from './routes/Reports'
import Savings from './routes/Savings'

type Day11Screen = 'Savings' | 'Reports'

function App() {
  const [activeScreen, setActiveScreen] = useState<Day11Screen>('Savings')

  return (
    <AppShell
      activeNavItem={activeScreen}
      subtitle={
        activeScreen === 'Savings'
          ? 'Review potential SaaS savings from mock usage and renewal signals.'
          : 'Summarise spend, renewals, approvals, and estimated savings for finance review.'
      }
      title={activeScreen === 'Savings' ? 'Savings Opportunities' : 'Reports'}
    >
      <div className="day-switcher" aria-label="Day 11 screen switcher">
        <button
          className={activeScreen === 'Savings' ? '' : 'button-secondary'}
          onClick={() => setActiveScreen('Savings')}
          type="button"
        >
          Savings
        </button>
        <button
          className={activeScreen === 'Reports' ? '' : 'button-secondary'}
          onClick={() => setActiveScreen('Reports')}
          type="button"
        >
          Reports
        </button>
      </div>
      {activeScreen === 'Savings' ? <Savings /> : <Reports />}
    </AppShell>
  )
}

export default App
