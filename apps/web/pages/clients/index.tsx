/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
import Pagination from 'apps/web/components/pagination';
import { Loading } from 'apps/web/components/loading';
import { Input } from 'apps/web/components/input';
import ClientsService from '../../services/clients';

const Clients: NextPage = ({ data }: any) => {
  console.log(data);

  const nav = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pagesToShow, setPagesToShow] = useState(5);

  function handleDelete(data) {
    console.log(data);
  }

  function handleUpdate(data) {
    console.log(data);

    // nav.push(`/clients/update/${id}`);
  }

  const [dataTable, setDataTable] = useState([]);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    async function axiosRequest() {
      setDataTable(data);

      // console.log(aa.headers);
      // console.log(totalCount);
      // .then((res) => {
      //   setDataTable(res.data);
      //   setTotalCount(res.headers[`x-total-count`]);

      //   console.log(res);
      //   console.log(totalCount);
      // })
      // .catch((err) => console.log(err));
    }
    axiosRequest();
  }, []);

  const column = [
    { heading: 'Name', value: 'name' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'phone' },
    { heading: 'CPF', value: 'cpf' },
  ];
  function handlePage(pageNumber: number) {
    setCurrentPage(pageNumber);

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
            <Input
              placeholder="Search name, e-mail, phone ..."
              handleInput={handleInputChange}
            />
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
  let data;
  await ClientsService.findAll()
    .then((res) => (data = res.data))
    .catch((err) => console.log(err));
  //   console.log(ctx);

  return {
    props: { data },
  };
};
