import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
import type { Subscription } from '../types'

type CalendarCardProps = {
  daysUntilRenewal: number
  hasSavingsOpportunity: boolean
  subscription: Subscription
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(
    new Date(`${value}T00:00:00`),
  )

const getMonth = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(new Date(`${value}T00:00:00`))
    .toUpperCase()

const getDay = (value: string) =>
  new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(new Date(`${value}T00:00:00`))

function CalendarCard({ daysUntilRenewal, hasSavingsOpportunity, subscription }: CalendarCardProps) {
  const isPendingApproval =
    subscription.approvalStatus === 'pending' || subscription.approvalStatus === 'needs_info'

  return (
    <article
      className={`card calendar-card${
        subscription.renewalRisk === 'high' ? ' calendar-card--high-risk' : ''
      }`}
    >
      <div className="calendar-card__content">
        <div className={`calendar-date-block${subscription.renewalRisk === 'high' ? ' calendar-date-block--risk' : ''}`}>
          <span>{getMonth(subscription.renewalDate)}</span>
          <strong>{getDay(subscription.renewalDate)}</strong>
        </div>
        <div className="calendar-card__main">
          <div className="calendar-card__header">
            <div>
              <h3>{subscription.toolName}</h3>
              <p>{subscription.vendorName} · {subscription.category}</p>
            </div>
          </div>
          <div className="calendar-card__owner">
            <span className="owner-avatar" aria-hidden="true">
              {subscription.owner.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2)}
            </span>
            <span>{subscription.owner}</span>
          </div>
          <div className="calendar-card__cost-row">
            <strong>{formatCurrency(subscription.monthlyCost)}</strong>
            <span>/mo · {subscription.billingCycle}</span>
            <em>in {daysUntilRenewal} days</em>
          </div>
          <div className="calendar-card__footer">
            <RiskBadge risk={subscription.renewalRisk} />
            <StatusBadge status={subscription.approvalStatus} />
          </div>
        </div>
      </div>
      <div className="calendar-card__signals">
        <span>{formatDate(subscription.renewalDate)} renewal</span>
        <span>{subscription.cancellationWindowDays}d cancellation window</span>
        {isPendingApproval ? <span className="incomplete-pill">Approval incomplete</span> : null}
        {hasSavingsOpportunity ? <span className="opportunity-pill">Potential savings review</span> : null}
      </div>
    </article>
  )
}

export default CalendarCard
