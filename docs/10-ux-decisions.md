# UX Decisions

## Decision Log Status

This document tracks product-design decisions for the Renewly portfolio project. These decisions are directional and should be revisited when wireframes and UI implementation begin.

## Decision 1: Keep the Day 2 Foundation Documentation-First

### Rationale

Renewly is a product design portfolio project, so the UX foundation needs to explain the problem, personas, journey, product bet, and decision logic before visual UI work begins.

### UX Principles

- Progressive Disclosure: define the concept before designing detailed screens.
- Recognition over Recall: document decisions so future UI choices can be traced back to user needs.

## Decision 2: Center the Experience on Renewal Decision-Making

### Rationale

The product should not start as a generic subscription database. The main value is helping users decide what to do about upcoming renewals.

### UX Principles

- Hick's Law: reduce the number of competing paths by centering the renewal workflow.
- Jakob's Law: use familiar SaaS workflow patterns for dashboards, lists, and detail pages.

## Decision 3: Use the Journey as the Core Product Flow

### Rationale

The core journey will be: Dashboard -> Subscription List -> Tool Detail -> Renewal Risk Review -> Usage & Owner Review -> Approval Decision -> Savings Report. This flow supports summary, prioritization, investigation, decision, and reporting.

### UX Principles

- Progressive Disclosure: move from overview to detail to decision.
- Miller's Law: break the work into manageable stages.
- Law of Common Region: give each stage a clear information group.

## Decision 4: Make Risk and Savings Exceptional States

### Rationale

High-risk renewals and estimated savings opportunities need to stand out because they shape prioritization. They should be visually distinct but not overused.

### UX Principles

- Von Restorff Effect: distinguish important exceptions.
- Hick's Law: attach exception states to clear next actions.
- Recognition over Recall: explain why an item is marked as risky or valuable.

## Decision 5: Keep Owners, Usage, and Approval State Close to the Decision

### Rationale

Renewal decisions depend on who owns the tool, whether it is used, and whether approval is complete. These facts should not be hidden on separate screens when the user is deciding.

### UX Principles

- Law of Proximity: place related decision facts near each other.
- Law of Common Region: group ownership, usage, and approval context into readable sections.
- Recognition over Recall: show the user what they need at the moment of decision.

## Decision 6: Treat Pending Approvals as Unfinished Work

### Rationale

Pending approvals can become invisible when they live only in email or chat. Renewly should keep incomplete reviews visible until they are resolved.

### UX Principles

- Zeigarnik Effect: unresolved tasks remain visible.
- Error Prevention: reduce the chance that a renewal is assumed complete when approval is still missing.

## Decision 7: Add Confirmation for High-Impact Actions

### Rationale

Approving, canceling, consolidating, or escalating a subscription can affect budget and team operations. The product should help users slow down at the right moment without making routine work feel heavy.

### UX Principles

- Error Prevention: confirm high-impact decisions before completion.
- Recognition over Recall: repeat key facts in the confirmation state.
- Hick's Law: keep confirmation choices clear and limited.

## Decision 8: Keep Savings Language Careful and Portfolio-Safe

### Rationale

Renewly uses mock data. Savings should be framed as estimated opportunities, not guaranteed outcomes or real financial results.

### UX Principles

- Error Prevention: avoid misleading claims.
- Progressive Disclosure: summarize estimated savings first, then show supporting assumptions or source signals.

## Open Decisions for Later

- How many dashboard summary cards are enough before the overview becomes noisy?
- Should the subscription list default to deadline, risk, or approval status?
- How should missing usage data be represented without implying a real integration?
- Should savings be shown as a separate report, a dashboard module, or both?
- Which decision actions require confirmation versus lightweight status updates?
