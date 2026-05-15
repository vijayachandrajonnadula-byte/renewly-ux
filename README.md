# Renewly

Renewly is a mock-data UX/UI portfolio project for a B2B SaaS subscription and renewal management platform.

## One-Line Description

Renewly helps teams track software subscriptions, renewal dates, owners, usage signals, approval decisions, renewal risk, and savings opportunities in one focused workspace.

## Target Users

- Finance and procurement teams responsible for controlling SaaS spend.
- IT operations teams responsible for software ownership, access, and usage visibility.
- Department leaders who need to review upcoming renewals and justify tool value.
- Operations stakeholders who coordinate approvals before renewal deadlines.

## Core Problem

Many companies manage SaaS renewals across spreadsheets, inboxes, calendar reminders, and fragmented ownership notes. This creates late reviews, unclear accountability, duplicated tools, and missed savings opportunities. Renewly explores how a product experience could make upcoming renewal work visible, prioritized, and easier to act on.

## Product Bet

If renewal information is grouped by urgency, owner, usage, decision status, and savings potential, then teams can make faster and more confident renewal decisions without relying on scattered context or last-minute manual follow-up.

## Main Workflow

1. Review the dashboard summary for upcoming renewals, risk, pending approvals, and estimated savings opportunities.
2. Open the prioritized renewal queue.
3. Inspect a subscription detail view with owner, deadline, usage, spend, notes, and decision history.
4. Choose a guided decision path: renew, renegotiate, cancel, consolidate, or request more information.
5. Confirm the decision with a clear summary to reduce accidental approvals or cancellations.
6. Track pending approvals and unresolved reviews until the renewal cycle is complete.

## Scope

- Mock-data SaaS dashboard experience.
- Subscription inventory, renewal queue, approval states, and risk indicators.
- Product-design documentation for problem framing, research assumptions, personas, journey, information architecture, wireframes, visual direction, UX decisions, and case study drafting.
- Frontend implementation planned after documentation and UX structure are established.

## Out of Scope

- Real billing, procurement, or identity-provider integrations.
- Real customer data or live analytics.
- Real user testing claims.
- Production authentication and permissions.
- Automated contract parsing.
- Backend services or database persistence.
- Financial advice or legal contract review.

## Tech Stack

- React
- TypeScript
- Vite
- ESLint
- Mock data for portfolio demonstration

## Local Setup

```bash
npm install
npm run dev
npm run build
```

## UX Laws and Product Principles

Renewly will use these principles to guide documentation, information architecture, and future interface decisions:

- Hick's Law: reduce decision overload by prioritizing the most urgent renewal work.
- Fitts's Law: make primary renewal actions easy to reach in high-frequency workflows.
- Jakob's Law: use familiar B2B SaaS dashboard patterns.
- Miller's Law: group dense renewal information into manageable sections.
- Law of Proximity: keep related ownership, spend, risk, and usage details close together.
- Law of Common Region: use cards, panels, and sections to group related data.
- Serial Position Effect: place important status information and primary actions where users notice them.
- Von Restorff Effect: make high-risk renewals and savings opportunities stand out.
- Zeigarnik Effect: keep pending approvals and incomplete reviews visible.
- Tesler's Law: manage unavoidable renewal complexity through structured workflows.
- Aesthetic-Usability Effect: maintain a clean, trustworthy SaaS visual style.
- Progressive Disclosure: show summary first and details second.
- Recognition over Recall: display key facts clearly instead of expecting users to remember context.
- Error Prevention: reduce accidental approval, cancellation, or renewal decisions.
- Peak-End Rule: make confirmation and reporting moments clear and reassuring.

## Documentation

The initial product-design documentation lives in `docs/`:

- `01-problem-statement.md`
- `02-product-bet.md`
- `03-research-notes.md`
- `04-competitor-notes.md`
- `05-personas.md`
- `06-user-journey.md`
- `07-information-architecture.md`
- `08-wireframe-notes.md`
- `09-visual-direction.md`
- `10-ux-decisions.md`
- `11-case-study-draft.md`
