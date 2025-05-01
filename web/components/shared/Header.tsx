import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 text-white hover:text-green-200 transition duration-300"
                aria-label="Volver"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <Link href="/">
              <a className="text-2xl font-bold text-white hover:text-green-200 transition duration-300">
                {title || 'Muvo'}
              </a>
            </Link>
          </div>

          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/articles">
                  <a className="text-white hover:text-green-200 transition duration-300">Aprender</a>
                </Link>
              </li>
              <li>
                <Link href="/muver/shop">
                  <a className="text-white hover:text-green-200 transition duration-300">Tienda</a>
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/muver/dashboard">
                      <a className="text-white hover:text-green-200 transition duration-300">Tablero</a>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-green-200 transition duration-300"
                    >
                      Cerrar Sesión
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">
                    <a className="text-white hover:text-green-200 transition duration-300">Iniciar Sesión</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
