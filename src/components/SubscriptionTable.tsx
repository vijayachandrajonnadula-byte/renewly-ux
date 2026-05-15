import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
import type { Subscription } from '../types'

type SubscriptionTableProps = {
  onOpenDetail?: (subscription: Subscription) => void
  subscriptions: Subscription[]
}

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

const today = new Date('2026-05-15T00:00:00')
const thirtyDaysFromToday = new Date(today)
thirtyDaysFromToday.setDate(today.getDate() + 30)

const isWithinNextThirtyDays = (dateValue: string) => {
  const renewalDate = new Date(`${dateValue}T00:00:00`)

  return renewalDate >= today && renewalDate <= thirtyDaysFromToday
}

const getUtilisation = (subscription: Subscription) =>
  Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)

const getDaysUntilRenewal = (dateValue: string) => {
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

function SubscriptionTable({ onOpenDetail, subscriptions }: SubscriptionTableProps) {
  return (
    <div className="table-shell" role="region" aria-label="Subscriptions table" tabIndex={0}>
      <table className="subscription-table">
        <colgroup>
          <col className="subscription-table__select-col" />
          <col className="subscription-table__tool-col" />
          <col className="subscription-table__owner-col" />
          <col className="subscription-table__cost-col" />
          <col className="subscription-table__renewal-col" />
          <col className="subscription-table__seats-col" />
          <col className="subscription-table__badge-col" />
          <col className="subscription-table__badge-col" />
          <col className="subscription-table__badge-col" />
          <col className="subscription-table__action-col" />
        </colgroup>
        <thead>
          <tr>
            <th aria-label="Select subscription"></th>
            <th>Tool / Vendor</th>
            <th>Owner / Department</th>
            <th>Cost / Mo</th>
            <th>Renews</th>
            <th>Seats / Utilisation</th>
            <th>Risk</th>
            <th>Approval</th>
            <th>Status</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => {
            const utilisation = getUtilisation(subscription)
            const daysUntilRenewal = getDaysUntilRenewal(subscription.renewalDate)
            const renewalSoon = isWithinNextThirtyDays(subscription.renewalDate)
            const lowUtilisation = utilisation < 60

            return (
              <tr
                className={[
                  'subscription-table__row',
                  subscription.renewalRisk === 'high' ? 'subscription-table__row--high-risk' : '',
                ].join(' ')}
                key={subscription.id}
                onClick={() => onOpenDetail?.(subscription)}
              >
                <td>
                  <input
                    aria-label={`Select ${subscription.toolName}`}
                    className="subscription-table__checkbox"
                    onClick={(event) => event.stopPropagation()}
                    type="checkbox"
                  />
                </td>
                <td>
                  <div className="table-tool-cell">
                    <span className="tool-avatar" aria-hidden="true">
                      {subscription.toolName.charAt(0)}
                    </span>
                    <div>
                      <strong>{subscription.toolName}</strong>
                      <span>{subscription.vendorName} · {subscription.category}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-owner-cell">
                    <span className="owner-avatar" aria-hidden="true">
                      {getInitials(subscription.owner)}
                    </span>
                    <div>
                      <strong>{subscription.owner}</strong>
                      <span>{subscription.department}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-cost-cell">
                    <strong>{formatCurrency(subscription.monthlyCost)}</strong>
                    <span>{subscription.billingCycle}</span>
                  </div>
                </td>
                <td>
                  <div className="table-renewal-cell">
                    <strong>{formatDate(subscription.renewalDate)}</strong>
                    <span className={renewalSoon ? 'table-renewal-cell__soon' : ''}>
                      {daysUntilRenewal >= 0 ? `in ${daysUntilRenewal}d` : `${Math.abs(daysUntilRenewal)}d ago`}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="table-usage-cell">
                    <div>
                      <span>{subscription.activeUsers} / {subscription.seatsPurchased} active</span>
                      <strong className={lowUtilisation ? 'table-usage-cell__low' : ''}>{utilisation}%</strong>
                    </div>
                    <span className="usage-bar" aria-hidden="true">
                      <span style={{ width: `${Math.min(utilisation, 100)}%` }} />
                    </span>
                  </div>
                </td>
                <td>
                  <RiskBadge risk={subscription.renewalRisk} />
                </td>
                <td>
                  <StatusBadge status={subscription.approvalStatus} />
                </td>
                <td>
                  <StatusBadge status={subscription.status} />
                </td>
                <td>
                  <button
                    className="table-action-button"
                    onClick={(event) => event.stopPropagation()}
                    type="button"
                    aria-label={`Open actions for ${subscription.toolName}`}
                  >
                    ...
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionTable
