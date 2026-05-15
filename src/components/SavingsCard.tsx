import type { SavingsOpportunity } from '../types'

type SavingsCardProps = {
  opportunity: SavingsOpportunity
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value)

function SavingsCard({ opportunity }: SavingsCardProps) {
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
      <div className="savings-card__value">
        {formatCurrency(opportunity.estimatedAnnualSavings)}
        <span> / year</span>
      </div>
      <p className="savings-card__body">{opportunity.reason}</p>
      <p className="savings-card__action">
        Review recommended: {opportunity.recommendedAction}
      </p>
    </article>
  )
}

export default SavingsCard
