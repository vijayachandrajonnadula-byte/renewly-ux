# UX Decisions

## Decision Log Status

This document tracks Day 3 product-design decisions for Renewly, a mock-data UX/UI portfolio project. The decisions below guide information architecture and wireframe planning only. They do not claim real user testing, real integrations, or production behavior.

## Decision 1: Dashboard Prioritizes Urgent Renewal Work

### Decision

The dashboard should prioritize urgent renewals, pending approvals, high-risk items, and estimated savings opportunities instead of showing every metric equally.

### Rationale

The dashboard is the user's orientation point. If every metric has equal weight, the user must first interpret the dashboard before knowing what to do next.

### UX Principles

- Hick's Law: reduce the number of competing choices.
- Serial Position Effect: place the most important renewal work first.
- Von Restorff Effect: make urgent or exceptional states stand out.
- Progressive Disclosure: route users from summary to detail.

## Decision 2: Main Navigation Separates Inventory, Timing, Decisions, and Outcomes

### Decision

The main navigation should include Dashboard, Subscriptions, Renewals, Approvals, Savings, Reports, and Settings.

### Rationale

Each navigation item supports a distinct user mental model: overview, inventory, deadline planning, decision follow-up, opportunity review, outcome summary, and configuration.

### UX Principles

- Jakob's Law: use familiar B2B SaaS navigation patterns.
- Miller's Law: group product areas into understandable categories.
- Tesler's Law: distribute unavoidable renewal complexity across clear destinations.

## Decision 3: Subscription List Supports Comparison and Filtering

### Decision

The Subscription List should help users compare subscriptions and filter by owner, renewal date, risk, approval status, usage signal, category, and savings potential.

### Rationale

Users need to scan across many tools and identify which subscription deserves attention. Comparison should happen before deep inspection.

### UX Principles

- Jakob's Law: use familiar table, search, sort, and filter patterns.
- Law of Proximity: keep each subscription's key facts close together.
- Recognition over Recall: display owner, date, usage, risk, and status directly.
- Hick's Law: use focused filters rather than too many controls.

## Decision 4: Subscription Detail Supports Renewal Decisions

### Decision

The Subscription Detail screen should help users decide whether to renew, reduce seats, request review, or cancel.

### Rationale

The detail page should not simply display information. It should organize owner, renewal, usage, spend, approval, risk, and notes around the decision the user needs to make.

### UX Principles

- Law of Common Region: group summary, timeline, usage, ownership, risk, and decision areas.
- Law of Proximity: keep decision-supporting details near related actions.
- Progressive Disclosure: show summary first and deeper detail second.
- Fitts's Law: keep primary decision actions easy to reach.
- Error Prevention: prevent high-impact actions when context is incomplete.

## Decision 5: Renewal Calendar Emphasizes Upcoming Deadlines

### Decision

The Renewal Calendar should prioritize near-term deadlines and blocked renewals rather than behaving like a passive date archive.

### Rationale

Renewal work is deadline-driven. The calendar should help users plan action before urgency becomes a problem.

### UX Principles

- Serial Position Effect: nearest and most urgent renewals should be easiest to notice.
- Zeigarnik Effect: incomplete reviews remain visible.
- Tesler's Law: manage time-based complexity through a structured calendar or timeline.
- Recognition over Recall: show deadline, owner, and status together.

## Decision 6: Approval Queue Makes Pending Decisions Visible

### Decision

The Approval Queue should make pending, overdue, blocked, and high-risk decisions visible until they are resolved.

### Rationale

Pending approvals are unfinished work. If they become hidden, teams may assume a renewal is complete when a critical decision is still waiting.

### UX Principles

- Zeigarnik Effect: keep incomplete decisions visible.
- Error Prevention: avoid accidental approval, rejection, or cancellation.
- Fitts's Law: make review actions accessible while keeping destructive actions deliberate.
- Law of Common Region: group each approval with due date, owner, risk, and missing context.

## Decision 7: Savings Uses Cautious Language

### Decision

The Savings page should use cautious language such as "estimated," "potential," and "review recommended."

### Rationale

Renewly is a mock-data portfolio project. Savings should be framed as opportunities to review, not guaranteed financial outcomes.

### UX Principles

- Error Prevention: avoid misleading certainty.
- Recognition over Recall: explain why an opportunity is shown.
- Progressive Disclosure: show a summary before supporting assumptions.
- Aesthetic-Usability Effect: maintain trust through clear and restrained language.

## Decision 8: Reports Create a Clear End Moment

### Decision

Reports should create a clear end moment for the user by summarizing completed decisions, unresolved approvals, high-risk renewals, and estimated opportunities reviewed.

### Rationale

Renewal work needs closure. A report should help users understand what changed, what remains open, and what should happen next.

### UX Principles

- Peak-End Rule: end the workflow with a clear, reassuring summary.
- Miller's Law: group report content into digestible sections.
- Recognition over Recall: summarize outcomes directly.
- Aesthetic-Usability Effect: make the report feel credible and easy to scan.

## Decision 9: Settings Stays Secondary to the Renewal Workflow

### Decision

Settings should support mock workspace preferences, terminology, and future configuration concepts without becoming a primary workflow.

### Rationale

The core portfolio story is renewal decision-making. Settings should clarify the product system without distracting from dashboard, subscription, renewal, approval, savings, and reporting flows.

### UX Principles

- Progressive Disclosure: keep advanced concepts out of primary workflows.
- Jakob's Law: use familiar settings patterns.
- Error Prevention: avoid implying real account configuration or real integrations.

## Decision 10: Empty, Loading, and Error States Are Part of the UX Plan

### Decision

Each planned screen should include empty, loading, and error states before UI implementation begins.

### Rationale

State planning prevents the future interface from only working in ideal mock-data conditions. It also makes the portfolio feel more complete and product-minded.

### UX Principles

- Error Prevention: design for incomplete or unavailable data.
- Aesthetic-Usability Effect: stable states make the product feel trustworthy.
- Recognition over Recall: explain what happened and what users can do next.

## Open Decisions for Later

- Which dashboard modules should appear above the fold in the first UI pass?
- Should Renewals default to calendar view or prioritized list view?
- Which Subscription Detail actions require confirmation?
- How should mock savings assumptions be displayed without creating visual clutter?
- Should Reports include export concepts, or stay focused on in-product review summaries?
