# Two-Mode Checkout Implementation Plan

**Goal:** Split checkout into card (ephemeral, created-on-pay) and bank transfer (invoiced with a 14-day deadline, auto-cancelled + notified if unpaid), so unpaid bookings never leave lingering personal data.

**Architecture:** Card orders stay `pending` with ID scans in `tmp/` and are hard-deleted on `checkout.session.expired`; files are promoted to permanent storage only on payment. Transfer orders are committed as `awaiting_transfer`, back a Stripe Invoice (`send_invoice`, `days_until_due: 14`), hold the seat, and are cancelled by a daily cron if the invoice is unpaid past its due date. Payment reconciles automatically via `invoice.paid` or manually via an admin action.

**Tech stack:** Next.js 15 App Router, Stripe (Checkout + Invoicing), Supabase service role, next-intl, Vitest.

---

## Decisions (confirmed with user)
1. Proforma via Stripe Invoicing (`send_invoice`, finalize + our branded email carrying the hosted invoice link + due date).
2. Transfer holds a seat for the full 14 days — acceptable at 20-seat scale.
3. Consent audit rows must survive card-order deletion (kept in `consent_records`, which is not deleted with the order for card abandonment — re-evaluate: keep the consent row, drop only PII).

## Status lifecycle
- `pending` → `paid` (card, keyed on checkout session id) | deleted (session expired)
- `awaiting_transfer` → `paid` (keyed on invoice id) | `cancelled` (deadline passed) | `payment_failed`
- `expired` (legacy abandoned pending, cron) / `cancelled` (unpaid transfer, cron)

## Tasks
1. Migration: `cancelled` status + `stripe_invoice_id` column.
2. `lib/orders.ts`: `markOrderPaidWith` → pending-only; add `markInvoicePaidWith` (awaiting_transfer, keyed on invoice id) + `cancelUnpaidTransferWith`.
3. `lib/orders-create.ts`: `promoteDocuments(client, orderId)`; store tmp key on participant at creation; card defers promotion, transfer promotes immediately.
4. `lib/booking.ts`: accept `paymentMethod: 'card' | 'transfer'`.
5. `app/api/bookings/route.ts`: branch card (Checkout, card-only, files stay tmp) vs transfer (create awaiting_transfer, promote docs, finalize + send Stripe invoice, store invoice id, 14-day `expires_at`).
6. `lib/webhook.ts` + route: `checkout.session.expired` (discard ephemeral pending) and `invoice.paid` (transfer paid); card paid path promotes docs before emails.
7. `lib/cleanup.ts` + cron: cancel overdue transfers (void invoice, cancel order, purge docs, notify) + purge stale `tmp/` uploads.
8. `lib/emails.ts`: `sendTransferInstructions` + `sendCancellationNotice`.
9. Wizard: payment-method selector; transfer → `/checkout/invoice-sent`; messages fr/en.
10. Admin: `mark-paid` action for `awaiting_transfer` orders.
11. Infra: Stripe endpoint events (`checkout.session.expired`, `invoice.paid`), db push, deploy.
