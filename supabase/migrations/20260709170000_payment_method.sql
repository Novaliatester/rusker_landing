-- Bank-transfer support: record how each order was paid and track async payments.
-- awaiting_transfer = checkout completed, funds not yet received (seats are held);
-- payment_failed = Stripe reported the async payment failed — handled manually.

alter table public.orders drop constraint orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('pending', 'paid', 'expired', 'awaiting_transfer', 'payment_failed'));

alter table public.orders add column payment_method text;
