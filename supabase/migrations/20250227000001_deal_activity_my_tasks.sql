-- Allow deal activities to appear in the user's My Tasks page
ALTER TABLE public.deal_activities
  ADD COLUMN IF NOT EXISTS show_in_my_tasks boolean DEFAULT false;
