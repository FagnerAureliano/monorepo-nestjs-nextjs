import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import ClientForm from '../../../components/client-form';
import { Layout } from '../../../components/layout';
import ClientsService from '../../../services/clients';

const Createlients: NextPage = ({ data }: any) => {
  console.log(data);

  function onSubmit() {
    console.log('');
  }
  const [client, setClient] = useState(data);

  return (
    <>
      <Layout title="Clients">
        <ClientForm data={client} onSubmit={onSubmit} />
      </Layout>
    </>
  );
};
export default Createlients;

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const { data } = await ClientsService.findByID(id);
  return {
    props: { data },
  };
};
