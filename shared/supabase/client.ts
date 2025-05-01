import { createClient } from '@supabase/supabase-js';

// These environment variables will be set differently in each environment
// For local development, they should be in .env.local files in the mobile and web directories
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get user from supabase
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  return user;
};

// Helper function to check if user is a MUVER
export const isMuver = async (userId: string) => {
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

export default supabase;
