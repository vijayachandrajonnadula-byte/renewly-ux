import RiskBadge from './RiskBadge'
import type { ApprovalRequest } from '../types'

type ApprovalStepProps = {
  approval: ApprovalRequest
  nextAction: string
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
    day: 'numeric',
    month: 'short',
  }).format(new Date(`${value}T00:00:00`))

const canTakeAction = (status: ApprovalRequest['status']) =>
  status === 'pending' || status === 'needs_info'

function ApprovalStep({ approval, nextAction, onAction }: ApprovalStepProps) {
  return (
    <article className="card approval-step">
      <div className="approval-step__compact">
        <span className="tool-avatar approval-step__avatar" aria-hidden="true">
          {approval.toolName.charAt(0)}
        </span>
        <div className="approval-step__identity">
          <div className="approval-step__title-row">
            <h3>{approval.toolName}</h3>
            <RiskBadge risk={approval.risk} />
          </div>
          <p>{approval.reasonForReview}</p>
        </div>
        <div className="approval-step__requested">
          <span>Requested</span>
          <strong>{approval.requestedDecision}</strong>
          <small>by {approval.submittedBy} · {formatDate(approval.submittedDate)}</small>
        </div>
        <div className="approval-step__owner">
          <span>Owner</span>
          <strong>{approval.owner}</strong>
          <small>{approval.department}</small>
        </div>
        <div className="approval-step__cost">
          <span>Renews · Cost</span>
          <strong>{formatCurrency(approval.cost)}/mo</strong>
          <small>{formatDate(approval.renewalDate)}</small>
        </div>
      </div>

      <p className="approval-step__next">{nextAction}</p>

      {canTakeAction(approval.status) ? (
        <div className="approval-step__actions">
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
            Changes
          </button>
          <button
            className="button-secondary button-secondary--danger"
            type="button"
            onClick={() => onAction('Request rejected for this mock workflow.')}
          >
            Reject
          </button>
        </div>
      ) : (
        <div className="approval-step__actions">
          <button className="button-secondary" type="button">
            View
          </button>
        </div>
      )}
    </article>
  )
}

export default ApprovalStep
