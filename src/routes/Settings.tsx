import { useEffect, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'

const teamRoles = [
  {
    name: 'Admin',
    permissions: 'Manage workspace settings, approval rules, team roles, and reports.',
    users: 2,
  },
  {
    name: 'Finance reviewer',
    permissions: 'Review spend, approve renewals, and prepare finance summaries.',
    users: 4,
  },
  {
    name: 'Department owner',
    permissions: 'Confirm tool usage, renewal need, and owner review requests.',
    users: 11,
  },
  {
    name: 'Viewer',
    permissions: 'View renewal status, reports, and subscription summaries.',
    users: 8,
  },
]

const settingsSections = [
  { id: 'company-profile', label: 'Company profile' },
  { id: 'renewal-alerts', label: 'Renewal alerts' },
  { id: 'approval-rules', label: 'Approval rules' },
  { id: 'team-roles', label: 'Team roles' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'billing', label: 'Billing' },
]

const mobileSettingsSections = [
  { id: 'mobile-company-profile', label: 'Company' },
  { id: 'mobile-renewal-alerts', label: 'Alerts' },
  { id: 'mobile-approval-rules', label: 'Rules' },
  { id: 'mobile-team-roles', label: 'Roles' },
  { id: 'mobile-notifications', label: 'Notifications' },
  { id: 'mobile-integrations', label: 'Integrations' },
  { id: 'mobile-billing', label: 'Billing' },
]

function Settings() {
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [alertWindow, setAlertWindow] = useState('60')
  const [costThreshold, setCostThreshold] = useState('10000')
  const [utilisationThreshold, setUtilisationThreshold] = useState('60')
  const [activeSection, setActiveSection] = useState(settingsSections[0].id)

  const showConfirmation = (message: string) => {
    setConfirmationMessage(message)
  }

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleMobileSectionClick = (sectionId: string) => {
    setActiveSection(sectionId.replace('mobile-', ''))
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const updateActiveSection = () => {
      const sectionOffset = 112
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const sourceSections = isMobile ? mobileSettingsSections : settingsSections
      const currentSection = [...sourceSections]
        .reverse()
        .find((section) => {
          const element = document.getElementById(section.id)

          return element ? element.getBoundingClientRect().top <= sectionOffset : false
        })

      setActiveSection((currentSection?.id ?? sourceSections[0].id).replace('mobile-', ''))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <div className="mobile-page settings-mobile-page" aria-label="Mobile settings">
        <header className="mobile-page-header settings-mobile-header">
          <h1>Settings</h1>
          <p>Configure company preferences, renewal alerts, approval rules, and team roles.</p>
          <div className="settings-mobile-actions">
            <button
              className="mobile-secondary-button"
              type="button"
              onClick={() => showConfirmation('Settings reset to the previous mock values.')}
            >
              Discard
            </button>
            <button
              className="mobile-primary-button"
              type="button"
              onClick={() => showConfirmation('Settings saved for this mock workflow.')}
            >
              Save changes
            </button>
          </div>
        </header>

        <nav className="settings-mobile-tabs" aria-label="Settings sections">
          {mobileSettingsSections.map((item) => (
            <button
              aria-current={activeSection === item.id.replace('mobile-', '') ? 'page' : undefined}
              className={activeSection === item.id.replace('mobile-', '') ? 'is-active' : ''}
              key={item.id}
              onClick={() => handleMobileSectionClick(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="settings-mobile-stack">
          <section className="settings-mobile-card" id="mobile-company-profile">
            <h2>Company profile</h2>
            <p>Basic workspace information for the mock Renewly environment.</p>
            <div className="settings-mobile-form">
              <label>
                <span>Company name</span>
                <input defaultValue="Acme Operations Group" />
              </label>
              <label>
                <span>Workspace name</span>
                <input defaultValue="Acme SaaS Renewals" />
              </label>
              <label>
                <span>Default currency</span>
                <select defaultValue="USD">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </label>
              <label>
                <span>Fiscal year start</span>
                <select defaultValue="January">
                  <option>January</option>
                  <option>April</option>
                  <option>July</option>
                  <option>October</option>
                </select>
              </label>
              <label>
                <span>Primary finance contact</span>
                <input defaultValue="Marcus Reed" />
              </label>
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-renewal-alerts">
            <h2>Renewal alerts</h2>
            <p>Control when renewal work becomes visible to the team.</p>
            <div className="settings-mobile-form">
              <label>
                <span>Alert before renewal</span>
                <select value={alertWindow} onChange={(event) => setAlertWindow(event.target.value)}>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </label>
              {[
                'Alert before cancellation window closes',
                'Weekly renewal digest',
                'High-risk renewal alerts',
              ].map((label) => (
                <label className="settings-mobile-check" key={label}>
                  <input type="checkbox" defaultChecked />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-approval-rules">
            <h2>Approval rules</h2>
            <p>Mock safeguards that make review requirements clear before renewal decisions.</p>
            <div className="settings-mobile-form">
              <label className="settings-mobile-check">
                <input type="checkbox" defaultChecked />
                <span>Require owner review for high-risk renewals</span>
              </label>
              <label>
                <span>Finance approval threshold</span>
                <select value={costThreshold} onChange={(event) => setCostThreshold(event.target.value)}>
                  <option value="5000">$5,000 annual cost</option>
                  <option value="10000">$10,000 annual cost</option>
                  <option value="25000">$25,000 annual cost</option>
                </select>
              </label>
              <label>
                <span>Low utilisation review threshold</span>
                <select
                  value={utilisationThreshold}
                  onChange={(event) => setUtilisationThreshold(event.target.value)}
                >
                  <option value="40">Below 40%</option>
                  <option value="60">Below 60%</option>
                  <option value="75">Below 75%</option>
                </select>
              </label>
              <label className="settings-mobile-check">
                <input type="checkbox" defaultChecked />
                <span>Require cancellation review before final cancellation</span>
              </label>
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-team-roles">
            <h2>Team roles</h2>
            <p>Role concepts for a future permissions model in the mock workspace.</p>
            <div className="settings-mobile-roles">
              {teamRoles.map((role) => (
                <article className="settings-mobile-role" key={role.name}>
                  <div>
                    <h3>{role.name}</h3>
                    <p>{role.permissions}</p>
                    <span>{role.users} users</span>
                  </div>
                  <button className="mobile-secondary-button" type="button">
                    Edit
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-notifications">
            <h2>Notifications</h2>
            <p>External channels are mock or future placeholders and are not connected.</p>
            <div className="settings-mobile-form">
              {[
                'Email alerts',
                'Slack-style digest placeholder (mock future integration)',
                'Monthly finance report reminder',
                'Renewal calendar reminder',
              ].map((label, index) => (
                <label className="settings-mobile-check" key={label}>
                  <input type="checkbox" defaultChecked={index !== 1} />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-integrations">
            <h2>Integrations</h2>
            <p>Mock future connection points for subscription and communication systems.</p>
            <div className="settings-mobile-form">
              <label className="settings-mobile-check">
                <input type="checkbox" />
                <span>Prepare accounting export placeholder</span>
              </label>
              <label className="settings-mobile-check">
                <input type="checkbox" />
                <span>Enable mock calendar handoff notes</span>
              </label>
            </div>
          </section>

          <section className="settings-mobile-card" id="mobile-billing">
            <h2>Billing</h2>
            <p>Portfolio placeholder for future workspace billing and plan controls.</p>
            <div className="settings-mobile-form">
              <label>
                <span>Plan visibility</span>
                <select defaultValue="finance">
                  <option value="finance">Finance admins only</option>
                  <option value="admins">All admins</option>
                </select>
              </label>
            </div>
          </section>
        </div>
      </div>

      <div className="dashboard__header settings-desktop-header">
        <div>
          <h2 className="dashboard__title" id="settings-title">
            Settings
          </h2>
          <p className="dashboard__subtitle">
            Configure company preferences, renewal alerts, approval rules, and team roles.
          </p>
        </div>
        <div className="dashboard__actions">
          <button
            className="button-secondary"
            type="button"
            onClick={() => showConfirmation('Settings reset to the previous mock values.')}
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => showConfirmation('Settings saved for this mock workflow.')}
          >
            Save changes
          </button>
        </div>
      </div>

      {confirmationMessage ? (
        <ConfirmationToast
          message={confirmationMessage}
          onClose={() => setConfirmationMessage('')}
          type="success"
        />
      ) : null}

      <div className="settings-layout settings-desktop-layout">
        <aside className="settings-tabs settings-subnav" aria-label="Settings sections">
          {settingsSections.map((item) => (
            <button
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={
                activeSection === item.id
                  ? 'settings-tabs__item settings-tabs__item--active'
                  : 'settings-tabs__item'
              }
              key={item.id}
              onClick={() => handleSectionClick(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </aside>

        <div className="settings-content">
      <div className="settings-grid">
        <section
          className="card settings-section"
          id="company-profile"
          aria-labelledby="company-profile-title"
        >
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="company-profile-title">Company profile</h2>
              <p>Basic workspace information for the mock Renewly environment.</p>
            </div>
          </div>
          <div className="settings-form-grid">
            <label className="settings-field">
              <span>Company name</span>
              <input defaultValue="Acme Operations Group" />
            </label>
            <label className="settings-field">
              <span>Workspace name</span>
              <input defaultValue="Acme SaaS Renewals" />
            </label>
            <label className="settings-field">
              <span>Default currency</span>
              <select defaultValue="USD">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
            <label className="settings-field">
              <span>Fiscal year start</span>
              <select defaultValue="January">
                <option>January</option>
                <option>April</option>
                <option>July</option>
                <option>October</option>
              </select>
            </label>
            <label className="settings-field settings-field--wide">
              <span>Primary finance contact</span>
              <input defaultValue="Marcus Reed" />
            </label>
          </div>
        </section>

        <section
          className="card settings-section"
          id="renewal-alerts"
          aria-labelledby="alerts-title"
        >
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="alerts-title">Renewal alert preferences</h2>
              <p>Control when renewal work becomes visible to the team.</p>
            </div>
          </div>
          <div className="settings-form-grid">
            <label className="settings-field settings-field--wide">
              <span>Alert before renewal</span>
              <select value={alertWindow} onChange={(event) => setAlertWindow(event.target.value)}>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </label>
            <label className="settings-check">
              <input type="checkbox" defaultChecked />
              <span>Alert before cancellation window closes</span>
            </label>
            <label className="settings-check">
              <input type="checkbox" defaultChecked />
              <span>Weekly renewal digest</span>
            </label>
            <label className="settings-check">
              <input type="checkbox" defaultChecked />
              <span>High-risk renewal alerts</span>
            </label>
          </div>
        </section>
      </div>

      <section
        className="card settings-section"
        id="approval-rules"
        aria-labelledby="approval-rules-title"
      >
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="approval-rules-title">Approval rules</h2>
            <p>Mock safeguards that make review requirements clear before renewal decisions.</p>
          </div>
        </div>
        <div className="settings-rules-grid">
          <label className="settings-check settings-check--card">
            <input type="checkbox" defaultChecked />
            <span>Require owner review for high-risk renewals</span>
          </label>
          <label className="settings-field">
            <span>Finance approval threshold</span>
            <select
              value={costThreshold}
              onChange={(event) => setCostThreshold(event.target.value)}
            >
              <option value="5000">$5,000 annual cost</option>
              <option value="10000">$10,000 annual cost</option>
              <option value="25000">$25,000 annual cost</option>
            </select>
          </label>
          <label className="settings-field">
            <span>Low utilisation review threshold</span>
            <select
              value={utilisationThreshold}
              onChange={(event) => setUtilisationThreshold(event.target.value)}
            >
              <option value="40">Below 40%</option>
              <option value="60">Below 60%</option>
              <option value="75">Below 75%</option>
            </select>
          </label>
          <label className="settings-check settings-check--card">
            <input type="checkbox" defaultChecked />
            <span>Require cancellation review before final cancellation</span>
          </label>
        </div>
      </section>

      <section className="card settings-section" id="team-roles" aria-labelledby="roles-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="roles-title">Team roles</h2>
            <p>Role concepts for a future permissions model in the mock workspace.</p>
          </div>
        </div>
        <div className="roles-list">
          {teamRoles.map((role) => (
            <article className="role-row" key={role.name}>
              <div>
                <h3>{role.name}</h3>
                <p>{role.permissions}</p>
              </div>
              <div className="role-row__meta">
                <span>{role.users} users</span>
                <button className="button-secondary" type="button">
                  Edit
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="card settings-section"
        id="notifications"
        aria-labelledby="notifications-title"
      >
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="notifications-title">Notification preferences</h2>
            <p>External channels are mock or future placeholders and are not connected.</p>
          </div>
        </div>
        <div className="settings-rules-grid">
          <label className="settings-check settings-check--card">
            <input type="checkbox" defaultChecked />
            <span>Email alerts</span>
          </label>
          <label className="settings-check settings-check--card">
            <input type="checkbox" />
            <span>Slack-style digest placeholder (mock future integration)</span>
          </label>
          <label className="settings-check settings-check--card">
            <input type="checkbox" defaultChecked />
            <span>Monthly finance report reminder</span>
          </label>
          <label className="settings-check settings-check--card">
            <input type="checkbox" defaultChecked />
            <span>Renewal calendar reminder</span>
          </label>
        </div>
      </section>

      <section className="card settings-section" id="integrations" aria-labelledby="integrations-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="integrations-title">Integrations</h2>
            <p>Mock future connection points for subscription and communication systems.</p>
          </div>
        </div>
        <div className="settings-rules-grid">
          <label className="settings-check settings-check--card">
            <input type="checkbox" />
            <span>Prepare accounting export placeholder</span>
          </label>
          <label className="settings-check settings-check--card">
            <input type="checkbox" />
            <span>Enable mock calendar handoff notes</span>
          </label>
        </div>
      </section>

      <section className="card settings-section" id="billing" aria-labelledby="billing-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="billing-title">Billing</h2>
            <p>Portfolio placeholder for future workspace billing and plan controls.</p>
          </div>
        </div>
        <div className="settings-form-grid">
          <label className="settings-field">
            <span>Plan visibility</span>
            <select defaultValue="finance">
              <option value="finance">Finance admins only</option>
              <option value="admins">All admins</option>
            </select>
          </label>
        </div>
      </section>
        </div>
      </div>
    </section>
  )
}

export default Settings
