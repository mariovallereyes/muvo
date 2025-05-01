-- Migration: Storage Buckets
-- Description: Sets up storage buckets for files
-- Based on 05_backend.md section 4.2.1 and related documentation

-- Create storage buckets for the application
-- This requires the storage extension to be enabled
INSERT INTO storage.buckets (id, name, public, avif_autodetection)
VALUES 
  ('profile-images', 'Profile Images', false, false),
  ('content-files', 'Content Files', true, false)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for profile-images bucket
-- Only the user can upload their own profile image
-- Anyone can view profile images
CREATE POLICY "Profile images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile image"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own profile image"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own profile image"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Set up RLS policies for content-files bucket
-- Only admins can upload/update/delete content files
-- Anyone can view content files
CREATE POLICY "Content files are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-files');

CREATE POLICY "Only admins can upload content files"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'content-files' AND
    auth.role() = 'admin'
  );

CREATE POLICY "Only admins can update content files"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'content-files' AND
    auth.role() = 'admin'
  );

CREATE POLICY "Only admins can delete content files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'content-files' AND
    auth.role() = 'admin'
  );

-- Create a function to generate a URL for a file in storage
CREATE OR REPLACE FUNCTION storage_public_url(bucket TEXT, name TEXT)
RETURNS TEXT AS $$
DECLARE
  project_url TEXT;
BEGIN
  SELECT current_setting('app.settings.project_url', TRUE) INTO project_url;
  
  IF project_url IS NULL THEN
    -- Fallback to a generic pattern if project URL is not set
    project_url := 'https://badxprshgmjfzvcerbyu.supabase.co';
  END IF;
  
  RETURN project_url || '/storage/v1/object/public/' || bucket || '/' || name;
END;
$$ LANGUAGE plpgsql;
