import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Muvo - MUVO CBD</title>
        <meta name="description" content="Aplicación de MUVO CBD para e-commerce y marketing en red" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Muvo" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Bienvenido a Muvo</h1>
          <p className="text-xl text-gray-600 mb-8">
            La aplicación oficial de MUVO CBD para e-commerce y marketing en red
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {user ? (
              <Link href="/muver/dashboard" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Ir al Tablero
              </Link>
            ) : (
              <>
                <Link href="/login" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-6 rounded-lg border border-green-700 transition duration-300">
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-700 mb-4">Módulo MUVER</h2>
              <p className="text-gray-600 mb-4">
                Gestiona tus actividades de marketing en red, recluta nuevos miembros y organiza eventos.
              </p>
              <Link href={user ? "/muver/dashboard" : "/login"} className="text-green-700 font-semibold hover:underline">
                Explorar →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-700 mb-4">Contenido Educativo</h2>
              <p className="text-gray-600 mb-4">
                Aprende sobre los beneficios del CBD, salud y bienestar con nuestros artículos y recursos.
              </p>
              <Link href="/articles" className="text-green-700 font-semibold hover:underline">
                Explorar →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-700 mb-4">Tienda</h2>
              <p className="text-gray-600 mb-4">
                Descubre y compra productos de CBD de alta calidad en nuestra tienda en línea.
              </p>
              <Link href="/muver/shop" className="text-green-700 font-semibold hover:underline">
                Explorar →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
