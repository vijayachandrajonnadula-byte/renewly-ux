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
  const departmentSpend = Object.entries(
    subscriptions.reduce<Record<string, number>>((departments, subscription) => {
      departments[subscription.department] =
        (departments[subscription.department] ?? 0) + subscription.monthlyCost

      return departments
    }, {}),
  )
    .sort(([, first], [, second]) => second - first)
    .slice(0, 4)
  const maxDepartmentSpend = Math.max(...departmentSpend.map(([, spend]) => spend), 1)
  const riskSummary = [
    {
      count: subscriptions.filter((subscription) => subscription.renewalRisk === 'high').length,
      label: 'High risk',
      tone: 'high',
    },
    {
      count: subscriptions.filter((subscription) => subscription.renewalRisk === 'medium').length,
      label: 'Medium risk',
      tone: 'medium',
    },
    {
      count: subscriptions.filter((subscription) => subscription.renewalRisk === 'low').length,
      label: 'Low risk',
      tone: 'low',
    },
  ]
  const maxRiskCount = Math.max(...riskSummary.map((item) => item.count), 1)

  return (
    <section className="reports-page" aria-labelledby="reports-title">
      <div className="dashboard__header">
        <div>
          <p className="page-kicker">Monthly report · May 2026</p>
          <h2 className="dashboard__title" id="reports-title">
            SaaS spend & renewals · May report
          </h2>
          <p className="dashboard__subtitle">
            Generated 12 min ago · 24 tools · 8 departments. Mock data — for portfolio demonstration.
          </p>
        </div>
        <div className="dashboard__actions">
          <button
            className="button-secondary"
            type="button"
            onClick={() => setConfirmationMessage('Report summary copied for this mock workflow.')}
          >
            Copy summary
          </button>
          <button
            type="button"
            onClick={() => setConfirmationMessage('Report download prepared for this mock workflow.')}
          >
            Download report
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

      <div className="report-workspace">
        <div className="report-main-column">
      <section className="card report-document" aria-labelledby="monthly-report-title">
        <div className="section-heading section-heading--padded">
          <div>
            <h2 id="monthly-report-title">Monthly finance review summary</h2>
            <p>A portfolio-safe report using mock data and estimated potential savings.</p>
          </div>
        </div>
        <div className="report-section-grid report-section-grid--finance">
          <article className="report-insight-card report-insight-card--wide">
            <span className="report-insight-label">Summary</span>
            <h3>Executive summary</h3>
            <p>
              Renewly highlights several high-risk renewals, pending approval decisions, and
              estimated potential savings opportunities that should be reviewed before renewal dates.
            </p>
          </article>
          <article className="report-insight-card">
            <span className="report-insight-label">Insight</span>
            <h3>Spend overview</h3>
            <p>
              Current mock monthly spend is {formatCurrency(totalMonthlySpend)}, with{' '}
              {formatCurrency(upcomingRenewalSpend)} in annual renewal value due within 90 days.
            </p>
          </article>
          <article className="report-visual-card report-visual-card--wide">
            <div>
              <span className="report-insight-label">Spend overview</span>
              <h3>Monthly spend by department</h3>
            </div>
            <div className="report-bar-list">
              {departmentSpend.map(([department, spend]) => (
                <div className="report-bar-row" key={department}>
                  <div className="report-bar-row__meta">
                    <span>{department}</span>
                    <strong>{formatCurrency(spend)}</strong>
                  </div>
                  <div className="report-bar-track" aria-hidden="true">
                    <span style={{ width: `${Math.round((spend / maxDepartmentSpend) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="report-insight-card">
            <span className="report-insight-label report-insight-label--risk">Risk</span>
            <h3>Renewal risk overview</h3>
            <p>
              High-risk renewals should be reviewed first because they combine deadline pressure,
              low usage, unclear ownership, or pending approval context.
            </p>
          </article>
          <article className="report-visual-card">
            <div>
              <span className="report-insight-label report-insight-label--risk">Risk</span>
              <h3>Renewal risk distribution</h3>
            </div>
            <div className="report-risk-bars">
              {riskSummary.map((risk) => (
                <div className="report-risk-row" key={risk.label}>
                  <div className="report-risk-row__label">
                    <span>{risk.label}</span>
                    <strong>{risk.count}</strong>
                  </div>
                  <div className="report-risk-track" aria-hidden="true">
                    <span
                      className={`report-risk-fill report-risk-fill--${risk.tone}`}
                      style={{ width: `${Math.round((risk.count / maxRiskCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="report-insight-card">
            <span className="report-insight-label">Approval</span>
            <h3>Approval status overview</h3>
            <p>
              {pendingDecisions.length} decisions are still pending or need owner information in
              the mock workflow.
            </p>
          </article>
          <article className="report-insight-card">
            <span className="report-insight-label report-insight-label--savings">Savings</span>
            <h3>Savings opportunities summary</h3>
            <p>
              Estimated annual potential savings total {formatCurrency(estimatedAnnualSavings)}.
              These are mock estimates and should be treated as review prompts, not guaranteed outcomes.
            </p>
          </article>
          <article className="report-insight-card report-insight-card--wide">
            <span className="report-insight-label">Action</span>
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

        </div>

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
      </div>
    </section>
  )
}

export default Reports
