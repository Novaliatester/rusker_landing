-- Fix deal_stages table to use 'label' instead of 'name' to match the actual schema and TypeScript code

-- First, check if the column exists and rename if needed
DO $$ 
BEGIN
  -- If 'name' column exists, rename it to 'label'
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'deal_stages' 
    AND column_name = 'name'
  ) THEN
    ALTER TABLE public.deal_stages RENAME COLUMN name TO label;
  END IF;
  
  -- If 'label' column doesn't exist, create it
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'deal_stages' 
    AND column_name = 'label'
  ) THEN
    ALTER TABLE public.deal_stages ADD COLUMN label TEXT;
    -- Copy data from 'name' if it exists
    IF EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'deal_stages' 
      AND column_name = 'name'
    ) THEN
      UPDATE public.deal_stages SET label = name WHERE label IS NULL;
    END IF;
    -- Make it NOT NULL after copying data
    ALTER TABLE public.deal_stages ALTER COLUMN label SET NOT NULL;
  END IF;
END $$;
-- Remove default_probability column if it exists (not used in current schema)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'deal_stages' 
    AND column_name = 'default_probability'
  ) THEN
    ALTER TABLE public.deal_stages DROP COLUMN default_probability;
  END IF;
END $$;
-- Remove updated_at column if it exists (not in actual schema)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'deal_stages' 
    AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE public.deal_stages DROP COLUMN updated_at;
  END IF;
END $$;
-- Ensure the table structure matches the actual schema
-- Make sure label is NOT NULL
ALTER TABLE public.deal_stages ALTER COLUMN label SET NOT NULL;
-- Ensure color can be NULL
ALTER TABLE public.deal_stages ALTER COLUMN color DROP NOT NULL;
-- Ensure order_index is NOT NULL
ALTER TABLE public.deal_stages ALTER COLUMN order_index SET NOT NULL;
