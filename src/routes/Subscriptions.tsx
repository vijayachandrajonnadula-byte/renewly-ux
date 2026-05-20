import { useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import FilterDropdown from '../components/FilterDropdown'
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
      <div className="subscriptions-header">
        <div>
          <h2 className="subscriptions-header__title" id="subscriptions-title">
            Subscriptions
          </h2>
          <p className="subscriptions-header__subtitle">
            All SaaS tools across the workspace · 24 active subscriptions
          </p>
        </div>
        <div className="subscriptions-header__actions">
          <button className="button-secondary" type="button">
            <span aria-hidden="true">↓</span>
            Export list
          </button>
          <button type="button">
            <span aria-hidden="true">+</span>
            Add subscription
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
