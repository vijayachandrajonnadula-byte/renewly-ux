import { useMemo, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import EmptyState from '../components/EmptyState'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import type { ApprovalRequest } from '../types'

type ApprovalFilter = 'all' | 'needs_owner_review' | 'waiting_finance' | 'high_risk'

type ApprovalGroup = {
  countLabel: string
  description: string
  items: ApprovalRequest[]
  key: string
  title: string
  tone: 'review' | 'finance' | 'approved' | 'neutral'
}

const filterLabels: Record<ApprovalFilter, string> = {
  all: 'All',
  needs_owner_review: 'Needs owner review',
  waiting_finance: 'Waiting finance',
  high_risk: 'High risk only',
}

const approvalFilterOrder: ApprovalFilter[] = [
  'all',
  'needs_owner_review',
  'waiting_finance',
  'high_risk',
]

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

const cleanCopy = (value: string) =>
  value.replaceAll('\u00e2\u20ac\u201d', '-').replaceAll('\u00c2\u00b7', '-')

const canTakeAction = (status: ApprovalRequest['status']) =>
  status === 'pending' || status === 'needs_info'

type ApprovalQueueRowProps = {
  approval: ApprovalRequest
  onAction: (message: string) => void
}

function ApprovalQueueRow({ approval, onAction }: ApprovalQueueRowProps) {
  const actionable = canTakeAction(approval.status)

  return (
    <article className="approval-queue-row">
      <div className="approval-queue-row__tool">
        <span className="approval-queue-row__icon" aria-hidden="true">
          {approval.toolName.charAt(0)}
        </span>
        <div className="approval-queue-row__identity">
          <div className="approval-queue-row__title">
            <h3>{approval.toolName}</h3>
            <RiskBadge risk={approval.risk} />
          </div>
          <p>{cleanCopy(approval.reasonForReview)}</p>
        </div>
      </div>

      <div className="approval-queue-row__cell">
        <span>Requested</span>
        <strong>{approval.requestedDecision}</strong>
        <small>
          by {approval.submittedBy} {'\u00b7'} {formatDate(approval.submittedDate)}
        </small>
      </div>

      <div className="approval-queue-row__cell">
        <span>Owner</span>
        <strong>{approval.owner}</strong>
        <small>{approval.department}</small>
      </div>

      <div className="approval-queue-row__cell approval-queue-row__cost">
        <span>Renews {'\u00b7'} Cost</span>
        <strong>{formatCurrency(approval.cost)}/mo</strong>
        <small>{formatDate(approval.renewalDate)}</small>
      </div>

      <div className="approval-queue-row__actions" aria-label={`${approval.toolName} approval actions`}>
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
          <button className="button-secondary approval-queue-row__view" type="button">
            View
          </button>
        )}
      </div>
    </article>
  )
}

function ApprovalQueue() {
  const [activeFilter, setActiveFilter] = useState<ApprovalFilter>('all')
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const needsOwnerReview = approvalRequests.filter((approval) => approval.status === 'needs_info')
  const waitingFinanceApproval = approvalRequests.filter((approval) => approval.status === 'pending')
  const highRiskApprovals = approvalRequests.filter((approval) => approval.risk === 'high')
  const approvedApprovals = approvalRequests.filter((approval) => approval.status === 'approved')
  const pendingApprovals = [...needsOwnerReview, ...waitingFinanceApproval]
  const savingsUnderReview = savingsOpportunities
    .filter((opportunity) =>
      pendingApprovals.some((approval) => approval.subscriptionId === opportunity.subscriptionId),
    )
    .reduce((total, opportunity) => total + opportunity.estimatedAnnualSavings, 0)

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
      countLabel: `${needsOwnerReview.length} approvals`,
      description: 'Requests that need owner context before finance can safely decide.',
      items: filteredApprovals.filter((approval) => approval.status === 'needs_info'),
      key: 'needs-owner-review',
      title: 'Needs owner review',
      tone: 'review',
    },
    {
      countLabel: `${waitingFinanceApproval.length} approvals`,
      description: 'Renewal decisions waiting on finance review or threshold approval.',
      items: filteredApprovals.filter((approval) => approval.status === 'pending'),
      key: 'waiting-finance-approval',
      title: 'Waiting finance approval',
      tone: 'finance',
    },
    {
      countLabel: `${approvedApprovals.length} approvals`,
      description: 'Completed decisions retained for visibility in this mock workflow.',
      items: filteredApprovals.filter((approval) => approval.status === 'approved'),
      key: 'approved',
      title: 'Approved',
      tone: 'approved',
    },
    {
      countLabel: '0 approvals',
      description: 'Rejected requests would remain visible here for decision history.',
      items: filteredApprovals.filter((approval) => approval.status === 'rejected'),
      key: 'rejected-or-cancelled',
      title: 'Rejected or cancelled',
      tone: 'neutral',
    },
  ]

  const clearFilters = () => {
    setActiveFilter('all')
  }

  const hasFilteredResults = filteredApprovals.length > 0

  const filterCounts: Record<ApprovalFilter, number | string> = {
    all: approvalRequests.length,
    high_risk: highRiskApprovals.length,
    needs_owner_review: needsOwnerReview.length,
    waiting_finance: waitingFinanceApproval.length,
  }

  return (
    <section className="approval-reference-page" aria-labelledby="approval-queue-title">
      <header className="approval-reference-header">
        <div>
          <h2 id="approval-queue-title">Approval queue</h2>
          <p>Pending renewal decisions awaiting owner or finance review.</p>
        </div>
        <div className="approval-reference-header__actions">
          <button className="button-secondary" type="button">
            Export queue
          </button>
          <button type="button">Assign owner</button>
        </div>
      </header>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <div className="approval-reference-summary" aria-label="Approval queue summary">
        <MetricCard
          helper="across 5 owners"
          icon="calendar"
          label="Total pending"
          value={String(approvalRequests.length)}
        />
        <MetricCard
          helper="oldest 4 days"
          icon="alert"
          label="Needs owner review"
          tone="warning"
          value={String(needsOwnerReview.length)}
        />
        <MetricCard
          helper="above threshold"
          icon="money"
          label="Waiting finance"
          value={String(waitingFinanceApproval.length)}
        />
        <MetricCard
          helper="requires CFO"
          icon="alert"
          label="High-risk approvals"
          tone="danger"
          value={String(highRiskApprovals.length)}
        />
        <MetricCard
          helper="if all approved"
          icon="trend"
          label="Savings under review"
          tone="success"
          value={formatCurrency(savingsUnderReview)}
        />
      </div>

      <section className="approval-reference-filters" aria-label="Approval queue filters">
        <div className="approval-reference-tabs">
          {approvalFilterOrder.map((filter) => (
            <button
              className={activeFilter === filter ? 'is-active' : ''}
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filterLabels[filter]}
              <span>{filterCounts[filter]}</span>
            </button>
          ))}
        </div>

        <div className="approval-reference-filter-tools">
          <button className="approval-reference-select" type="button">
            <span>Owner</span>
            <strong>Any</strong>
          </button>
          <button className="approval-reference-select" type="button">
            <span>Sort</span>
            <strong>Oldest first</strong>
          </button>
          <button className="approval-reference-clear" onClick={clearFilters} type="button">
            Clear filters
          </button>
        </div>
      </section>

      {hasFilteredResults ? (
        <div className="approval-reference-groups">
          {groups.map((group) => (
            <section className="approval-reference-group" key={group.key}>
              <div className="approval-reference-group__header">
                <div>
                  <span className={`approval-reference-pill approval-reference-pill--${group.tone}`}>
                    {group.title}
                  </span>
                  <p>{group.description}</p>
                </div>
                <strong>{group.countLabel}</strong>
              </div>

              {group.items.length > 0 ? (
                <div className="approval-worklist" role="table" aria-label={`${group.title} approvals`}>
                  <div className="approval-worklist__header" role="row">
                    <span role="columnheader">Tool / Reason</span>
                    <span role="columnheader">Requested</span>
                    <span role="columnheader">Owner</span>
                    <span role="columnheader">Renews / Cost</span>
                    <span role="columnheader">Action</span>
                  </div>
                  {group.items.map((approval) => (
                    <ApprovalQueueRow
                      approval={approval}
                      key={approval.id}
                      onAction={setConfirmationMessage}
                    />
                  ))}
                </div>
              ) : (
                <div className="approval-reference-empty">
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
