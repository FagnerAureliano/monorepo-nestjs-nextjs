import { NextPage } from 'next';
import { Layout } from '../../../components/layout';

const Clients: NextPage = (props: any) => {
  return (
    <>
      <Layout title="Clients">
        <p>Teste Clients</p>
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
