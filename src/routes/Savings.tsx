import { useMemo, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import EmptyState from '../components/EmptyState'
import FilterDropdown from '../components/FilterDropdown'
import MetricCard from '../components/MetricCard'
import SavingsCard from '../components/SavingsCard'
import { savingsOpportunities } from '../data/savings'
import { usageRecords } from '../data/usage'
import type { RenewalRisk, SavingsConfidence, SavingsOpportunityType } from '../types'

type SavingsSort = 'default' | 'highest'

const opportunityTypes = [
  'seat_reduction',
  'downgrade',
  'cancellation',
  'consolidation',
  'renegotiation',
] satisfies SavingsOpportunityType[]

const confidenceLevels = ['low', 'medium', 'high'] satisfies SavingsConfidence[]
const riskLevels = ['low', 'medium', 'high'] satisfies RenewalRisk[]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

const labelFromValue = (value: string) =>
  value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const typeOptions = [
  { label: 'All types', value: 'all' },
  ...opportunityTypes.map((type) => ({ label: labelFromValue(type), value: type })),
]

const confidenceOptions = [
  { label: 'Any', value: 'all' },
  ...confidenceLevels.map((confidence) => ({
    label: labelFromValue(confidence),
    value: confidence,
  })),
]

const riskOptions = [
  { label: 'Low + medium', value: 'all' },
  ...riskLevels.map((risk) => ({ label: labelFromValue(risk), value: risk })),
]

const sortOptions = [
  { label: 'Highest savings first', value: 'highest' },
  { label: 'Default order', value: 'default' },
]

function Savings() {
  const [typeFilter, setTypeFilter] = useState<SavingsOpportunityType | 'all'>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<SavingsConfidence | 'all'>('all')
  const [riskFilter, setRiskFilter] = useState<RenewalRisk | 'all'>('all')
  const [sortOrder, setSortOrder] = useState<SavingsSort>('highest')
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const filteredOpportunities = useMemo(() => {
    const filtered = savingsOpportunities.filter((opportunity) => {
      return (
        (typeFilter === 'all' || opportunity.type === typeFilter) &&
        (confidenceFilter === 'all' || opportunity.confidence === confidenceFilter) &&
        (riskFilter === 'all' || opportunity.riskLevel === riskFilter)
      )
    })

    if (sortOrder === 'highest') {
      return [...filtered].sort(
        (first, second) => second.estimatedAnnualSavings - first.estimatedAnnualSavings,
      )
    }

    return filtered
  }, [confidenceFilter, riskFilter, sortOrder, typeFilter])

  const clearFilters = () => {
    setTypeFilter('all')
    setConfidenceFilter('all')
    setRiskFilter('all')
    setSortOrder('highest')
  }

  const estimatedMonthlySavings = savingsOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedMonthlySavings,
    0,
  )
  const estimatedAnnualSavings = savingsOpportunities.reduce(
    (total, opportunity) => total + opportunity.estimatedAnnualSavings,
    0,
  )
  const highConfidenceCount = savingsOpportunities.filter(
    (opportunity) => opportunity.confidence === 'high',
  ).length

  return (
    <section className="savings-page reference-savings" aria-labelledby="savings-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="savings-title">
            Savings opportunities
          </h2>
          <p className="dashboard__subtitle">
            Estimated savings — based on mock usage data. Review with owner before applying.
          </p>
          <p className="page-note">
            All values are estimates labelled as potential savings — not realised.
          </p>
        </div>
        <div className="dashboard__actions">
          <button className="button-secondary" type="button">
            Export list
          </button>
          <button type="button" onClick={() => setSortOrder('highest')}>
            Apply selected (2)
          </button>
        </div>
      </div>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <div className="summary-strip" aria-label="Savings summary">
        <MetricCard
          helper="+12% vs Apr across opportunities"
          label="Est. monthly savings"
          tone="success"
          value={formatCurrency(estimatedMonthlySavings)}
        />
        <MetricCard
          helper="if all applied"
          label="Est. annual savings"
          tone="success"
          value={formatCurrency(estimatedAnnualSavings)}
        />
        <MetricCard
          helper="from 24 tools"
          label="Opportunities found"
          tone="primary"
          value={String(savingsOpportunities.length)}
        />
        <MetricCard
          helper="ready to review"
          label="High-confidence"
          value={String(highConfidenceCount)}
        />
      </div>

      <section className="reference-filterbar reference-filterbar--savings" aria-label="Savings filters">
        <div className="reference-filterbar__chips">
          <FilterDropdown
            className="filter-dropdown--savings-type"
            label="Type"
            onChange={(value) => setTypeFilter(value as SavingsOpportunityType | 'all')}
            options={typeOptions}
            value={typeFilter}
          />
          <FilterDropdown
            className="filter-dropdown--savings-confidence"
            label="Confidence"
            onChange={(value) => setConfidenceFilter(value as SavingsConfidence | 'all')}
            options={confidenceOptions}
            value={confidenceFilter}
          />
          <FilterDropdown
            className="filter-dropdown--savings-risk"
            label="Risk"
            onChange={(value) => setRiskFilter(value as RenewalRisk | 'all')}
            options={riskOptions}
            value={riskFilter}
          />
        </div>
        <FilterDropdown
          className="filter-dropdown--savings-sort"
          label="Sort"
          onChange={(value) => setSortOrder(value as SavingsSort)}
          options={sortOptions}
          value={sortOrder}
        />
      </section>

      {filteredOpportunities.length > 0 ? (
        <div className="savings-page-grid">
          {filteredOpportunities.map((opportunity) => {
            const usage = usageRecords.find(
              (record) => record.subscriptionId === opportunity.subscriptionId,
            )
            const usageSignal = usage
              ? `${usage.utilisationPercentage}% utilisation, ${usage.inactiveUsers} inactive seats`
              : undefined

            return (
              <SavingsCard
                key={opportunity.id}
                onAction={setConfirmationMessage}
                opportunity={opportunity}
                usageSignal={usageSignal}
              />
            )
          })}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            actionLabel="Clear filters"
            description="No estimated savings opportunities match the current filters. Clear filters to return to all mock opportunities."
            onAction={clearFilters}
            title="No opportunities found"
          />
        </div>
      )}
    </section>
  )
}

export default Savings
