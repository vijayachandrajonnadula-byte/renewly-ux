import { useMemo, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'
import { usageRecords } from '../data/usage'
import { vendors } from '../data/vendors'

const selectedSubscriptionId = 'sub-pixelboard'
const today = new Date('2026-05-15T00:00:00')

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
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
  const approval = approvalRequests.find((item) => item.subscriptionId === subscription.id)
  const savings = savingsOpportunities.find((item) => item.subscriptionId === subscription.id)
  const utilisationPercentage =
    usage?.utilisationPercentage ??
    Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)
  const inactiveSeats =
    usage?.inactiveUsers ?? subscription.seatsPurchased - subscription.activeUsers
  const costPerActiveUser = subscription.activeUsers
    ? subscription.monthlyCost / subscription.activeUsers
    : 0
  const daysUntilRenewal = Math.ceil(
    (new Date(`${subscription.renewalDate}T00:00:00`).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  )
  const recommendation = useMemo(() => {
    if (subscription.renewalRisk === 'high' && utilisationPercentage < 60) {
      return 'Review recommended: potential seat reduction and owner confirmation needed before renewal.'
    }

    if (subscription.approvalStatus === 'needs_info' || subscription.approvalStatus === 'pending') {
      return 'Review recommended: owner confirmation needed before the renewal decision is final.'
    }

    if (subscription.renewalRisk === 'low') {
      return 'Renewal appears low risk based on the current mock subscription summary.'
    }

    return 'Review recommended: confirm renewal context before taking action.'
  }, [subscription.approvalStatus, subscription.renewalRisk, utilisationPercentage])

  const showConfirmation = (message: string) => {
    setConfirmationMessage(message)
  }

  const timelineEvents = [
    {
      date: '2025-05-28',
      title: 'Subscription added',
      body: `${subscription.toolName} added to the mock Renewly workspace.`,
    },
    {
      date: '2026-04-18',
      title: 'Owner assigned',
      body: `${subscription.owner} assigned as department owner.`,
    },
    {
      date: subscription.lastReviewedDate,
      title: 'Usage reviewed',
      body: `${utilisationPercentage}% utilisation noted for renewal planning.`,
    },
    {
      date: approval?.submittedDate ?? '2026-05-14',
      title: 'Approval requested',
      body: approval?.requestedDecision ?? 'Approval request prepared for renewal review.',
    },
    {
      date: '2026-05-15',
      title: 'Renewal review pending',
      body: 'Decision actions are available for the mock workflow.',
    },
  ]

  return (
    <section className="detail-page" aria-labelledby="detail-title">
      <div className="detail-hero card">
        <div className="detail-hero__main">
          <div className="detail-hero__eyebrow">
            {subscription.vendorName} · {subscription.category}
          </div>
          <h2 id="detail-title">{subscription.toolName}</h2>
          <div className="detail-hero__meta">
            <span>Owner: {subscription.owner}</span>
            <span>Department: {subscription.department}</span>
            <RiskBadge risk={subscription.renewalRisk} />
            <StatusBadge status={subscription.status} />
          </div>
        </div>
        <div className="dashboard__actions">
          <button type="button" onClick={() => showConfirmation('Renewal decision review started for mock workflow.')}>
            Review renewal decision
          </button>
          <button className="button-secondary" type="button" onClick={() => showConfirmation('Owner review requested.')}>
            Request owner review
          </button>
          <button className="button-secondary" type="button" onClick={() => showConfirmation('Summary export prepared for mock workflow.')}>
            Export summary
          </button>
        </div>
      </div>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <section className="card decision-summary" aria-labelledby="decision-summary-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="decision-summary-title">Renewal decision summary</h2>
            <p>{recommendation}</p>
          </div>
        </div>
        <div className="detail-fact-grid">
          <div className="detail-fact">
            <span>Renewal date</span>
            <strong>{formatDate(subscription.renewalDate)}</strong>
          </div>
          <div className="detail-fact">
            <span>Days until renewal</span>
            <strong>{daysUntilRenewal}</strong>
          </div>
          <div className="detail-fact">
            <span>Annual cost</span>
            <strong>{formatCurrency(subscription.annualCost)}</strong>
          </div>
          <div className="detail-fact">
            <span>Monthly cost</span>
            <strong>{formatCurrency(subscription.monthlyCost)}</strong>
          </div>
          <div className="detail-fact">
            <span>Seats purchased</span>
            <strong>{subscription.seatsPurchased}</strong>
          </div>
          <div className="detail-fact">
            <span>Active users</span>
            <strong>{subscription.activeUsers}</strong>
          </div>
          <div className="detail-fact">
            <span>Seat utilisation</span>
            <strong className={utilisationPercentage < 60 ? 'detail-value--warning' : ''}>
              {utilisationPercentage}%
            </strong>
          </div>
          <div className="detail-fact">
            <span>Approval status</span>
            <StatusBadge status={subscription.approvalStatus} />
          </div>
          <div className="detail-fact">
            <span>Cancellation window</span>
            <strong>{subscription.cancellationWindowDays} days</strong>
          </div>
        </div>
      </section>

      <section className="detail-metrics" aria-label="Cost and usage metrics">
        <MetricCard
          helper="Mock subscription cost"
          label="Monthly cost"
          tone="primary"
          value={formatCurrency(subscription.monthlyCost)}
        />
        <MetricCard
          helper="Mock annual contract value"
          label="Annual cost"
          value={formatCurrency(subscription.annualCost)}
        />
        <MetricCard
          helper="Monthly cost divided by active users"
          label="Cost per active user"
          tone="warning"
          value={formatCurrency(costPerActiveUser)}
        />
        <MetricCard
          helper={`${inactiveSeats} inactive seats`}
          label="Seat utilisation"
          tone={utilisationPercentage < 60 ? 'warning' : 'success'}
          value={`${utilisationPercentage}%`}
        />
      </section>

      <div className="detail-grid">
        <section className="card detail-section" aria-labelledby="contract-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="contract-title">Renewal and contract</h2>
              <p>Key contract details needed before a renewal decision.</p>
            </div>
          </div>
          <div className="detail-list">
            <div><span>Renewal date</span><strong>{formatDate(subscription.renewalDate)}</strong></div>
            <div><span>Billing cycle</span><strong>{labelFromValue(subscription.billingCycle)}</strong></div>
            <div><span>Cancellation window</span><strong>{subscription.cancellationWindowDays} days</strong></div>
            <div><span>Last reviewed</span><strong>{formatDate(subscription.lastReviewedDate)}</strong></div>
            <div><span>Contract owner</span><strong>{vendor?.contractOwner ?? subscription.owner}</strong></div>
            <div><span>Payment method</span><strong>{vendor?.paymentMethod ?? 'Mock payment method unavailable'}</strong></div>
          </div>
          <p className="detail-note">{subscription.contractNotes}</p>
        </section>

        <section className="card detail-section" aria-labelledby="approval-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="approval-title">Approval workflow</h2>
              <p>Current approval context for this renewal.</p>
            </div>
          </div>
          <div className="detail-list">
            <div><span>Current status</span><StatusBadge status={subscription.approvalStatus} /></div>
            <div><span>Requested decision</span><strong>{approval?.requestedDecision ?? 'No related request'}</strong></div>
            <div><span>Reason for review</span><strong>{approval?.reasonForReview ?? 'No review reason recorded'}</strong></div>
            <div><span>Submitted by</span><strong>{approval?.submittedBy ?? 'Not submitted'}</strong></div>
            <div><span>Submitted date</span><strong>{approval ? formatDate(approval.submittedDate) : 'Not submitted'}</strong></div>
            <div><span>Next action</span><strong>Confirm owner input before final approval.</strong></div>
          </div>
        </section>
      </div>

      {savings ? (
        <section className="card detail-section savings-opportunity-panel" aria-labelledby="savings-detail-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="savings-detail-title">Savings opportunity</h2>
              <p>Mock estimated potential only. Review recommended before any decision.</p>
            </div>
            <span className="badge status-badge status-badge--info">{savings.confidence} confidence</span>
          </div>
          <div className="detail-fact-grid">
            <div className="detail-fact">
              <span>Opportunity type</span>
              <strong>{labelFromValue(savings.type)}</strong>
            </div>
            <div className="detail-fact">
              <span>Estimated monthly potential</span>
              <strong>{formatCurrency(savings.estimatedMonthlySavings)}</strong>
            </div>
            <div className="detail-fact">
              <span>Estimated annual potential</span>
              <strong>{formatCurrency(savings.estimatedAnnualSavings)}</strong>
            </div>
            <div className="detail-fact">
              <span>Risk level</span>
              <RiskBadge risk={savings.riskLevel} />
            </div>
          </div>
          <div className="detail-note">
            <strong>Reason:</strong> {savings.reason}
            <br />
            <strong>Review recommended:</strong> {savings.recommendedAction}
          </div>
        </section>
      ) : null}

      <div className="detail-grid">
        <section className="card detail-section" aria-labelledby="timeline-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="timeline-title">Activity timeline</h2>
              <p>Simple mock history for renewal review context.</p>
            </div>
          </div>
          <div className="timeline">
            {timelineEvents.map((event) => (
              <article className="timeline__item" key={`${event.date}-${event.title}`}>
                <time>{formatDate(event.date)}</time>
                <h3>{event.title}</h3>
                <p>{event.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="card detail-section decision-actions-panel" aria-labelledby="actions-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="actions-title">Decision actions</h2>
              <p>Local mock workflow actions. No backend changes are made.</p>
            </div>
          </div>
          <div className="decision-actions">
            <button type="button" onClick={() => showConfirmation('Renewal approved for mock workflow.')}>
              Approve renewal
            </button>
            <button className="button-secondary" type="button" onClick={() => showConfirmation('Owner review requested.')}>
              Request owner review
            </button>
            <button className="button-secondary" type="button" onClick={() => showConfirmation('Seat reduction marked for review.')}>
              Reduce seats
            </button>
            <button className="button-secondary button-secondary--danger" type="button" onClick={() => showConfirmation('Cancellation review started.')}>
              Mark for cancellation
            </button>
          </div>
        </section>
      </div>
    </section>
  )
}

export default SubscriptionDetail
