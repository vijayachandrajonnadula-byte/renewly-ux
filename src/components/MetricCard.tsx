type MetricCardProps = {
  helper: string
  icon?: 'alert' | 'calendar' | 'money' | 'trend'
  label: string
  tone?: 'neutral' | 'primary' | 'warning' | 'danger' | 'success'
  value: string
}

function MetricIcon({ icon = 'money' }: { icon?: MetricCardProps['icon'] }) {
  const paths = {
    alert: (
      <>
        <path d="M12 4 3.5 19h17L12 4Z" />
        <path d="M12 9v4" />
        <path d="M12 16h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M8 3v4M16 3v4M5 10h14" />
      </>
    ),
    money: (
      <>
        <rect x="4" y="7" width="16" height="10" rx="1.5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M7 10h1M16 14h1" />
      </>
    ),
    trend: <path d="m5 16 4-4 3 3 7-7M15 8h4v4" />,
  }

  return (
    <span className="metric-card__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24">{paths[icon]}</svg>
    </span>
  )
}

function MetricCard({ helper, icon = 'money', label, tone = 'neutral', value }: MetricCardProps) {
  return (
    <article className={`card metric-card metric-card--${tone}`}>
      <div className="metric-card__top">
        <p className="metric-card__label">{label}</p>
        <MetricIcon icon={icon} />
      </div>
      <div>
        <div className="metric-card__value">{value}</div>
        <p className="metric-card__helper">{helper}</p>
      </div>
    </article>
  )
}

export default MetricCard
