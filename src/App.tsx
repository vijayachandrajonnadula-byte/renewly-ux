import AppShell from './components/AppShell'

function App() {
  return (
    <AppShell>
      <section className="dashboard-placeholder" aria-labelledby="dashboard-title">
        <div className="dashboard-placeholder__header">
          <h2 className="dashboard-placeholder__heading" id="dashboard-title">
            Dashboard
          </h2>
          <p className="dashboard-placeholder__description">
            Renewly helps teams prepare for software renewals by organizing subscriptions, owners, approvals, risk, and estimated savings opportunities.
          </p>
        </div>

        <article className="card workspace-card">
          <div className="workspace-card__label">Workspace foundation</div>
          <h3 className="workspace-card__title">This is the Renewly workspace shell.</h3>
          <p className="workspace-card__body">
            Day 4 establishes the base visual system, navigation, topbar, and content region. Dashboard metrics, renewal queues, subscription tables, and mock data will be introduced in later stages.
          </p>
          <div className="workspace-card__actions">
            <button className="button-secondary" type="button">
              View planning docs
            </button>
          </div>
        </article>
      </section>
    </AppShell>
  )
}

export default App
