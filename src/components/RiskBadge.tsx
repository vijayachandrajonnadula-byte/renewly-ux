import type { RenewalRisk } from '../types'

type RiskBadgeProps = {
  risk: RenewalRisk
}

const riskLabels: Record<RenewalRisk, string> = {
  low: 'Low risk',
  medium: 'Medium risk',
  high: 'High risk',
}

function RiskBadge({ risk }: RiskBadgeProps) {
  return <span className={`badge risk-badge risk-badge--${risk}`}>{riskLabels[risk]}</span>
}

export default RiskBadge
