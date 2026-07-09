-- Two-mode checkout: card (ephemeral until paid) and bank transfer (invoiced, 14-day deadline).
-- cancelled = an unpaid bank-transfer order past its invoice due date; the Stripe invoice is
-- voided, the seat released, ID scans purged, and the buyer + admins notified.

alter table public.orders drop constraint orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('pending', 'paid', 'expired', 'awaiting_transfer', 'payment_failed', 'cancelled'));

-- Stripe Invoice backing a bank-transfer order (collection_method send_invoice, due in 14 days).
alter table public.orders add column stripe_invoice_id text;
