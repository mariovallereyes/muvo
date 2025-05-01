import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import {
  supabase,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signInWithApple,
  signOut,
  resetPassword,
  updatePassword,
  getUserProfile,
  getMuverDetails
} from '../../../shared/supabase/client';

type AuthState = {
  user: User | null;
  loading: boolean;
  userProfile: any | null;
  muverDetails: any | null;
  isAuthenticated: boolean;
  isMuver: boolean;
};

type AuthError = {
  message: string;
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    userProfile: null,
    muverDetails: null,
    isAuthenticated: false,
    isMuver: false,
  });
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prevState => ({ ...prevState, loading: true }));

        if (session?.user) {
          const [userProfile, muverDetails] = await Promise.all([
            getUserProfile(session.user.id),
            getMuverDetails(session.user.id)
          ]);

          setState({
            user: session.user,
            loading: false,
            userProfile,
            muverDetails,
            isAuthenticated: true,
            isMuver: !!muverDetails,
          });
        } else {
          setState({
            user: null,
            loading: false,
            userProfile: null,
            muverDetails: null,
            isAuthenticated: false,
            isMuver: false,
          });
        }
      }
    );

    // Initial session check
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const [userProfile, muverDetails] = await Promise.all([
            getUserProfile(session.user.id),
            getMuverDetails(session.user.id)
          ]);

          setState({
            user: session.user,
            loading: false,
            userProfile,
            muverDetails,
            isAuthenticated: true,
            isMuver: !!muverDetails,
          });
        } else {
          setState(prevState => ({ ...prevState, loading: false }));
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setState(prevState => ({ ...prevState, loading: false }));
      }
    };

    checkUser();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const register = async (
    email: string,
    password: string,
    userData: { username: string; phone?: string; address?: string; referrer?: string }
  ) => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { data, error } = await signUpWithEmail(email, password, userData);

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      // Note: The user will need to confirm their email before they are fully registered
      // The auth state listener will update the state once they confirm

      setState(prevState => ({ ...prevState, loading: false }));
      return { success: true, data };
    } catch (err: any) {
      setError({ message: err.message || 'Error durante el registro' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { data, error } = await signInWithEmail(email, password);

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      // The auth state listener will update the state

      return { success: true, data };
    } catch (err: any) {
      setError({ message: err.message || 'Error durante el inicio de sesión' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const loginWithGoogle = async () => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { data, error } = await signInWithGoogle();

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      // The auth state listener will update the state

      return { success: true, data };
    } catch (err: any) {
      setError({ message: err.message || 'Error durante el inicio de sesión con Google' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const loginWithApple = async () => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { data, error } = await signInWithApple();

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      // The auth state listener will update the state

      return { success: true, data };
    } catch (err: any) {
      setError({ message: err.message || 'Error durante el inicio de sesión con Apple' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { error } = await signOut();

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      // The auth state listener will update the state

      return { success: true };
    } catch (err: any) {
      setError({ message: err.message || 'Error durante el cierre de sesión' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { error } = await resetPassword(email);

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      setState(prevState => ({ ...prevState, loading: false }));
      return { success: true };
    } catch (err: any) {
      setError({ message: err.message || 'Error al enviar el correo de recuperación' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      setError(null);
      setState(prevState => ({ ...prevState, loading: true }));

      const { error } = await updatePassword(newPassword);

      if (error) {
        setError({ message: error.message });
        setState(prevState => ({ ...prevState, loading: false }));
        return { success: false, error };
      }

      setState(prevState => ({ ...prevState, loading: false }));
      return { success: true };
    } catch (err: any) {
      setError({ message: err.message || 'Error al cambiar la contraseña' });
      setState(prevState => ({ ...prevState, loading: false }));
      return { success: false, error: err };
    }
  };

  return {
    ...state,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithApple,
    logout,
    forgotPassword,
    changePassword,
  };
};

export default useAuth;