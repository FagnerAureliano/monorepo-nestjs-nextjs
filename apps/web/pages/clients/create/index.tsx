import { NextPage } from 'next';
import { Layout } from '../../../components/layout';
import { useForm, SubmitHandler } from 'react-hook-form';
import ClientsService from '../../../services/clients';
import { useRouter } from 'next/router';
import ClientForm from '../../../components/client-form';
import Alert from '../../../components/alert';
import { useState } from 'react';

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
      await ClientsService.create(data);
      
      nav.push('/clients');
    } catch (error) {
      return error;
    }
  }

  const [alert, setAlert] = useState(null);

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleShowAlert = (type, message) => {
    setAlert({ type, message });
  };

  return (
    <>
      <Layout title="Create Client">
      <button onClick={() => handleShowAlert('success', 'Success message')}>
        Show Success Alert
      </button>
      {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={handleCloseAlert}
          />
        )}
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
