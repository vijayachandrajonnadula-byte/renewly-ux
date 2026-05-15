import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import SavingsCard from '../components/SavingsCard'
import StatusBadge from '../components/StatusBadge'
import { approvalRequests } from '../data/approvals'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'
import type { ApprovalRequest, Subscription } from '../types'

const today = new Date('2026-05-15T00:00:00')
const thirtyDaysFromToday = new Date(today)
thirtyDaysFromToday.setDate(today.getDate() + 30)

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

const isWithinNextThirtyDays = (dateValue: string) => {
  const renewalDate = new Date(`${dateValue}T00:00:00`)

  return renewalDate >= today && renewalDate <= thirtyDaysFromToday
}

const getUsageRate = (subscription: Subscription) =>
  Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)

const upcomingRenewals = [...subscriptions]
  .filter((subscription) => new Date(`${subscription.renewalDate}T00:00:00`) >= today)
  .sort(
    (first, second) =>
      new Date(`${first.renewalDate}T00:00:00`).getTime() -
      new Date(`${second.renewalDate}T00:00:00`).getTime(),
  )

const pendingApprovals = approvalRequests
  .filter((approval) => approval.status === 'pending' || approval.status === 'needs_info')
  .sort(
    (first, second) =>
      new Date(`${first.renewalDate}T00:00:00`).getTime() -
      new Date(`${second.renewalDate}T00:00:00`).getTime(),
  )

type AttentionItem = {
  id: string
  title: string
  detail: string
  meta: string
  risk: Subscription['renewalRisk']
  priority: number
}

const getAttentionItems = () => {
  const byId = new Map<string, AttentionItem>()

  subscriptions.forEach((subscription) => {
    const usageRate = getUsageRate(subscription)
    const renewsSoon = isWithinNextThirtyDays(subscription.renewalDate)
    const lowUsageHighSpend = usageRate < 60 && subscription.annualCost >= 8000
    const pendingApproval =
      subscription.approvalStatus === 'pending' || subscription.approvalStatus === 'needs_info'

    if (subscription.renewalRisk === 'high' || renewsSoon || lowUsageHighSpend || pendingApproval) {
      const reasons = [
        subscription.renewalRisk === 'high' ? 'High-risk renewal' : '',
        renewsSoon ? 'Renews within 30 days' : '',
        lowUsageHighSpend ? `${usageRate}% utilisation with high spend` : '',
        pendingApproval ? 'Approval needs follow-up' : '',
      ].filter(Boolean)

      const priority =
        (subscription.renewalRisk === 'high' ? 4 : 0) +
        (renewsSoon ? 3 : 0) +
        (lowUsageHighSpend ? 2 : 0) +
        (pendingApproval ? 2 : 0)

      byId.set(subscription.id, {
        id: subscription.id,
        title: subscription.toolName,
        detail: reasons.join(' · '),
        meta: `${subscription.owner} · ${formatCurrency(subscription.annualCost)} annual · ${formatDate(
          subscription.renewalDate,
        )}`,
        priority,
        risk: subscription.renewalRisk,
      })
    }
  })

  return [...byId.values()]
    .sort((first, second) => second.priority - first.priority)
    .slice(0, 5)
}

const totalMonthlySpend = subscriptions.reduce(
  (total, subscription) => total + subscription.monthlyCost,
  0,
)
const renewalsInNextThirtyDays = subscriptions.filter((subscription) =>
  isWithinNextThirtyDays(subscription.renewalDate),
).length
const highRiskRenewals = subscriptions.filter(
  (subscription) => subscription.renewalRisk === 'high',
).length
const estimatedAnnualSavings = savingsOpportunities.reduce(
  (total, opportunity) => total + opportunity.estimatedAnnualSavings,
  0,
)

function ApprovalPreviewItem({ approval }: { approval: ApprovalRequest }) {
  return (
    <article className="list-item">
      <div className="list-item__main">
        <div className="list-item__title-row">
          <h3>{approval.toolName}</h3>
          <RiskBadge risk={approval.risk} />
        </div>
        <p>{approval.requestedDecision}</p>
        <div className="list-item__meta">
          <span>{approval.owner}</span>
          <span>{formatDate(approval.renewalDate)}</span>
          <span>{formatCurrency(approval.cost)}</span>
        </div>
      </div>
      <StatusBadge status={approval.status} />
    </article>
  )
}

function Dashboard() {
  const attentionItems = getAttentionItems()

  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="dashboard-title">
            Dashboard
          </h2>
          <p className="dashboard__subtitle">
            A renewal command centre for finance and operations teams to spot urgent work,
            pending approvals, and mock estimated savings opportunities.
          </p>
        </div>
        <div className="dashboard__actions">
          <button type="button">Review high-risk renewals</button>
          <button className="button-secondary" type="button">
            View savings opportunities
          </button>
        </div>
      </div>

      <div className="metrics-grid" aria-label="Renewal summary metrics">
        <MetricCard
          helper="Across all mock subscriptions"
          label="Total monthly spend"
          tone="primary"
          value={formatCurrency(totalMonthlySpend)}
        />
        <MetricCard
          helper="Renewal dates through 14 Jun 2026"
          label="Renewals in next 30 days"
          tone="warning"
          value={String(renewalsInNextThirtyDays)}
        />
        <MetricCard
          helper="Items that need review first"
          label="High-risk renewals"
          tone="danger"
          value={String(highRiskRenewals)}
        />
        <MetricCard
          helper="Mock estimated annual potential"
          label="Estimated annual savings opportunity"
          tone="success"
          value={formatCurrency(estimatedAnnualSavings)}
        />
      </div>

      <section className="dashboard-section" aria-labelledby="attention-title">
        <div className="section-heading">
          <div>
            <h2 id="attention-title">Needs attention</h2>
            <p>Limited to the most urgent signals so the next decision is easier to find.</p>
          </div>
        </div>
        <div className="attention-list">
          {attentionItems.map((item) => (
            <article className={`card attention-item attention-item--${item.risk}`} key={item.id}>
              <div>
                <div className="list-item__title-row">
                  <h3>{item.title}</h3>
                  <RiskBadge risk={item.risk} />
                </div>
                <p>{item.detail}</p>
                <div className="list-item__meta">{item.meta}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="card dashboard-section dashboard-section--flush" aria-labelledby="renewals-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="renewals-title">Upcoming renewals</h2>
              <p>Summary view sorted by renewal date.</p>
            </div>
          </div>
          <div className="renewal-list">
            {upcomingRenewals.slice(0, 6).map((subscription) => (
              <article className="list-item" key={subscription.id}>
                <div className="list-item__main">
                  <div className="list-item__title-row">
                    <h3>{subscription.toolName}</h3>
                    <RiskBadge risk={subscription.renewalRisk} />
                  </div>
                  <p>{subscription.vendorName}</p>
                  <div className="list-item__meta">
                    <span>{subscription.owner}</span>
                    <span>{formatDate(subscription.renewalDate)}</span>
                    <span>{formatCurrency(subscription.annualCost)}</span>
                  </div>
                </div>
                <StatusBadge status={subscription.approvalStatus} />
              </article>
            ))}
          </div>
        </section>

        <section className="card dashboard-section dashboard-section--flush" aria-labelledby="approvals-title">
          <div className="section-heading section-heading--padded">
            <div>
              <h2 id="approvals-title">Approval queue preview</h2>
              <p>Pending decisions that may block renewal progress.</p>
            </div>
          </div>
          <div className="approval-list">
            {pendingApprovals.slice(0, 5).map((approval) => (
              <ApprovalPreviewItem approval={approval} key={approval.id} />
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-section" aria-labelledby="savings-title">
        <div className="section-heading">
          <div>
            <h2 id="savings-title">Savings opportunities preview</h2>
            <p>Mock estimated potential only. Review recommended before any decision.</p>
          </div>
        </div>
        <div className="savings-grid">
          {savingsOpportunities.slice(0, 3).map((opportunity) => (
            <SavingsCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>
    </section>
  )
}

export default Dashboard
