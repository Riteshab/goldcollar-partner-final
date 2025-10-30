/*
  # Rename Blogs to Insights

  1. Changes
    - Rename `blogs` table to `insights`
    - Update all policies to reference insights table
    - Update all indexes to reference insights table
    - Maintain all existing data and functionality

  2. Security
    - All existing RLS policies remain intact
    - No changes to security model
*/

-- Rename the blogs table to insights
ALTER TABLE IF EXISTS blogs RENAME TO insights;

-- Rename indexes
ALTER INDEX IF EXISTS idx_blogs_status RENAME TO idx_insights_status;
ALTER INDEX IF EXISTS idx_blogs_published_at RENAME TO idx_insights_published_at;

-- Note: RLS policies are automatically updated when table is renamed
-- The policies will now apply to the insights table
