import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../shared/supabase/client';

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error during auth callback:', error.message);
        router.push('/auth/login?error=callback-error');
        return;
      }

      if (session) {
        // Check if user is a MUVER
        const { data: muverData, error: muverError } = await supabase
          .from('muvers')
          .select('id')
          .eq('id', session.user.id)
          .single();

        if (muverError && muverError.code !== 'PGRST116') {
          console.error('Error checking MUVER status:', muverError.message);
        }

        // Redirect based on user type
        if (muverData) {
          router.push('/muver/dashboard');
        } else {
          router.push('/');
        }
      } else {
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Procesando autenticación...</h1>
        <p>Por favor espera mientras te redirigimos.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
