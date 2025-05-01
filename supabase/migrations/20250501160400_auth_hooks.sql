-- Migration: Auth Hooks
-- Description: Sets up triggers for auth events
-- Based on 05_backend.md section 4.1 Authentication

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into user_profiles
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  
  -- Insert into muvers with referrer if available
  INSERT INTO public.muvers (id, parent_muver_id)
  VALUES (
    new.id, 
    CASE 
      WHEN new.raw_user_meta_data->>'referrer' IS NOT NULL 
      THEN (new.raw_user_meta_data->>'referrer')::uuid
      ELSE NULL
    END
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function on new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to log user authentication events
CREATE OR REPLACE FUNCTION public.handle_user_auth_event()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_data)
  VALUES (
    new.id,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'signup'
      WHEN TG_OP = 'UPDATE' THEN 'login'
      ELSE TG_OP
    END,
    'auth.users',
    new.id,
    json_build_object('email', new.email, 'last_sign_in_at', new.last_sign_in_at)
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to log authentication events
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_auth_event();
