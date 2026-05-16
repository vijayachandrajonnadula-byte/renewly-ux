import type { ApprovalStatus, SubscriptionStatus } from '../types'

type StatusBadgeProps = {
  status: ApprovalStatus | SubscriptionStatus
}

const statusLabels: Record<ApprovalStatus | SubscriptionStatus, string> = {
  active: 'Active',
  under_review: 'Under review',
  renewal_due: 'Renewal due',
  pending_cancellation: 'Pending cancellation',
  cancelled: 'Cancelled',
  not_required: 'No approval',
  pending: 'Waiting finance',
  approved: 'Approved',
  needs_info: 'Needs review',
  rejected: 'Rejected',
}

const statusTone: Record<ApprovalStatus | SubscriptionStatus, string> = {
  active: 'success',
  under_review: 'info',
  renewal_due: 'warning',
  pending_cancellation: 'danger',
  cancelled: 'neutral',
  not_required: 'neutral',
  pending: 'info',
  approved: 'success',
  needs_info: 'review',
  rejected: 'danger',
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge status-badge status-badge--${statusTone[status]} status-badge--${status}`}>
      {statusLabels[status]}
    </span>
  )
}

export default StatusBadge
