import { NextPage } from 'next';
import { Layout } from '../components/layout';

const Dogs: NextPage = () => {
  return (
    <>
      <Layout title="Dogs" pageActive={true}>
        <p>Teste Dogs</p>
      </Layout>
    </>
  );
};
export default Dogs;

export const getServerSideProps = async (context) => {
  // console.log(context, 1111111);

  return {
    props: {},
  };
};
