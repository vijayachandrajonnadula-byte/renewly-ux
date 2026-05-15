export type RenewalRisk = 'low' | 'medium' | 'high'

export type SubscriptionStatus =
  | 'active'
  | 'under_review'
  | 'renewal_due'
  | 'pending_cancellation'
  | 'cancelled'

export type BillingCycle = 'monthly' | 'quarterly' | 'annual'

export type ApprovalStatus =
  | 'not_required'
  | 'pending'
  | 'approved'
  | 'needs_info'
  | 'rejected'

export type ToolCategory =
  | 'Communication'
  | 'Project Management'
  | 'Design'
  | 'Analytics'
  | 'CRM'
  | 'Finance'
  | 'HR'
  | 'Cloud'
  | 'Security'
  | 'Productivity'
  | 'Support'
  | 'Development'
  | 'Forms'

export type SavingsOpportunityType =
  | 'seat_reduction'
  | 'downgrade'
  | 'cancellation'
  | 'consolidation'
  | 'renegotiation'

export type UsageTrend = 'increasing' | 'stable' | 'declining' | 'limited' | 'unknown'

export type SavingsConfidence = 'low' | 'medium' | 'high'

export type Subscription = {
  id: string
  toolName: string
  vendorId: string
  vendorName: string
  category: ToolCategory
  owner: string
  department: string
  monthlyCost: number
  annualCost: number
  renewalDate: string
  billingCycle: BillingCycle
  seatsPurchased: number
  activeUsers: number
  status: SubscriptionStatus
  renewalRisk: RenewalRisk
  approvalStatus: ApprovalStatus
  cancellationWindowDays: number
  contractNotes: string
  lastReviewedDate: string
}

export type Vendor = {
  id: string
  name: string
  category: ToolCategory
  website: string
  supportEmail: string
  contractOwner: string
  paymentMethod: string
  riskNote: string
}

export type ApprovalRequest = {
  id: string
  subscriptionId: string
  toolName: string
  owner: string
  department: string
  renewalDate: string
  requestedDecision: string
  status: ApprovalStatus
  risk: RenewalRisk
  cost: number
  reasonForReview: string
  submittedBy: string
  submittedDate: string
}

export type UsageRecord = {
  id: string
  subscriptionId: string
  toolName: string
  seatsPurchased: number
  activeUsers: number
  inactiveUsers: number
  usageTrend: UsageTrend
  lastActivityDate: string
  utilisationPercentage: number
}

export type SavingsOpportunity = {
  id: string
  subscriptionId: string
  toolName: string
  type: SavingsOpportunityType
  estimatedMonthlySavings: number
  estimatedAnnualSavings: number
  confidence: SavingsConfidence
  reason: string
  recommendedAction: string
  riskLevel: RenewalRisk
}
