-- Digital Slate Cloud Sync Table
-- Run this in Supabase SQL Editor to initialize the database

CREATE TABLE IF NOT EXISTS digital_slate (
  id BIGSERIAL PRIMARY KEY,
  project TEXT,
  edits JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE digital_slate ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert
CREATE POLICY "Allow anon inserts" ON digital_slate
  FOR INSERT WITH CHECK (TRUE);

-- Allow anonymous users to select
CREATE POLICY "Allow anon selects" ON digital_slate
  FOR SELECT USING (TRUE);

-- Allow anonymous users to update
CREATE POLICY "Allow anon updates" ON digital_slate
  FOR UPDATE USING (TRUE);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS digital_slate_updated_at_idx ON digital_slate(updated_at DESC);
