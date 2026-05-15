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
  new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))

function CalendarCard({ daysUntilRenewal, hasSavingsOpportunity, subscription }: CalendarCardProps) {
  const isPendingApproval =
    subscription.approvalStatus === 'pending' || subscription.approvalStatus === 'needs_info'

  return (
    <article
      className={`card calendar-card${
        subscription.renewalRisk === 'high' ? ' calendar-card--high-risk' : ''
      }`}
    >
      <div className="calendar-card__header">
        <div>
          <h3>{subscription.toolName}</h3>
          <p>{subscription.vendorName}</p>
        </div>
        <RiskBadge risk={subscription.renewalRisk} />
      </div>

      <div className="calendar-card__facts">
        <div>
          <span>Owner</span>
          <strong>{subscription.owner}</strong>
        </div>
        <div>
          <span>Department</span>
          <strong>{subscription.department}</strong>
        </div>
        <div>
          <span>Renewal date</span>
          <strong>{formatDate(subscription.renewalDate)}</strong>
        </div>
        <div>
          <span>Days until renewal</span>
          <strong>{daysUntilRenewal}</strong>
        </div>
        <div>
          <span>Annual cost</span>
          <strong>{formatCurrency(subscription.annualCost)}</strong>
        </div>
        <div>
          <span>Cancellation window</span>
          <strong>{subscription.cancellationWindowDays} days</strong>
        </div>
      </div>

      <div className="calendar-card__footer">
        <StatusBadge status={subscription.approvalStatus} />
        {isPendingApproval ? <span className="incomplete-pill">Approval incomplete</span> : null}
        {hasSavingsOpportunity ? <span className="opportunity-pill">Potential savings review</span> : null}
      </div>
    </article>
  )
}

export default CalendarCard
