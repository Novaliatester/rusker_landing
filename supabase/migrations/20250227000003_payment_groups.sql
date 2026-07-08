-- Payment Groups: allows grouping multiple provider payments under a single label
-- (e.g. same company, same purpose). Supports "pay in full" and "partial" modes.

CREATE TABLE IF NOT EXISTS public.payment_groups (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL,
  group_name text NOT NULL,
  pay_in_full boolean DEFAULT true,
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_groups_pkey PRIMARY KEY (id),
  CONSTRAINT payment_groups_trip_id_fkey FOREIGN KEY (trip_id)
    REFERENCES public.trip_projects(id) ON DELETE CASCADE
);
-- Rename payer_name -> group_name if the old column exists
ALTER TABLE public.payment_groups
  RENAME COLUMN payer_name TO group_name;
-- Move group_id from project_payment_schedule to provider_payments
ALTER TABLE public.project_payment_schedule
  DROP COLUMN IF EXISTS group_id;
ALTER TABLE public.provider_payments
  ADD COLUMN IF NOT EXISTS group_id uuid REFERENCES public.payment_groups(id) ON DELETE SET NULL;
-- RLS policies for payment_groups (drop first to be idempotent)
ALTER TABLE public.payment_groups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view payment groups" ON public.payment_groups;
CREATE POLICY "Authenticated users can view payment groups"
  ON public.payment_groups FOR SELECT
  TO authenticated
  USING (true);
DROP POLICY IF EXISTS "Authenticated users can insert payment groups" ON public.payment_groups;
CREATE POLICY "Authenticated users can insert payment groups"
  ON public.payment_groups FOR INSERT
  TO authenticated
  WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated users can update payment groups" ON public.payment_groups;
CREATE POLICY "Authenticated users can update payment groups"
  ON public.payment_groups FOR UPDATE
  TO authenticated
  USING (true);
DROP POLICY IF EXISTS "Authenticated users can delete payment groups" ON public.payment_groups;
CREATE POLICY "Authenticated users can delete payment groups"
  ON public.payment_groups FOR DELETE
  TO authenticated
  USING (true);
