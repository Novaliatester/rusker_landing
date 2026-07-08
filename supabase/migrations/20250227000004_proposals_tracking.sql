-- Drop proposal fields from deals (added in error - proposals are their own entity)
ALTER TABLE public.deals
  DROP COLUMN IF EXISTS proposal_sent,
  DROP COLUMN IF EXISTS proposal_sent_at,
  DROP COLUMN IF EXISTS proposal_amount,
  DROP COLUMN IF EXISTS proposal_file_url,
  DROP COLUMN IF EXISTS proposal_notes,
  DROP COLUMN IF EXISTS proposal_status;
-- Commercial proposals: independent entity with unique reference per day
CREATE TABLE IF NOT EXISTS public.commercial_proposals (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  deal_id uuid REFERENCES public.deals(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES public.contacts(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  title text NOT NULL,
  amount numeric,
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')),
  sent_at timestamp with time zone,
  valid_until date,
  file_url text,
  notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT commercial_proposals_pkey PRIMARY KEY (id)
);
ALTER TABLE public.commercial_proposals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Authenticated users can view proposals" ON public.commercial_proposals;
CREATE POLICY "Authenticated users can view proposals"
  ON public.commercial_proposals FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Authenticated users can insert proposals" ON public.commercial_proposals;
CREATE POLICY "Authenticated users can insert proposals"
  ON public.commercial_proposals FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Authenticated users can update proposals" ON public.commercial_proposals;
CREATE POLICY "Authenticated users can update proposals"
  ON public.commercial_proposals FOR UPDATE TO authenticated USING (true);
DROP POLICY IF EXISTS "Authenticated users can delete proposals" ON public.commercial_proposals;
CREATE POLICY "Authenticated users can delete proposals"
  ON public.commercial_proposals FOR DELETE TO authenticated USING (true);
