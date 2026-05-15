# Problem Statement

## Problem Background

Renewly is a mock-data UX/UI portfolio project for a B2B SaaS subscription and renewal management platform. The product explores how companies can track software subscriptions, renewal dates, owners, usage, approval decisions, renewal risk, and estimated savings opportunities in one structured workspace.

In many organizations, SaaS renewal work is distributed across spreadsheets, inboxes, calendar reminders, contract folders, expense records, and informal owner knowledge. This makes the renewal process vulnerable to missed deadlines, incomplete reviews, unclear accountability, and decisions made with partial context.

This project does not claim real user testing, real integrations, or validated research findings. The problem framing is based on a common B2B operations scenario and will be explored through mock data, UX reasoning, and product-design documentation.

## Who Experiences the Problem

- Finance and operations managers who need to control software spend and forecast renewals.
- Department tool owners who need to justify whether a tool is still valuable.
- Founders, CFOs, and admins in smaller companies who manage purchasing decisions across many tools.
- IT or operations stakeholders who need ownership, access, and usage context before renewal decisions are made.

## Why the Problem Matters

Renewal decisions are time-sensitive and often involve multiple stakeholders. When the information needed to make a decision is scattered, teams may delay action until the deadline is close. This increases cognitive load, creates follow-up work, and can lead to renewals that are approved by default instead of reviewed intentionally.

From a UX perspective, the problem is not only that information exists in too many places. The deeper problem is that users must remember context, compare disconnected signals, chase missing approvals, and decide under time pressure. Renewly should reduce that burden by making important facts visible at the moment of decision.

## Current Pain Points

- Renewal dates are tracked manually or inconsistently.
- Subscription ownership is unclear or outdated.
- Usage context may be unavailable when spend is reviewed.
- Approval decisions can be buried in email, chat, or meeting notes.
- High-risk renewals may look visually similar to routine renewals.
- Savings opportunities may be noticed too late to support negotiation.
- Users may need to inspect too many fields before understanding what action is required.

## Business Impact

- Budget owners may approve renewals without enough context.
- Teams may miss opportunities to renegotiate, consolidate, or cancel unused tools.
- Renewal reviews may require repetitive coordination across finance, operations, IT, and department leads.
- Leadership may lack a clear view of upcoming software commitments.
- Manual tracking can make renewal planning feel reactive rather than controlled.

## User Impact

- Users spend extra time searching for owner, usage, spend, and approval details.
- Users carry more information in memory than the workflow should require.
- Users may feel uncertain about whether they have enough context to approve, reject, or escalate a renewal.
- Pending reviews can create anxiety because unfinished work is easy to lose track of.
- High-impact decisions can feel risky without confirmation and clear next steps.

## Design Challenge

Design a focused SaaS experience that helps users move from scattered renewal information to prioritized, confident action. The product should use familiar dashboard patterns, group complex information into manageable sections, highlight risk and savings opportunities, keep pending approvals visible, and prevent accidental renewal decisions.

## UX Principles to Apply

- Hick's Law: reduce decision overload by prioritizing the most relevant actions.
- Jakob's Law: use familiar SaaS dashboard, table, and detail-page patterns.
- Miller's Law: group renewal information into manageable sections.
- Law of Proximity: place related owner, usage, spend, and risk details near each other.
- Law of Common Region: use sections and panels to clarify information groups.
- Von Restorff Effect: make high-risk renewals and savings opportunities stand out.
- Zeigarnik Effect: keep pending approvals and incomplete reviews visible.
- Progressive Disclosure: show summary first and detail second.
- Recognition over Recall: display key facts instead of requiring users to remember them.
- Error Prevention: add confirmation and clarity around high-impact decisions.
