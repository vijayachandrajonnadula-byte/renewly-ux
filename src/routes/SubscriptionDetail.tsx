import { useMemo, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'
import { usageRecords } from '../data/usage'
import { vendors } from '../data/vendors'

const selectedSubscriptionId = 'sub-forge-analytics'
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
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))

const formatShortDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${value}T00:00:00`))

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

function SubscriptionDetail() {
  const [confirmationMessage, setConfirmationMessage] = useState('')
  const subscription = subscriptions.find((item) => item.id === selectedSubscriptionId)

  if (!subscription) {
    return null
  }

  const vendor = vendors.find((item) => item.id === subscription.vendorId)
  const usage = usageRecords.find((item) => item.subscriptionId === subscription.id)
  const savings = savingsOpportunities.find((item) => item.subscriptionId === subscription.id)
  const utilisationPercentage =
    usage?.utilisationPercentage ??
    Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)
  const inactiveSeats =
    usage?.inactiveUsers ?? subscription.seatsPurchased - subscription.activeUsers
  const daysUntilRenewal = Math.ceil(
    (new Date(`${subscription.renewalDate}T00:00:00`).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  )
  const recommendation = useMemo(() => {
    if (subscription.renewalRisk === 'high' && utilisationPercentage < 60) {
      return 'Review before approving renewal'
    }

    if (subscription.approvalStatus === 'needs_info' || subscription.approvalStatus === 'pending') {
      return 'Owner confirmation needed before renewal'
    }

    return 'Renewal appears ready for approval'
  }, [subscription.approvalStatus, subscription.renewalRisk, utilisationPercentage])

  const showConfirmation = (message: string) => {
    setConfirmationMessage(message)
  }

  const workflowSteps = [
    {
      detail: 'Owner · Design · Reviewing usage and seat need',
      name: subscription.owner,
      status: 'In progress',
      tone: 'warning',
    },
    {
      detail: 'Finance approver · Triggered above $2,000 threshold',
      name: 'Priya Patel',
      status: 'Up next',
      tone: 'info',
    },
    {
      detail: 'CFO sign-off · Required for high-risk renewals',
      name: 'Daniel Reeves',
      status: 'Queued',
      tone: 'neutral',
    },
  ]

  const contractRows = [
    ['Renewal date', formatDate(subscription.renewalDate)],
    ['Renewal type', 'Auto-renew · 12-month term'],
    ['Notice period', `30 days · ends May 28, 2026`],
    ['Billing cycle', labelFromValue(subscription.billingCycle)],
    ['Contract value', `${formatCurrency(subscription.annualCost)} USD`],
    ['Last renewed', 'Jun 02, 2025'],
    ['Payment method', vendor?.paymentMethod ?? 'Corporate card · ending 4022'],
    ['Document', 'Forge_Analytics_MSA_2025.pdf · 2.1 MB'],
  ]

  const glanceRows = [
    ['Tool', subscription.toolName],
    ['Vendor', subscription.vendorName],
    ['Category', subscription.category],
    ['Owner', subscription.owner],
    ['Department', subscription.department],
    ['Status', labelFromValue(subscription.status)],
    ['Started', 'Jun 02, 2024'],
  ]

  return (
    <section className="detail-page detail-reference" aria-labelledby="detail-title">
      {confirmationMessage ? (
        <ConfirmationToast
          message={confirmationMessage}
          onClose={() => setConfirmationMessage('')}
        />
      ) : null}

      <header className="detail-reference-hero card">
        <div className="detail-reference-hero__top">
          <div className="detail-reference-hero__identity">
            <span className="detail-tool-icon" aria-hidden="true">
              {subscription.toolName.charAt(0)}
            </span>
            <div>
              <div className="detail-reference-hero__title-row">
                <h2 id="detail-title">{subscription.toolName}</h2>
                <RiskBadge risk={subscription.renewalRisk} />
                <StatusBadge status={subscription.status} />
              </div>
              <div className="detail-reference-hero__meta">
                <span>{subscription.vendorName}</span>
                <span>{subscription.category}</span>
                <span>
                  <strong>{subscription.owner}</strong>
                  {'\u00A0'}· {subscription.department}
                </span>
              </div>
              <a className="detail-reference-hero__link" href="#" onClick={(event) => event.preventDefault()}>
                forge-analytics.example
              </a>
            </div>
          </div>

          <div className="detail-reference-actions">
            <button
              className="button-secondary"
              onClick={() => showConfirmation('Owner review requested.')}
              type="button"
            >
              Request owner review
            </button>
            <button
              className="button-secondary"
              onClick={() => showConfirmation('Summary export prepared for mock workflow.')}
              type="button"
            >
              Export summary
            </button>
            <button
              onClick={() => showConfirmation('Renewal decision review started for mock workflow.')}
              type="button"
            >
              Review renewal decision
              <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </div>

        <nav className="detail-tabs" aria-label="Subscription detail sections">
          {['Overview', 'Usage', 'Contract', 'Activity', 'Notes'].map((tab, index) => (
            <button className={index === 0 ? 'detail-tabs__active' : ''} key={tab} type="button">
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="detail-reference-layout">
        <main className="detail-reference-main">
          <section className="detail-recommendation card" aria-labelledby="recommendation-title">
            <span className="detail-recommendation__icon" aria-hidden="true">
              !
            </span>
            <div>
              <h2 id="recommendation-title">Recommendation: {recommendation}</h2>
              <p>
                {subscription.toolName} is showing low utilisation, with {inactiveSeats} of{' '}
                {subscription.seatsPurchased} seats inactive. Renewal is in {daysUntilRenewal} days
                at a fixed annual price of <strong>{formatCurrency(subscription.annualCost)}</strong>.
                Reducing seats could unlock an estimated{' '}
                <strong className="detail-savings-text">
                  {savings ? formatCurrency(savings.estimatedAnnualSavings) : '$0'}
                </strong>{' '}
                in annual savings.
              </p>
              <div className="detail-signal-row">
                <span className="detail-signal detail-signal--danger">
                  Seat utilisation · {utilisationPercentage}%
                </span>
                <span className="detail-signal detail-signal--warning">
                  Cancellation window closes May 28
                </span>
                <span className="detail-signal">Locked-in annual contract</span>
              </div>
            </div>
          </section>

          <section className="detail-reference-metrics" aria-label="Subscription decision metrics">
            <MetricCard
              helper={`Annual · ${formatCurrency(subscription.annualCost)}`}
              icon="money"
              label="Monthly cost"
              tone="primary"
              value={formatCurrency(subscription.monthlyCost)}
            />
            <MetricCard
              helper={`${utilisationPercentage}% used · ${inactiveSeats} inactive`}
              icon="alert"
              label="Seats · utilisation"
              tone="danger"
              value={`${subscription.activeUsers}/${subscription.seatsPurchased}`}
            />
            <MetricCard
              helper={`${formatShortDate(subscription.renewalDate)} · ${labelFromValue(
                subscription.billingCycle,
              )}`}
              icon="calendar"
              label="Days to renewal"
              tone="primary"
              value={String(daysUntilRenewal)}
            />
          </section>

          <section className="detail-reference-card card" aria-labelledby="contract-title">
            <div className="detail-reference-card__header">
              <div>
                <h2 id="contract-title">Renewal & contract</h2>
              </div>
              <button className="detail-text-button" type="button">
                Edit
              </button>
            </div>
            <div className="detail-row-table">
              {contractRows.map(([label, value]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-reference-card card" aria-labelledby="approval-title">
            <div className="detail-reference-card__header">
              <div>
                <h2 id="approval-title">Approval workflow</h2>
                <p>Triggered by high-risk flag and finance threshold.</p>
              </div>
            </div>
            <div className="approval-workflow-list">
              {workflowSteps.map((step, index) => (
                <article className="approval-workflow-step" key={step.name}>
                  <span className="approval-workflow-step__number">{index + 1}</span>
                  <div>
                    <h3>{step.name}</h3>
                    <p>{step.detail}</p>
                  </div>
                  <span className={`workflow-status workflow-status--${step.tone}`}>
                    {step.status}
                  </span>
                </article>
              ))}
            </div>
          </section>

          {savings ? (
            <section className="detail-savings-panel card" aria-labelledby="savings-detail-title">
              <span className="detail-savings-panel__icon" aria-hidden="true">
                $
              </span>
              <div>
                <h2 id="savings-detail-title">
                  Estimated annual savings{' '}
                  <strong>{formatCurrency(savings.estimatedAnnualSavings)}</strong>
                </h2>
                <p>
                  {savings.recommendedAction}. Based on mock usage data: {savings.reason}. Review
                  with the owner before applying.
                </p>
                <div className="detail-savings-panel__actions">
                  <button
                    onClick={() => showConfirmation('Seat reduction marked for review.')}
                    type="button"
                  >
                    {savings.recommendedAction}
                  </button>
                  <button className="button-secondary" type="button">
                    Open opportunity
                  </button>
                  <span className="savings-chip">{labelFromValue(savings.confidence)} confidence</span>
                </div>
              </div>
            </section>
          ) : null}
        </main>

        <aside className="detail-reference-sidebar" aria-label="Subscription detail side panel">
          <section className="detail-side-card card" aria-labelledby="glance-title">
            <h2 id="glance-title">At a glance</h2>
            <div className="detail-row-table detail-row-table--compact">
              {glanceRows.map(([label, value]) => (
                <div className="detail-row" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-side-card card" aria-labelledby="decision-title">
            <h2 id="decision-title">Decision</h2>
            <p>Actions are reviewed and recorded. None are immediate.</p>
            <div className="detail-decision-stack">
              <button onClick={() => showConfirmation('Renewal approved for mock workflow.')} type="button">
                Approve renewal
              </button>
              <button
                className="button-secondary"
                onClick={() => showConfirmation('Owner review requested.')}
                type="button"
              >
                Request owner review
              </button>
              <button
                className="button-secondary"
                onClick={() => showConfirmation('Seat reduction marked for review.')}
                type="button"
              >
                Reduce seats
              </button>
              <button
                className="button-secondary button-secondary--danger"
                onClick={() => showConfirmation('Cancellation review started.')}
                type="button"
              >
                Mark for cancellation
              </button>
            </div>
            <small>Cancellation triggers a 2-step review before anything is cancelled.</small>
          </section>

          <section className="detail-side-card card" aria-labelledby="related-title">
            <h2 id="related-title">Related tools</h2>
            <p>Potential overlap detected.</p>
            <div className="related-tools-list">
              {[
                ['Crater Docs', 'Same team · overlapping use', '24%'],
                ['Sonar Insights', 'Similar analytics scope', '33%'],
              ].map(([name, reason, overlap]) => (
                <article className="related-tool-row" key={name}>
                  <span aria-hidden="true">{name.charAt(0)}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{reason}</p>
                  </div>
                  <strong>{overlap}</strong>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default SubscriptionDetail
