import { useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'

const today = new Date('2026-05-15T00:00:00')
const ninetyDaysFromToday = new Date(today)
ninetyDaysFromToday.setDate(today.getDate() + 90)

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

const isUpcoming = (dateValue: string) => {
  const renewalDate = new Date(`${dateValue}T00:00:00`)

  return renewalDate >= today && renewalDate <= ninetyDaysFromToday
}

function Reports() {
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const totalMonthlySpend = subscriptions.reduce(
    (total, subscription) => total + subscription.monthlyCost,
    0,
  )
  const upcomingRenewalSpend = subscriptions
    .filter((subscription) => isUpcoming(subscription.renewalDate))
    .reduce((total, subscription) => total + subscription.annualCost, 0)
  const approvedRenewals = approvalRequests.filter((approval) => approval.status === 'approved')
  const pendingDecisions = approvalRequests.filter(
    (approval) => approval.status === 'pending' || approval.status === 'needs_info',
  )
  const estimatedAnnualSavings = savingsOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedAnnualSavings,
    0,
  )
  const highRiskRenewals = subscriptions
    .filter((subscription) => subscription.renewalRisk === 'high')
    .slice(0, 3)
  const pendingApprovalItems = pendingDecisions.slice(0, 3)
  const highestSavings = [...savingsOpportunities]
    .sort((first, second) => second.estimatedAnnualSavings - first.estimatedAnnualSavings)
    .slice(0, 3)

  return (
    <section className="reports-page" aria-labelledby="reports-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="reports-title">
            Reports
          </h2>
          <p className="dashboard__subtitle">
            Summarise spend, renewals, approvals, and estimated savings for finance review.
          </p>
        </div>
        <div className="dashboard__actions">
          <button
            type="button"
            onClick={() => setConfirmationMessage('Report download prepared for this mock workflow.')}
          >
            Download report
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => setConfirmationMessage('Report summary copied for this mock workflow.')}
          >
            Copy summary
          </button>
        </div>
      </div>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <div className="report-summary-grid" aria-label="Report summary">
        <MetricCard
          helper="Across all mock subscriptions"
          label="Total monthly spend"
          tone="primary"
          value={formatCurrency(totalMonthlySpend)}
        />
        <MetricCard
          helper="Mock annual spend renewing in 90 days"
          label="Upcoming renewal spend"
          tone="warning"
          value={formatCurrency(upcomingRenewalSpend)}
        />
        <MetricCard
          helper="Approved in mock approval data"
          label="Approved renewals"
          value={String(approvedRenewals.length)}
        />
        <MetricCard
          helper="Pending or needs-info approvals"
          label="Pending decisions"
          tone="danger"
          value={String(pendingDecisions.length)}
        />
        <MetricCard
          helper="Mock estimated annual potential"
          label="Estimated annual savings"
          tone="success"
          value={formatCurrency(estimatedAnnualSavings)}
        />
      </div>

      <section className="card report-document" aria-labelledby="monthly-report-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="monthly-report-title">Monthly finance review summary</h2>
            <p>A portfolio-safe report using mock data and estimated potential savings.</p>
          </div>
        </div>
        <div className="report-section-grid">
          <article>
            <h3>Executive summary</h3>
            <p>
              Renewly highlights several high-risk renewals, pending approval decisions, and
              estimated potential savings opportunities that should be reviewed before renewal dates.
            </p>
          </article>
          <article>
            <h3>Spend overview</h3>
            <p>
              Current mock monthly spend is {formatCurrency(totalMonthlySpend)}, with{' '}
              {formatCurrency(upcomingRenewalSpend)} in annual renewal value due within 90 days.
            </p>
          </article>
          <article>
            <h3>Renewal risk overview</h3>
            <p>
              High-risk renewals should be reviewed first because they combine deadline pressure,
              low usage, unclear ownership, or pending approval context.
            </p>
          </article>
          <article>
            <h3>Approval status overview</h3>
            <p>
              {pendingDecisions.length} decisions are still pending or need owner information in
              the mock workflow.
            </p>
          </article>
          <article>
            <h3>Savings opportunities summary</h3>
            <p>
              Estimated annual potential savings total {formatCurrency(estimatedAnnualSavings)}.
              These are mock estimates and should be treated as review prompts, not guaranteed outcomes.
            </p>
          </article>
          <article>
            <h3>Recommended next actions</h3>
            <p>
              Review high-risk renewals, resolve pending owner questions, and validate the highest
              estimated opportunities before renewal decisions are finalised.
            </p>
          </article>
        </div>
        <div className="report-actions">
          <button
            type="button"
            onClick={() => setConfirmationMessage('Report summary copied for this mock workflow.')}
          >
            Copy report summary
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => setConfirmationMessage('Report download prepared for this mock workflow.')}
          >
            Download report
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => setConfirmationMessage('Finance share action prepared.')}
          >
            Share with finance
          </button>
        </div>
      </section>

      <section className="report-lists" aria-label="Important report items">
        <article className="card report-list-card">
          <div className="section-heading section-heading--padded">
            <div>
              <h2>High-risk renewals</h2>
              <p>Highest-priority renewal risk items.</p>
            </div>
          </div>
          <div className="report-list">
            {highRiskRenewals.map((subscription) => (
              <div className="report-list__item report-list__item--highlight" key={subscription.id}>
                <div>
                  <strong>{subscription.toolName}</strong>
                  <span>{formatDate(subscription.renewalDate)} · {formatCurrency(subscription.annualCost)}</span>
                </div>
                <RiskBadge risk={subscription.renewalRisk} />
              </div>
            ))}
          </div>
        </article>

        <article className="card report-list-card">
          <div className="section-heading section-heading--padded">
            <div>
              <h2>Pending approvals</h2>
              <p>Open decisions that need follow-up.</p>
            </div>
          </div>
          <div className="report-list">
            {pendingApprovalItems.map((approval) => (
              <div className="report-list__item" key={approval.id}>
                <div>
                  <strong>{approval.toolName}</strong>
                  <span>{approval.owner} · {formatDate(approval.renewalDate)}</span>
                </div>
                <StatusBadge status={approval.status} />
              </div>
            ))}
          </div>
        </article>

        <article className="card report-list-card">
          <div className="section-heading section-heading--padded">
            <div>
              <h2>Highest estimated savings</h2>
              <p>Mock potential savings, review recommended.</p>
            </div>
          </div>
          <div className="report-list">
            {highestSavings.map((opportunity) => (
              <div className="report-list__item report-list__item--success" key={opportunity.id}>
                <div>
                  <strong>{opportunity.toolName}</strong>
                  <span>{formatCurrency(opportunity.estimatedAnnualSavings)} estimated annual potential</span>
                </div>
                <RiskBadge risk={opportunity.riskLevel} />
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  )
}

export default Reports
