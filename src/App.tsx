import AppShell from './components/AppShell'
import Subscriptions from './routes/Subscriptions'

function App() {
  return (
    <AppShell
      activeNavItem="Subscriptions"
      subtitle="Compare software tools, owners, renewal risk, and approval status."
      title="Subscriptions"
    >
      <Subscriptions />
    </AppShell>
  )
}

export default App
