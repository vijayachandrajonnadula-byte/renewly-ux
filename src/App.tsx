import AppShell from './components/AppShell'
import ApprovalQueue from './routes/ApprovalQueue'

function App() {
  return (
    <AppShell
      activeNavItem="Approvals"
      subtitle="Review renewal decisions, owner requests, and finance approvals."
      title="Approval Queue"
    >
      <ApprovalQueue />
    </AppShell>
  )
}

export default App
