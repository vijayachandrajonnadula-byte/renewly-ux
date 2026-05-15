import AppShell from './components/AppShell'
import Settings from './routes/Settings'

function App() {
  return (
    <AppShell
      activeNavItem="Settings"
      subtitle="Manage company preferences, renewal alerts, approval rules, and team roles."
      title="Settings"
    >
      <Settings />
    </AppShell>
  )
}

export default App
