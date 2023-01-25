import { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Table } from '../components/table';

const Clients: NextPage = () => {
  const columns = [
    { field: 'name', header: 'Nome' },
    { field: 'email', header: 'E-mail' },
    { field: 'phone', header: 'Telefone' },
    { field: 'address', header: 'Endereço' },
    { field: 'cpf', header: 'CPF' },
    { field: 'actions', header: '' },
  ];
  const TableData = [
    { id: 1, fullName: 'Noor Khan', age: 25, city: 'Patna' },
    { id: 2, fullName: 'Rapsan Jani', age: 26, city: 'Noida' },
    { id: 3, fullName: 'Monika Singh', age: 18, city: 'New Delhi' },
    { id: 4, fullName: 'Sunil Kumar', age: 22, city: 'Jaipur' },
    { id: 5, fullName: 'Kajol Kumari', age: 21, city: 'Chennai' },
  ];
  const column = Object.keys(TableData[0]);

  function handleDelete(data) {
    console.log(data);
  }

  return (
    <>
      <Layout title="Clients" pageActive={true}>
        <Table
          columns={column}
          data={TableData}
          handleDelete={handleDelete}
        ></Table>
      </Layout>
    </>
  );
};
export default Clients;

export const getServerSideProps = async (context) => {
  const ctx = context;
  console.log(ctx);

  return {
    props: {},
  };
};
