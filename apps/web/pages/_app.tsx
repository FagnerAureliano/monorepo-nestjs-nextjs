import { AppProps } from 'next/app';
import Head from 'next/head';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from '../contexts/auth.context';
import './../styles/global.css';

function CustomApp({ Component, pageProps }) {
  // const { isAuthenticated } = useContext(AuthContext); 
  
  return (
    <>
      <Head>
        <title>🚀  - Monorepo</title>
      </Head>
      <AuthProvider>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </>
  );
}

export default CustomApp;
