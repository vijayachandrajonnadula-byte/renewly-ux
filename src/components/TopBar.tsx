type TopBarProps = {
  subtitle?: string
  title?: string
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m21 21-4.35-4.35" />
      <circle cx="11" cy="11" r="6.5" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function TopBar({ title = 'Dashboard' }: TopBarProps) {
  return (
    <header className="topbar">
      <nav className="topbar__breadcrumb" aria-label="Breadcrumb">
        <span>Workspace</span>
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m9 18 6-6-6-6" />
        </svg>
        <strong>{title}</strong>
      </nav>

      <div className="topbar__actions">
        <label className="topbar__search" aria-label="Search Renewly workspace">
          <span className="topbar__search-icon">
            <SearchIcon />
          </span>
          <input type="search" placeholder="Search tools, owners, vendors..." />
          <kbd>⌘K</kbd>
        </label>
        <button className="topbar__icon-button" type="button" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="topbar__icon-button" type="button" aria-label="Information">
          <InfoIcon />
        </button>
      </div>
    </header>
  )
}

export default TopBar
