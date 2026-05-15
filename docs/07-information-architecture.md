# Information Architecture

## IA Status

This document defines the Day 3 information architecture for Renewly, a mock-data UX/UI portfolio project. It is planning documentation only and does not describe a built interface, real user testing, or real integrations.

## Navigation Model

Main navigation:

- Dashboard
- Subscriptions
- Renewals
- Approvals
- Savings
- Reports
- Settings

The navigation should follow familiar B2B SaaS patterns so users can quickly understand where to review work, inspect detail, make decisions, and report outcomes.

## Dashboard

### Page Purpose

Give users a prioritized overview of renewal work, risk, pending approvals, and estimated savings opportunities.

### Primary User Goal

Understand what needs attention first without reviewing every subscription.

### Key Information Shown

- Urgent upcoming renewals.
- High-risk renewals.
- Pending approval count and priority items.
- Estimated savings opportunities.
- Recent renewal decisions or unresolved work.

### Primary Action

Review the highest-priority renewal.

### Secondary Actions

- View all renewals.
- Open pending approvals.
- Review estimated savings opportunities.
- Filter dashboard modules by time window.

### Related UX Laws and Principles

- Hick's Law: reduce initial decision overload.
- Serial Position Effect: place urgent work where users notice it first.
- Von Restorff Effect: highlight high-risk renewals and savings opportunities.
- Progressive Disclosure: show summary first and route users to detail.

## Subscriptions

### Page Purpose

Provide a searchable, filterable inventory of software subscriptions used in the company.

### Primary User Goal

Compare subscriptions by owner, category, renewal date, usage signal, spend, and status.

### Key Information Shown

- Subscription name and category.
- Owner and department.
- Renewal date.
- Spend level or mock annual cost.
- Usage signal.
- Approval status.
- Renewal risk.

### Primary Action

Open a subscription detail page.

### Secondary Actions

- Search subscriptions.
- Filter by owner, department, category, risk, renewal window, or approval status.
- Sort by renewal date, spend, risk, or usage signal.
- Flag a subscription for review.

### Related UX Laws and Principles

- Jakob's Law: use familiar SaaS table and filter patterns.
- Miller's Law: keep comparison fields manageable.
- Law of Proximity: keep row-level facts close to the subscription name.
- Recognition over Recall: display owner, renewal date, and status directly.

## Renewals

### Page Purpose

Focus specifically on renewal timing, urgency, and deadline-driven planning.

### Primary User Goal

See which renewals are coming up and plan action before deadlines.

### Key Information Shown

- Renewal calendar or timeline.
- Renewals grouped by week, month, or urgency.
- Risk level.
- Owner.
- Approval status.
- Recommended next step.

### Primary Action

Review the next upcoming renewal.

### Secondary Actions

- Switch between calendar and list views.
- Filter by renewal window.
- Open renewal risk review.
- Assign or update renewal owner in mock planning notes.

### Related UX Laws and Principles

- Serial Position Effect: surface nearest deadlines first.
- Tesler's Law: organize unavoidable renewal complexity into time-based views.
- Progressive Disclosure: show calendar overview before subscription detail.
- Zeigarnik Effect: keep incomplete renewal reviews visible.

## Approvals

### Page Purpose

Make pending renewal decisions visible and easy to follow up on.

### Primary User Goal

Resolve or route approval decisions that are blocking renewal progress.

### Key Information Shown

- Pending approvals.
- Requesting owner.
- Approver or decision role.
- Due date.
- Subscription under review.
- Decision options.
- Missing information or blockers.

### Primary Action

Review a pending approval.

### Secondary Actions

- Filter by approver, deadline, risk, or status.
- Request more information.
- Mark a decision as blocked in mock workflow state.
- Open related subscription detail.

### Related UX Laws and Principles

- Zeigarnik Effect: keep unfinished approvals visible.
- Error Prevention: clarify consequences before approval or rejection.
- Law of Common Region: group each approval request with its context.
- Fitts's Law: make review actions easy to reach.

## Savings

### Page Purpose

Highlight estimated savings opportunities that may come from cancellation, consolidation, downgrade, seat reduction, or renegotiation.

### Primary User Goal

Understand which opportunities deserve review before renewal deadlines.

### Key Information Shown

- Estimated opportunity amount or qualitative savings level.
- Opportunity type.
- Related subscription.
- Supporting mock signal.
- Review status.
- Recommended next step.

### Primary Action

Review a savings opportunity.

### Secondary Actions

- Filter by opportunity type.
- Open related subscription detail.
- Mark opportunity as review recommended.
- View opportunity assumptions or supporting notes.

### Related UX Laws and Principles

- Von Restorff Effect: make savings opportunities visible without overstating certainty.
- Error Prevention: use cautious language such as "estimated," "potential," and "review recommended."
- Recognition over Recall: explain why an opportunity is being shown.
- Progressive Disclosure: summarize first, then show supporting detail.

## Reports

### Page Purpose

Create a clear summary of renewal decisions, unresolved work, and estimated portfolio impact.

### Primary User Goal

Understand what happened during a renewal review period and what still needs action.

### Key Information Shown

- Completed renewal decisions.
- Pending approvals.
- Estimated potential savings reviewed.
- High-risk renewals resolved or still open.
- Decision summary by category or status.

### Primary Action

Review renewal summary.

### Secondary Actions

- Filter by time period.
- Review unresolved items.
- Open supporting subscriptions.
- Prepare a portfolio case-study snapshot from mock data.

### Related UX Laws and Principles

- Peak-End Rule: create a clear end moment after review work.
- Recognition over Recall: summarize decisions and outcomes directly.
- Miller's Law: group report sections into manageable categories.
- Aesthetic-Usability Effect: keep reporting clean, credible, and easy to scan.

## Settings

### Page Purpose

Hold mock product preferences and configuration concepts without becoming a primary workflow destination.

### Primary User Goal

Understand or adjust workspace-level settings in a future UI concept.

### Key Information Shown

- Mock workspace profile.
- Renewal notification preferences.
- Status label definitions.
- Risk and savings terminology.
- Role or permission concepts for future planning.

### Primary Action

Review workspace settings.

### Secondary Actions

- Adjust mock notification timing.
- Review status definitions.
- Review risk-label meanings.
- Return to dashboard or renewal workflow.

### Related UX Laws and Principles

- Jakob's Law: follow familiar SaaS settings patterns.
- Progressive Disclosure: keep advanced configuration away from primary workflows.
- Recognition over Recall: define labels and terms clearly.
- Error Prevention: avoid unclear settings that could affect renewal decisions.

## IA Principles

- Keep the dashboard focused on priority, not equal-weight metrics.
- Separate inventory browsing from deadline-driven renewal work.
- Keep approval decisions visible until resolved.
- Treat savings as estimated opportunities that require review.
- Use reports to close the loop after renewal review work.
- Avoid adding navigation items that do not support the core portfolio story.
