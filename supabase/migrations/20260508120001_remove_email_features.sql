-- Remove all email/newsletter/Microsoft-Outlook tables and storage.
-- Runs AFTER 20260508_security_fixes.sql (alphabetical order on the same date).
--
-- Apply with: supabase db push
-- Idempotent: every DROP uses IF EXISTS.

-- =============================================================================
-- 1. Drop email-related tables (CASCADE handles FK chains)
-- =============================================================================

-- Newsletter / campaigns
DROP TABLE IF EXISTS public.email_events CASCADE;
DROP TABLE IF EXISTS public.campaign_ab_tests CASCADE;
DROP TABLE IF EXISTS public.newsletter_recipients CASCADE;
DROP TABLE IF EXISTS public.newsletter_campaigns CASCADE;
-- Sequences
DROP TABLE IF EXISTS public.sequence_enrollments CASCADE;
DROP TABLE IF EXISTS public.sequence_steps CASCADE;
DROP TABLE IF EXISTS public.email_sequences CASCADE;
-- Templates / signatures / assets
DROP TABLE IF EXISTS public.email_templates CASCADE;
DROP TABLE IF EXISTS public.email_signatures CASCADE;
DROP TABLE IF EXISTS public.email_assets CASCADE;
-- Segments
DROP TABLE IF EXISTS public.contact_segment_members CASCADE;
DROP TABLE IF EXISTS public.contact_segments CASCADE;
-- Outlook sync
DROP TABLE IF EXISTS public.outlook_emails CASCADE;
DROP TABLE IF EXISTS public.outlook_calendar_events CASCADE;
DROP TABLE IF EXISTS public.outlook_contacts CASCADE;
-- Microsoft OAuth (tokens + the safe view introduced earlier, if any)
DROP VIEW  IF EXISTS public.microsoft_connections CASCADE;
DROP TABLE IF EXISTS public.microsoft_oauth_tokens CASCADE;
-- =============================================================================
-- 2. email-assets storage bucket — drop policies only
-- =============================================================================
-- NOTE: Supabase blocks direct DELETE on storage.objects/buckets from SQL.
-- Empty + delete the bucket manually via the dashboard:
--   Dashboard → Storage → email-assets → "Empty bucket" → "Delete bucket"

DROP POLICY IF EXISTS "Users can upload their own assets" ON storage.objects;
DROP POLICY IF EXISTS "Users can view all assets"        ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own assets" ON storage.objects;
-- =============================================================================
-- 3. Update contractor_screen_access CHECK constraint to drop '/mail'
-- =============================================================================
-- (Existing rows with screen_path='/mail' would block the new CHECK; remove them first.)

DELETE FROM public.contractor_screen_access WHERE screen_path = '/mail';
ALTER TABLE public.contractor_screen_access
  DROP CONSTRAINT IF EXISTS contractor_screen_access_path_valid;
ALTER TABLE public.contractor_screen_access
  ADD CONSTRAINT contractor_screen_access_path_valid CHECK (
    screen_path IN (
      '/dashboard',
      '/projects',
      '/my-tasks',
      '/messages',
      '/sales',
      '/form-submissions',
      '/contacts'
    )
  );
-- =============================================================================
-- 4. Optional: drop deal_emails if you're sure the Sales DealEmailsViewer
--    no longer reads from it. The viewer fetches from an external webhook
--    (api/webhooks.ts), so the table is unused after this migration.
--    Commented out for safety — uncomment if you want to drop it.
-- =============================================================================
-- DROP TABLE IF EXISTS public.deal_emails CASCADE;;
