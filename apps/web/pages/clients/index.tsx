/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
import Pagination from 'apps/web/components/pagination';
import { Loading } from 'apps/web/components/loading';
import { Input } from 'apps/web/components/input';
import { clientService } from '../../services/clients';
import ModalConfirm from 'apps/web/components/tooltip-confirmation';
import { PlusIcon } from '@heroicons/react/24/outline';

const column = [
  { heading: 'Name', value: 'name' },
  { heading: 'Email', value: 'email' },
  { heading: 'Phone', value: 'phone' },
  { heading: 'City', value: 'address.city' },
];
interface Props {
  data: any;
}

const Clients: NextPage = ({
  data,
  total,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagesToShow, setPagesToShow] = useState(3);

  const [dataTable, setDataTable] = useState(data);
  const [totalCount, setTotalCount] = useState(total);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete({ id }) {
    try {
      setLoading(true);
      const { status } = await clientService.delete(id);
  
      if (status === 204) {
        toast.success('Deletado com sucesso !', {
          autoClose: 1000,
          onClose: () => push('/clients'),
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      toast.error('Erro ao deletar cliente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      handleFindAllClients().then(({ data: { data } }) => setDataTable(data));
    }
  }, [loading]);
  useEffect(() => {
    if (!dataTable) {
      setLoading(true);
    }else{
      setLoading(false);
    }
  }, [dataTable]);


  async function handleFindAllClients(pageNumber?: number) {
    try {
      return ({ data } = await clientService.findAll(
        pageNumber || currentPage
      ));
    } catch (error) {
      toast.error('Erro interno.');
    }
  }

  function handleCreateClient() {
    push(`/clients/create`);
  }
  function handleUpdate({ id }) {
    push(`/clients/update/${id}`);
  }

  async function handlePage(pageNumber: number) {
    setCurrentPage(pageNumber);
    try {
      const {
        data: { data },
      } = await handleFindAllClients(pageNumber);

      setDataTable(data);
    } catch (error) {
      toast.error('Erro interno.');
    }
  }

  return (
    <>
      <Layout title="Clients">
        <div className="justify-end flex w-full pb-5">
          <button
            onClick={handleCreateClient}
            className="group self-end relative w-2/5 h-10 flex justify-center py-2 px-4 tex  border border-gray-600 text-sm font-medium rounded-md text-gray-600 bg-gray-100 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <PlusIcon
                className="h-5 w-5 text-gray-500 group-hover:text-gray-400"
                aria-hidden="true"
              />
            </span>
            Cadastrar Cliente
          </button>
        </div>
        <ToastContainer autoClose={2000} />
        {!loading ? (
          <>
            <Table
              data={dataTable}
              column={column}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              isEditable={true}
            />

            <Pagination
              _itemsLength={totalCount}
              _itemsPerPage={itemsPerPage}
              _pagesToShow={pagesToShow}
              handlePage={handlePage}
            />
          </>
        ) : (
          <div className="h-52">
            <Loading />
          </div>
        )}
      </Layout>
    </>
  );
};
export default Clients;

export const getServerSideProps = async (ctx) => {
  try {
    const {
      data: { data, total },
    } = await clientService.findAll();

    return {
      props: { data, total },
    };
  } catch (error) {
    console.error('Error fetching client data:', error);
    return {
      props: { data: [], total: 0 },
    };
  }
};
