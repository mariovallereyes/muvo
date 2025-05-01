import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Muvo</h3>
            <p className="text-green-200 mb-4">
              Aplicación oficial de MUVO CBD para e-commerce y marketing en red.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-green-200 hover:text-white transition duration-300">
                  Aprender
                </Link>
              </li>
              <li>
                <Link href="/muver/shop" className="text-green-200 hover:text-white transition duration-300">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-green-200 hover:text-white transition duration-300">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-green-200 mb-2">MUVO CBD</p>
            <p className="text-green-200 mb-2">México</p>
            <p className="text-green-200 mb-2">
              <a href="https://www.muvocbd.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
                www.muvocbd.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200">
            &copy; {new Date().getFullYear()} MUVO CBD. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
