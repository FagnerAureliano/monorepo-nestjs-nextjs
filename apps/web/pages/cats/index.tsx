import { useState } from 'react';
import { NextPage, InferGetServerSidePropsType } from 'next';
import { Loading } from '../../components/loading';
import { Layout } from '../../components/layout';
import CatsService from '../../services/cats-random';
import { getSession } from 'next-auth/react';
import axios from '../../lib/axios';
import useAxiosAuth from '../../lib/hooks/use-axios-auth';

const Cats: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [catImage, setCatImage] = useState<string | null>(data ? data : null);
  const [loading, setLoading] = useState(false);
  const axiosAuth = useAxiosAuth();
  async function handleRefresh() {
    setLoading(true);
    const catImage = await CatsService.getRandomCats();
    setCatImage(catImage);
    setLoading(false);
  }

  const fetchPost = async () => {
    const session = await getSession();
    console.log(session);
    try {
      const res = await axios.get('/users');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout title="Cats">
        <div className="flex flex-col items-center justify-center">
          <button
            className="text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            onClick={fetchPost}
          >
            Refresh
          </button>
          {catImage ? (
            <div>
              {loading ? (
                <div className="h-52">
                  <Loading />
                </div>
              ) : (
                <div className="flex justify-center m-2 ">
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
            <div>Clique no botão</div>
          )}
        </div>
      </Layout>
    </>
  );
};
export default Cats;

export const getServerSideProps = async (context) => {
  let data = await CatsService.getRandomCats();
  // if (!data) {
  data = JSON.stringify(data);
  // }
  return {
    props: {
      data,
    },
  };
};
