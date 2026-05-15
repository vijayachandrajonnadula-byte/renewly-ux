function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__copy">
        <div className="topbar__eyebrow">Renewly workspace</div>
        <h1 className="topbar__title">Dashboard</h1>
        <p className="topbar__subtitle">
          Review renewals, approvals, risk, and potential savings from one calm workspace.
        </p>
      </div>

      <div className="topbar__actions">
        <label className="topbar__search">
          <span className="topbar__eyebrow">Search</span>
          <input type="search" placeholder="Search subscriptions or owners" />
        </label>
        <div className="company-pill" aria-label="Mock company user">
          <span className="company-pill__avatar" aria-hidden="true">
            AC
          </span>
          Acme Ops
        </div>
      </div>
    </header>
  )
}

export default TopBar
