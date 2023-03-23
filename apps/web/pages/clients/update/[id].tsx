import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { clientService } from '../../../services/clients';
import ClientForm from '../../../components/client-form';
import { Layout } from '../../../components/layout';

const Createlients: NextPage = ({ data }: any) => {
  const [client] = useState(data);
  const { push } = useRouter();

  async function onSubmit(data) {
    try {
      const { status } = await clientService.update(data);
      if (status === 200) {
        toast.success('Atualizado com sucesso !', {
          autoClose: 1000,
          onClose: () => push('/clients'),
        });
      }
    } catch (error) {
      toast.error('Erro ao atualizar cliente. Verifique os campos preenxidos.');
    }
  }

  return (
    <>
      <Layout title="Clients">
        <ToastContainer autoClose={2000} />
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
