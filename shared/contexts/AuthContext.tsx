import React, { createContext, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import useAuth from '../hooks/useAuth';

// Define the shape of our auth context
type AuthContextType = {
  user: User | null;
  loading: boolean;
  userProfile: any | null;
  muverDetails: any | null;
  isAuthenticated: boolean;
  isMuver: boolean;
  error: { message: string } | null;
  register: (
    email: string, 
    password: string, 
    userData: { username: string; phone?: string; address?: string; referrer?: string }
  ) => Promise<{ success: boolean; data?: any; error?: any }>;
  login: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: any }>;
  loginWithGoogle: () => Promise<{ success: boolean; data?: any; error?: any }>;
  loginWithApple: () => Promise<{ success: boolean; data?: any; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: any }>;
  changePassword: (newPassword: string) => Promise<{ success: boolean; error?: any }>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
