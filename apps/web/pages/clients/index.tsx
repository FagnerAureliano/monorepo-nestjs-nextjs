/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
import Pagination from 'apps/web/components/pagination';
import { Loading } from 'apps/web/components/loading';
import { Input } from 'apps/web/components/input';
// import { Table } from '../components/table';

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

    console.log(data.id.value);

    // nav.push(`/clients/update/${id}`);
  }

  const [dataTable, setDataTable] = useState([]);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    async function axiosRequest() {
      const aa = await axios('http://localhost:3000/clients?_page=1&_limit=5')
      setDataTable(aa.data);
          setTotalCount(aa.headers[`x-total-count`]);

          console.log(aa.headers);
          console.log(totalCount);
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
    { heading: 'Photo', value: 'photo' },
    { heading: 'Name', value: 'first_name' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'phone' },
  ];
  function handlePage(pageNumber: number) {
    setCurrentPage(pageNumber);
    async function axiosRequest() {
      const aa =  await axios(
        `http://localhost:3000/clients?_page=${currentPage}&_limit=5 `
      )
      setDataTable(aa.data);
          setTotalCount(aa.headers[`x-total-count`]);

          console.log(aa.headers);
          console.log(totalCount);
        // .then((res) => {
        //   setDataTable(res.data);
        //   setTotalCount(res.headers[`x-total-count`]);

        //   console.log(res.headers);
        //   console.log(totalCount);
        // })
        // .catch((err) => console.log(err));
    }
    axiosRequest();

    console.log(pageNumber);
  }
  function handleInputChange(data) {
    async function axiosRequest() {
     const aa = await axios(
        `http://localhost:3000/clients?_page=${0}&_limit=5&first_name_like=${data}`
      )
      
        // .then((res) => {
          setDataTable(aa.data);
          setTotalCount(aa.headers[`x-total-count`]);

          console.log(aa.headers);
          console.log(totalCount);
        // })
        // .catch((err) => console.log(err));
    }
    axiosRequest();
  }
  return (
    <>
      <Layout title="Clients">
        {dataTable ? (
          <div>
            <Input handleInputChange={handleInputChange} />
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
 let data 
   await axios('http://localhost:3000/clients?_page=1&_limit=5')
    .then((res) => data = res.data)
    .catch((err) => console.log(err));
  //   console.log(ctx);

  return {
    props: { data },
  };
};
