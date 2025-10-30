/*
  # Create OTP Verification System

  1. New Tables
    - `password_reset_otps`
      - `id` (uuid, primary key)
      - `email` (text, not null) - User email requesting reset
      - `otp_code` (text, not null) - 6-digit OTP code
      - `created_at` (timestamptz) - When OTP was created
      - `expires_at` (timestamptz) - When OTP expires (5 minutes from creation)
      - `used` (boolean) - Whether OTP has been used
      - `ip_address` (text) - IP address of requester
      - `user_agent` (text) - Browser/device info
  
  2. Security
    - Enable RLS on `password_reset_otps` table
    - OTPs expire after 5 minutes
    - OTPs can only be used once
    - No public access to OTP table (only via edge function)
  
  3. Indexes
    - Index on email and created_at for quick lookups
    - Index on expires_at for cleanup queries
*/

-- Create password_reset_otps table
CREATE TABLE IF NOT EXISTS password_reset_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  otp_code text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '5 minutes'),
  used boolean DEFAULT false,
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE password_reset_otps ENABLE ROW LEVEL SECURITY;

-- No public policies - only service role can access
CREATE POLICY "Service role only"
  ON password_reset_otps
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_password_reset_otps_email_created 
  ON password_reset_otps(email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_password_reset_otps_expires 
  ON password_reset_otps(expires_at);

-- Function to clean up expired OTPs (optional, for maintenance)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM password_reset_otps
  WHERE expires_at < now() - interval '1 hour';
END;
$$;