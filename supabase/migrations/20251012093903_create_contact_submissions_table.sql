/*
  # Create Contact Submissions Table

  ## Overview
  This migration creates a table to store all contact form submissions from the website.

  ## New Tables
  
  ### `contact_submissions`
  Stores contact form data with timestamps
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email address
  - `phone` (text) - Contact phone number
  - `message` (text) - Message content
  - `interest` (text) - Area of interest (from modal form)
  - `ip_address` (text) - Submitter IP address
  - `user_agent` (text) - Browser user agent
  - `submitted_at` (timestamptz) - Submission timestamp
  - `email_sent` (boolean) - Whether email was successfully sent
  - `email_id` (text) - Resend email ID for tracking

  ## Security
  
  ### Row Level Security (RLS)
  - Table has RLS enabled
  - Only authenticated admins can read submissions
  - Anyone can insert (for public form submissions)
  - Only admins can update/delete
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text NOT NULL,
  interest text DEFAULT '',
  ip_address text DEFAULT '',
  user_agent text DEFAULT '',
  submitted_at timestamptz DEFAULT now(),
  email_sent boolean DEFAULT false,
  email_id text DEFAULT ''
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email_sent ON contact_submissions(email_sent);
