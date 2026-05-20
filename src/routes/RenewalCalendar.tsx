import { useMemo, useState } from 'react'
import CalendarCard from '../components/CalendarCard'
import EmptyState from '../components/EmptyState'
import FilterDropdown from '../components/FilterDropdown'
import MetricCard from '../components/MetricCard'
import RiskBadge from '../components/RiskBadge'
import StatusBadge from '../components/StatusBadge'
import { subscriptions } from '../data/subscriptions'
import type { Subscription } from '../types'

type RangeFilter = 30 | 60 | 90

const today = new Date('2026-05-15T00:00:00')

const rangeLabels: Record<RangeFilter, string> = {
  30: 'Next 30 days',
  60: 'Next 60 days',
  90: 'Next 90 days',
}

const referenceOrder = [
  'sub-forge-analytics',
  'sub-quillpad',
  'sub-pulsemail',
  'sub-threadly',
  'sub-cipher-vault',
  'sub-sonar-insights',
  'sub-beacon-crm',
  'sub-crater-docs',
  'sub-ledgr',
  'sub-nimbus-storage',
  'sub-marbl-design',
  'sub-loop-hr',
  'sub-voltage-ci',
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const getDateFromString = (value: string) => new Date(`${value}T00:00:00`)

const getDaysUntilRenewal = (subscription: Subscription) =>
  Math.ceil(
    (getDateFromString(subscription.renewalDate).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24),
  )

const getMonthLabel = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(getDateFromString(value))

const getShortDateParts = (value: string) => {
  const [month, day] = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  })
    .format(getDateFromString(value))
    .split(' ')

  return { day, month }
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

const isPendingApproval = (subscription: Subscription) =>
  subscription.approvalStatus === 'pending' || subscription.approvalStatus === 'needs_info'

const upcomingSubscriptions = subscriptions
  .filter((subscription) => getDaysUntilRenewal(subscription) >= 0)
  .sort((first, second) => {
    const firstReferenceIndex = referenceOrder.indexOf(first.id)
    const secondReferenceIndex = referenceOrder.indexOf(second.id)

    if (firstReferenceIndex !== -1 || secondReferenceIndex !== -1) {
      return (
        (firstReferenceIndex === -1 ? Number.MAX_SAFE_INTEGER : firstReferenceIndex) -
        (secondReferenceIndex === -1 ? Number.MAX_SAFE_INTEGER : secondReferenceIndex)
      )
    }

    return (
      getDateFromString(first.renewalDate).getTime() -
      getDateFromString(second.renewalDate).getTime()
    )
  })

const getRenewalsWithinDays = (days: number) =>
  upcomingSubscriptions.filter((subscription) => getDaysUntilRenewal(subscription) <= days)

const sumMonthlyCost = (items: Subscription[]) =>
  items.reduce((total, subscription) => total + subscription.monthlyCost, 0)

const departmentOptions = [
  { label: 'All', value: 'all' },
  ...[...new Set(subscriptions.map((subscription) => subscription.department))]
    .sort()
    .map((department) => ({ label: department, value: department })),
]

const ownerOptions = [
  { label: 'Any', value: 'all' },
  ...[...new Set(subscriptions.map((subscription) => subscription.owner))]
    .sort()
    .map((owner) => ({ label: owner, value: owner })),
]

function RenewalCalendar() {
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(90)
  const [highRiskOnly, setHighRiskOnly] = useState(false)
  const [pendingApprovalOnly, setPendingApprovalOnly] = useState(false)
  const [department, setDepartment] = useState('all')
  const [owner, setOwner] = useState('all')
  const [viewMode, setViewMode] = useState<'list' | 'month'>('list')

  const filteredRenewals = useMemo(() => {
    return upcomingSubscriptions.filter((subscription) => {
      const daysUntilRenewal = getDaysUntilRenewal(subscription)

      return (
        daysUntilRenewal <= rangeFilter &&
        (!highRiskOnly || subscription.renewalRisk === 'high') &&
        (!pendingApprovalOnly || isPendingApproval(subscription)) &&
        (department === 'all' || subscription.department === department) &&
        (owner === 'all' || subscription.owner === owner)
      )
    })
  }, [department, highRiskOnly, owner, pendingApprovalOnly, rangeFilter])

  const groupedRenewals = useMemo(() => {
    return filteredRenewals.reduce<Record<string, Subscription[]>>((groups, subscription) => {
      const month = getMonthLabel(subscription.renewalDate)

      return {
        ...groups,
        [month]: [...(groups[month] ?? []), subscription],
      }
    }, {})
  }, [filteredRenewals])

  const clearFilters = () => {
    setRangeFilter(90)
    setHighRiskOnly(false)
    setPendingApprovalOnly(false)
    setDepartment('all')
    setOwner('all')
  }

  const renewalsInThirtyDays = getRenewalsWithinDays(30)
  const renewalsInSixtyDays = getRenewalsWithinDays(60)
  const highRiskUpcoming = upcomingSubscriptions.filter(
    (subscription) => getDaysUntilRenewal(subscription) <= 90 && subscription.renewalRisk === 'high',
  )
  const upcomingRenewalSpend = getRenewalsWithinDays(90).reduce(
    (total, subscription) => total + subscription.monthlyCost,
    0,
  )

  return (
    <section
      className="renewal-calendar-page renewal-calendar-reference"
      aria-labelledby="renewal-calendar-title"
    >
      <div className="mobile-page mobile-renewals" aria-label="Mobile renewals">
        <header className="mobile-page-header">
          <h1>Renewals</h1>
          <p>4 next 30 days · 4 high-risk</p>
          <button className="mobile-primary-button" type="button">
            Export schedule
          </button>
        </header>

        <section className="mobile-kpi-grid" aria-label="Renewal summary">
          {[
            ['Next 30d', String(renewalsInThirtyDays.length), 'near-term'],
            ['Next 60d', String(renewalsInSixtyDays.length), 'planned'],
            ['High risk', String(highRiskUpcoming.length), 'needs review'],
            ['Spend', formatCurrency(upcomingRenewalSpend), '90 days'],
          ].map(([label, value, helper]) => (
            <article className="mobile-kpi-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{helper}</small>
            </article>
          ))}
        </section>

        <section className="mobile-filter-chip-row" aria-label="Renewal filters">
          {([30, 60, 90] as RangeFilter[]).map((range) => (
            <button
              className={rangeFilter === range ? 'is-active' : ''}
              key={range}
              onClick={() => setRangeFilter(range)}
              type="button"
            >
              {rangeLabels[range]}
            </button>
          ))}
          <button
            className={highRiskOnly ? 'is-active' : ''}
            onClick={() => setHighRiskOnly((currentValue) => !currentValue)}
            type="button"
          >
            High risk only
          </button>
          <button
            className={pendingApprovalOnly ? 'is-active' : ''}
            onClick={() => setPendingApprovalOnly((currentValue) => !currentValue)}
            type="button"
          >
            Pending approval only
          </button>
        </section>

        <div className="mobile-renewal-list">
          {filteredRenewals.slice(0, 10).map((subscription) => {
            const dateParts = getShortDateParts(subscription.renewalDate)

            return (
              <article className="mobile-renewal-card" key={subscription.id}>
                <span
                  className={`mobile-date-block${
                    subscription.renewalRisk === 'high' ? ' mobile-date-block--risk' : ''
                  }`}
                  aria-hidden="true"
                >
                  <small>{dateParts.month}</small>
                  <strong>{dateParts.day}</strong>
                </span>
                <div className="mobile-row-main">
                  <div className="mobile-row-title">
                    <strong>{subscription.toolName}</strong>
                    <RiskBadge risk={subscription.renewalRisk} />
                  </div>
                  <p>
                    {subscription.vendorName} · {subscription.category}
                  </p>
                  <small>
                    <span className="mobile-mini-avatar" aria-hidden="true">
                      {getInitials(subscription.owner)}
                    </span>
                    {subscription.owner}
                  </small>
                  <em>
                    {formatCurrency(subscription.monthlyCost)}/mo · in{' '}
                    {getDaysUntilRenewal(subscription)}d
                  </em>
                  <div className="mobile-card-badges">
                    <StatusBadge status={subscription.approvalStatus} />
                    <span>{subscription.cancellationWindowDays}d cancellation window</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="renewal-calendar-header">
        <div>
          <h2 id="renewal-calendar-title">Renewal calendar</h2>
          <p>
            Time-sensitive renewals across the workspace {'\u00B7'} grouped by month.
          </p>
        </div>
        <div className="renewal-calendar-header__actions">
          <div className="renewal-view-toggle" aria-label="Calendar view">
            {(['list', 'month'] as const).map((mode) => (
              <button
                className={viewMode === mode ? 'renewal-view-toggle__button--active' : ''}
                key={mode}
                onClick={() => setViewMode(mode)}
                type="button"
              >
                <span aria-hidden="true" className="renewal-toggle-icon">
                  {mode === 'list' ? (
                    <svg viewBox="0 0 16 16">
                      <path d="M3 4h10M3 8h10M3 12h10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16">
                      <path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" />
                    </svg>
                  )}
                </span>
                {mode === 'list' ? 'List' : 'Month'}
              </button>
            ))}
          </div>
          <button className="renewal-export-button" type="button">
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="M8 3v7M5.5 7.5 8 10l2.5-2.5M4 13h8" />
            </svg>
            Export schedule
          </button>
        </div>
      </div>

      <div className="summary-strip renewal-calendar-summary" aria-label="Renewal calendar summary">
        <MetricCard
          helper={`${formatCurrency(sumMonthlyCost(renewalsInThirtyDays))} contract value`}
          icon="calendar"
          label="Next 30 days"
          tone="primary"
          value={String(renewalsInThirtyDays.length)}
        />
        <MetricCard
          helper={`${formatCurrency(sumMonthlyCost(renewalsInSixtyDays))} contract value`}
          icon="calendar"
          label="Next 60 days"
          tone="primary"
          value={String(renewalsInSixtyDays.length)}
        />
        <MetricCard
          helper="needs review"
          icon="alert"
          label="High-risk upcoming"
          tone="danger"
          value={String(highRiskUpcoming.length)}
        />
        <MetricCard
          helper="next 90 days"
          icon="money"
          label="Upcoming renewal spend"
          tone="primary"
          value={formatCurrency(upcomingRenewalSpend)}
        />
      </div>

      <section className="renewal-filterbar-reference" aria-label="Renewal calendar filters">
        <div className="renewal-range-controls" aria-label="Date range">
          {([30, 60, 90] as RangeFilter[]).map((range) => (
            <button
              className={rangeFilter === range ? 'is-active' : ''}
              key={range}
              onClick={() => setRangeFilter(range)}
              type="button"
            >
              {rangeLabels[range]}
            </button>
          ))}
        </div>

        <div className="renewal-priority-controls" aria-label="Priority filters">
          <button
            className={highRiskOnly ? 'is-active' : ''}
            onClick={() => setHighRiskOnly((currentValue) => !currentValue)}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="M8 3 2.75 12.5h10.5L8 3ZM8 6.5v3M8 11.5h.01" />
            </svg>
            High risk only
          </button>
          <button
            className={pendingApprovalOnly ? 'is-active' : ''}
            onClick={() => setPendingApprovalOnly((currentValue) => !currentValue)}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16">
              <path d="M8 3.25v4.9l3 1.8M14 8A6 6 0 1 1 8 2" />
            </svg>
            Pending approval only
          </button>
        </div>

        <div className="renewal-owner-controls">
          <FilterDropdown
            className="renewal-filter-dropdown renewal-filter-dropdown--department"
            label="Department"
            onChange={setDepartment}
            options={departmentOptions}
            value={department}
          />
          <FilterDropdown
            className="renewal-filter-dropdown renewal-filter-dropdown--owner"
            label="Owner"
            onChange={setOwner}
            options={ownerOptions}
            value={owner}
          />
          <button className="renewal-clear-button" onClick={clearFilters} type="button">
            Reset
          </button>
        </div>
      </section>

      <section className="calendar-board" aria-label="Renewals grouped by month">
        {filteredRenewals.length > 0 ? (
          <div className="renewal-month-groups">
            {Object.entries(groupedRenewals).map(([month, monthRenewals]) => (
              <section className="renewal-month-group" key={month}>
                <div className="renewal-month-group__header">
                  <div>
                    <h3>{month}</h3>
                    <span>
                      {monthRenewals.length} renewals {'\u00B7'}{' '}
                      {formatCurrency(sumMonthlyCost(monthRenewals))} contract value
                    </span>
                  </div>
                  <p>Sorted by date</p>
                </div>
                <div className="renewal-card-grid-reference">
                  {monthRenewals.map((subscription) => (
                    <CalendarCard
                      daysUntilRenewal={getDaysUntilRenewal(subscription)}
                      key={subscription.id}
                      subscription={subscription}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="card">
            <EmptyState
              actionLabel="Clear filters"
              description="No renewals match the current date range and priority filters. Clear filters to return to the full upcoming renewal plan."
              onAction={clearFilters}
              title="No renewals found"
            />
          </div>
        )}
      </section>
    </section>
  )
}

export default RenewalCalendar
