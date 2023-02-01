import { Layout } from 'apps/web/components/layout';
import RandomUsersService from '../../services/users-random';
import { NextPage, InferGetServerSidePropsType } from 'next';
import { Table } from 'apps/web/components/table';
import { useEffect, useState } from 'react';

const RandomUsers: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listUser, setListUser] = useState<any>(null);

  useEffect(() => {
    if (data) {
      // setListUser(data);
      console.log(data);
      
    }
  }, []);

  const column = Object.keys(data[0]);
  async function handleRefresh(props) {
    const data = await RandomUsersService.getRandomUsers();
    console.log(data);
  }
  return (
    <Layout title="Random User List">
      <>
        <button onClick={handleRefresh} type="submit">
          aa
        </button>
        {listUser ? (
          <Table
            column={column}
            data={listUser}
            handleDelete={handleRefresh} handleUpdate={handleRefresh} isEditable={true}
          ></Table>
        ) : (
          <div>Loading ...</div>
        )}
      </>
    </Layout>
  );
};
export default RandomUsers;

export const getServerSideProps = async (context) => {
  //
  const data = await RandomUsersService.getRandomUsers();
  console.log(data);

  return {
    props: { data },
  };
};
