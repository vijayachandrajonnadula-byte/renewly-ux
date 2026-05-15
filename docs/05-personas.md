# Personas

## Persona Status

These personas are provisional and created for a mock-data UX/UI portfolio project. They are not based on direct interviews or claimed user testing. Their purpose is to guide product decisions, information architecture, and future wireframes.

## Persona 1: Finance/Ops Manager

### Role Context

The Finance/Ops Manager coordinates software renewal planning, budget visibility, and approval follow-up. They may not own every tool, but they are accountable for making sure renewals are reviewed before deadlines.

### Goals

- Keep software spend predictable.
- Identify upcoming renewals early.
- Understand which renewals are high risk.
- Track pending approvals without chasing every stakeholder manually.
- Find realistic savings opportunities before contracts renew.

### Frustrations

- Renewal information is spread across spreadsheets, invoices, inboxes, and owner notes.
- Tool owners may respond late or provide incomplete context.
- Approval status can be unclear.
- High-cost renewals can become urgent before the team has reviewed them properly.

### Information Needs

- Renewal date and time remaining.
- Subscription owner and approver.
- Spend level.
- Usage signal.
- Renewal risk.
- Approval status.
- Estimated savings opportunity.
- Recommended next step.

### Key Decisions

- Which renewals need immediate review?
- Which owners or approvers need follow-up?
- Which tools should be renewed, renegotiated, canceled, or consolidated?
- Which savings opportunities should be escalated?

### UX Risks

- Too many metrics could slow prioritization.
- Weak status labels could create uncertainty.
- Hidden pending approvals could lead to missed follow-up.
- Risk labels could lose meaning if every item appears urgent.

## Persona 2: Department Tool Owner

### Role Context

The Department Tool Owner is responsible for a specific tool used by their team. They understand day-to-day value and usage context but may not know contract terms, renewal timing, or full spend implications.

### Goals

- Keep useful tools available for the team.
- Explain why a subscription should be renewed or changed.
- Respond to renewal requests without digging through finance details.
- Avoid surprise cancellations or rushed approval decisions.

### Frustrations

- Renewal requests may arrive late.
- Financial context may be hard to interpret.
- Usage signals may not reflect qualitative value.
- Decision forms can ask for information the owner does not have.

### Information Needs

- What tool is under review.
- Renewal deadline.
- Current owner and approver.
- Spend or plan summary.
- Usage trend or adoption signal.
- Reason the tool is flagged.
- Available decision options.
- Notes or context from finance and operations.

### Key Decisions

- Is this tool still needed?
- Is current usage enough to justify renewal?
- Should the team renew, downgrade, consolidate, or request more review?
- What context should be added before finance or leadership decides?

### UX Risks

- The interface may feel too finance-heavy and not speak to product value.
- Owners may be overwhelmed by contract or spend details.
- Missing usage context could lead to inaccurate decisions.
- Ambiguous actions could cause owners to approve when they meant to request more information.

## Persona 3: Founder/CFO/Admin

### Role Context

The Founder/CFO/Admin represents smaller organizations where one person may own finance, operations, and software purchasing decisions. They need a fast overview and clear action paths because SaaS management is only one part of their work.

### Goals

- See total upcoming renewal workload quickly.
- Avoid unnecessary software spend.
- Make confident renewal decisions with limited time.
- Understand where savings may be possible.
- Keep a lightweight record of decisions.

### Frustrations

- Too many subscriptions renew quietly in the background.
- Ownership may be informal or undocumented.
- There may be little time to investigate each tool deeply.
- It can be hard to know which renewal deserves attention first.

### Information Needs

- Dashboard summary of upcoming renewals.
- High-risk and high-savings items.
- Clear ownership or missing-owner status.
- Simple usage and spend signals.
- Decision history.
- Confirmation before final action.

### Key Decisions

- What should be reviewed today?
- Which tools can be canceled, consolidated, or renegotiated?
- Which decisions require another stakeholder?
- What savings story can be reported after review?

### UX Risks

- A complex enterprise workflow could feel too heavy.
- Too much detail could hide the next action.
- Missing confirmation could create accidental cancellations or approvals.
- Savings estimates could feel misleading if not clearly labeled as mock or estimated.

## Cross-Persona Design Implications

- Use Recognition over Recall by showing owner, deadline, risk, and approval state directly.
- Use Progressive Disclosure so each persona can start with summary information and inspect detail only when needed.
- Use Zeigarnik Effect to keep unfinished approvals visible.
- Use Error Prevention for renewal, cancellation, and escalation decisions.
- Use Law of Proximity and Law of Common Region to group decision-supporting information around each workflow stage.
