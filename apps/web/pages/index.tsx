import type { NextPage } from 'next';
import { Layout } from '../components/layout';

const Home: NextPage = (props) => {
  return (
    <>
      <Layout title="">
        <div className="flex flex-col p-20 justify-start items-center min-h-screen ">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo à nossa página!</h1>
          <p className="text-center mb-4">
            Aqui você encontrará diversas opções para aproveitar ao máximo sua
            visita.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Explorar novos perfis
              </h2>
              <p className="text-lg mb-2 text-gray-700">
                Temos uma lista aleatória de usuários para você navegar e
                descobrir novas pessoas interessantes.
              </p>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Explorar
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Gatos
              </h2>
              <p className="text-lg mb-2 text-gray-700">
                Escolha entre um gerador aleatório de imagens de gatos ou um
                input de número correspondente a um status http que trará uma
                imagem de gato para você.
              </p>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Explorar
              </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 md:w-1/3">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Clientes
              </h2>
              <p className="text-lg mb-2 text-gray-700">
                Confira nossa lista de clientes e se inspire. E se precisar de
                ajuda, nossa equipe de suporte está sempre à disposição para te
                auxiliar.
              </p>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mt-4">
                Explorar
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Home;
