-- Add email_verified field to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'email_verified') THEN
    ALTER TABLE users ADD COLUMN email_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'mobile') THEN
    ALTER TABLE users ADD COLUMN mobile text;
  END IF;
END $$;

-- Create otp_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS otp_codes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for otp_codes if not already enabled
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;

-- Create function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION cleanup_expired_otp_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_codes WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Drop existing policy if it exists and create new one
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "OTP codes are only accessible by the system" ON otp_codes;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'otp_codes' AND policyname = 'OTP codes are only accessible by the system'
  ) THEN
    CREATE POLICY "OTP codes are only accessible by the system"
      ON otp_codes FOR ALL
      USING (false)
      WITH CHECK (false);
  END IF;
END $$;