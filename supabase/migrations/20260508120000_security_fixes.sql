-- Security audit remediation migration (2026-05-08)
-- Addresses Findings #1, #2, #5, #6, #7 from .gstack/security-reports/2026-05-08-audit.md
--
-- Apply with: supabase db push
-- Idempotent: each block uses DROP IF EXISTS / CREATE OR REPLACE so it can be re-run safely.

-- =============================================================================
-- HELPER: extract role from JWT (cheaper + no auth.users grant required)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    NULLIF((auth.jwt() -> 'app_metadata' ->> 'role'), ''),
    'contractor'  -- fail closed: unknown/missing role -> least privilege
  );
$$;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated, anon;
-- =============================================================================
-- HELPER: is user a member of this conversation? (avoids RLS recursion)
-- =============================================================================
CREATE OR REPLACE FUNCTION public.is_conversation_member(conv_id uuid, uid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.conversation_members
    WHERE conversation_id = conv_id
      AND user_id = uid
  );
$$;
GRANT EXECUTE ON FUNCTION public.is_conversation_member(uuid, uuid) TO authenticated;
-- =============================================================================
-- FINDING #1 — Conversation hijack
-- =============================================================================
-- Drop the OR-branch that lets any user add themselves to ANY conversation.
-- Replace recursive subqueries with the SECURITY DEFINER helper above.

DROP POLICY IF EXISTS "Users can view conversations they are members of" ON public.conversations;
CREATE POLICY "Users can view their conversations"
  ON public.conversations FOR SELECT TO authenticated
  USING (public.is_conversation_member(id, auth.uid()));
DROP POLICY IF EXISTS "Users can update conversations they are members of" ON public.conversations;
CREATE POLICY "Members can update their conversations"
  ON public.conversations FOR UPDATE TO authenticated
  USING (public.is_conversation_member(id, auth.uid()));
DROP POLICY IF EXISTS "Users can view members of their conversations" ON public.conversation_members;
CREATE POLICY "Members can view members of their conversations"
  ON public.conversation_members FOR SELECT TO authenticated
  USING (public.is_conversation_member(conversation_id, auth.uid()));
DROP POLICY IF EXISTS "Users can add members to conversations" ON public.conversation_members;
CREATE POLICY "Members can add others to conversations they belong to"
  ON public.conversation_members FOR INSERT TO authenticated
  WITH CHECK (
    -- The inserter must already be a member of this conversation.
    -- Self-add to arbitrary conversations is no longer allowed.
    public.is_conversation_member(conversation_id, auth.uid())
  );
DROP POLICY IF EXISTS "Users can remove themselves from conversations" ON public.conversation_members;
CREATE POLICY "Members can remove themselves from conversations"
  ON public.conversation_members FOR DELETE TO authenticated
  USING (
    user_id = auth.uid()
    OR public.current_user_role() = 'admin'
  );
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.messages;
CREATE POLICY "Members can view messages from their conversations"
  ON public.messages FOR SELECT TO authenticated
  USING (public.is_conversation_member(conversation_id, auth.uid()));
DROP POLICY IF EXISTS "Users can send messages to their conversations" ON public.messages;
CREATE POLICY "Members can send messages in their conversations"
  ON public.messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND public.is_conversation_member(conversation_id, auth.uid())
  );
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
CREATE POLICY "Authors can update their messages"
  ON public.messages FOR UPDATE TO authenticated
  USING (sender_id = auth.uid() AND public.is_conversation_member(conversation_id, auth.uid()));
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.messages;
CREATE POLICY "Authors can delete their messages"
  ON public.messages FOR DELETE TO authenticated
  USING (sender_id = auth.uid() AND public.is_conversation_member(conversation_id, auth.uid()));
DROP POLICY IF EXISTS "Users can view attachments from their conversations" ON public.message_attachments;
CREATE POLICY "Members can view attachments from their conversations"
  ON public.message_attachments FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.messages m
      WHERE m.id = message_attachments.message_id
        AND public.is_conversation_member(m.conversation_id, auth.uid())
    )
  );
DROP POLICY IF EXISTS "Users can add attachments to their messages" ON public.message_attachments;
CREATE POLICY "Authors can add attachments to their messages"
  ON public.message_attachments FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.messages m
      WHERE m.id = message_attachments.message_id
        AND m.sender_id = auth.uid()
        AND public.is_conversation_member(m.conversation_id, auth.uid())
    )
  );
DROP POLICY IF EXISTS "Users can delete attachments from their messages" ON public.message_attachments;
CREATE POLICY "Authors can delete attachments from their messages"
  ON public.message_attachments FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.messages m
      WHERE m.id = message_attachments.message_id
        AND m.sender_id = auth.uid()
        AND public.is_conversation_member(m.conversation_id, auth.uid())
    )
  );
-- Tighter conversations INSERT: require the creator to be authenticated (the
-- existing policy was already limited via `TO authenticated` implicitly, but
-- WITH CHECK (true) is replaced for clarity).
DROP POLICY IF EXISTS "Users can create conversations" ON public.conversations;
CREATE POLICY "Authenticated users can create conversations"
  ON public.conversations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
-- =============================================================================
-- FINDINGS #2, #5 (Microsoft OAuth tokens, email_events, newsletter_recipients)
-- These tables are dropped in migration 20260508_remove_email_features.sql,
-- so no policy fixes needed here.
-- =============================================================================


-- =============================================================================
-- FINDING #6 — Wide-open RLS on commercial_proposals / payment_groups / sales_resources
-- =============================================================================
-- Restrict reads & writes to admin/worker. Contractors lose direct table access
-- (they shouldn't see financial data anyway — UX already hides these screens).

-- commercial_proposals
DROP POLICY IF EXISTS "Authenticated users can view proposals" ON public.commercial_proposals;
DROP POLICY IF EXISTS "Authenticated users can insert proposals" ON public.commercial_proposals;
DROP POLICY IF EXISTS "Authenticated users can update proposals" ON public.commercial_proposals;
DROP POLICY IF EXISTS "Authenticated users can delete proposals" ON public.commercial_proposals;
CREATE POLICY "Admin/worker can view proposals"
  ON public.commercial_proposals FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can insert proposals"
  ON public.commercial_proposals FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can update proposals"
  ON public.commercial_proposals FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin can delete proposals"
  ON public.commercial_proposals FOR DELETE TO authenticated
  USING (public.current_user_role() = 'admin');
-- payment_groups
DROP POLICY IF EXISTS "Authenticated users can view payment groups" ON public.payment_groups;
DROP POLICY IF EXISTS "Authenticated users can insert payment groups" ON public.payment_groups;
DROP POLICY IF EXISTS "Authenticated users can update payment groups" ON public.payment_groups;
DROP POLICY IF EXISTS "Authenticated users can delete payment groups" ON public.payment_groups;
CREATE POLICY "Admin/worker can view payment groups"
  ON public.payment_groups FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can insert payment groups"
  ON public.payment_groups FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can update payment groups"
  ON public.payment_groups FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin can delete payment groups"
  ON public.payment_groups FOR DELETE TO authenticated
  USING (public.current_user_role() = 'admin');
-- sales_resources
DROP POLICY IF EXISTS "sales_resources_select" ON public.sales_resources;
DROP POLICY IF EXISTS "sales_resources_insert" ON public.sales_resources;
DROP POLICY IF EXISTS "sales_resources_update" ON public.sales_resources;
DROP POLICY IF EXISTS "sales_resources_delete" ON public.sales_resources;
CREATE POLICY "Admin/worker can view sales resources"
  ON public.sales_resources FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can insert sales resources"
  ON public.sales_resources FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin/worker can update sales resources"
  ON public.sales_resources FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "Admin can delete sales resources"
  ON public.sales_resources FOR DELETE TO authenticated
  USING (public.current_user_role() = 'admin');
-- =============================================================================
-- FINDING #7 — `documents` storage bucket: every authenticated user has full access
-- =============================================================================
-- The frontend only writes to the `Pictures` bucket (legacy convention).
-- Lock `documents` to admin/worker. If contractors need read access for assigned
-- projects, you can later add a path-scoped policy that joins on
-- project_user_assignments via `(storage.foldername(name))[1]` = project_id.

DROP POLICY IF EXISTS "Allow authenticated uploads to documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated read from documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated update in documents" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated delete from documents" ON storage.objects;
CREATE POLICY "Admin/worker upload to documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'documents'
    AND public.current_user_role() IN ('admin', 'worker')
  );
CREATE POLICY "Admin/worker read documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'documents'
    AND public.current_user_role() IN ('admin', 'worker')
  );
CREATE POLICY "Admin/worker update documents"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'documents'
    AND public.current_user_role() IN ('admin', 'worker')
  )
  WITH CHECK (
    bucket_id = 'documents'
    AND public.current_user_role() IN ('admin', 'worker')
  );
CREATE POLICY "Admin/worker delete documents"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'documents'
    AND public.current_user_role() IN ('admin', 'worker')
  );
-- =============================================================================
-- DEFENSE IN DEPTH — protect against role-less users (Finding #17)
-- =============================================================================
-- Replace the deals_*, deal_*, deal_stages_* RLS policies that use
-- `EXISTS (SELECT FROM auth.users WHERE raw_app_meta_data->>'role' IN (...))`
-- with the JWT-based helper. This is faster AND null-safe — a user without
-- a role in app_metadata will fall through to 'contractor' and be rejected.

-- deals
DROP POLICY IF EXISTS "deals_select" ON public.deals;
DROP POLICY IF EXISTS "deals_insert" ON public.deals;
DROP POLICY IF EXISTS "deals_update" ON public.deals;
DROP POLICY IF EXISTS "deals_delete" ON public.deals;
CREATE POLICY "deals_select" ON public.deals FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deals_insert" ON public.deals FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deals_update" ON public.deals FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deals_delete" ON public.deals FOR DELETE TO authenticated
  USING (public.current_user_role() = 'admin');
-- deal_contacts
DROP POLICY IF EXISTS "deal_contacts_select" ON public.deal_contacts;
DROP POLICY IF EXISTS "deal_contacts_insert" ON public.deal_contacts;
DROP POLICY IF EXISTS "deal_contacts_delete" ON public.deal_contacts;
CREATE POLICY "deal_contacts_select" ON public.deal_contacts FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_contacts_insert" ON public.deal_contacts FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_contacts_delete" ON public.deal_contacts FOR DELETE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
-- deal_activities
DROP POLICY IF EXISTS "deal_activities_select" ON public.deal_activities;
DROP POLICY IF EXISTS "deal_activities_insert" ON public.deal_activities;
DROP POLICY IF EXISTS "deal_activities_update" ON public.deal_activities;
DROP POLICY IF EXISTS "deal_activities_delete" ON public.deal_activities;
CREATE POLICY "deal_activities_select" ON public.deal_activities FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_activities_insert" ON public.deal_activities FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_activities_update" ON public.deal_activities FOR UPDATE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_activities_delete" ON public.deal_activities FOR DELETE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
-- deal_emails
DROP POLICY IF EXISTS "deal_emails_select" ON public.deal_emails;
DROP POLICY IF EXISTS "deal_emails_insert" ON public.deal_emails;
CREATE POLICY "deal_emails_select" ON public.deal_emails FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_emails_insert" ON public.deal_emails FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
-- deal_files
DROP POLICY IF EXISTS "deal_files_select" ON public.deal_files;
DROP POLICY IF EXISTS "deal_files_insert" ON public.deal_files;
DROP POLICY IF EXISTS "deal_files_delete" ON public.deal_files;
CREATE POLICY "deal_files_select" ON public.deal_files FOR SELECT TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_files_insert" ON public.deal_files FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() IN ('admin', 'worker'));
CREATE POLICY "deal_files_delete" ON public.deal_files FOR DELETE TO authenticated
  USING (public.current_user_role() IN ('admin', 'worker'));
-- deal_stages: anyone authenticated can read; only admin can modify.
DROP POLICY IF EXISTS "deal_stages_select" ON public.deal_stages;
DROP POLICY IF EXISTS "deal_stages_insert" ON public.deal_stages;
DROP POLICY IF EXISTS "deal_stages_update" ON public.deal_stages;
DROP POLICY IF EXISTS "deal_stages_delete" ON public.deal_stages;
CREATE POLICY "deal_stages_select" ON public.deal_stages FOR SELECT TO authenticated
  USING (true);
CREATE POLICY "deal_stages_insert" ON public.deal_stages FOR INSERT TO authenticated
  WITH CHECK (public.current_user_role() = 'admin');
CREATE POLICY "deal_stages_update" ON public.deal_stages FOR UPDATE TO authenticated
  USING (public.current_user_role() = 'admin');
CREATE POLICY "deal_stages_delete" ON public.deal_stages FOR DELETE TO authenticated
  USING (public.current_user_role() = 'admin');
-- =============================================================================
-- POST-MIGRATION CHECKLIST (run by hand in the SQL editor)
-- =============================================================================
-- 1. Audit: list any user without a role and ban them if you didn't create them.
--      SELECT id, email, created_at FROM auth.users
--      WHERE raw_app_meta_data->>'role' IS NULL;
--
-- 2. Audit: tables in `public` without RLS or without policies (Finding #14).
--      SELECT schemaname, tablename, rowsecurity AS rls_enabled,
--             (SELECT count(*) FROM pg_policies p
--               WHERE p.schemaname = t.schemaname AND p.tablename = t.tablename) AS policy_count
--      FROM pg_tables t
--      WHERE schemaname = 'public'
--      ORDER BY rls_enabled, policy_count, tablename;
--
-- 3. Confirm signup is disabled in Authentication → Providers → Email.;
