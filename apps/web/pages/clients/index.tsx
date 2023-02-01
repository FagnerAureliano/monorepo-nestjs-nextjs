/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NextPage, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
// import { Table } from '../components/table';

const Clients: NextPage = () => {
  const nav = useRouter();
  const columns = [
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'E-mail' },
    { field: 'phone', header: 'Telefone' },
    { field: 'address', header: 'Endereço' },
    { field: 'cpf', header: 'CPF' },
    { field: 'actions', header: '' },
  ];

  // const column = Object.keys(TableData[0]);

  function handleDelete(data) {
    console.log(data);
  }

  function handleUpdate(data) {
    console.log(data);
    console.log(data.id.value);

    // nav.push(`/clients/update/${id}`);
  }

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    axios('https://randomuser.me/api/?results=5')
      .then((res) => {
        setDataTable(res.data.results);
        console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const column = [
    { heading: 'Name', value: 'login.username' },
    { heading: 'Email', value: 'email' },
    { heading: 'Phone', value: 'cell' },
    { heading: 'City', value: 'location.city' },
  ];

  return (
    <>
      <Layout title="Clients">
        <Table
          data={dataTable}
          column={column}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          isEditable={true}
        />
      </Layout>
    </>
  );
};
export default Clients;

export const getServerSideProps = async (context) => {
  const ctx = context;
  //   console.log(ctx);

  return {
    props: {},
  };
};
