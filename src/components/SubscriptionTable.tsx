import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
import type { Subscription } from '../types'

type SubscriptionTableProps = {
  onOpenDetail?: (subscription: Subscription) => void
  subscriptions: Subscription[]
}

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

const daysUntilRenewal = (dateValue: string) => {
  const renewalDate = new Date(`${dateValue}T00:00:00`)
  const difference = renewalDate.getTime() - today.getTime()

  return Math.ceil(difference / (1000 * 60 * 60 * 24))
}

const getInitials = (value: string) =>
  value
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const getUtilisation = (subscription: Subscription) =>
  Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

function SubscriptionTable({ onOpenDetail, subscriptions }: SubscriptionTableProps) {
  return (
    <div className="subscription-table-shell" role="region" aria-label="Subscriptions table" tabIndex={0}>
      <div className="subscription-grid subscription-grid--header" role="row">
        <div aria-label="Select subscription" />
        <div>Tool / Vendor</div>
        <div>Owner</div>
        <div>Cost</div>
        <div>Renews</div>
        <div>Seats / Utilisation</div>
        <div>Risk</div>
        <div>Approval</div>
        <div>Status</div>
        <div aria-label="Actions" />
      </div>

      <div className="subscription-table-body">
        {subscriptions.map((subscription) => {
          const utilisation = getUtilisation(subscription)
          const daysRemaining = daysUntilRenewal(subscription.renewalDate)
          const lowUtilisation = utilisation < 60
          const urgentRenewal = daysRemaining <= 14

          return (
            <div
              className="subscription-grid subscription-grid--row"
              key={subscription.id}
              onClick={() => onOpenDetail?.(subscription)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onOpenDetail?.(subscription)
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span className="subscription-checkbox-cell" onClick={(event) => event.stopPropagation()}>
                <input
                  aria-label={`Select ${subscription.toolName}`}
                  className="subscription-table__checkbox"
                  type="checkbox"
                />
              </span>

              <span className="subscription-tool-cell">
                <span className="subscription-tool-icon" aria-hidden="true">
                  {subscription.toolName.charAt(0)}
                </span>
                <span>
                  <strong>{subscription.toolName}</strong>
                  <small>{subscription.vendorName} · {subscription.category}</small>
                </span>
              </span>

              <span className="subscription-owner-cell">
                <span className="subscription-owner-avatar" aria-hidden="true">
                  {getInitials(subscription.owner)}
                </span>
                <span>
                  <strong>{subscription.owner}</strong>
                  <small>{subscription.department}</small>
                </span>
              </span>

              <span className="subscription-cost-cell">
                <strong>{formatCurrency(subscription.monthlyCost)}</strong>
                <small>{labelFromValue(subscription.billingCycle)} billing</small>
              </span>

              <span className="subscription-renewal-cell">
                <strong>{formatDate(subscription.renewalDate)}</strong>
                <small className={urgentRenewal ? 'subscription-renewal-cell__urgent' : ''}>
                  {daysRemaining >= 0 ? `in ${daysRemaining}d` : `${Math.abs(daysRemaining)}d ago`}
                </small>
              </span>

              <span className="subscription-usage-cell">
                <span>
                  <small>
                    {subscription.activeUsers} / {subscription.seatsPurchased} active
                  </small>
                  <strong className={lowUtilisation ? 'subscription-usage-cell__low' : ''}>
                    {utilisation}%
                  </strong>
                </span>
                <span
                  className={`subscription-usage-bar${lowUtilisation ? ' subscription-usage-bar--low' : ''}`}
                  aria-hidden="true"
                >
                  <span style={{ width: `${Math.min(utilisation, 100)}%` }} />
                </span>
              </span>

              <span className="subscription-badge-cell">
                <RiskBadge risk={subscription.renewalRisk} />
              </span>
              <span className="subscription-badge-cell">
                <StatusBadge status={subscription.approvalStatus} />
              </span>
              <span className="subscription-badge-cell">
                <StatusBadge status={subscription.status} />
              </span>
              <span className="subscription-action-cell">
                <span aria-hidden="true">...</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SubscriptionTable
