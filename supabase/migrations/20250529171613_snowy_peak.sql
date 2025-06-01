-- Create demo user with a unique email
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Check if user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo2@gmail.com') THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      is_super_admin,
      is_sso_user
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'demo2@gmail.com',
      crypt('123456', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      now(),
      now(),
      FALSE,
      FALSE
    );
  END IF;

  -- Get the user ID
  SELECT id INTO demo_user_id FROM auth.users WHERE email = 'demo2@gmail.com' LIMIT 1;

  -- Create user profile if not exists
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'demo2@gmail.com') THEN
    INSERT INTO public.users (
      id,
      email,
      full_name,
      email_verified,
      created_at,
      updated_at
    ) VALUES (
      demo_user_id,
      'demo2@gmail.com',
      'Demo User',
      true,
      now(),
      now()
    );
  END IF;
END $$;