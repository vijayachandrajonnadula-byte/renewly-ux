const navigationItems = [
  'Dashboard',
  'Subscriptions',
  'Renewals',
  'Approvals',
  'Savings',
  'Reports',
  'Settings',
]

type SidebarProps = {
  activeItem?: string
}

function Sidebar({ activeItem = 'Dashboard' }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark" aria-hidden="true">
          R
        </div>
        <div className="sidebar__product">Renewly</div>
        <p className="sidebar__description">
          Subscription renewal workspace for finance and operations teams.
        </p>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => (
          <a
            aria-current={item === activeItem ? 'page' : undefined}
            className={`sidebar__link${item === activeItem ? ' sidebar__link--active' : ''}`}
            href="#"
            key={item}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar-note">
          <div className="sidebar-note__title">Portfolio build</div>
          <p className="sidebar-note__body">
            Day 4 focuses on the shell and visual system. Product data will be added later with mock content.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
