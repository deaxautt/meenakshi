-- Create demo user if not exists
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Check if user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@gmail.com') THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
    ) VALUES (
      gen_random_uuid(),
      'demo@gmail.com',
      crypt('123456', gen_salt('bf')),
      now(),
      now(),
      now()
    );
  END IF;

  -- Get the user ID
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'demo@gmail.com' LIMIT 1;

  -- Create user profile if not exists
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'demo@gmail.com') THEN
    INSERT INTO public.users (
      id,
      email,
      full_name,
      email_verified,
      created_at,
      updated_at
    ) VALUES (
      demo_user_id,
      'demo@gmail.com',
      'Demo User',
      true,
      now(),
      now()
    );
  END IF;
END $$;