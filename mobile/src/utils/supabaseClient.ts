import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

console.log('Initializing Supabase client');
console.log('Platform:', Platform.OS);

// Hardcode the Supabase URL and anon key for now
const supabaseUrl = 'https://badxprshgmjfzvcerbyu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZHhwcnNoZ21qZnp2Y2VyYnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTQ1MzMsImV4cCI6MjA2MTY5MDUzM30.2HIZ3QFweYqNF538-1MijMTYOZyHlu-xOQcTRyoKSEk';

// Initialize Supabase client with error handling
let supabase;

try {
  console.log('Creating Supabase client with URL:', supabaseUrl);
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Don't persist session to avoid storage issues
      autoRefreshToken: false, // Disable auto refresh to simplify
      detectSessionInUrl: false, // Disable URL detection (can cause issues)
    }
  });
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Create a dummy client that logs errors instead of crashing
  // IMPORTANT: Always use Error objects, not strings, for errors
  const initError = new Error('Supabase client failed to initialize');
  supabase = {
    from: () => ({
      select: () => ({
        limit: () => Promise.resolve({ data: null, error: initError })
      })
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: initError }),
      signInWithPassword: () => Promise.resolve({ data: null, error: initError }),
      signUp: () => Promise.resolve({ data: null, error: initError }),
      signInWithOAuth: () => Promise.resolve({ data: null, error: initError }),
      signOut: () => Promise.resolve({ error: null }),
      resetPasswordForEmail: () => Promise.resolve({ data: null, error: initError }),
      updateUser: () => Promise.resolve({ data: null, error: initError })
    }
  };
}

export { supabase };

// Auth functions
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data.user;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
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
    console.error('Error fetching muver details:', error);
    return null;
  }

  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = async (email: string, password: string, userData: any) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
};

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google'
  });
};

export const signInWithApple = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'apple'
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email);
};

export const updatePassword = async (newPassword: string) => {
  return await supabase.auth.updateUser({
    password: newPassword
  });
};
