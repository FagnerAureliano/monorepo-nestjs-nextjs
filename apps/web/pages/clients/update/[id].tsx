import { useState } from 'react';
import { NextPage } from 'next';
import ClientForm from '../../../components/client-form';
import { Layout } from '../../../components/layout';
import { clientService } from '../../../services/clients';
import { useRouter } from 'next/router';

const Createlients: NextPage = ({ data }: any) => {
  const nav = useRouter();

  async function onSubmit(data) {
    try {
      await clientService.update(data);
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
  const { data } = await clientService.findByID(id);
  return {
    props: { data },
  };
};
