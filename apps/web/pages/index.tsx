import type { GetServerSideProps, NextPage } from 'next'; 
import { signOut } from 'next-auth/react';
import Image from 'next/image'; 
import useRequireAuth from '../lib/use-require-auth';

const Home: NextPage = () => {
  const session = useRequireAuth()

  // if(!session) return <div>loading...</div>
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image
              width={200}
              height={200}
              src={
                'https://i.pinimg.com/564x/84/eb/2b/84eb2b29ecae003e53d717946ff49dbd.jpg'
              }
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {/* {`Seja bem vindo ${session?.user?.name}`} */}
            </h2>
            <button onClick={() => signOut()}>Sair</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;