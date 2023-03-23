import './../styles/global.css'; 
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import { useContext } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AuthContext, AuthProvider } from '../contexts/auth.context';

function CustomApp({ Component, pageProps: { session, ...pageProps } }) {
  // const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>🚀 - Monorepo</title>
      </Head>
      <SessionProvider  session={session}>
        {/* <AuthProvider> */}
        <main className="app">
          <Component {...pageProps} />
        </main>
        {/* </AuthProvider> */}
      </SessionProvider>
    </>
  );
}

export default CustomApp;
