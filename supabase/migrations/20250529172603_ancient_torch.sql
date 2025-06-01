-- Create demo user with hashed password
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Check if user already exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@example.com') THEN
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
      'demo@example.com',
      crypt('demo123', gen_salt('bf')),
      now(),
      '{"provider": "email", "providers": ["email"]}',
      '{"full_name": "Demo User"}',
      now(),
      now(),
      FALSE,
      FALSE
    ) RETURNING id INTO demo_user_id;

    -- Create user profile
    INSERT INTO public.users (
      id,
      email,
      full_name,
      email_verified,
      created_at,
      updated_at
    ) VALUES (
      demo_user_id,
      'demo@example.com',
      'Demo User',
      true,
      now(),
      now()
    );
  END IF;
END $$;