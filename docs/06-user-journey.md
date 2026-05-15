# User Journey

## Scenario

A user opens Renewly to review upcoming software renewals, understand renewal risk, confirm ownership and usage context, make an approval decision, and identify estimated savings opportunities. This journey is written for the mock-data portfolio product and does not claim observed user behavior.

## Journey Overview

Dashboard -> Subscription List -> Tool Detail -> Renewal Risk Review -> Usage & Owner Review -> Approval Decision -> Savings Report

## 1. Dashboard

### User Goal

Quickly understand the current renewal workload and identify what needs attention first.

### User Question

What is urgent, risky, pending, or potentially valuable to review today?

### Pain Point

If every metric is shown with equal weight, the user must decide what matters before they can act.

### Product Opportunity

Use summary cards, priority sections, and clear status labels to direct attention to upcoming renewals, high-risk items, pending approvals, and estimated savings opportunities.

### Relevant UX Law or Principle

- Hick's Law: reduce initial decision overload.
- Von Restorff Effect: make risk and savings exceptions stand out.
- Progressive Disclosure: show summary first and detail second.

## 2. Subscription List

### User Goal

Scan all subscriptions that need review and compare them by urgency, owner, usage, risk, and approval status.

### User Question

Which subscription should I open or act on next?

### Pain Point

Long lists can become hard to scan when columns, filters, and statuses compete for attention.

### Product Opportunity

Use familiar SaaS table patterns, concise filters, and grouped status indicators so users can sort and prioritize without learning a new interaction model.

### Relevant UX Law or Principle

- Jakob's Law: use familiar list and table conventions.
- Miller's Law: keep comparison fields manageable.
- Law of Proximity: keep each subscription's key facts close together.

## 3. Tool Detail

### User Goal

Understand one subscription well enough to decide whether it needs renewal, renegotiation, cancellation, consolidation, or more information.

### User Question

What do I need to know about this tool before making a renewal decision?

### Pain Point

Users may need to combine contract, usage, owner, spend, and approval context that normally lives in separate places.

### Product Opportunity

Structure the detail page into clear sections: summary, renewal timeline, owner and approver, usage signal, spend context, notes, and decision history.

### Relevant UX Law or Principle

- Law of Common Region: group related detail sections.
- Recognition over Recall: show key facts directly.
- Progressive Disclosure: reveal deeper detail after the summary.

## 4. Renewal Risk Review

### User Goal

Determine whether the renewal is routine, risky, blocked, or worth escalation.

### User Question

What makes this renewal risky, and what should I do about it?

### Pain Point

Risk can be ambiguous if it is not tied to specific signals such as deadline, missing owner, low usage, high spend, or pending approval.

### Product Opportunity

Explain risk through visible factors and attach the risk state to a recommended next action.

### Relevant UX Law or Principle

- Von Restorff Effect: highlight high-risk items without overusing emphasis.
- Recognition over Recall: explain the reason for risk in the interface.
- Hick's Law: limit the next actions connected to each risk state.

## 5. Usage & Owner Review

### User Goal

Confirm whether the right person owns the tool and whether usage supports renewal.

### User Question

Is this tool actively used, and who can confirm its business value?

### Pain Point

Usage signals may be incomplete, and ownership may be outdated or unclear.

### Product Opportunity

Place usage and ownership context near each other so the user can quickly see whether the decision is ready or needs follow-up.

### Relevant UX Law or Principle

- Law of Proximity: keep usage and ownership signals close.
- Zeigarnik Effect: keep missing owner or incomplete review states visible.
- Error Prevention: discourage final approval when required context is missing.

## 6. Approval Decision

### User Goal

Make or route a renewal decision with confidence.

### User Question

Should this subscription be renewed, renegotiated, canceled, consolidated, or sent back for more information?

### Pain Point

Approval actions can have budget and operational consequences, especially when users are rushed or uncertain.

### Product Opportunity

Provide guided decision options, clear consequence language, and confirmation summaries before high-impact actions are completed.

### Relevant UX Law or Principle

- Error Prevention: add confirmation for approval, cancellation, and escalation.
- Hick's Law: keep decision options focused.
- Recognition over Recall: show the key facts inside the decision moment.

## 7. Savings Report

### User Goal

Review estimated savings opportunities and understand what decisions contributed to them.

### User Question

What potential savings did the review uncover, and which actions support that estimate?

### Pain Point

Savings opportunities can feel abstract or untrustworthy if they are detached from specific subscriptions and decisions.

### Product Opportunity

Show estimated savings as a result of concrete actions such as cancellation, consolidation, downgrade, or renegotiation. Clearly label estimates as mock portfolio data.

### Relevant UX Law or Principle

- Law of Common Region: group savings by action type or subscription.
- Progressive Disclosure: summarize savings first, then show supporting detail.
- Error Prevention: avoid presenting estimates as guaranteed outcomes.

## Journey Design Risks

- Too many dashboard modules could weaken prioritization.
- Too many table columns could slow scanning.
- Overstated savings language could reduce trust.
- Risk labels could become noisy if applied too broadly.
- Approval decisions could feel unsafe without confirmation and consequence summaries.
