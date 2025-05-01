import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || 'https://badxprshgmjfzvcerbyu.supabase.co';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZHhwcnNoZ21qZnp2Y2VyYnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzA5MzQsImV4cCI6MjAzMTEwNjkzNH0.Nh8JZwBDqYlsQnXQao_ySgA-QP9eYCGCJZkFvLbLBXY';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
