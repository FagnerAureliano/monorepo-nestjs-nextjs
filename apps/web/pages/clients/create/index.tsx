import { NextPage } from 'next';
import { Layout } from '../../../components/layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClientsService from '../../../services/clients';
import { useRouter } from 'next/router';
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
  const nav = useRouter();
 

  async function onSubmit(data: ClientProps) {
    try {
      await ClientsService.createClient(data);
      nav.push('/clients');
    } catch (error) {
      return error;
    }
  }

  return (
    <>
      <Layout title="Create Client">
       <ClientForm onSubmit={onSubmit} />
      </Layout>
    </>
  );
};
export default Clients;

export const getServerSideProps = async (ctx) => {
  const id = ctx.query.id  
  return {
    props: {},
  };
};
