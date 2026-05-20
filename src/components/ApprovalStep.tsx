import RiskBadge from './RiskBadge'
import type { ApprovalRequest } from '../types'

type ApprovalStepProps = {
  approval: ApprovalRequest
  onAction: (message: string) => void
}

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

const canTakeAction = (status: ApprovalRequest['status']) =>
  status === 'pending' || status === 'needs_info'

const cleanCopy = (value: string) =>
  value.replaceAll('\u00e2\u20ac\u201d', '-').replaceAll('\u00c2\u00b7', '-')

function ApprovalStep({ approval, onAction }: ApprovalStepProps) {
  const initial = approval.toolName.charAt(0)
  const submitted = `by ${approval.submittedBy} - ${formatDate(approval.submittedDate)}`
  const actionable = canTakeAction(approval.status)

  return (
    <article className="approval-work-row">
      <div className="approval-work-row__tool">
        <span className="approval-work-row__icon" aria-hidden="true">
          {initial}
        </span>
        <div className="approval-work-row__identity">
          <div className="approval-work-row__title">
            <h3>{approval.toolName}</h3>
            <RiskBadge risk={approval.risk} />
          </div>
          <p>{cleanCopy(approval.reasonForReview)}</p>
        </div>
      </div>

      <div className="approval-work-row__cell">
        <span>Requested</span>
        <strong>{approval.requestedDecision}</strong>
        <small>{submitted}</small>
      </div>

      <div className="approval-work-row__cell">
        <span>Owner</span>
        <strong>{approval.owner}</strong>
        <small>{approval.department}</small>
      </div>

      <div className="approval-work-row__cell approval-work-row__cost">
        <span>Renews {'\u00b7'} Cost</span>
        <strong>{formatCurrency(approval.cost)}/mo</strong>
        <small>{formatDate(approval.renewalDate)}</small>
      </div>

      <div className="approval-work-row__actions" aria-label={`${approval.toolName} approval actions`}>
        {actionable ? (
          <>
            <button
              type="button"
              onClick={() => onAction('Approval marked as approved for this mock workflow.')}
            >
              Approve
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={() => onAction('Changes requested from the tool owner.')}
            >
              Request changes
            </button>
            <button
              className="button-secondary button-secondary--danger"
              type="button"
              onClick={() => onAction('Request rejected for this mock workflow.')}
            >
              Reject
            </button>
          </>
        ) : (
          <button className="button-secondary approval-work-row__view" type="button">
            View
          </button>
        )}
      </div>
    </article>
  )
}

export default ApprovalStep
