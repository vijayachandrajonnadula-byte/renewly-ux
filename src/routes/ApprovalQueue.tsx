import { useMemo, useState } from 'react'
import ApprovalStep from '../components/ApprovalStep'
import ConfirmationToast from '../components/ConfirmationToast'
import EmptyState from '../components/EmptyState'
import MetricCard from '../components/MetricCard'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import type { ApprovalRequest } from '../types'

type ApprovalFilter = 'all' | 'needs_owner_review' | 'waiting_finance' | 'high_risk'

type ApprovalGroup = {
  description: string
  items: ApprovalRequest[]
  key: string
  title: string
}

const getNextAction = (approval: ApprovalRequest) => {
  if (approval.status === 'needs_info') {
    return 'Ask the tool owner for missing context before a final decision.'
  }

  if (approval.status === 'pending' && approval.risk === 'high') {
    return 'Prioritise finance review before the renewal deadline.'
  }

  if (approval.status === 'pending') {
    return 'Review renewal context and approve, request changes, or reject.'
  }

  if (approval.status === 'approved') {
    return 'No action required unless renewal context changes.'
  }

  return 'Keep decision history visible for audit-style context in the mock workflow.'
}

function ApprovalQueue() {
  const [activeFilter, setActiveFilter] = useState<ApprovalFilter>('all')
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const filteredApprovals = useMemo(() => {
    return approvalRequests.filter((approval) => {
      if (activeFilter === 'needs_owner_review') {
        return approval.status === 'needs_info'
      }

      if (activeFilter === 'waiting_finance') {
        return approval.status === 'pending'
      }

      if (activeFilter === 'high_risk') {
        return approval.risk === 'high'
      }

      return true
    })
  }, [activeFilter])

  const groups: ApprovalGroup[] = [
    {
      description: 'Requests that need tool owner context before a safe decision.',
      items: filteredApprovals.filter((approval) => approval.status === 'needs_info'),
      key: 'needs-owner-review',
      title: 'Needs owner review',
    },
    {
      description: 'Pending renewal decisions waiting for finance or operations review.',
      items: filteredApprovals.filter((approval) => approval.status === 'pending'),
      key: 'waiting-finance-approval',
      title: 'Waiting finance approval',
    },
    {
      description: 'Approvals already marked approved in the mock workflow.',
      items: filteredApprovals.filter((approval) => approval.status === 'approved'),
      key: 'approved',
      title: 'Approved',
    },
    {
      description: 'Rejected or cancelled requests retained for decision visibility.',
      items: filteredApprovals.filter((approval) => approval.status === 'rejected'),
      key: 'rejected-or-cancelled',
      title: 'Rejected or cancelled',
    },
  ]

  const pendingApprovals = approvalRequests.filter(
    (approval) => approval.status === 'pending' || approval.status === 'needs_info',
  )
  const needsOwnerReview = approvalRequests.filter((approval) => approval.status === 'needs_info')
  const waitingFinanceApproval = approvalRequests.filter((approval) => approval.status === 'pending')
  const highRiskApprovals = approvalRequests.filter((approval) => approval.risk === 'high')
  const savingsUnderReview = approvalRequests.filter((approval) =>
    savingsOpportunities.some((opportunity) => opportunity.subscriptionId === approval.subscriptionId),
  )

  const clearFilters = () => {
    setActiveFilter('all')
  }

  const hasFilteredResults = filteredApprovals.length > 0

  return (
    <section className="approval-queue-page" aria-labelledby="approval-queue-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="approval-queue-title">
            Approval Queue
          </h2>
          <p className="dashboard__subtitle">
            Review renewal decisions, owner requests, and finance approvals.
          </p>
        </div>
        <div className="dashboard__actions">
          <button type="button" onClick={() => setActiveFilter('high_risk')}>
            Review urgent approvals
          </button>
          <button className="button-secondary" type="button">
            Export approval list
          </button>
        </div>
      </div>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <div className="approval-summary-grid" aria-label="Approval queue summary">
        <MetricCard
          helper="Pending or needs-info requests"
          label="Total pending approvals"
          tone="warning"
          value={String(pendingApprovals.length)}
        />
        <MetricCard
          helper="Waiting on owner context"
          label="Needs owner review"
          tone="primary"
          value={String(needsOwnerReview.length)}
        />
        <MetricCard
          helper="Waiting finance decision"
          label="Waiting finance approval"
          value={String(waitingFinanceApproval.length)}
        />
        <MetricCard
          helper="Approvals marked high risk"
          label="High-risk approvals"
          tone="danger"
          value={String(highRiskApprovals.length)}
        />
        <MetricCard
          helper="Linked to mock savings opportunities"
          label="Potential savings under review"
          tone="success"
          value={String(savingsUnderReview.length)}
        />
      </div>

      <section className="card calendar-filter-panel" aria-label="Approval queue filters">
        <div className="calendar-filter-group">
          <button
            className={activeFilter === 'all' ? '' : 'button-secondary'}
            onClick={() => setActiveFilter('all')}
            type="button"
          >
            All
          </button>
          <button
            className={activeFilter === 'needs_owner_review' ? '' : 'button-secondary'}
            onClick={() => setActiveFilter('needs_owner_review')}
            type="button"
          >
            Needs owner review
          </button>
          <button
            className={activeFilter === 'waiting_finance' ? '' : 'button-secondary'}
            onClick={() => setActiveFilter('waiting_finance')}
            type="button"
          >
            Waiting finance approval
          </button>
          <button
            className={activeFilter === 'high_risk' ? '' : 'button-secondary'}
            onClick={() => setActiveFilter('high_risk')}
            type="button"
          >
            High risk only
          </button>
        </div>
        <button className="button-secondary" onClick={clearFilters} type="button">
          Clear filters
        </button>
      </section>

      {hasFilteredResults ? (
        <div className="approval-groups">
          {groups.map((group) => (
            <section className="approval-group card" key={group.key}>
              <div className="month-group__header">
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <span>{group.items.length} approvals</span>
              </div>
              {group.items.length > 0 ? (
                <div className="approval-step-list">
                  {group.items.map((approval) => (
                    <ApprovalStep
                      approval={approval}
                      key={approval.id}
                      nextAction={getNextAction(approval)}
                      onAction={setConfirmationMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="approval-group__empty">
                  No approvals in this group for the current filter.
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            actionLabel="Clear filters"
            description="No approvals match the current queue filter. Clear filters to return to all mock approval requests."
            onAction={clearFilters}
            title="No approvals found"
          />
        </div>
      )}
    </section>
  )
}

export default ApprovalQueue
