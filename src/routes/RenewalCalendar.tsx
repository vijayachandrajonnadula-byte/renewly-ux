import { useMemo, useState } from 'react'
import CalendarCard from '../components/CalendarCard'
import EmptyState from '../components/EmptyState'
import MetricCard from '../components/MetricCard'
import { savingsOpportunities } from '../data/savings'
import { subscriptions } from '../data/subscriptions'
import type { Subscription } from '../types'

type RangeFilter = 30 | 60 | 90

const today = new Date('2026-05-15T00:00:00')

const rangeLabels: Record<RangeFilter, string> = {
  30: 'Next 30 days',
  60: 'Next 60 days',
  90: 'Next 90 days',
}

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

const isPendingApproval = (subscription: Subscription) =>
  subscription.approvalStatus === 'pending' || subscription.approvalStatus === 'needs_info'

const upcomingSubscriptions = subscriptions
  .filter((subscription) => getDaysUntilRenewal(subscription) >= 0)
  .sort(
    (first, second) =>
      getDateFromString(first.renewalDate).getTime() -
      getDateFromString(second.renewalDate).getTime(),
  )

const getRenewalsWithinDays = (days: number) =>
  upcomingSubscriptions.filter((subscription) => {
    const daysUntilRenewal = getDaysUntilRenewal(subscription)

    return daysUntilRenewal <= days
  })

function RenewalCalendar() {
  const [rangeFilter, setRangeFilter] = useState<RangeFilter>(90)
  const [highRiskOnly, setHighRiskOnly] = useState(false)
  const [pendingApprovalOnly, setPendingApprovalOnly] = useState(false)

  const savingsSubscriptionIds = useMemo(
    () => new Set(savingsOpportunities.map((opportunity) => opportunity.subscriptionId)),
    [],
  )

  const filteredRenewals = useMemo(() => {
    return upcomingSubscriptions.filter((subscription) => {
      const daysUntilRenewal = getDaysUntilRenewal(subscription)

      return (
        daysUntilRenewal <= rangeFilter &&
        (!highRiskOnly || subscription.renewalRisk === 'high') &&
        (!pendingApprovalOnly || isPendingApproval(subscription))
      )
    })
  }, [highRiskOnly, pendingApprovalOnly, rangeFilter])

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
  }

  const renewalsInThirtyDays = getRenewalsWithinDays(30)
  const renewalsInSixtyDays = getRenewalsWithinDays(60)
  const highRiskUpcoming = upcomingSubscriptions.filter(
    (subscription) => getDaysUntilRenewal(subscription) <= 90 && subscription.renewalRisk === 'high',
  )
  const upcomingRenewalSpend = getRenewalsWithinDays(90).reduce(
    (total, subscription) => total + subscription.annualCost,
    0,
  )

  return (
    <section className="renewal-calendar-page" aria-labelledby="renewal-calendar-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="renewal-calendar-title">
            Renewal Calendar
          </h2>
          <p className="dashboard__subtitle">
            Track upcoming renewals, risk, ownership, and approval deadlines.
          </p>
        </div>
        <div className="dashboard__actions">
          <button type="button" onClick={() => setRangeFilter(30)}>
            Review next 30 days
          </button>
          <button className="button-secondary" type="button">
            Export renewal plan
          </button>
        </div>
      </div>

      <div className="summary-strip" aria-label="Renewal calendar summary">
        <MetricCard
          helper="Renewal dates through 14 Jun 2026"
          label="Renewals in next 30 days"
          tone="warning"
          value={String(renewalsInThirtyDays.length)}
        />
        <MetricCard
          helper="Renewal dates through 14 Jul 2026"
          label="Renewals in next 60 days"
          tone="primary"
          value={String(renewalsInSixtyDays.length)}
        />
        <MetricCard
          helper="High-risk items in the next 90 days"
          label="High-risk upcoming renewals"
          tone="danger"
          value={String(highRiskUpcoming.length)}
        />
        <MetricCard
          helper="Mock annual spend renewing in 90 days"
          label="Upcoming renewal spend"
          tone="success"
          value={formatCurrency(upcomingRenewalSpend)}
        />
      </div>

      <section className="card calendar-filter-panel" aria-label="Renewal calendar filters">
        <div className="calendar-filter-group" aria-label="Date range">
          {([30, 60, 90] as RangeFilter[]).map((range) => (
            <button
              className={rangeFilter === range ? '' : 'button-secondary'}
              key={range}
              onClick={() => setRangeFilter(range)}
              type="button"
            >
              {rangeLabels[range]}
            </button>
          ))}
        </div>
        <div className="calendar-filter-group" aria-label="Priority filters">
          <button
            className={highRiskOnly ? '' : 'button-secondary'}
            onClick={() => setHighRiskOnly((currentValue) => !currentValue)}
            type="button"
          >
            High risk only
          </button>
          <button
            className={pendingApprovalOnly ? '' : 'button-secondary'}
            onClick={() => setPendingApprovalOnly((currentValue) => !currentValue)}
            type="button"
          >
            Pending approval only
          </button>
          <button className="button-secondary" onClick={clearFilters} type="button">
            Clear filters
          </button>
        </div>
      </section>

      <section className="calendar-board" aria-labelledby="calendar-board-title">
        <div className="section-heading">
          <div>
            <h2 id="calendar-board-title">Renewals by month</h2>
            <p>
              Showing {filteredRenewals.length} renewals in {rangeLabels[rangeFilter].toLowerCase()}.
            </p>
          </div>
        </div>

        {filteredRenewals.length > 0 ? (
          <div className="month-groups">
            {Object.entries(groupedRenewals).map(([month, monthRenewals]) => (
              <section className="month-group card" key={month}>
                <div className="month-group__header">
                  <h3>{month}</h3>
                  <span>{monthRenewals.length} renewals</span>
                </div>
                <div className="calendar-card-grid">
                  {monthRenewals.map((subscription) => (
                    <CalendarCard
                      daysUntilRenewal={getDaysUntilRenewal(subscription)}
                      hasSavingsOpportunity={savingsSubscriptionIds.has(subscription.id)}
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
