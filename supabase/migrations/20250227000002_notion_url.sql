ALTER TABLE public.trip_projects
  ADD COLUMN IF NOT EXISTS notion_url text;
