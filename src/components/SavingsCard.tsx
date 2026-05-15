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
        <div className="savings-card__identity">
          <span className="tool-avatar" aria-hidden="true">
            {opportunity.toolName.charAt(0)}
          </span>
          <div>
            <h3 className="savings-card__title">{opportunity.toolName}</h3>
            <p>Based on mock usage signal · last 60 days</p>
          </div>
        </div>
        <span className={`badge status-badge status-badge--${opportunity.confidence === 'high' ? 'success' : opportunity.confidence === 'medium' ? 'warning' : 'neutral'}`}>
          {opportunity.confidence} confidence
        </span>
      </div>
      <div className="savings-card__meta">
        <span>{labelFromValue(opportunity.type)}</span>
      </div>
      <div className="savings-card__amounts">
        <div>
          <span>Est. monthly</span>
          <strong>{formatCurrency(opportunity.estimatedMonthlySavings)}</strong>
        </div>
        <div>
          <span>Est. annual</span>
          <strong>{formatCurrency(opportunity.estimatedAnnualSavings)}</strong>
        </div>
      </div>
      <p className="savings-card__label">Reason</p>
      <p className="savings-card__body">{opportunity.reason}</p>
      {usageSignal ? <p className="savings-card__body">Based on mock usage data: {usageSignal}</p> : null}
      <div className="savings-card__recommendation">
        <span>Recommended</span>
        <strong>{opportunity.recommendedAction}</strong>
        <em>Risk · {opportunity.riskLevel}</em>
      </div>
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
