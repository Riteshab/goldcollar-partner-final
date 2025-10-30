/*
  # Admin CMS Database Schema

  ## Overview
  This migration creates all necessary tables for the admin Content Management System (CMS).
  It includes authentication support, content tables, and comprehensive security policies.

  ## New Tables
  
  ### 1. `admin_users`
  Stores additional admin profile information linked to Supabase auth.users
  - `id` (uuid, primary key) - Links to auth.users.id
  - `email` (text) - Admin email address
  - `full_name` (text) - Admin full name
  - `created_at` (timestamptz) - Account creation timestamp
  - `last_login` (timestamptz) - Last login timestamp

  ### 2. `blogs`
  Stores blog posts with full content management
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly identifier
  - `content` (text) - Full blog content (supports HTML/markdown)
  - `excerpt` (text) - Short description
  - `author` (text) - Author name
  - `featured_image_url` (text) - URL to featured image
  - `status` (text) - 'draft' or 'published'
  - `published_at` (timestamptz) - Publication timestamp
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - References admin_users.id

  ### 3. `resources`
  Stores free resources (PDFs, guides, etc.)
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Resource title
  - `description` (text) - Resource description
  - `thumbnail_url` (text) - URL to thumbnail image
  - `file_url` (text) - URL to downloadable file
  - `category` (text) - Resource category
  - `status` (text) - 'draft' or 'published'
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - References admin_users.id

  ### 4. `case_studies`
  Stores success stories and case studies
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Case study title
  - `slug` (text, unique) - URL-friendly identifier
  - `client_name` (text) - Client or property name
  - `location` (text) - Property location
  - `description` (text) - Full case study description
  - `challenge` (text) - Problem/challenge section
  - `solution` (text) - Solution provided section
  - `results` (text) - Results achieved section
  - `roi_percentage` (numeric) - Return on investment percentage
  - `image_url` (text) - Main image URL
  - `gallery_images` (jsonb) - Array of additional image URLs
  - `status` (text) - 'draft' or 'published'
  - `featured` (boolean) - Show on homepage
  - `published_at` (timestamptz) - Publication timestamp
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  - `created_by` (uuid) - References admin_users.id

  ### 5. `site_settings`
  Stores dynamic site content and settings
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Setting identifier (e.g., 'hero_video_url')
  - `value` (text) - Setting value
  - `description` (text) - Human-readable description
  - `updated_at` (timestamptz) - Last update timestamp
  - `updated_by` (uuid) - References admin_users.id

  ## Security
  
  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Only authenticated admin users can read/write data
  - Public users can only read published content
  - Draft content is only visible to admins

  ## Default Data
  - Inserts default site settings for hero video URL and other editable content
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view own profile"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own profile"
  ON admin_users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  excerpt text DEFAULT '',
  author text DEFAULT '',
  featured_image_url text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blogs"
  ON blogs FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update blogs"
  ON blogs FOR UPDATE
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

CREATE POLICY "Admins can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  thumbnail_url text DEFAULT '',
  file_url text DEFAULT '',
  category text DEFAULT '',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published resources"
  ON resources FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all resources"
  ON resources FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert resources"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update resources"
  ON resources FOR UPDATE
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

CREATE POLICY "Admins can delete resources"
  ON resources FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  client_name text DEFAULT '',
  location text DEFAULT '',
  description text DEFAULT '',
  challenge text DEFAULT '',
  solution text DEFAULT '',
  results text DEFAULT '',
  roi_percentage numeric DEFAULT 0,
  image_url text DEFAULT '',
  gallery_images jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published case studies"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can view all case studies"
  ON case_studies FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update case studies"
  ON case_studies FOR UPDATE
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

CREATE POLICY "Admins can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  description text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES admin_users(id) ON DELETE SET NULL
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can view all settings"
  ON site_settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update settings"
  ON site_settings FOR UPDATE
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

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
  ('hero_video_url', 'https://tmpfiles.org/dl/3892154/invideo-ai-10805secondsofpureluxuryrealestate2025-10-12.mp4', 'Homepage hero section video URL'),
  ('hero_headline', 'Commercial Real Estate Doesn''t Have to Be Complicated', 'Homepage hero headline text'),
  ('hero_subheadline', 'At Gold Commercial, we simplify the process—whether you''re buying, selling, or leasing.', 'Homepage hero subheadline text')
ON CONFLICT (key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);