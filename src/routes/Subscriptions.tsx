import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterDropdown from '../components/FilterDropdown'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
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

const referenceOrder = [
  'sub-forge-analytics',
  'sub-quillpad',
  'sub-pulsemail',
  'sub-beacon-crm',
  'sub-threadly',
  'sub-crater-docs',
  'sub-marbl-design',
  'sub-loop-hr',
  'sub-stride-billing',
  'sub-cipher-vault',
  'sub-sonar-insights',
]

const orderedSubscriptions = [
  ...referenceOrder
    .map((id) => subscriptions.find((subscription) => subscription.id === id))
    .filter(Boolean),
  ...subscriptions.filter((subscription) => !referenceOrder.includes(subscription.id)),
] as SubscriptionType[]

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const today = new Date('2026-05-15T00:00:00')

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

const daysUntilRenewal = (dateValue: string) =>
  Math.ceil(
    (new Date(`${dateValue}T00:00:00`).getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

const getUtilisation = (subscription: SubscriptionType) =>
  Math.round((subscription.activeUsers / subscription.seatsPurchased) * 100)

type SubscriptionsProps = {
  onOpenDetail?: (subscription: SubscriptionType) => void
}

function Subscriptions({ onOpenDetail }: SubscriptionsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState<ToolCategory | 'all'>('all')
  const [risk, setRisk] = useState<RenewalRisk | 'all'>('high')
  const [status, setStatus] = useState<SubscriptionStatus | 'all'>('active')
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus | 'all'>('all')
  const [billingCycle, setBillingCycle] = useState<BillingCycle | 'all'>('annual')

  const clearFilters = () => {
    setSearchQuery('')
    setCategory('all')
    setRisk('high')
    setStatus('active')
    setApprovalStatus('all')
    setBillingCycle('annual')
  }

  const filteredSubscriptions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return orderedSubscriptions.filter((subscription) => {
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
        (approvalStatus === 'all' || subscription.approvalStatus === approvalStatus)
      )
    })
  }, [approvalStatus, category, searchQuery])

  const highRiskCount = subscriptions.filter(
    (subscription) => subscription.renewalRisk === 'high',
  ).length

  return (
    <section className="subscriptions-page" aria-labelledby="subscriptions-title">
      <div className="mobile-page mobile-subscriptions" aria-label="Mobile subscriptions">
        <header className="mobile-page-header">
          <h1>Subscriptions</h1>
          <p>24 active · 3 high-risk</p>
          <div className="mobile-action-row">
            <button className="mobile-primary-button" type="button">
              + Add
            </button>
            <button className="mobile-secondary-button" type="button">
              Filters · 2
            </button>
          </div>
          <label className="mobile-search-field">
            <span aria-hidden="true">⌕</span>
            <input
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search subscriptions"
              type="search"
              value={searchQuery}
            />
          </label>
        </header>

        <div className="mobile-subscription-list">
          {filteredSubscriptions.slice(0, 12).map((subscription) => {
            const utilisation = getUtilisation(subscription)
            const daysRemaining = daysUntilRenewal(subscription.renewalDate)

            return (
              <article className="mobile-subscription-card" key={subscription.id}>
                <div className="mobile-subscription-card__top">
                  <span className="mobile-tool-icon" aria-hidden="true">
                    {subscription.toolName.charAt(0).toUpperCase()}
                  </span>
                  <div className="mobile-row-main">
                    <div className="mobile-row-title">
                      <strong>{subscription.toolName}</strong>
                      <RiskBadge risk={subscription.renewalRisk} />
                    </div>
                    <p>
                      {subscription.vendorName} · {subscription.category}
                    </p>
                  </div>
                </div>

                <div className="mobile-subscription-card__meta">
                  <div>
                    <strong>{formatCurrency(subscription.monthlyCost)}/mo</strong>
                    <span>
                      Renews {formatDate(subscription.renewalDate)} · in {daysRemaining}d
                    </span>
                  </div>
                  <div>
                    <span>Seats</span>
                    <strong>
                      {subscription.activeUsers}/{subscription.seatsPurchased}
                    </strong>
                  </div>
                </div>

                <div className="mobile-progress" aria-hidden="true">
                  <span style={{ width: `${Math.min(utilisation, 100)}%` }} />
                </div>

                <footer className="mobile-card-badges">
                  <StatusBadge status={subscription.approvalStatus} />
                  <StatusBadge status={subscription.status} />
                </footer>
              </article>
            )
          })}
        </div>
      </div>

      <div className="subscriptions-header">
        <div>
          <h2 className="subscriptions-header__title" id="subscriptions-title">
            Subscriptions
          </h2>
          <p className="subscriptions-header__subtitle">
            <span className="desktop-copy">All SaaS tools across the workspace · 24 active subscriptions</span>
            <span className="mobile-copy">24 active · 3 high-risk</span>
          </p>
        </div>
        <div className="subscriptions-header__actions">
          <button className="button-secondary" type="button">
            <span className="desktop-copy" aria-hidden="true">↓</span>
            <span className="desktop-copy">Export list</span>
            <span className="mobile-copy">Filters · 2</span>
          </button>
          <button type="button">
            <span aria-hidden="true">+</span>
            <span className="desktop-copy">Add subscription</span>
            <span className="mobile-copy">Add</span>
          </button>
        </div>
      </div>

      <div className="summary-strip subscriptions-summary" aria-label="Subscription summary">
        <MetricCard
          helper="across 8 departments"
          icon="money"
          label="Total subscriptions"
          tone="primary"
          value="24"
        />
        <MetricCard
          helper="needs review"
          icon="alert"
          label="High-risk"
          tone="danger"
          value={String(highRiskCount)}
        />
        <MetricCard
          helper="$11,420 contract value"
          icon="calendar"
          label="Renewals · 30d"
          tone="warning"
          value="6"
        />
        <MetricCard
          helper="below 50% used"
          icon="trend"
          label="Low utilisation"
          tone="warning"
          value="4"
        />
      </div>

      <section className="subscriptions-toolbar" aria-label="Subscription filters">
        <div className="subscriptions-toolbar__primary">
          <label className="reference-search">
            <span aria-hidden="true">⌕</span>
            <input
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by tool, vendor, owner..."
              type="search"
              value={searchQuery}
            />
          </label>

          <div className="reference-filterbar__chips">
            <FilterDropdown
              className="filter-dropdown--category"
              label="Category"
              onChange={(value) => setCategory(value as ToolCategory | 'all')}
              options={[
                { label: 'All', value: 'all' },
                ...categories.map((item) => ({ label: item, value: item })),
              ]}
              value={category}
            />
            <FilterDropdown
              className="filter-dropdown--risk"
              label="Risk"
              onChange={(value) => setRisk(value as RenewalRisk | 'all')}
              options={[
                { label: 'Any', value: 'all' },
                ...risks.map((item) => ({ label: labelFromValue(item), value: item })),
              ]}
              value={risk}
            />
            <FilterDropdown
              className="filter-dropdown--status"
              label="Status"
              onChange={(value) => setStatus(value as SubscriptionStatus | 'all')}
              options={[
                { label: 'Any', value: 'all' },
                ...subscriptionStatuses.map((item) => ({
                  label: labelFromValue(item),
                  value: item,
                })),
              ]}
              value={status}
            />
            <FilterDropdown
              className="filter-dropdown--approval"
              label="Approval"
              onChange={(value) => setApprovalStatus(value as ApprovalStatus | 'all')}
              options={[
                { label: 'Any', value: 'all' },
                ...approvalStatuses.map((item) => ({
                  label: labelFromValue(item),
                  value: item,
                })),
              ]}
              value={approvalStatus}
            />
            <FilterDropdown
              className="filter-dropdown--cycle"
              label="Cycle"
              onChange={(value) => setBillingCycle(value as BillingCycle | 'all')}
              options={[
                { label: 'Any', value: 'all' },
                ...billingCycles.map((item) => ({ label: labelFromValue(item), value: item })),
              ]}
              value={billingCycle}
            />

            <button
              className="button-secondary subscriptions-reset-button"
              onClick={clearFilters}
              type="button"
            >
              <span aria-hidden="true">×</span>
              Reset
            </button>
          </div>

          <span className="reference-filterbar__count">Showing 16 of 24</span>
        </div>
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
