/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
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
  total: number;
}

const Clients: NextPage = ({ data, total }: Props) => {
  const nav = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pagesToShow, setPagesToShow] = useState(3);

  const [dataTable, setDataTable] = useState(data.data);
  const [totalCount, setTotalCount] = useState(data.total);

  function handleDelete(data) {
    console.log(data);
  }

  function handleCreate() {
    nav.push(`/clients/create`);
  }
  function handleUpdate(data) {
    console.log(data);

    nav.push(`/clients/update/${data.id}`);
  }

  async function handlePage(pageNumber: number) {
    console.log(pageNumber);

    setCurrentPage(pageNumber);
    const { data } = await clientService.findAll(pageNumber);
    console.log(data);

    setDataTable(data.data);
    console.log(pageNumber);
  }
  function handleInputChange(data) {
    console.log(data);
  }
  return (
    <>
      <Layout title="Clients">
        {dataTable ? (
          <div>
            <div className="flex place-content-between h-12">
              <Input
                placeholder="Search name, e-mail, phone ..."
                handleInput={handleInputChange}
              />
              <button
                className="text-white border border-gray-700 bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-500 rounded-lg text-sm px-5 text-center  "
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

export const getServerSideProps = async (context) => {
  const { data } = await clientService.findAll();
  
  return {
    props: { data: data },
  };
};
