import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'
import type { ApprovalRequest, SavingsOpportunity, Subscription } from '../types'

const today = new Date('2026-05-15T00:00:00')

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${value}T00:00:00`))

const daysUntil = (dateValue: string) =>
  Math.ceil(
    (new Date(`${dateValue}T00:00:00`).getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

const byId = <T extends { id: string }>(items: T[], ids: string[]) =>
  ids.map((id) => items.find((item) => item.id === id)).filter(Boolean) as T[]

const bySubscriptionId = <T extends { subscriptionId: string }>(items: T[], ids: string[]) =>
  ids.map((id) => items.find((item) => item.subscriptionId === id)).filter(Boolean) as T[]

const getToolLetter = (toolName: string) => toolName.charAt(0).toUpperCase()

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const getActionLabel = (action: string) =>
  action
    .replace('Reduce to 25 seats', 'Reduce seats')
    .replace('Start cancellation review', 'Cancel')
    .replace('Move to Team plan', 'Downgrade tier')

const attentionItems = byId<Subscription>(subscriptions, [
  'sub-forge-analytics',
  'sub-crater-docs',
  'sub-sonar-insights',
])

const approvalPreview = byId<ApprovalRequest>(approvalRequests, [
  'approval-pulsemail-seat-reduction',
  'approval-nimbus-renew',
  'approval-forge-renew',
  'approval-sonar-renew',
])

const urgentRenewals = byId<Subscription>(subscriptions, ['sub-threadly', 'sub-forge-analytics'])

const thirtyDayRenewals = byId<Subscription>(subscriptions, [
  'sub-cipher-vault',
  'sub-quillpad',
  'sub-pulsemail',
  'sub-sonar-insights',
])

const savingsPreview = bySubscriptionId<SavingsOpportunity>(savingsOpportunities, [
  'sub-forge-analytics',
  'sub-crater-docs',
  'sub-sonar-insights',
])

const attentionCopy: Record<string, { reason: string; timing: string }> = {
  'sub-forge-analytics': {
    reason: '38 of 60 seats inactive 60+ days',
    timing: `Renews in ${daysUntil('2026-06-02')} days`,
  },
  'sub-crater-docs': {
    reason: 'Team migrated to Quillpad; unused seats need review',
    timing: 'Cancellation window in 9 days',
  },
  'sub-sonar-insights': {
    reason: 'Only 4 of 12 seats used since onboarding',
    timing: `Renews in ${daysUntil('2026-06-28')} days`,
  },
}

function Dashboard() {
  return (
    <section className="dashboard dashboard-reference" aria-labelledby="dashboard-title">
      <div className="mobile-page mobile-dashboard" aria-label="Mobile dashboard">
        <header className="mobile-page-header">
          <h1>Dashboard</h1>
          <p>6 renewals · 3 high risk · est. $42.5K savings</p>
          <button className="mobile-primary-button" type="button">
            Review high-risk renewals
          </button>
        </header>

        <section className="mobile-kpi-grid" aria-label="Dashboard summary">
          {[
            ['Spend / mo', '$24.8K', '+3.1% vs Apr'],
            ['Renewals', '6', '$11.4K value'],
            ['High risk', '3', 'Needs review'],
            ['Est. savings', '$42.5K', 'Potential annual'],
          ].map(([label, value, helper]) => (
            <article className="mobile-kpi-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{helper}</small>
            </article>
          ))}
        </section>

        <section className="mobile-card mobile-list-card" aria-labelledby="mobile-attention-title">
          <div className="mobile-section-heading">
            <h2 id="mobile-attention-title">Needs attention</h2>
            <span>Top 3</span>
          </div>
          <div className="mobile-stack">
            {attentionItems.map((subscription) => (
              <article className="mobile-attention-row" key={subscription.id}>
                <span className="mobile-tool-icon" aria-hidden="true">
                  {getToolLetter(subscription.toolName)}
                </span>
                <div className="mobile-row-main">
                  <div className="mobile-row-title">
                    <strong>{subscription.toolName}</strong>
                    <RiskBadge risk={subscription.renewalRisk} />
                  </div>
                  <p>{subscription.vendorName}</p>
                  <small>{attentionCopy[subscription.id]?.reason}</small>
                  <em>{attentionCopy[subscription.id]?.timing}</em>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mobile-card mobile-list-card" aria-labelledby="mobile-upcoming-title">
          <div className="mobile-section-heading">
            <h2 id="mobile-upcoming-title">Upcoming</h2>
            <span>Next 30d</span>
          </div>
          <div className="mobile-stack">
            {[...urgentRenewals, ...thirtyDayRenewals].slice(0, 4).map((subscription) => (
              <article className="mobile-renewal-row" key={subscription.id}>
                <span className="mobile-date-block" aria-hidden="true">
                  <small>{formatDate(subscription.renewalDate).split(' ')[0]}</small>
                  <strong>{formatDate(subscription.renewalDate).split(' ')[1]}</strong>
                </span>
                <div className="mobile-row-main">
                  <strong>{subscription.toolName}</strong>
                  <p>
                    {subscription.vendorName} · {formatCurrency(subscription.monthlyCost)}/mo
                  </p>
                </div>
                <span className="mobile-chevron" aria-hidden="true">
                  ›
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>

      <header className="dashboard-reference__header">
        <div className="dashboard-reference__intro">
          <p className="page-kicker">Tuesday, May 15</p>
          <h2 className="dashboard-reference__title" id="dashboard-title">
            <span className="desktop-copy">Welcome back, Priya</span>
            <span className="mobile-copy">Dashboard</span>
          </h2>
          <p className="dashboard-reference__summary">
            <span className="desktop-copy">
              6 renewals in the next 30 days - 3 flagged as high risk - $42,560 in potential
              annual savings.
            </span>
            <span className="mobile-copy">6 renewals · 3 high risk · est. $42.5K savings</span>
          </p>
        </div>

        <div className="dashboard-reference__actions" aria-label="Dashboard actions">
          <button className="button-secondary dashboard-reference__secondary-action" type="button">
            View savings
          </button>
          <button className="dashboard-reference__primary-action" type="button">
            Review high-risk renewals
          </button>
        </div>
      </header>

      <div className="metrics-grid dashboard-reference__metrics" aria-label="Workspace summary">
        <MetricCard
          helper="+3.1% vs Apr across 24 tools"
          icon="money"
          label="Monthly spend"
          tone="primary"
          value="$24,820"
        />
        <MetricCard
          helper="$11,420 contract value"
          icon="calendar"
          label="Renewals - 30 days"
          tone="warning"
          value="6"
        />
        <MetricCard
          helper="Forge, Crater, Sonar"
          icon="alert"
          label="High-risk renewals"
          tone="danger"
          value="3"
        />
        <MetricCard
          helper="High conf. from 6 opportunities"
          icon="trend"
          label="Est. annual savings"
          tone="success"
          value="$42,560"
        />
      </div>

      <div className="dashboard-reference__body">
        <div className="dashboard-reference__column">
          <section className="card dashboard-card dashboard-card--attention" aria-labelledby="attention-title">
            <div className="dashboard-card__header">
              <div>
                <h2 id="attention-title">Needs attention</h2>
                <p>High-impact decisions ordered by urgency.</p>
              </div>
              <button className="dashboard-card__link" type="button">
                View all 5
              </button>
            </div>

            <div className="attention-list-reference">
              {attentionItems.map((subscription) => (
                <article className="attention-row-reference" key={subscription.id}>
                  <span className="tool-avatar tool-avatar--reference" aria-hidden="true">
                    {getToolLetter(subscription.toolName)}
                  </span>
                  <div className="attention-row-reference__content">
                    <div className="attention-row-reference__title">
                      <strong>{subscription.toolName}</strong>
                      <span>{subscription.vendorName}</span>
                    </div>
                    <span>{attentionCopy[subscription.id]?.reason}</span>
                  </div>
                  <div className="attention-row-reference__meta">
                    <RiskBadge risk={subscription.renewalRisk} />
                    <span>{attentionCopy[subscription.id]?.timing}</span>
                    <button className="button-secondary row-button" type="button">
                      Review <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="card dashboard-card" aria-labelledby="upcoming-title">
            <div className="dashboard-card__header">
              <div>
                <h2 id="upcoming-title">Upcoming renewals</h2>
                <p>Next 60 days - grouped by urgency.</p>
              </div>
              <div className="dashboard-card__controls">
                <span>Window 60 days</span>
                <button className="dashboard-card__link" type="button">
                  Open calendar <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="renewal-groups-reference">
              <RenewalGroup label="In the next 7 days" renewals={urgentRenewals} />
              <RenewalGroup label="7-30 days" renewals={thirtyDayRenewals} />
            </div>
          </section>
        </div>

        <aside className="dashboard-reference__column dashboard-reference__rail">
          <section className="card dashboard-card" aria-labelledby="approval-title">
            <div className="dashboard-card__header">
              <div>
                <h2 id="approval-title">Approval queue</h2>
                <p>5 awaiting decision.</p>
              </div>
              <button className="dashboard-card__link" type="button">
                Open queue <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="approval-preview-reference">
              {approvalPreview.map((approval) => (
                <article className="approval-preview-row" key={approval.id}>
                  <span className="tool-avatar tool-avatar--reference tool-avatar--muted" aria-hidden="true">
                    {getToolLetter(approval.toolName)}
                  </span>
                  <div className="approval-preview-row__content">
                    <strong>{approval.toolName}</strong>
                    <p>
                      <span className="owner-mini-avatar" aria-hidden="true">
                        {getInitials(approval.owner)}
                      </span>
                      {approval.owner}
                    </p>
                    <span>{approval.requestedDecision}</span>
                  </div>
                  <div className="approval-preview-row__meta">
                    <strong>{formatCurrency(approval.cost)}/mo</strong>
                    <StatusBadge status={approval.status} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="card dashboard-card" aria-labelledby="savings-preview-title">
            <div className="dashboard-card__header">
              <div>
                <h2 id="savings-preview-title">Savings opportunities</h2>
                <p>Top 3 - based on mock usage.</p>
              </div>
              <button className="dashboard-card__link" type="button">
                All 6 <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="savings-preview-reference">
              {savingsPreview.map((opportunity) => (
                <article className="savings-preview-row" key={opportunity.id}>
                  <span className="tool-avatar tool-avatar--reference" aria-hidden="true">
                    {getToolLetter(opportunity.toolName)}
                  </span>
                  <div className="savings-preview-row__content">
                    <div className="savings-preview-row__title">
                      <strong>{opportunity.toolName}</strong>
                      <span className="action-chip">{getActionLabel(opportunity.recommendedAction)}</span>
                    </div>
                    <p>
                      <strong>{formatCurrency(opportunity.estimatedAnnualSavings)}</strong>
                      <span> est. annual · {formatCurrency(opportunity.estimatedMonthlySavings)}/mo</span>
                    </p>
                    <span>{opportunity.reason}</span>
                  </div>
                  <div className="savings-preview-row__meta">
                    <span className="savings-chip">{opportunity.confidence} conf.</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

type RenewalGroupProps = {
  label: string
  renewals: Subscription[]
}

function RenewalGroup({ label, renewals }: RenewalGroupProps) {
  const isUrgent = label.includes('7 days')

  return (
    <section className="renewal-group-reference" aria-label={label}>
      <div className="renewal-group-reference__header">
        <strong className={isUrgent ? 'renewal-group-pill renewal-group-pill--urgent' : 'renewal-group-pill'}>
          {label}
        </strong>
        <span>{renewals.length} renewals</span>
      </div>
      <div className="renewal-group-reference__grid">
        {renewals.map((subscription) => (
          <article className="renewal-mini-card-reference" key={subscription.id}>
            <span className="tool-avatar tool-avatar--reference tool-avatar--small" aria-hidden="true">
              {getToolLetter(subscription.toolName)}
            </span>
            <div className="renewal-mini-card-reference__content">
              <div>
                <strong>{subscription.toolName}</strong>
                <p>{formatCurrency(subscription.monthlyCost)}</p>
              </div>
              <span>{formatDate(subscription.renewalDate)}, 2026</span>
            </div>
            <span
              className={`renewal-mini-card-reference__dot renewal-mini-card-reference__dot--${subscription.renewalRisk}`}
              aria-hidden="true"
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
