import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
import type { Subscription } from '../types'

type SubscriptionTableProps = {
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

function SubscriptionTable({ subscriptions }: SubscriptionTableProps) {
  return (
    <div className="table-shell" role="region" aria-label="Subscriptions table" tabIndex={0}>
      <table className="subscription-table">
        <thead>
          <tr>
            <th>Tool</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Owner</th>
            <th>Department</th>
            <th>Cost</th>
            <th>Renewal</th>
            <th>Seats</th>
            <th>Utilisation</th>
            <th>Risk</th>
            <th>Approval</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => {
            const utilisation = getUtilisation(subscription)
            const renewalSoon = isWithinNextThirtyDays(subscription.renewalDate)
            const lowUtilisation = utilisation < 60

            return (
              <tr
                className={[
                  'subscription-table__row',
                  subscription.renewalRisk === 'high' ? 'subscription-table__row--high-risk' : '',
                ].join(' ')}
                key={subscription.id}
              >
                <td>
                  <div className="table-primary-cell">
                    <strong>{subscription.toolName}</strong>
                    {renewalSoon ? <span>Renews soon</span> : null}
                  </div>
                </td>
                <td>{subscription.vendorName}</td>
                <td>{subscription.category}</td>
                <td>{subscription.owner}</td>
                <td>{subscription.department}</td>
                <td>
                  <div className="table-primary-cell">
                    <strong>{formatCurrency(subscription.annualCost)}</strong>
                    <span>{formatCurrency(subscription.monthlyCost)} / mo</span>
                  </div>
                </td>
                <td>{formatDate(subscription.renewalDate)}</td>
                <td>
                  {subscription.seatsPurchased} purchased
                  <span className="table-muted"> {subscription.activeUsers} active</span>
                </td>
                <td>
                  <span className={`utilisation-pill${lowUtilisation ? ' utilisation-pill--low' : ''}`}>
                    {utilisation}%
                  </span>
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionTable
