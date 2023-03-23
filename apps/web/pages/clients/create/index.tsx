import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { Layout } from '../../../components/layout';
import { clientService } from '../../../services/clients';
import ClientForm from '../../../components/client-form';

interface ClientProps {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: {
    zipcode: string;
    city: string;
    street: string;
    number: string;
  };
}

const Clients: NextPage = (props: any) => {
  const { push } = useRouter();

  async function onSubmit(data: ClientProps) {
    try {
      const { status } = await clientService.create(data);

      if (status === 201) {
        toast.success('Cadastrado com sucesso !', {
          autoClose: 1000,
          onClose: () => push('/clients'),
        });
      }
    } catch (error) {
      toast.error('Erro ao cadastrar cliente. Verifique os campos preenxidos.');
    }
  }

  return (
    <>
      <Layout title="Create Client">
        <ToastContainer autoClose={2000} />
        <ClientForm onSubmit={onSubmit} />
      </Layout>
    </>
  );
};
export default Clients;
