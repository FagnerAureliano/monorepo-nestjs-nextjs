/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
import Pagination from 'apps/web/components/pagination';
import { Loading } from 'apps/web/components/loading';
import { Input } from 'apps/web/components/input';
import { clientService } from '../../services/clients';

const column = [
  { heading: 'Name', value: 'name' },
  { heading: 'Email', value: 'email' },
  { heading: 'Phone', value: 'phone' },
  { heading: 'City', value: 'address.city' },
];
interface Props {
  data: any;
}

const Clients: NextPage = ({ data }: Props) => {
  const clients = data.data;
  const total = data.total;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagesToShow, setPagesToShow] = useState(3);

  const [dataTable, setDataTable] = useState(clients);
  const [totalCount, setTotalCount] = useState(total);
  const { push } = useRouter();

  async function handleDelete({ id }) {
    console.log(id); 
    // try {
    //   const res = await clientService.delete(id);
    // } catch (error) {
    //   console.log(error);
    //   toast.error('Erro interno.');
    // }
  }

  function handleCreate() {
    push(`/clients/create`);
  }
  function handleUpdate({ id }) {
    push(`/clients/update/${id}`);
  }

  async function handlePage(pageNumber: number) {
    setCurrentPage(pageNumber);
    try {
      const { data } = await clientService.findAll(pageNumber);
      setDataTable(data.data);
    } catch (error) {
      toast.error('Erro interno.');
    }
  }
  function handleInputChange(data) {
    console.log(data);
  }
  return (
    <>
      <Layout title="Clients">
        <ToastContainer autoClose={2000} />
        {dataTable ? (
          <div>
            <div className="flex place-content-between h-12 content-end">
              {data.total > 0 && (
                <Input
                  placeholder="Search name, e-mail, phone ..."
                  handleInput={handleInputChange}
                />
              )}
              <button
                className="text-white relative float-right border border-gray-700 bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-500 rounded-lg text-sm px-5 text-center  "
                onClick={handleCreate}
              >
                Create Client
              </button>
            </div>
            
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
          </div>
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
  const { data } = await clientService.findAll();

  return {
    props: { data: data },
  };
};
