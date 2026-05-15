type TopBarProps = {
  title?: string
  subtitle?: string
}

function TopBar({
  title = 'Dashboard',
  subtitle = 'Renewly workspace',
}: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar__breadcrumb" aria-label="Breadcrumb">
        <span>Workspace</span>
        <span aria-hidden="true">›</span>
        <strong>{title}</strong>
      </div>

      <div className="topbar__actions">
        <label className="topbar__search" aria-label={subtitle}>
          <span className="topbar__search-icon" aria-hidden="true">⌕</span>
          <input type="search" placeholder="Search tools, owners, vendors..." />
          <kbd>⌘K</kbd>
        </label>
        <button className="topbar__icon-button" type="button" aria-label="Notifications">⌾</button>
        <button className="topbar__icon-button" type="button" aria-label="Information">ⓘ</button>
      </div>
    </header>
  )
}

export default TopBar
