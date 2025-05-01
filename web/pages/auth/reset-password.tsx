import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../shared/contexts/AuthContext';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { changePassword } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setMessage('');
    setError('');
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    
    setLoading(true);
    
    try {
      const { success, error } = await changePassword(password);
      
      if (success) {
        setMessage('Contraseña actualizada correctamente');
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(error?.message || 'Error al actualizar la contraseña');
      }
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Restablecer Contraseña</h1>
          <p className="mt-2 text-gray-600">Ingresa tu nueva contraseña</p>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nueva Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Actualizar Contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
