import { NextPage } from 'next'; 
import { Layout } from '../../components/layout';

const Createlients: NextPage = () => {
  return (
    <>
      <Layout title="Clients" pageActive={true}>
        <p>Teste Clients</p>
      </Layout>
    </>
  );
};
export default Createlients;

export const getServerSideProps = async (context) => {
const ctx = context.query.id;
console.log(ctx);


  return {
    props: {},
  };
};