import { Loading } from '../../components/loading';
import { useState } from 'react';
import { Input } from '../../components/input';
import { Layout } from '../../components/layout';
import { httpStatusService } from '../../services/http-cat';
import { toast, ToastContainer } from 'react-toastify';

export default function HttpCat(props) {
  const [catImage, setCatImage] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  async function handleInputChange(code: string) {
    setLoading(true);
    try {
      const { data } = await httpStatusService.findByCode(code);
      setCatImage(data);
      setLoading(false);
    } catch (error) {
      toast.error('Erro interno.');
    }
  }
  return (
    <>
      <Layout title="Http Status Cat">
        <ToastContainer autoClose={2000} />
        <div className="flex flex-col mt-8 items-center justify-center">
          <div className="w-60">
            <Input handleInput={handleInputChange} isButonSubmit={true} />
          </div>
          {catImage ? (
            <div>
              {loading ? (
                <div className="h-52">
                  <Loading />
                </div>
              ) : (
                <div className="flex justify-center m-2">
                  <picture>
                    <img
                      src={catImage}
                      className="flex object-fill rounded-lg"
                      alt="image of cat"
                    />
                  </picture>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="mt-8">
                <p className="text-lg font-medium mb-2">
                  Respostas de informação (100-199)
                </p>
                <p className="text-gray-500 mb-2">
                  As respostas de informação indicam que o servidor recebeu a
                  requisição do cliente e está processando-a.
                </p>
                <p className="text-lg font-medium mb-2">
                  Respostas de sucesso (200-299)
                </p>
                <p className="text-gray-500 mb-2">
                  As respostas de sucesso indicam que a requisição do cliente
                  foi bem sucedida e o servidor retornou uma resposta.
                </p>
                <p className="text-lg font-medium mb-2">
                  Redirecionamentos (300-399)
                </p>
                <p className="text-gray-500 mb-2">
                  As respostas de redirecionamento indicam que o cliente precisa
                  tomar alguma ação adicional para completar a requisição.
                </p>
                <p className="text-lg font-medium mb-2">
                  Erros do cliente (400-499)
                </p>
                <p className="text-gray-500 mb-2">
                  As respostas de erro do cliente indicam que a requisição do
                  cliente contém erros.
                </p>
                <p className="text-lg font-medium mb-2">
                  Erros do servidor (500-599)
                </p>
                <p className="text-gray-500 mb-2">
                  As respostas de erro do servidor indicam que o servidor
                  encontrou um erro ao processar a requisição do cliente.
                </p>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
