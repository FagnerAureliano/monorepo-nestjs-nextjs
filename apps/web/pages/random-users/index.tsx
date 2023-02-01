/* eslint-disable @nrwl/nx/enforce-module-boundaries */
 
import RandomUsersService from '../../services/users-random';
import { NextPage, InferGetServerSidePropsType } from 'next'; 
import { useEffect, useState } from 'react';
import { Layout } from 'apps/web/components/layout';
import { Table } from 'apps/web/components/table';
import { Loading } from 'apps/web/components/loading';

const RandomUsers: NextPage = ({
  data,
}: any) => {
  const [listUser, setListUser] = useState<any>(null);

  useEffect(() => {
    if (data) {
      // setListUser(data);
      console.log(data);
      
    }
  }, []);

  // const column = Object.keys(data[0]);
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
<div>
          {/* <Table
          column={column}
          data={listUser}
          handleDelete={handleRefresh} handleUpdate={handleRefresh} isEditable={true}
          ></Table> */}
          </div>

        ) : (
          <Loading />
        )}
      </>
    </Layout>
  );
};
export default RandomUsers;

export const getServerSideProps = async (context) => {
  //
  const data  = null
  console.log(data);

  return {
    props: { data },
  };
};
