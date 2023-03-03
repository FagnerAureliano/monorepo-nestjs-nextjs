import { useState } from 'react';
import { NextPage } from 'next';
import ClientForm from '../../../components/client-form';
import { Layout } from '../../../components/layout';
import ClientsService from '../../../services/clients';
import { useRouter } from 'next/router';

const Createlients: NextPage = ({ data }: any) => {
  const nav = useRouter();

  async function onSubmit(data) {
    try {
      await ClientsService.update(data);
      nav.push('/clients');
    } catch (error) {
      return error;
    }
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
