-- Supabase Database Setup for Blog
-- Run this in Supabase SQL Editor

-- Enable pgcrypto for UUIDs if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- POSTS table (publicly readable, only admin can create via API)
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  attachments JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{url, type, width, height, size}]
  author_github TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LIKES table (publicly readable counts, insert only via API)
CREATE TABLE IF NOT EXISTS likes (
  id BIGSERIAL PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  fingerprint TEXT NOT NULL, -- hashed(IP + UA + VIEW_FINGERPRINT_SALT)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (post_id, fingerprint)
);

-- VIEWS table (unique viewers, publicly readable counts)
CREATE TABLE IF NOT EXISTS views (
  id BIGSERIAL PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  fingerprint TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (post_id, fingerprint)
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE views ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DO $$ 
BEGIN
  DROP POLICY IF EXISTS posts_select ON posts;
  DROP POLICY IF EXISTS likes_select ON likes;
  DROP POLICY IF EXISTS views_select ON views;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create read policies (anyone can read)
CREATE POLICY posts_select ON posts FOR SELECT USING (true);
CREATE POLICY likes_select ON likes FOR SELECT USING (true);
CREATE POLICY views_select ON views FOR SELECT USING (true);

-- Revoke write permissions from anon and authenticated roles
-- (Only service role can write via API)
REVOKE INSERT, UPDATE, DELETE ON posts FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON likes FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON views FROM anon, authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_views_post_id ON views(post_id);

