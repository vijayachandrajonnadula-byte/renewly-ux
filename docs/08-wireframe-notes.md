# Wireframe Notes

## Wireframe Status

These notes define screen-by-screen planning for Day 3 of Renewly. No UI has been built yet. The purpose is to clarify layout priorities, states, actions, and UX risks before visual design or frontend implementation begins.

## 1. Dashboard

### Screen Purpose

Provide a prioritized overview of urgent renewals, pending approvals, risk, and estimated savings opportunities.

### Main Content Sections

- Priority renewal summary.
- High-risk renewals.
- Pending approvals.
- Estimated savings opportunities.
- Recent decisions or unresolved work.

### Above-the-Fold Priority

Show urgent renewals and pending approvals first, with risk and savings exceptions visible nearby.

### Primary CTA

Review priority renewal.

### Secondary CTAs

- View all renewals.
- Open approval queue.
- Review estimated savings.
- View reports.

### Empty State

Show that no urgent renewal work is currently pending and provide a path to view all subscriptions.

### Loading State

Use stable summary placeholders for cards and priority lists so the layout does not jump.

### Error State

Explain that renewal summary data could not be loaded in the mock experience and provide a retry path.

### UX Risk to Avoid

Avoid giving every metric equal visual weight, which would force users to decide what matters before they can act.

### UX Laws Applied

- Hick's Law.
- Serial Position Effect.
- Von Restorff Effect.
- Progressive Disclosure.
- Aesthetic-Usability Effect.

## 2. Subscriptions List

### Screen Purpose

Help users compare and filter subscriptions across owner, renewal date, usage, risk, approval status, and savings potential.

### Main Content Sections

- Search and filter controls.
- Subscription table or list.
- Status, risk, and approval indicators.
- Sort controls.
- Selected filter summary.

### Above-the-Fold Priority

Show search, high-value filters, and the first set of subscriptions with renewal and owner context visible.

### Primary CTA

Open subscription detail.

### Secondary CTAs

- Filter subscriptions.
- Sort by renewal date, risk, usage, spend, or owner.
- Flag for review.
- Clear filters.

### Empty State

If no subscriptions match filters, explain the filter condition and offer a clear way to reset filters.

### Loading State

Show table row placeholders with stable column widths.

### Error State

Show that the subscription list could not be loaded and preserve the search/filter area where possible.

### UX Risk to Avoid

Avoid too many columns or controls competing for attention, especially before users understand the list structure.

### UX Laws Applied

- Jakob's Law.
- Miller's Law.
- Law of Proximity.
- Recognition over Recall.
- Hick's Law.

## 3. Subscription Detail

### Screen Purpose

Provide enough context for a user to decide whether to renew, reduce seats, request review, or cancel.

### Main Content Sections

- Subscription summary.
- Renewal timeline.
- Owner and approver context.
- Usage signal.
- Spend and estimated savings context.
- Renewal risk explanation.
- Notes and decision history.
- Decision action area.

### Above-the-Fold Priority

Show the subscription name, renewal deadline, owner, risk state, approval state, and primary decision actions.

### Primary CTA

Start renewal decision.

### Secondary CTAs

- Request review.
- Reduce seats.
- Mark as needs owner.
- View savings opportunity.
- Return to subscription list.

### Empty State

For missing usage or owner data, show a clear incomplete-state message and suggested next step.

### Loading State

Use skeleton sections for summary, timeline, usage, and decision history.

### Error State

Show that subscription details could not be loaded and offer a return path to the list.

### UX Risk to Avoid

Avoid burying the decision actions below too much detail or allowing decisions when required context is visibly missing.

### UX Laws Applied

- Law of Common Region.
- Law of Proximity.
- Progressive Disclosure.
- Recognition over Recall.
- Error Prevention.
- Fitts's Law.

## 4. Renewal Calendar

### Screen Purpose

Help users understand renewal timing and plan reviews before deadlines.

### Main Content Sections

- Calendar or timeline view.
- Upcoming renewal groups.
- Risk and approval labels.
- Time-window filters.
- Selected renewal preview.

### Above-the-Fold Priority

Show the nearest renewal window and any high-risk or blocked renewals within it.

### Primary CTA

Review upcoming renewal.

### Secondary CTAs

- Switch calendar/list view.
- Filter by month, owner, risk, or status.
- Open subscription detail.
- Open approval queue for blocked renewals.

### Empty State

Show that no renewals are scheduled in the selected time window and offer a broader date range.

### Loading State

Show timeline or calendar placeholders with reserved spacing.

### Error State

Explain that renewal timing could not be loaded and provide a retry or list-view fallback.

### UX Risk to Avoid

Avoid a decorative calendar that looks useful but hides the next actionable renewal.

### UX Laws Applied

- Serial Position Effect.
- Tesler's Law.
- Zeigarnik Effect.
- Progressive Disclosure.
- Recognition over Recall.

## 5. Approval Queue

### Screen Purpose

Make pending renewal decisions visible and easy to review or route.

### Main Content Sections

- Pending approval list.
- Approval detail preview.
- Due dates and risk labels.
- Missing information indicators.
- Decision controls.

### Above-the-Fold Priority

Show overdue, high-risk, or deadline-sensitive approvals first.

### Primary CTA

Review pending approval.

### Secondary CTAs

- Request more information.
- Open subscription detail.
- Filter by approver or due date.
- Mark as blocked in mock workflow state.

### Empty State

Show that no approvals are pending and direct users back to renewals or reports.

### Loading State

Show approval row placeholders and preserve the queue layout.

### Error State

Explain that approval items could not be loaded and provide a retry path.

### UX Risk to Avoid

Avoid making approval, rejection, or cancellation actions too easy to trigger accidentally.

### UX Laws Applied

- Zeigarnik Effect.
- Error Prevention.
- Fitts's Law.
- Law of Common Region.
- Hick's Law.

## 6. Savings Opportunities

### Screen Purpose

Help users review estimated potential savings before renewal deadlines.

### Main Content Sections

- Estimated opportunity summary.
- Opportunity cards or list.
- Opportunity type filters.
- Supporting mock signal.
- Review recommendation.
- Related subscription links.

### Above-the-Fold Priority

Show the highest-priority estimated opportunities with cautious language and clear review actions.

### Primary CTA

Review opportunity.

### Secondary CTAs

- Open related subscription.
- Filter by opportunity type.
- View supporting detail.
- Mark review recommended.

### Empty State

Show that no savings opportunities are currently flagged and explain that this is based on mock portfolio data.

### Loading State

Show stable placeholders for opportunity cards and summary values.

### Error State

Explain that savings opportunities could not be loaded and avoid implying lost financial data.

### UX Risk to Avoid

Avoid presenting estimates as guaranteed savings or overstating precision.

### UX Laws Applied

- Von Restorff Effect.
- Error Prevention.
- Progressive Disclosure.
- Recognition over Recall.
- Aesthetic-Usability Effect.

## 7. Reports

### Screen Purpose

Create a clear end moment that summarizes renewal decisions, pending work, and estimated opportunities reviewed.

### Main Content Sections

- Review period summary.
- Completed decisions.
- Pending approvals.
- Estimated potential savings reviewed.
- High-risk renewals resolved or still open.
- Next steps.

### Above-the-Fold Priority

Show the review outcome summary and any unresolved items that still need attention.

### Primary CTA

Review summary.

### Secondary CTAs

- Filter report period.
- Open unresolved item.
- View savings details.
- Return to dashboard.

### Empty State

Show that no renewal decisions have been recorded for the selected period and suggest reviewing renewals.

### Loading State

Show summary and section placeholders with stable report spacing.

### Error State

Explain that the report could not be prepared and offer a retry path.

### UX Risk to Avoid

Avoid making reports feel like a data dump without a clear conclusion or next action.

### UX Laws Applied

- Peak-End Rule.
- Miller's Law.
- Recognition over Recall.
- Law of Common Region.
- Aesthetic-Usability Effect.

## 8. Settings

### Screen Purpose

Provide a place for mock workspace preferences, labels, and configuration concepts without distracting from the main renewal workflow.

### Main Content Sections

- Workspace profile.
- Notification timing concepts.
- Renewal status labels.
- Risk label definitions.
- Savings terminology.
- Role or permission concepts for later planning.

### Above-the-Fold Priority

Show workspace identity and the most relevant mock settings categories.

### Primary CTA

Review settings.

### Secondary CTAs

- Edit mock notification preferences.
- Review risk label definitions.
- Review savings language.
- Return to dashboard.

### Empty State

For optional settings sections, show a clear placeholder that explains the concept without suggesting real configuration is active.

### Loading State

Show section placeholders for settings groups.

### Error State

Explain that mock settings could not be loaded and keep navigation available.

### UX Risk to Avoid

Avoid turning settings into a primary workflow or implying real account-level configuration.

### UX Laws Applied

- Jakob's Law.
- Progressive Disclosure.
- Recognition over Recall.
- Error Prevention.
