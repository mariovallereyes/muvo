import { createClient, AuthResponse, User, UserResponse } from '@supabase/supabase-js';

// These environment variables will be set differently in each environment
// For local development, they should be in .env.local files in the mobile and web directories
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get user from supabase
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  return user;
};

// Helper function to check if user is a MUVER
export const isMuver = async (userId: string): Promise<boolean> => {
  if (!userId) return false;

  const { data, error } = await supabase
    .from('muvers')
    .select('id')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error checking MUVER status:', error.message);
    return false;
  }

  return !!data;
};

// Authentication methods
export const signUpWithEmail = async (
  email: string,
  password: string,
  userData: { username: string; phone?: string; address?: string; referrer?: string }
): Promise<AuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  });
};

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
};

export const signInWithApple = async (): Promise<AuthResponse> => {
  return await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
};

export const signOut = async (): Promise<{ error: Error | null }> => {
  return await supabase.auth.signOut();
};

export const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  return { error };
};

export const updatePassword = async (newPassword: string): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return { error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data;
};

export const getMuverDetails = async (userId: string) => {
  const { data, error } = await supabase
    .from('muvers')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching MUVER details:', error.message);
    return null;
  }

  return data;
};

export default supabase;
