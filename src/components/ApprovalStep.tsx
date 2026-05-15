import RiskBadge from './RiskBadge'
import StatusBadge from './StatusBadge'
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
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))

const canTakeAction = (status: ApprovalRequest['status']) =>
  status === 'pending' || status === 'needs_info'

function ApprovalStep({ approval, nextAction, onAction }: ApprovalStepProps) {
  return (
    <article className={`card approval-step${approval.risk === 'high' ? ' approval-step--high-risk' : ''}`}>
      <div className="approval-step__header">
        <div>
          <h3>{approval.toolName}</h3>
          <p>{approval.owner} · {approval.department}</p>
        </div>
        <div className="approval-step__badges">
          <RiskBadge risk={approval.risk} />
          <StatusBadge status={approval.status} />
        </div>
      </div>

      <div className="approval-step__facts">
        <div>
          <span>Renewal date</span>
          <strong>{formatDate(approval.renewalDate)}</strong>
        </div>
        <div>
          <span>Cost</span>
          <strong>{formatCurrency(approval.cost)}</strong>
        </div>
        <div>
          <span>Submitted by</span>
          <strong>{approval.submittedBy}</strong>
        </div>
        <div>
          <span>Submitted date</span>
          <strong>{formatDate(approval.submittedDate)}</strong>
        </div>
      </div>

      <div className="approval-step__body">
        <div>
          <span>Requested decision</span>
          <p>{approval.requestedDecision}</p>
        </div>
        <div>
          <span>Reason for review</span>
          <p>{approval.reasonForReview}</p>
        </div>
        <div>
          <span>Next action</span>
          <p>{nextAction}</p>
        </div>
      </div>

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
            Request changes
          </button>
          <button
            className="button-secondary button-secondary--danger"
            type="button"
            onClick={() => onAction('Request rejected for this mock workflow.')}
          >
            Reject
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => onAction('Owner assignment requested.')}
          >
            Assign owner
          </button>
        </div>
      ) : null}
    </article>
  )
}

export default ApprovalStep
