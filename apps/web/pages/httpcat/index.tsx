import { Loading } from '../../components/loading';
import { useState } from 'react';
import { Input } from '../../components/input';
import { Layout } from '../../components/layout';
import HttpCatsService from '../../services/http-cat';

export default function HttpCat() {
  const [catImage, setCatImage] = useState<string | null>();
  const [loading, setLoading] = useState(false);

  async function handleInputChange(code) {
    setLoading(true);
    const { data } = await HttpCatsService.findStatusCatByCode(code);
    setCatImage(data);
    setLoading(false);
  }
  return (
    <>
      <Layout title="Http Status Cat">
        <div className="flex flex-col items-center justify-center">
          <div className="w-60   ">
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
              <div className='pt-4'>
                <span className='p-2 font-bold'>Digite um número de Status HTTP</span>
                <div className='p-2 text-base gap-3'>
                  <p>Respostas de informação (100-199) </p>
                  <p>Respostas de sucesso (200-299),</p>
                  <p>Redirecionamentos (300-399)</p>
                  <p>Erros do cliente (400-499)</p>
                  <p> Erros do servidor (500-599).</p>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </>
  );
}
