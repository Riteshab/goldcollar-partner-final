/*
  # Create Newsletter Subscriptions Table

  ## Overview
  This migration creates a table to store newsletter subscriptions from website visitors.

  ## New Tables
  
  ### `newsletter_subscriptions`
  Stores newsletter subscriber information
  - `id` (uuid, primary key) - Unique identifier
  - `email` (text, unique) - Subscriber email address
  - `name` (text) - Subscriber name
  - `status` (text) - Subscription status ('active', 'unsubscribed')
  - `subscribed_at` (timestamptz) - Subscription timestamp
  - `unsubscribed_at` (timestamptz) - Unsubscribe timestamp (if applicable)
  - `ip_address` (text) - IP address for tracking (optional)
  - `user_agent` (text) - Browser user agent (optional)

  ## Security
  
  ### Row Level Security (RLS)
  - Table has RLS enabled
  - Only authenticated admins can read subscriptions
  - Public users can insert their own subscriptions (via API)
  - Only admins can update subscription status
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  status text DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  ip_address text DEFAULT '',
  user_agent text DEFAULT ''
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all subscriptions"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can update subscriptions"
  ON newsletter_subscriptions FOR UPDATE
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

CREATE POLICY "Admins can delete subscriptions"
  ON newsletter_subscriptions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);
