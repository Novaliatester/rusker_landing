-- Create the documents bucket if it doesn't exist
-- This bucket is used for sales resources, project documents, and other file uploads

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'documents',
  'documents',
  false, -- Private bucket - use signed URLs
  52428800, -- 50MB limit
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'text/csv',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]
)
ON CONFLICT (id) DO UPDATE SET 
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types,
  public = EXCLUDED.public;
-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- Policy 1: Allow authenticated users to upload files to documents bucket
DROP POLICY IF EXISTS "Allow authenticated uploads to documents" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to documents"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');
-- Policy 2: Allow authenticated users to read files from documents bucket
DROP POLICY IF EXISTS "Allow authenticated read from documents" ON storage.objects;
CREATE POLICY "Allow authenticated read from documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (bucket_id = 'documents');
-- Policy 3: Allow authenticated users to update files in documents bucket
DROP POLICY IF EXISTS "Allow authenticated update in documents" ON storage.objects;
CREATE POLICY "Allow authenticated update in documents"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'documents')
WITH CHECK (bucket_id = 'documents');
-- Policy 4: Allow authenticated users to delete files from documents bucket
DROP POLICY IF EXISTS "Allow authenticated delete from documents" ON storage.objects;
CREATE POLICY "Allow authenticated delete from documents"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'documents');
