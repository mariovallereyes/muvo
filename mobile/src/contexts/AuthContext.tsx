import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  supabase, 
  getCurrentUser, 
  getUserProfile, 
  getMuverDetails,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithApple,
  signOut,
  resetPassword,
  updatePassword
} from '../../../shared/supabase/client';

type AuthContextType = {
  user: User | null;
  userProfile: any | null;
  muverDetails: any | null;
  isAuthenticated: boolean;
  isMuver: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  register: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: any }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: any }>;
  loginWithApple: () => Promise<{ success: boolean; error?: any }>;
  logout: () => Promise<{ success: boolean; error?: any }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: any }>;
  changePassword: (newPassword: string) => Promise<{ success: boolean; error?: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [muverDetails, setMuverDetails] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMuver, setIsMuver] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          
          // Fetch user profile and muver details
          const [profileData, muverData] = await Promise.all([
            getUserProfile(session.user.id),
            getMuverDetails(session.user.id)
          ]);
          
          setUserProfile(profileData);
          setMuverDetails(muverData);
          setIsMuver(!!muverData);
        } else {
          setUser(null);
          setUserProfile(null);
          setMuverDetails(null);
          setIsAuthenticated(false);
          setIsMuver(false);
        }
        
        setLoading(false);
      }
    );

    // Initial session check
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          
          // Fetch user profile and muver details
          const [profileData, muverData] = await Promise.all([
            getUserProfile(session.user.id),
            getMuverDetails(session.user.id)
          ]);
          
          setUserProfile(profileData);
          setMuverDetails(muverData);
          setIsMuver(!!muverData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error checking user session:', error);
        setLoading(false);
      }
    };

    checkUser();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await signInWithEmail(email, password);
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      const { error } = await signUpWithEmail(email, password, userData);
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const loginWithApple = async () => {
    try {
      setLoading(true);
      const { error } = await signInWithApple();
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await signOut();
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await resetPassword(email);
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      const { error } = await updatePassword(newPassword);
      
      if (error) {
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    userProfile,
    muverDetails,
    isAuthenticated,
    isMuver,
    loading,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    forgotPassword,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
