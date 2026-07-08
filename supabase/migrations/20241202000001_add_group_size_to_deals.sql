-- Add group_size column to deals table
ALTER TABLE deals ADD COLUMN IF NOT EXISTS group_size INTEGER;
-- Note: estimated_arrival_date and estimated_departure_date already exist in the deals table;
