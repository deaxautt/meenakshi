-- Add email_verified field to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS mobile text;

-- Create otp_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS otp_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for otp_codes
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Create function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION cleanup_expired_otp_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_codes WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "OTP codes are only accessible by the system" ON otp_codes;

-- Create RLS policies for otp_codes
CREATE POLICY "OTP codes are only accessible by the system"
  ON otp_codes FOR ALL
  USING (false)
  WITH CHECK (false);