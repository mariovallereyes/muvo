import { useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '../../../shared/contexts/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { forgotPassword } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setMessage('');
    setError('');
    
    // Validate email
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError('Correo inválido');
      return;
    }
    
    setLoading(true);
    
    try {
      const { success, error } = await forgotPassword(email);
      
      if (success) {
        setMessage('Se ha enviado un correo con instrucciones para restablecer tu contraseña');
        setEmail(''); // Clear the form
      } else {
        setError(error?.message || 'Error al enviar el correo de recuperación');
      }
    } catch (err: any) {
      setError(err.message || 'Error al enviar el correo de recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Recuperar Contraseña</h1>
          <p className="mt-2 text-gray-600">Ingresa tu correo electrónico para recibir instrucciones</p>
        </div>
        
        {message && (
          <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="correo@ejemplo.com"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Enviar Instrucciones'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Volver al inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
