import { NextPage, InferGetServerSidePropsType } from 'next'; 
import { Layout } from '../../../components/layout';

const Clients: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Layout title="Clients" pageActive={true}>
        <p>Teste Clients</p>
      </Layout>
    </>
  );
};
export default Clients;

export const getServerSideProps = async (context) => {
    const ctx = context
    console.log(ctx);

  return {
    props: {},
  };
};
