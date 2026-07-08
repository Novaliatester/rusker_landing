-- Per-contractor navigation: which main app sections (routes) they may access.
-- When a contractor has no rows here, the app uses the legacy default:
-- /projects, /my-tasks, /messages

CREATE TABLE public.contractor_screen_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  screen_path text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT contractor_screen_access_user_screen_unique UNIQUE (user_id, screen_path),
  CONSTRAINT contractor_screen_access_path_valid CHECK (
    screen_path IN (
      '/dashboard',
      '/projects',
      '/my-tasks',
      '/messages',
      '/mail',
      '/sales',
      '/form-submissions',
      '/contacts'
    )
  )
);
CREATE INDEX idx_contractor_screen_access_user ON public.contractor_screen_access(user_id);
ALTER TABLE public.contractor_screen_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY contractor_screen_access_select
ON public.contractor_screen_access
FOR SELECT
TO authenticated
USING (
  user_id = auth.uid()
  OR coalesce((auth.jwt()->'app_metadata'->>'role'), '') = 'admin'
);
CREATE POLICY contractor_screen_access_insert
ON public.contractor_screen_access
FOR INSERT
TO authenticated
WITH CHECK (coalesce((auth.jwt()->'app_metadata'->>'role'), '') = 'admin');
CREATE POLICY contractor_screen_access_update
ON public.contractor_screen_access
FOR UPDATE
TO authenticated
USING (coalesce((auth.jwt()->'app_metadata'->>'role'), '') = 'admin');
CREATE POLICY contractor_screen_access_delete
ON public.contractor_screen_access
FOR DELETE
TO authenticated
USING (coalesce((auth.jwt()->'app_metadata'->>'role'), '') = 'admin');
