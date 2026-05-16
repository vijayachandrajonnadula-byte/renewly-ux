import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import MetricCard from '../components/MetricCard'
import SubscriptionTable from '../components/SubscriptionTable'
import { subscriptions } from '../data/subscriptions'
import type {
  ApprovalStatus,
  BillingCycle,
  RenewalRisk,
  Subscription as SubscriptionType,
  SubscriptionStatus,
  ToolCategory,
} from '../types'

const today = new Date('2026-05-15T00:00:00')
const thirtyDaysFromToday = new Date(today)
thirtyDaysFromToday.setDate(today.getDate() + 30)

const isWithinNextThirtyDays = (dateValue: string) => {
  const renewalDate = new Date(`${dateValue}T00:00:00`)

  return renewalDate >= today && renewalDate <= thirtyDaysFromToday
}

const getUtilisation = (seatsPurchased: number, activeUsers: number) =>
  Math.round((activeUsers / seatsPurchased) * 100)

const categories = [...new Set(subscriptions.map((subscription) => subscription.category))].sort()
const risks: RenewalRisk[] = ['low', 'medium', 'high']
const subscriptionStatuses: SubscriptionStatus[] = [
  'active',
  'under_review',
  'renewal_due',
  'pending_cancellation',
  'cancelled',
]
const approvalStatuses: ApprovalStatus[] = [
  'not_required',
  'pending',
  'approved',
  'needs_info',
  'rejected',
]
const billingCycles: BillingCycle[] = ['monthly', 'quarterly', 'annual']

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

type SubscriptionsProps = {
  onOpenDetail?: (subscription: SubscriptionType) => void
}

function Subscriptions({ onOpenDetail }: SubscriptionsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<ToolCategory | 'all'>('all')
  const [risk, setRisk] = useState<RenewalRisk | 'all'>('all')
  const [status, setStatus] = useState<SubscriptionStatus | 'all'>('all')
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | 'all'>('all')
  const [billingCycle, setBillingCycle] = useState<BillingCycle | 'all'>('all')

  const clearFilters = () => {
    setSearchQuery('')
    setCategory('all')
    setRisk('all')
    setStatus('all')
    setApprovalStatus('all')
    setBillingCycle('all')
  }

  const filteredSubscriptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return subscriptions.filter((subscription) => {
      const searchableValues = [
        subscription.toolName,
        subscription.vendorName,
        subscription.owner,
        subscription.department,
        subscription.category,
      ]
      const matchesSearch =
        query.length === 0 ||
        searchableValues.some((value) => value.toLowerCase().includes(query))

      return (
        matchesSearch &&
        (category === 'all' || subscription.category === category) &&
        (risk === 'all' || subscription.renewalRisk === risk) &&
        (status === 'all' || subscription.status === status) &&
        (approvalStatus === 'all' || subscription.approvalStatus === approvalStatus) &&
        (billingCycle === 'all' || subscription.billingCycle === billingCycle)
      )
    })
  }, [approvalStatus, billingCycle, category, risk, searchQuery, status])

  const highRiskCount = subscriptions.filter(
    (subscription) => subscription.renewalRisk === 'high',
  ).length
  const renewalsSoonCount = subscriptions.filter((subscription) =>
    isWithinNextThirtyDays(subscription.renewalDate),
  ).length
  const lowUtilisationCount = subscriptions.filter(
    (subscription) => getUtilisation(subscription.seatsPurchased, subscription.activeUsers) < 60,
  ).length

  return (
    <section className="subscriptions-page" aria-labelledby="subscriptions-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="subscriptions-title">
            Subscriptions
          </h2>
          <p className="dashboard__subtitle">
            All SaaS tools across the workspace · 24 active subscriptions
          </p>
        </div>
        <div className="dashboard__actions">
          <button className="button-secondary" type="button">
            Export list
          </button>
          <button type="button">+ Add subscription</button>
        </div>
      </div>

      <div className="summary-strip" aria-label="Subscription summary">
        <MetricCard
          helper="Software tools in mock data"
          label="Total subscriptions"
          tone="primary"
          value={String(subscriptions.length)}
        />
        <MetricCard
          helper="Marked high risk"
          label="High-risk subscriptions"
          tone="danger"
          value={String(highRiskCount)}
        />
        <MetricCard
          helper="Renewal dates through 14 Jun 2026"
          label="Renewals in next 30 days"
          tone="warning"
          value={String(renewalsSoonCount)}
        />
        <MetricCard
          helper="Below 60% seat utilisation"
          label="Low utilisation tools"
          tone="success"
          value={String(lowUtilisationCount)}
        />
      </div>

      <section className="reference-filterbar subscriptions-toolbar" aria-label="Subscription filters">
        <label className="reference-search">
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search tools, vendors, owners..."
            type="search"
            value={searchQuery}
          />
        </label>

        <div className="reference-filterbar__chips">
          <label className="filter-chip-field">
            <span>Category</span>
            <select
              onChange={(event) => setCategory(event.target.value as ToolCategory | 'all')}
              value={category}
            >
              <option value="all">All</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-chip-field">
            <span>Risk</span>
            <select
              onChange={(event) => setRisk(event.target.value as RenewalRisk | 'all')}
              value={risk}
            >
              <option value="all">Any</option>
              {risks.map((item) => (
                <option key={item} value={item}>
                  {labelFromValue(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-chip-field">
            <span>Status</span>
            <select
              onChange={(event) => setStatus(event.target.value as SubscriptionStatus | 'all')}
              value={status}
            >
              <option value="all">Any</option>
              {subscriptionStatuses.map((item) => (
                <option key={item} value={item}>
                  {labelFromValue(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-chip-field">
            <span>Approval</span>
            <select
              onChange={(event) =>
                setApprovalStatus(event.target.value as ApprovalStatus | 'all')
              }
              value={approvalStatus}
            >
              <option value="all">Any</option>
              {approvalStatuses.map((item) => (
                <option key={item} value={item}>
                  {labelFromValue(item)}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-chip-field">
            <span>Cycle</span>
            <select
              onChange={(event) => setBillingCycle(event.target.value as BillingCycle | 'all')}
              value={billingCycle}
            >
              <option value="all">Any</option>
              {billingCycles.map((item) => (
                <option key={item} value={item}>
                  {labelFromValue(item)}
                </option>
              ))}
            </select>
          </label>

          <button className="button-secondary filter-reset" onClick={clearFilters} type="button">
            Reset
          </button>
        </div>

        <span className="reference-filterbar__count">
          Showing {filteredSubscriptions.length} of 24
        </span>
      </section>

      <section className="card subscriptions-table-card" aria-labelledby="table-title">
        <div className="section-heading section-heading--padded subscriptions-table-heading">
          <div>
            <h2 id="table-title">Subscription inventory</h2>
            <p>
              Showing {filteredSubscriptions.length} of {subscriptions.length} subscriptions.
            </p>
          </div>
        </div>

        {filteredSubscriptions.length > 0 ? (
          <SubscriptionTable onOpenDetail={onOpenDetail} subscriptions={filteredSubscriptions} />
        ) : (
          <EmptyState
            actionLabel="Clear filters"
            description="No subscriptions match the current search and filter combination. Reset filters to return to the full mock inventory."
            onAction={clearFilters}
            title="No subscriptions found"
          />
        )}
      </section>
    </section>
  )
}

export default Subscriptions
