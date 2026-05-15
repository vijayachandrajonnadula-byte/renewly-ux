type MetricCardProps = {
  label: string
  value: string
  helper: string
  tone?: 'neutral' | 'primary' | 'warning' | 'danger' | 'success'
}

function MetricCard({ label, value, helper, tone = 'neutral' }: MetricCardProps) {
  return (
    <article className={`card metric-card metric-card--${tone}`}>
      <p className="metric-card__label">{label}</p>
      <div className="metric-card__value">{value}</div>
      <p className="metric-card__helper">{helper}</p>
    </article>
  )
}

export default MetricCard
