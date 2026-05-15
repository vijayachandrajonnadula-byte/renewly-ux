import AppShell from './components/AppShell'
import RenewalCalendar from './routes/RenewalCalendar'

function App() {
  return (
    <AppShell
      activeNavItem="Renewals"
      subtitle="Track upcoming renewals, risk, ownership, and approval deadlines."
      title="Renewal Calendar"
    >
      <RenewalCalendar />
    </AppShell>
  )
}

export default App
