import AppShell from './components/AppShell'
import SubscriptionDetail from './routes/SubscriptionDetail'

function App() {
  return (
    <AppShell
      activeNavItem="Subscriptions"
      subtitle="Review tool context, renewal risk, approval state, and mock savings potential."
      title="Subscription detail"
    >
      <SubscriptionDetail />
    </AppShell>
  )
}

export default App
