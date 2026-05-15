import { useState } from 'react'
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

function Settings() {
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const [alertWindow, setAlertWindow] = useState('60')
  const [costThreshold, setCostThreshold] = useState('10000')
  const [utilisationThreshold, setUtilisationThreshold] = useState('60')

  const showConfirmation = (message: string) => {
    setConfirmationMessage(message)
  }

  return (
    <section className="settings-page" aria-labelledby="settings-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="settings-title">
            Settings
          </h2>
          <p className="dashboard__subtitle">
            Manage company preferences, renewal alerts, approval rules, and team roles.
          </p>
        </div>
        <div className="dashboard__actions">
          <button
            type="button"
            onClick={() => showConfirmation('Settings saved for this mock workflow.')}
          >
            Save changes
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => showConfirmation('Settings reset to the previous mock values.')}
          >
            Reset changes
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

      <div className="settings-layout">
        <aside className="settings-tabs" aria-label="Settings sections">
          {[
            'Company profile',
            'Renewal alerts',
            'Approval rules',
            'Team roles',
            'Notifications',
            'Integrations',
            'Billing',
          ].map((item, index) => (
            <button
              className={index === 0 ? 'settings-tabs__item settings-tabs__item--active' : 'settings-tabs__item'}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </aside>

        <div className="settings-content">
      <div className="settings-grid">
        <section className="card settings-section" aria-labelledby="company-profile-title">
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

        <section className="card settings-section" aria-labelledby="alerts-title">
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

      <section className="card settings-section" aria-labelledby="approval-rules-title">
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

      <section className="card settings-section" aria-labelledby="roles-title">
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

      <section className="card settings-section" aria-labelledby="notifications-title">
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
        </div>
      </div>
    </section>
  )
}

export default Settings
