import { useMemo, useState } from 'react'
import ConfirmationToast from '../components/ConfirmationToast'
import EmptyState from '../components/EmptyState'
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

function Savings() {
  const [typeFilter, setTypeFilter] = useState<SavingsOpportunityType | 'all'>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<SavingsConfidence | 'all'>('all')
  const [riskFilter, setRiskFilter] = useState<RenewalRisk | 'all'>('all')
  const [sortOrder, setSortOrder] = useState<SavingsSort>('default')
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
    setSortOrder('default')
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
    <section className="savings-page" aria-labelledby="savings-title">
      <div className="dashboard__header">
        <div>
          <h2 className="dashboard__title" id="savings-title">
            Savings opportunities
          </h2>
          <p className="dashboard__subtitle">
            Estimated savings — based on mock usage data. Review with owner before applying.
          </p>
          <p className="page-note">All values are estimates labelled as potential savings — not realised.</p>
        </div>
        <div className="dashboard__actions">
          <button className="button-secondary" type="button">
            Export list
          </button>
          <button type="button" onClick={() => setSortOrder('highest')}>
            ✓ Apply selected (2)
          </button>
        </div>
      </div>

      {confirmationMessage ? <ConfirmationToast message={confirmationMessage} /> : null}

      <div className="summary-strip" aria-label="Savings summary">
        <MetricCard
          helper="Mock estimated monthly potential"
          label="Estimated monthly savings"
          tone="success"
          value={formatCurrency(estimatedMonthlySavings)}
        />
        <MetricCard
          helper="Mock estimated annual potential"
          label="Estimated annual savings"
          tone="success"
          value={formatCurrency(estimatedAnnualSavings)}
        />
        <MetricCard
          helper="Opportunities in mock data"
          label="Opportunities found"
          tone="primary"
          value={String(savingsOpportunities.length)}
        />
        <MetricCard
          helper="Marked high confidence"
          label="High-confidence opportunities"
          value={String(highConfidenceCount)}
        />
      </div>

      <section className="filter-panel" aria-label="Savings filters">
        <div className="filter-grid savings-filter-grid">
          <label className="filter-field">
            <span>Opportunity type</span>
            <select
              onChange={(event) =>
                setTypeFilter(event.target.value as SavingsOpportunityType | 'all')
              }
              value={typeFilter}
            >
              <option value="all">All types</option>
              {opportunityTypes.map((type) => (
                <option key={type} value={type}>
                  {labelFromValue(type)}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span>Confidence</span>
            <select
              onChange={(event) =>
                setConfidenceFilter(event.target.value as SavingsConfidence | 'all')
              }
              value={confidenceFilter}
            >
              <option value="all">All confidence</option>
              {confidenceLevels.map((confidence) => (
                <option key={confidence} value={confidence}>
                  {labelFromValue(confidence)}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span>Risk level</span>
            <select
              onChange={(event) => setRiskFilter(event.target.value as RenewalRisk | 'all')}
              value={riskFilter}
            >
              <option value="all">All risk levels</option>
              {riskLevels.map((risk) => (
                <option key={risk} value={risk}>
                  {labelFromValue(risk)}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span>Sort</span>
            <select
              onChange={(event) => setSortOrder(event.target.value as SavingsSort)}
              value={sortOrder}
            >
              <option value="default">Default order</option>
              <option value="highest">Highest savings first</option>
            </select>
          </label>
          <button className="button-secondary filter-reset" onClick={clearFilters} type="button">
            Clear filters
          </button>
        </div>
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
