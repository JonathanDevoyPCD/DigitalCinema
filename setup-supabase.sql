-- Digital Slate Cloud Sync Table (Idempotent - safe to run multiple times)
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS digital_slate (
  id BIGSERIAL PRIMARY KEY,
  project TEXT,
  edits JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE digital_slate ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safe approach)
DROP POLICY IF EXISTS "Allow anon inserts" ON digital_slate;
DROP POLICY IF EXISTS "Allow anon selects" ON digital_slate;
DROP POLICY IF EXISTS "Allow anon updates" ON digital_slate;

-- Create policies
CREATE POLICY "Allow anon inserts" ON digital_slate
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Allow anon selects" ON digital_slate
  FOR SELECT USING (TRUE);

CREATE POLICY "Allow anon updates" ON digital_slate
  FOR UPDATE USING (TRUE);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS digital_slate_updated_at_idx ON digital_slate(updated_at DESC);
