import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
import type { Subscription } from '../types'

type CalendarCardProps = {
  daysUntilRenewal: number
  subscription: Subscription
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const getMonth = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(new Date(`${value}T00:00:00`))
    .toUpperCase()

const getDay = (value: string) =>
  new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(new Date(`${value}T00:00:00`))

const getInitials = (value: string) =>
  value
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

function CalendarCard({ daysUntilRenewal, subscription }: CalendarCardProps) {
  const isHighRisk = subscription.renewalRisk === 'high'

  return (
    <article className="renewal-card-reference">
      <div className={`renewal-date-block${isHighRisk ? ' renewal-date-block--risk' : ''}`}>
        <span>{getMonth(subscription.renewalDate)}</span>
        <strong>{getDay(subscription.renewalDate)}</strong>
      </div>

      <div className="renewal-card-reference__body">
        <div className="renewal-card-reference__identity">
          <span className="renewal-tool-icon" aria-hidden="true">
            {subscription.toolName.charAt(0)}
          </span>
          <div>
            <h3>{subscription.toolName}</h3>
            <p>
              {subscription.vendorName} {'\u00B7'} {subscription.category}
            </p>
          </div>
        </div>

        <div className="renewal-owner-line">
          <span className="renewal-owner-avatar" aria-hidden="true">
            {getInitials(subscription.owner)}
          </span>
          <span>{subscription.owner}</span>
        </div>

        <div className="renewal-card-reference__meta">
          <p>
            <strong>{formatCurrency(subscription.monthlyCost)}</strong>
            <span>/mo</span>
            <span>{'\u00B7'}</span>
            <span>{labelFromValue(subscription.billingCycle)}</span>
          </p>
          <em>in {daysUntilRenewal} days</em>
        </div>

        <div className="renewal-card-reference__badges">
          <RiskBadge risk={subscription.renewalRisk} />
          <StatusBadge status={subscription.approvalStatus} />
          <span className="renewal-cancel-window">
            {subscription.cancellationWindowDays}d cancellation window
          </span>
        </div>
      </div>
    </article>
  )
}

export default CalendarCard
