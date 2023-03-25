import { NextPage, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import { randomUserService } from '../../services/users-random';
import { Layout } from '../../components/layout';
import { Table } from '../../components/table';
import { Loading } from '../../components/loading';
import Pagination from '../../components/pagination';
import { RandomUserProps } from '../../models/random-user';

const column = [
  { heading: 'Name', value: 'name.first' },
  { heading: 'Email', value: 'email' },
  { heading: 'Username', value: 'login.username' },
  { heading: 'City', value: 'location.country' },
  { heading: 'Age', value: 'dob.age' },
];

const RandomUsers: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listUser, setListUser] = useState<RandomUserProps[]>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [pagesToShow, setPagesToShow] = useState<number>(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (data) {
      setListUser(data);
    }
    setItemsPerPage(5);
    setPagesToShow(3);
  }, []);

  function handlePage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <Layout title="Random User List">
      <>
        {listUser ? (
          <div>
            <Table
              column={column}
              data={currentItems}
              isEditable={false}
            ></Table>
            <Pagination
              handlePage={handlePage}
              _itemsPerPage={itemsPerPage}
              _pagesToShow={pagesToShow}
              _itemsLength={data.length}
            />
          </div>
        ) : (
          <div className="h-52">
            <Loading />
          </div>
        )}
      </>
    </Layout>
  );
};
export default RandomUsers;

export const getServerSideProps = async (ctx) => {
  //TODO: resolver tratamento para error
  let response: any;
  try {
    const data = await randomUserService.findAll();
    response = data;
  } catch (error) {
    response = null;
  }
  return {
    props: { data: response },
  };
};
