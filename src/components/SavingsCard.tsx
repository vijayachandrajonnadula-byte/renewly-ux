import type { SavingsOpportunity } from '../types'

type SavingsCardProps = {
  onAction?: (message: string) => void
  opportunity: SavingsOpportunity
  usageSignal?: string
}

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

function SavingsCard({ onAction, opportunity, usageSignal }: SavingsCardProps) {
  return (
    <article className="card savings-card">
      <div className="savings-card__header">
        <div>
          <p className="savings-card__label">Estimated potential</p>
          <h3 className="savings-card__title">{opportunity.toolName}</h3>
        </div>
        <span className="badge status-badge status-badge--info">
          {opportunity.confidence} confidence
        </span>
      </div>
      <div className="savings-card__meta">
        <span>{labelFromValue(opportunity.type)}</span>
        <span>{opportunity.riskLevel} risk</span>
      </div>
      <div className="savings-card__value">
        {formatCurrency(opportunity.estimatedMonthlySavings)}
        <span> / month estimated</span>
      </div>
      <div className="savings-card__value">
        {formatCurrency(opportunity.estimatedAnnualSavings)}
        <span> / year potential</span>
      </div>
      <p className="savings-card__body">{opportunity.reason}</p>
      {usageSignal ? <p className="savings-card__body">Based on mock usage data: {usageSignal}</p> : null}
      <p className="savings-card__action">
        Review recommended: {opportunity.recommendedAction}
      </p>
      {onAction ? (
        <div className="savings-card__actions">
          <button
            type="button"
            onClick={() => onAction('Opportunity marked for review in this mock workflow.')}
          >
            Review opportunity
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => onAction('Owner confirmation requested.')}
          >
            Request owner confirmation
          </button>
          <button
            className="button-secondary"
            type="button"
            onClick={() => onAction('Opportunity marked as reviewed.')}
          >
            Mark as reviewed
          </button>
        </div>
      ) : null}
    </article>
  )
}

export default SavingsCard
