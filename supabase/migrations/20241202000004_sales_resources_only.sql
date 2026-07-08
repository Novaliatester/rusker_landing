-- Sales Resources Table Migration
-- Run this in your Supabase SQL Editor if the sales_resources table doesn't exist

-- Create the sales_resources table
CREATE TABLE IF NOT EXISTS sales_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT,
  file_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('pdf', 'url', 'doc', 'note')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_sales_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_sales_resources_updated_at ON sales_resources;
CREATE TRIGGER trigger_sales_resources_updated_at
  BEFORE UPDATE ON sales_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_sales_resources_updated_at();
-- Enable RLS
ALTER TABLE sales_resources ENABLE ROW LEVEL SECURITY;
-- RLS Policies: All authenticated users can access sales resources
DROP POLICY IF EXISTS "sales_resources_select" ON sales_resources;
CREATE POLICY "sales_resources_select" ON sales_resources
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "sales_resources_insert" ON sales_resources;
CREATE POLICY "sales_resources_insert" ON sales_resources
  FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "sales_resources_update" ON sales_resources;
CREATE POLICY "sales_resources_update" ON sales_resources
  FOR UPDATE TO authenticated USING (true);
DROP POLICY IF EXISTS "sales_resources_delete" ON sales_resources;
CREATE POLICY "sales_resources_delete" ON sales_resources
  FOR DELETE TO authenticated USING (true);
