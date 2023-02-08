import { NextPage, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import RandomUsersService from '../../services/users-random';
import { Layout } from '../../components/layout';
import { Table } from '../../components/table';
import { Loading } from '../../components/loading';
import Pagination from '../../components/pagination';

const RandomUsers: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [listUser, setListUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pagesToShow, setPagesToShow] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const column = [
    { heading: 'Name', value: 'name.first' },
    { heading: 'Email', value: 'email' },
    { heading: 'Username', value: 'login.username' },
    { heading: 'City', value: 'location.country' },
    { heading: 'Age', value: 'dob.age' },
  ];

  useEffect(() => {
    if (data) {
      setListUser(data);
      console.log(data);
    }
    setItemsPerPage(5);
    setPagesToShow(3);
  }, []);

  function handleRefresh(data) {
    console.log(data);
  }

  function handlePage(pageNumber: number) {
    console.log(pageNumber);

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

export const getServerSideProps = async (context) => {
  //
  const data = [
    {
      name: {
        title: 'Mr',
        first: 'Madaleno',
        last: 'Ferreira',
      },
      location: {
        street: {
          number: 3870,
          name: 'Rua Das Flores ',
        },
        city: 'Osasco',
        state: 'Alagoas',
        country: 'Brazil',
        postcode: 25081,
        coordinates: {
          latitude: '-74.9108',
          longitude: '-54.3027',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'madaleno.ferreira@example.com',
      login: {
        uuid: 'a6263912-6595-40e6-ad1d-b44561555e42',
        username: 'beautifulsnake736',
        password: 'smoking',
        salt: 'yxLta6Ah',
        md5: '344edf7ec663a0cff34427365aebdc9e',
        sha1: 'ce3d41ef35c85acace7f98ed57f6eec075443e20',
        sha256:
          '7dacd066958219c617eb832e376372f7ee37683c0cbf3d5f3f9fde812ab2fa08',
      },
      dob: {
        date: '1961-07-01T06:52:46.499Z',
        age: 61,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/33.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/33.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/33.jpg',
      },
    },
    {
      name: {
        title: 'Miss',
        first: 'Sarita',
        last: 'Fernandes',
      },
      location: {
        street: {
          number: 573,
          name: 'Altamount Rd',
        },
        city: 'Begusarai',
        state: 'Telangana',
        country: 'India',
        postcode: 18210,
        coordinates: {
          latitude: '73.0087',
          longitude: '-48.9903',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'sarita.fernandes@example.com',
      login: {
        uuid: '1afb922e-cf52-428b-848f-878bb41a001e',
        username: 'orangegorilla961',
        password: 'kermit',
        salt: '5BoVLlhe',
        md5: '5581417e803cf3c23abcdd2db3c674a2',
        sha1: '5c0e9517e5e330ca0a1a117fe4d2a35b5a849a17',
        sha256:
          'e77ad303ece96b0b36084940ad73dcac5d010554b114876d5567efde7c3ebee0',
      },
      dob: {
        date: '1975-02-19T01:50:08.837Z',
        age: 47,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/52.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Esfir',
        last: 'Sidoryak',
      },
      location: {
        street: {
          number: 1482,
          name: 'Borovikovskogo',
        },
        city: 'Balakliya',
        state: 'Dnipropetrovska',
        country: 'Ukraine',
        postcode: 66743,
        coordinates: {
          latitude: '-73.5790',
          longitude: '148.3859',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'esfir.sidoryak@example.com',
      login: {
        uuid: '73c92118-86f8-4685-a250-556025b6b90a',
        username: 'bigswan520',
        password: 'believe',
        salt: 'aGX1IbRU',
        md5: '3420b4a88d36c2604c2e3750fbdfe48c',
        sha1: 'd18f40fef9d60c9c733cfbe30211a23e75f2545a',
        sha256:
          '5d7712a025331345eefb807f52846e822f720b6b53d673987e7eab5ec5fbb04e',
      },
      dob: {
        date: '1969-03-25T13:48:15.938Z',
        age: 53,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
      },
    },
    {
      name: {
        title: 'Ms',
        first: 'Lukiya',
        last: 'Batyuk',
      },
      location: {
        street: {
          number: 3650,
          name: "P'yat kutiv",
        },
        city: 'Odesa',
        state: 'Luganska',
        country: 'Ukraine',
        postcode: 59639,
        coordinates: {
          latitude: '48.4968',
          longitude: '-99.5847',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'lukiya.batyuk@example.com',
      login: {
        uuid: 'f5e376d1-54c7-4efc-8c72-2102a08cd80b',
        username: 'bluemouse509',
        password: 'smart1',
        salt: 'MR1rfT5X',
        md5: 'b59268b0fe7ebede3e9745d264ea7918',
        sha1: '1c960419755e9810a7cb0527b1acb1169a250b17',
        sha256:
          '78346fd9ebaf977383630bfee858417b5c2a56fd1a3de0adf864bf9c48f0402a',
      },
      dob: {
        date: '1972-03-21T00:33:18.461Z',
        age: 50,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/31.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Ethan',
        last: 'Lambert',
      },
      location: {
        street: {
          number: 2665,
          name: 'Rue Principale',
        },
        city: 'Grenoble',
        state: "Côte-D'Or",
        country: 'France',
        postcode: 93173,
        coordinates: {
          latitude: '45.8909',
          longitude: '-133.4831',
        },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'ethan.lambert@example.com',
      login: {
        uuid: '1d76e19a-047b-40ce-8ea0-3a4fe70ba5aa',
        username: 'silverswan645',
        password: 'admin',
        salt: 's558l8Qm',
        md5: 'f4aa4e2fab63bcdcd828bb9ad22b7af0',
        sha1: '7119ae1ba599a66b3c5d83dc160b2980b5be7ce3',
        sha256:
          '7773525ee0f5878d7da7ebe7509afe91c7a15a5a7c9cc426bbc1931046f81f86',
      },
      dob: {
        date: '1950-08-12T19:37:52.081Z',
        age: 72,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/40.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/40.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/40.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Bror',
        last: 'Rekstad',
      },
      location: {
        street: {
          number: 9142,
          name: 'Bidenkaps gate',
        },
        city: 'Oslo',
        state: 'Description',
        country: 'Norway',
        postcode: '9690',
        coordinates: {
          latitude: '-3.6070',
          longitude: '18.5593',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'bror.rekstad@example.com',
      login: {
        uuid: '9bd41bec-d397-47f5-84d6-9388564ff6d0',
        username: 'bluefrog276',
        password: 'leather',
        salt: 'OzVh9gRK',
        md5: 'f7c29e8f66ee350c0b6e1696d22f2112',
        sha1: '67be6d0ddd9c9dd25dc524cff2d864b17da3fbd8',
        sha256:
          '98466790e2cbd82b69bc9d9a8c61cac5e759a6a89fc60fc6002a8cac0770fda1',
      },
      dob: {
        date: '1990-05-31T11:43:55.077Z',
        age: 32,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/37.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Nataniel',
        last: 'da Cunha',
      },
      location: {
        street: {
          number: 6479,
          name: 'Rua Doze ',
        },
        city: 'Bauru',
        state: 'Paraná',
        country: 'Brazil',
        postcode: 95664,
        coordinates: {
          latitude: '-16.2628',
          longitude: '-128.4131',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'nataniel.dacunha@example.com',
      login: {
        uuid: '4734f53e-4eef-43fa-b1cd-913666642859',
        username: 'smallkoala725',
        password: 'storage',
        salt: 'Gu28JLHf',
        md5: '9e9fe39487fc3d9223ef73be90cfe334',
        sha1: '2cc86bcdb7dcca52a1b25d0e33b4a34bd2715f58',
        sha256:
          'a43b60e524f4424e89cf244062bba7eb275ffa3cf48e2129985fa29f9c4ee2d5',
      },
      dob: {
        date: '1951-05-10T22:22:14.891Z',
        age: 71,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
      },
    },
    {
      name: {
        title: 'Madame',
        first: 'Mona',
        last: 'Olivier',
      },
      location: {
        street: {
          number: 6209,
          name: "Place de L'Abbé-Jean-Lebeuf",
        },
        city: 'Neuendorf',
        state: 'Graubünden',
        country: 'Switzerland',
        postcode: 7548,
        coordinates: {
          latitude: '-13.2034',
          longitude: '-33.0935',
        },
        timezone: {
          offset: '+5:00',
          description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
      },
      email: 'mona.olivier@example.com',
      login: {
        uuid: 'd99430cb-52ac-4e19-b8a6-c1f1b98253cb',
        username: 'organicostrich251',
        password: 'mississi',
        salt: 'gbCRdtYY',
        md5: 'c4f5cd62fb882a82bd676e6a66e50034',
        sha1: 'f5814aa367996a72373998f294672002e8e0634d',
        sha256:
          '044591052653baf83bd05da91e9ebda318b4b45ae7e1b16fc0bef68dcb8d180f',
      },
      dob: {
        date: '1986-01-19T09:52:49.141Z',
        age: 37,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/34.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/34.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/34.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Roope',
        last: 'Luoma',
      },
      location: {
        street: {
          number: 4948,
          name: 'Mannerheimintie',
        },
        city: 'Ruokolahti',
        state: 'Finland Proper',
        country: 'Finland',
        postcode: 73808,
        coordinates: {
          latitude: '-22.6912',
          longitude: '138.9641',
        },
        timezone: {
          offset: '-1:00',
          description: 'Azores, Cape Verde Islands',
        },
      },
      email: 'roope.luoma@example.com',
      login: {
        uuid: '8a092400-b5a9-443f-b16b-3ca518f85df9',
        username: 'brownlion419',
        password: 'birdman',
        salt: 'xbmWw4bX',
        md5: '8f4d1390615775b40652f19e06a6dbd1',
        sha1: '66881e9abe5bc9c225bbf8cd2def15bc930c6293',
        sha256:
          '00442b6666470370e5ddaaeef2c2b79a1781f6941776a5cbd25cd2e6509dc2bc',
      },
      dob: {
        date: '1979-03-21T04:29:04.475Z',
        age: 43,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/87.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/87.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Phoebe',
        last: 'Anderson',
      },
      location: {
        street: {
          number: 8444,
          name: 'Halifax Street',
        },
        city: 'Hamilton',
        state: 'Wellington',
        country: 'New Zealand',
        postcode: 56991,
        coordinates: {
          latitude: '19.6431',
          longitude: '11.6366',
        },
        timezone: {
          offset: '-12:00',
          description: 'Eniwetok, Kwajalein',
        },
      },
      email: 'phoebe.anderson@example.com',
      login: {
        uuid: '1dd7b121-617a-4e03-b0f5-3ab89f8158e4',
        username: 'blackwolf420',
        password: 'jetski',
        salt: 'J3mqnk45',
        md5: '1cc282e2ee430cb26748e876ca548d53',
        sha1: '33f6908aaac7a46a1fad8cf6f32b0c2ab477833f',
        sha256:
          'fbe63a4585fd3bad63e3304250bf307434bfdfa40b8132452d7c660e47fe39c4',
      },
      dob: {
        date: '1974-08-17T14:02:30.375Z',
        age: 48,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/9.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/9.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/9.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Madaleno',
        last: 'Ferreira',
      },
      location: {
        street: {
          number: 3870,
          name: 'Rua Das Flores ',
        },
        city: 'Osasco',
        state: 'Alagoas',
        country: 'Brazil',
        postcode: 25081,
        coordinates: {
          latitude: '-74.9108',
          longitude: '-54.3027',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'madaleno.ferreira@example.com',
      login: {
        uuid: 'a6263912-6595-40e6-ad1d-b44561555e42',
        username: 'beautifulsnake736',
        password: 'smoking',
        salt: 'yxLta6Ah',
        md5: '344edf7ec663a0cff34427365aebdc9e',
        sha1: 'ce3d41ef35c85acace7f98ed57f6eec075443e20',
        sha256:
          '7dacd066958219c617eb832e376372f7ee37683c0cbf3d5f3f9fde812ab2fa08',
      },
      dob: {
        date: '1961-07-01T06:52:46.499Z',
        age: 61,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/33.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/33.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/33.jpg',
      },
    },
    {
      name: {
        title: 'Miss',
        first: 'Sarita',
        last: 'Fernandes',
      },
      location: {
        street: {
          number: 573,
          name: 'Altamount Rd',
        },
        city: 'Begusarai',
        state: 'Telangana',
        country: 'India',
        postcode: 18210,
        coordinates: {
          latitude: '73.0087',
          longitude: '-48.9903',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'sarita.fernandes@example.com',
      login: {
        uuid: '1afb922e-cf52-428b-848f-878bb41a001e',
        username: 'orangegorilla961',
        password: 'kermit',
        salt: '5BoVLlhe',
        md5: '5581417e803cf3c23abcdd2db3c674a2',
        sha1: '5c0e9517e5e330ca0a1a117fe4d2a35b5a849a17',
        sha256:
          'e77ad303ece96b0b36084940ad73dcac5d010554b114876d5567efde7c3ebee0',
      },
      dob: {
        date: '1975-02-19T01:50:08.837Z',
        age: 47,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/52.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Esfir',
        last: 'Sidoryak',
      },
      location: {
        street: {
          number: 1482,
          name: 'Borovikovskogo',
        },
        city: 'Balakliya',
        state: 'Dnipropetrovska',
        country: 'Ukraine',
        postcode: 66743,
        coordinates: {
          latitude: '-73.5790',
          longitude: '148.3859',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'esfir.sidoryak@example.com',
      login: {
        uuid: '73c92118-86f8-4685-a250-556025b6b90a',
        username: 'bigswan520',
        password: 'believe',
        salt: 'aGX1IbRU',
        md5: '3420b4a88d36c2604c2e3750fbdfe48c',
        sha1: 'd18f40fef9d60c9c733cfbe30211a23e75f2545a',
        sha256:
          '5d7712a025331345eefb807f52846e822f720b6b53d673987e7eab5ec5fbb04e',
      },
      dob: {
        date: '1969-03-25T13:48:15.938Z',
        age: 53,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
      },
    },
    {
      name: {
        title: 'Ms',
        first: 'Lukiya',
        last: 'Batyuk',
      },
      location: {
        street: {
          number: 3650,
          name: "P'yat kutiv",
        },
        city: 'Odesa',
        state: 'Luganska',
        country: 'Ukraine',
        postcode: 59639,
        coordinates: {
          latitude: '48.4968',
          longitude: '-99.5847',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'lukiya.batyuk@example.com',
      login: {
        uuid: 'f5e376d1-54c7-4efc-8c72-2102a08cd80b',
        username: 'bluemouse509',
        password: 'smart1',
        salt: 'MR1rfT5X',
        md5: 'b59268b0fe7ebede3e9745d264ea7918',
        sha1: '1c960419755e9810a7cb0527b1acb1169a250b17',
        sha256:
          '78346fd9ebaf977383630bfee858417b5c2a56fd1a3de0adf864bf9c48f0402a',
      },
      dob: {
        date: '1972-03-21T00:33:18.461Z',
        age: 50,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/31.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Ethan',
        last: 'Lambert',
      },
      location: {
        street: {
          number: 2665,
          name: 'Rue Principale',
        },
        city: 'Grenoble',
        state: "Côte-D'Or",
        country: 'France',
        postcode: 93173,
        coordinates: {
          latitude: '45.8909',
          longitude: '-133.4831',
        },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'ethan.lambert@example.com',
      login: {
        uuid: '1d76e19a-047b-40ce-8ea0-3a4fe70ba5aa',
        username: 'silverswan645',
        password: 'admin',
        salt: 's558l8Qm',
        md5: 'f4aa4e2fab63bcdcd828bb9ad22b7af0',
        sha1: '7119ae1ba599a66b3c5d83dc160b2980b5be7ce3',
        sha256:
          '7773525ee0f5878d7da7ebe7509afe91c7a15a5a7c9cc426bbc1931046f81f86',
      },
      dob: {
        date: '1950-08-12T19:37:52.081Z',
        age: 72,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/40.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/40.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/40.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Bror',
        last: 'Rekstad',
      },
      location: {
        street: {
          number: 9142,
          name: 'Bidenkaps gate',
        },
        city: 'Oslo',
        state: 'Description',
        country: 'Norway',
        postcode: '9690',
        coordinates: {
          latitude: '-3.6070',
          longitude: '18.5593',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'bror.rekstad@example.com',
      login: {
        uuid: '9bd41bec-d397-47f5-84d6-9388564ff6d0',
        username: 'bluefrog276',
        password: 'leather',
        salt: 'OzVh9gRK',
        md5: 'f7c29e8f66ee350c0b6e1696d22f2112',
        sha1: '67be6d0ddd9c9dd25dc524cff2d864b17da3fbd8',
        sha256:
          '98466790e2cbd82b69bc9d9a8c61cac5e759a6a89fc60fc6002a8cac0770fda1',
      },
      dob: {
        date: '1990-05-31T11:43:55.077Z',
        age: 32,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/37.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Nataniel',
        last: 'da Cunha',
      },
      location: {
        street: {
          number: 6479,
          name: 'Rua Doze ',
        },
        city: 'Bauru',
        state: 'Paraná',
        country: 'Brazil',
        postcode: 95664,
        coordinates: {
          latitude: '-16.2628',
          longitude: '-128.4131',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'nataniel.dacunha@example.com',
      login: {
        uuid: '4734f53e-4eef-43fa-b1cd-913666642859',
        username: 'smallkoala725',
        password: 'storage',
        salt: 'Gu28JLHf',
        md5: '9e9fe39487fc3d9223ef73be90cfe334',
        sha1: '2cc86bcdb7dcca52a1b25d0e33b4a34bd2715f58',
        sha256:
          'a43b60e524f4424e89cf244062bba7eb275ffa3cf48e2129985fa29f9c4ee2d5',
      },
      dob: {
        date: '1951-05-10T22:22:14.891Z',
        age: 71,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
      },
    },
    {
      name: {
        title: 'Madame',
        first: 'Mona',
        last: 'Olivier',
      },
      location: {
        street: {
          number: 6209,
          name: "Place de L'Abbé-Jean-Lebeuf",
        },
        city: 'Neuendorf',
        state: 'Graubünden',
        country: 'Switzerland',
        postcode: 7548,
        coordinates: {
          latitude: '-13.2034',
          longitude: '-33.0935',
        },
        timezone: {
          offset: '+5:00',
          description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
      },
      email: 'mona.olivier@example.com',
      login: {
        uuid: 'd99430cb-52ac-4e19-b8a6-c1f1b98253cb',
        username: 'organicostrich251',
        password: 'mississi',
        salt: 'gbCRdtYY',
        md5: 'c4f5cd62fb882a82bd676e6a66e50034',
        sha1: 'f5814aa367996a72373998f294672002e8e0634d',
        sha256:
          '044591052653baf83bd05da91e9ebda318b4b45ae7e1b16fc0bef68dcb8d180f',
      },
      dob: {
        date: '1986-01-19T09:52:49.141Z',
        age: 37,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/34.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/34.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/34.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Roope',
        last: 'Luoma',
      },
      location: {
        street: {
          number: 4948,
          name: 'Mannerheimintie',
        },
        city: 'Ruokolahti',
        state: 'Finland Proper',
        country: 'Finland',
        postcode: 73808,
        coordinates: {
          latitude: '-22.6912',
          longitude: '138.9641',
        },
        timezone: {
          offset: '-1:00',
          description: 'Azores, Cape Verde Islands',
        },
      },
      email: 'roope.luoma@example.com',
      login: {
        uuid: '8a092400-b5a9-443f-b16b-3ca518f85df9',
        username: 'brownlion419',
        password: 'birdman',
        salt: 'xbmWw4bX',
        md5: '8f4d1390615775b40652f19e06a6dbd1',
        sha1: '66881e9abe5bc9c225bbf8cd2def15bc930c6293',
        sha256:
          '00442b6666470370e5ddaaeef2c2b79a1781f6941776a5cbd25cd2e6509dc2bc',
      },
      dob: {
        date: '1979-03-21T04:29:04.475Z',
        age: 43,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/87.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/87.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Phoebe',
        last: 'Anderson',
      },
      location: {
        street: {
          number: 8444,
          name: 'Halifax Street',
        },
        city: 'Hamilton',
        state: 'Wellington',
        country: 'New Zealand',
        postcode: 56991,
        coordinates: {
          latitude: '19.6431',
          longitude: '11.6366',
        },
        timezone: {
          offset: '-12:00',
          description: 'Eniwetok, Kwajalein',
        },
      },
      email: 'phoebe.anderson@example.com',
      login: {
        uuid: '1dd7b121-617a-4e03-b0f5-3ab89f8158e4',
        username: 'blackwolf420',
        password: 'jetski',
        salt: 'J3mqnk45',
        md5: '1cc282e2ee430cb26748e876ca548d53',
        sha1: '33f6908aaac7a46a1fad8cf6f32b0c2ab477833f',
        sha256:
          'fbe63a4585fd3bad63e3304250bf307434bfdfa40b8132452d7c660e47fe39c4',
      },
      dob: {
        date: '1974-08-17T14:02:30.375Z',
        age: 48,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/9.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/9.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/9.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Madaleno',
        last: 'Ferreira',
      },
      location: {
        street: {
          number: 3870,
          name: 'Rua Das Flores ',
        },
        city: 'Osasco',
        state: 'Alagoas',
        country: 'Brazil',
        postcode: 25081,
        coordinates: {
          latitude: '-74.9108',
          longitude: '-54.3027',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'madaleno.ferreira@example.com',
      login: {
        uuid: 'a6263912-6595-40e6-ad1d-b44561555e42',
        username: 'beautifulsnake736',
        password: 'smoking',
        salt: 'yxLta6Ah',
        md5: '344edf7ec663a0cff34427365aebdc9e',
        sha1: 'ce3d41ef35c85acace7f98ed57f6eec075443e20',
        sha256:
          '7dacd066958219c617eb832e376372f7ee37683c0cbf3d5f3f9fde812ab2fa08',
      },
      dob: {
        date: '1961-07-01T06:52:46.499Z',
        age: 61,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/33.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/33.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/33.jpg',
      },
    },
    {
      name: {
        title: 'Miss',
        first: 'Sarita',
        last: 'Fernandes',
      },
      location: {
        street: {
          number: 573,
          name: 'Altamount Rd',
        },
        city: 'Begusarai',
        state: 'Telangana',
        country: 'India',
        postcode: 18210,
        coordinates: {
          latitude: '73.0087',
          longitude: '-48.9903',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'sarita.fernandes@example.com',
      login: {
        uuid: '1afb922e-cf52-428b-848f-878bb41a001e',
        username: 'orangegorilla961',
        password: 'kermit',
        salt: '5BoVLlhe',
        md5: '5581417e803cf3c23abcdd2db3c674a2',
        sha1: '5c0e9517e5e330ca0a1a117fe4d2a35b5a849a17',
        sha256:
          'e77ad303ece96b0b36084940ad73dcac5d010554b114876d5567efde7c3ebee0',
      },
      dob: {
        date: '1975-02-19T01:50:08.837Z',
        age: 47,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/52.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Esfir',
        last: 'Sidoryak',
      },
      location: {
        street: {
          number: 1482,
          name: 'Borovikovskogo',
        },
        city: 'Balakliya',
        state: 'Dnipropetrovska',
        country: 'Ukraine',
        postcode: 66743,
        coordinates: {
          latitude: '-73.5790',
          longitude: '148.3859',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'esfir.sidoryak@example.com',
      login: {
        uuid: '73c92118-86f8-4685-a250-556025b6b90a',
        username: 'bigswan520',
        password: 'believe',
        salt: 'aGX1IbRU',
        md5: '3420b4a88d36c2604c2e3750fbdfe48c',
        sha1: 'd18f40fef9d60c9c733cfbe30211a23e75f2545a',
        sha256:
          '5d7712a025331345eefb807f52846e822f720b6b53d673987e7eab5ec5fbb04e',
      },
      dob: {
        date: '1969-03-25T13:48:15.938Z',
        age: 53,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
      },
    },
    {
      name: {
        title: 'Ms',
        first: 'Lukiya',
        last: 'Batyuk',
      },
      location: {
        street: {
          number: 3650,
          name: "P'yat kutiv",
        },
        city: 'Odesa',
        state: 'Luganska',
        country: 'Ukraine',
        postcode: 59639,
        coordinates: {
          latitude: '48.4968',
          longitude: '-99.5847',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'lukiya.batyuk@example.com',
      login: {
        uuid: 'f5e376d1-54c7-4efc-8c72-2102a08cd80b',
        username: 'bluemouse509',
        password: 'smart1',
        salt: 'MR1rfT5X',
        md5: 'b59268b0fe7ebede3e9745d264ea7918',
        sha1: '1c960419755e9810a7cb0527b1acb1169a250b17',
        sha256:
          '78346fd9ebaf977383630bfee858417b5c2a56fd1a3de0adf864bf9c48f0402a',
      },
      dob: {
        date: '1972-03-21T00:33:18.461Z',
        age: 50,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/31.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Ethan',
        last: 'Lambert',
      },
      location: {
        street: {
          number: 2665,
          name: 'Rue Principale',
        },
        city: 'Grenoble',
        state: "Côte-D'Or",
        country: 'France',
        postcode: 93173,
        coordinates: {
          latitude: '45.8909',
          longitude: '-133.4831',
        },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'ethan.lambert@example.com',
      login: {
        uuid: '1d76e19a-047b-40ce-8ea0-3a4fe70ba5aa',
        username: 'silverswan645',
        password: 'admin',
        salt: 's558l8Qm',
        md5: 'f4aa4e2fab63bcdcd828bb9ad22b7af0',
        sha1: '7119ae1ba599a66b3c5d83dc160b2980b5be7ce3',
        sha256:
          '7773525ee0f5878d7da7ebe7509afe91c7a15a5a7c9cc426bbc1931046f81f86',
      },
      dob: {
        date: '1950-08-12T19:37:52.081Z',
        age: 72,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/40.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/40.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/40.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Bror',
        last: 'Rekstad',
      },
      location: {
        street: {
          number: 9142,
          name: 'Bidenkaps gate',
        },
        city: 'Oslo',
        state: 'Description',
        country: 'Norway',
        postcode: '9690',
        coordinates: {
          latitude: '-3.6070',
          longitude: '18.5593',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'bror.rekstad@example.com',
      login: {
        uuid: '9bd41bec-d397-47f5-84d6-9388564ff6d0',
        username: 'bluefrog276',
        password: 'leather',
        salt: 'OzVh9gRK',
        md5: 'f7c29e8f66ee350c0b6e1696d22f2112',
        sha1: '67be6d0ddd9c9dd25dc524cff2d864b17da3fbd8',
        sha256:
          '98466790e2cbd82b69bc9d9a8c61cac5e759a6a89fc60fc6002a8cac0770fda1',
      },
      dob: {
        date: '1990-05-31T11:43:55.077Z',
        age: 32,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/37.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Nataniel',
        last: 'da Cunha',
      },
      location: {
        street: {
          number: 6479,
          name: 'Rua Doze ',
        },
        city: 'Bauru',
        state: 'Paraná',
        country: 'Brazil',
        postcode: 95664,
        coordinates: {
          latitude: '-16.2628',
          longitude: '-128.4131',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'nataniel.dacunha@example.com',
      login: {
        uuid: '4734f53e-4eef-43fa-b1cd-913666642859',
        username: 'smallkoala725',
        password: 'storage',
        salt: 'Gu28JLHf',
        md5: '9e9fe39487fc3d9223ef73be90cfe334',
        sha1: '2cc86bcdb7dcca52a1b25d0e33b4a34bd2715f58',
        sha256:
          'a43b60e524f4424e89cf244062bba7eb275ffa3cf48e2129985fa29f9c4ee2d5',
      },
      dob: {
        date: '1951-05-10T22:22:14.891Z',
        age: 71,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
      },
    },
    {
      name: {
        title: 'Madame',
        first: 'Mona',
        last: 'Olivier',
      },
      location: {
        street: {
          number: 6209,
          name: "Place de L'Abbé-Jean-Lebeuf",
        },
        city: 'Neuendorf',
        state: 'Graubünden',
        country: 'Switzerland',
        postcode: 7548,
        coordinates: {
          latitude: '-13.2034',
          longitude: '-33.0935',
        },
        timezone: {
          offset: '+5:00',
          description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
      },
      email: 'mona.olivier@example.com',
      login: {
        uuid: 'd99430cb-52ac-4e19-b8a6-c1f1b98253cb',
        username: 'organicostrich251',
        password: 'mississi',
        salt: 'gbCRdtYY',
        md5: 'c4f5cd62fb882a82bd676e6a66e50034',
        sha1: 'f5814aa367996a72373998f294672002e8e0634d',
        sha256:
          '044591052653baf83bd05da91e9ebda318b4b45ae7e1b16fc0bef68dcb8d180f',
      },
      dob: {
        date: '1986-01-19T09:52:49.141Z',
        age: 37,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/34.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/34.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/34.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Roope',
        last: 'Luoma',
      },
      location: {
        street: {
          number: 4948,
          name: 'Mannerheimintie',
        },
        city: 'Ruokolahti',
        state: 'Finland Proper',
        country: 'Finland',
        postcode: 73808,
        coordinates: {
          latitude: '-22.6912',
          longitude: '138.9641',
        },
        timezone: {
          offset: '-1:00',
          description: 'Azores, Cape Verde Islands',
        },
      },
      email: 'roope.luoma@example.com',
      login: {
        uuid: '8a092400-b5a9-443f-b16b-3ca518f85df9',
        username: 'brownlion419',
        password: 'birdman',
        salt: 'xbmWw4bX',
        md5: '8f4d1390615775b40652f19e06a6dbd1',
        sha1: '66881e9abe5bc9c225bbf8cd2def15bc930c6293',
        sha256:
          '00442b6666470370e5ddaaeef2c2b79a1781f6941776a5cbd25cd2e6509dc2bc',
      },
      dob: {
        date: '1979-03-21T04:29:04.475Z',
        age: 43,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/87.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/87.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Phoebe',
        last: 'Anderson',
      },
      location: {
        street: {
          number: 8444,
          name: 'Halifax Street',
        },
        city: 'Hamilton',
        state: 'Wellington',
        country: 'New Zealand',
        postcode: 56991,
        coordinates: {
          latitude: '19.6431',
          longitude: '11.6366',
        },
        timezone: {
          offset: '-12:00',
          description: 'Eniwetok, Kwajalein',
        },
      },
      email: 'phoebe.anderson@example.com',
      login: {
        uuid: '1dd7b121-617a-4e03-b0f5-3ab89f8158e4',
        username: 'blackwolf420',
        password: 'jetski',
        salt: 'J3mqnk45',
        md5: '1cc282e2ee430cb26748e876ca548d53',
        sha1: '33f6908aaac7a46a1fad8cf6f32b0c2ab477833f',
        sha256:
          'fbe63a4585fd3bad63e3304250bf307434bfdfa40b8132452d7c660e47fe39c4',
      },
      dob: {
        date: '1974-08-17T14:02:30.375Z',
        age: 48,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/9.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/9.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/9.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Madaleno',
        last: 'Ferreira',
      },
      location: {
        street: {
          number: 3870,
          name: 'Rua Das Flores ',
        },
        city: 'Osasco',
        state: 'Alagoas',
        country: 'Brazil',
        postcode: 25081,
        coordinates: {
          latitude: '-74.9108',
          longitude: '-54.3027',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'madaleno.ferreira@example.com',
      login: {
        uuid: 'a6263912-6595-40e6-ad1d-b44561555e42',
        username: 'beautifulsnake736',
        password: 'smoking',
        salt: 'yxLta6Ah',
        md5: '344edf7ec663a0cff34427365aebdc9e',
        sha1: 'ce3d41ef35c85acace7f98ed57f6eec075443e20',
        sha256:
          '7dacd066958219c617eb832e376372f7ee37683c0cbf3d5f3f9fde812ab2fa08',
      },
      dob: {
        date: '1961-07-01T06:52:46.499Z',
        age: 61,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/33.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/33.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/33.jpg',
      },
    },
    {
      name: {
        title: 'Miss',
        first: 'Sarita',
        last: 'Fernandes',
      },
      location: {
        street: {
          number: 573,
          name: 'Altamount Rd',
        },
        city: 'Begusarai',
        state: 'Telangana',
        country: 'India',
        postcode: 18210,
        coordinates: {
          latitude: '73.0087',
          longitude: '-48.9903',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'sarita.fernandes@example.com',
      login: {
        uuid: '1afb922e-cf52-428b-848f-878bb41a001e',
        username: 'orangegorilla961',
        password: 'kermit',
        salt: '5BoVLlhe',
        md5: '5581417e803cf3c23abcdd2db3c674a2',
        sha1: '5c0e9517e5e330ca0a1a117fe4d2a35b5a849a17',
        sha256:
          'e77ad303ece96b0b36084940ad73dcac5d010554b114876d5567efde7c3ebee0',
      },
      dob: {
        date: '1975-02-19T01:50:08.837Z',
        age: 47,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/52.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Esfir',
        last: 'Sidoryak',
      },
      location: {
        street: {
          number: 1482,
          name: 'Borovikovskogo',
        },
        city: 'Balakliya',
        state: 'Dnipropetrovska',
        country: 'Ukraine',
        postcode: 66743,
        coordinates: {
          latitude: '-73.5790',
          longitude: '148.3859',
        },
        timezone: {
          offset: '-8:00',
          description: 'Pacific Time (US & Canada)',
        },
      },
      email: 'esfir.sidoryak@example.com',
      login: {
        uuid: '73c92118-86f8-4685-a250-556025b6b90a',
        username: 'bigswan520',
        password: 'believe',
        salt: 'aGX1IbRU',
        md5: '3420b4a88d36c2604c2e3750fbdfe48c',
        sha1: 'd18f40fef9d60c9c733cfbe30211a23e75f2545a',
        sha256:
          '5d7712a025331345eefb807f52846e822f720b6b53d673987e7eab5ec5fbb04e',
      },
      dob: {
        date: '1969-03-25T13:48:15.938Z',
        age: 53,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
      },
    },
    {
      name: {
        title: 'Ms',
        first: 'Lukiya',
        last: 'Batyuk',
      },
      location: {
        street: {
          number: 3650,
          name: "P'yat kutiv",
        },
        city: 'Odesa',
        state: 'Luganska',
        country: 'Ukraine',
        postcode: 59639,
        coordinates: {
          latitude: '48.4968',
          longitude: '-99.5847',
        },
        timezone: {
          offset: '+4:30',
          description: 'Kabul',
        },
      },
      email: 'lukiya.batyuk@example.com',
      login: {
        uuid: 'f5e376d1-54c7-4efc-8c72-2102a08cd80b',
        username: 'bluemouse509',
        password: 'smart1',
        salt: 'MR1rfT5X',
        md5: 'b59268b0fe7ebede3e9745d264ea7918',
        sha1: '1c960419755e9810a7cb0527b1acb1169a250b17',
        sha256:
          '78346fd9ebaf977383630bfee858417b5c2a56fd1a3de0adf864bf9c48f0402a',
      },
      dob: {
        date: '1972-03-21T00:33:18.461Z',
        age: 50,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/31.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Ethan',
        last: 'Lambert',
      },
      location: {
        street: {
          number: 2665,
          name: 'Rue Principale',
        },
        city: 'Grenoble',
        state: "Côte-D'Or",
        country: 'France',
        postcode: 93173,
        coordinates: {
          latitude: '45.8909',
          longitude: '-133.4831',
        },
        timezone: {
          offset: '-6:00',
          description: 'Central Time (US & Canada), Mexico City',
        },
      },
      email: 'ethan.lambert@example.com',
      login: {
        uuid: '1d76e19a-047b-40ce-8ea0-3a4fe70ba5aa',
        username: 'silverswan645',
        password: 'admin',
        salt: 's558l8Qm',
        md5: 'f4aa4e2fab63bcdcd828bb9ad22b7af0',
        sha1: '7119ae1ba599a66b3c5d83dc160b2980b5be7ce3',
        sha256:
          '7773525ee0f5878d7da7ebe7509afe91c7a15a5a7c9cc426bbc1931046f81f86',
      },
      dob: {
        date: '1950-08-12T19:37:52.081Z',
        age: 72,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/40.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/40.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/40.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Bror',
        last: 'Rekstad',
      },
      location: {
        street: {
          number: 9142,
          name: 'Bidenkaps gate',
        },
        city: 'Oslo',
        state: 'Description',
        country: 'Norway',
        postcode: '9690',
        coordinates: {
          latitude: '-3.6070',
          longitude: '18.5593',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'bror.rekstad@example.com',
      login: {
        uuid: '9bd41bec-d397-47f5-84d6-9388564ff6d0',
        username: 'bluefrog276',
        password: 'leather',
        salt: 'OzVh9gRK',
        md5: 'f7c29e8f66ee350c0b6e1696d22f2112',
        sha1: '67be6d0ddd9c9dd25dc524cff2d864b17da3fbd8',
        sha256:
          '98466790e2cbd82b69bc9d9a8c61cac5e759a6a89fc60fc6002a8cac0770fda1',
      },
      dob: {
        date: '1990-05-31T11:43:55.077Z',
        age: 32,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/37.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Nataniel',
        last: 'da Cunha',
      },
      location: {
        street: {
          number: 6479,
          name: 'Rua Doze ',
        },
        city: 'Bauru',
        state: 'Paraná',
        country: 'Brazil',
        postcode: 95664,
        coordinates: {
          latitude: '-16.2628',
          longitude: '-128.4131',
        },
        timezone: {
          offset: '+6:00',
          description: 'Almaty, Dhaka, Colombo',
        },
      },
      email: 'nataniel.dacunha@example.com',
      login: {
        uuid: '4734f53e-4eef-43fa-b1cd-913666642859',
        username: 'smallkoala725',
        password: 'storage',
        salt: 'Gu28JLHf',
        md5: '9e9fe39487fc3d9223ef73be90cfe334',
        sha1: '2cc86bcdb7dcca52a1b25d0e33b4a34bd2715f58',
        sha256:
          'a43b60e524f4424e89cf244062bba7eb275ffa3cf48e2129985fa29f9c4ee2d5',
      },
      dob: {
        date: '1951-05-10T22:22:14.891Z',
        age: 71,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/7.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
      },
    },
    {
      name: {
        title: 'Madame',
        first: 'Mona',
        last: 'Olivier',
      },
      location: {
        street: {
          number: 6209,
          name: "Place de L'Abbé-Jean-Lebeuf",
        },
        city: 'Neuendorf',
        state: 'Graubünden',
        country: 'Switzerland',
        postcode: 7548,
        coordinates: {
          latitude: '-13.2034',
          longitude: '-33.0935',
        },
        timezone: {
          offset: '+5:00',
          description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
        },
      },
      email: 'mona.olivier@example.com',
      login: {
        uuid: 'd99430cb-52ac-4e19-b8a6-c1f1b98253cb',
        username: 'organicostrich251',
        password: 'mississi',
        salt: 'gbCRdtYY',
        md5: 'c4f5cd62fb882a82bd676e6a66e50034',
        sha1: 'f5814aa367996a72373998f294672002e8e0634d',
        sha256:
          '044591052653baf83bd05da91e9ebda318b4b45ae7e1b16fc0bef68dcb8d180f',
      },
      dob: {
        date: '1986-01-19T09:52:49.141Z',
        age: 37,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/34.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/34.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/34.jpg',
      },
    },
    {
      name: {
        title: 'Mr',
        first: 'Roope',
        last: 'Luoma',
      },
      location: {
        street: {
          number: 4948,
          name: 'Mannerheimintie',
        },
        city: 'Ruokolahti',
        state: 'Finland Proper',
        country: 'Finland',
        postcode: 73808,
        coordinates: {
          latitude: '-22.6912',
          longitude: '138.9641',
        },
        timezone: {
          offset: '-1:00',
          description: 'Azores, Cape Verde Islands',
        },
      },
      email: 'roope.luoma@example.com',
      login: {
        uuid: '8a092400-b5a9-443f-b16b-3ca518f85df9',
        username: 'brownlion419',
        password: 'birdman',
        salt: 'xbmWw4bX',
        md5: '8f4d1390615775b40652f19e06a6dbd1',
        sha1: '66881e9abe5bc9c225bbf8cd2def15bc930c6293',
        sha256:
          '00442b6666470370e5ddaaeef2c2b79a1781f6941776a5cbd25cd2e6509dc2bc',
      },
      dob: {
        date: '1979-03-21T04:29:04.475Z',
        age: 43,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/87.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/87.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
      },
    },
    {
      name: {
        title: 'Mrs',
        first: 'Phoebe',
        last: 'Anderson',
      },
      location: {
        street: {
          number: 8444,
          name: 'Halifax Street',
        },
        city: 'Hamilton',
        state: 'Wellington',
        country: 'New Zealand',
        postcode: 56991,
        coordinates: {
          latitude: '19.6431',
          longitude: '11.6366',
        },
        timezone: {
          offset: '-12:00',
          description: 'Eniwetok, Kwajalein',
        },
      },
      email: 'phoebe.anderson@example.com',
      login: {
        uuid: '1dd7b121-617a-4e03-b0f5-3ab89f8158e4',
        username: 'blackwolf420',
        password: 'jetski',
        salt: 'J3mqnk45',
        md5: '1cc282e2ee430cb26748e876ca548d53',
        sha1: '33f6908aaac7a46a1fad8cf6f32b0c2ab477833f',
        sha256:
          'fbe63a4585fd3bad63e3304250bf307434bfdfa40b8132452d7c660e47fe39c4',
      },
      dob: {
        date: '1974-08-17T14:02:30.375Z',
        age: 48,
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/women/9.jpg',
        medium: 'https://randomuser.me/api/portraits/med/women/9.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/women/9.jpg',
      },
    },
  ];

  return {
    props: { data },
  };
};

const list = [
  {
    name: {
      title: 'Mr',
      first: 'Madaleno',
      last: 'Ferreira',
    },
    location: {
      street: {
        number: 3870,
        name: 'Rua Das Flores ',
      },
      city: 'Osasco',
      state: 'Alagoas',
      country: 'Brazil',
      postcode: 25081,
      coordinates: {
        latitude: '-74.9108',
        longitude: '-54.3027',
      },
      timezone: {
        offset: '-8:00',
        description: 'Pacific Time (US & Canada)',
      },
    },
    email: 'madaleno.ferreira@example.com',
    login: {
      uuid: 'a6263912-6595-40e6-ad1d-b44561555e42',
      username: 'beautifulsnake736',
      password: 'smoking',
      salt: 'yxLta6Ah',
      md5: '344edf7ec663a0cff34427365aebdc9e',
      sha1: 'ce3d41ef35c85acace7f98ed57f6eec075443e20',
      sha256:
        '7dacd066958219c617eb832e376372f7ee37683c0cbf3d5f3f9fde812ab2fa08',
    },
    dob: {
      date: '1961-07-01T06:52:46.499Z',
      age: 61,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/33.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/33.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/33.jpg',
    },
  },
  {
    name: {
      title: 'Miss',
      first: 'Sarita',
      last: 'Fernandes',
    },
    location: {
      street: {
        number: 573,
        name: 'Altamount Rd',
      },
      city: 'Begusarai',
      state: 'Telangana',
      country: 'India',
      postcode: 18210,
      coordinates: {
        latitude: '73.0087',
        longitude: '-48.9903',
      },
      timezone: {
        offset: '+4:30',
        description: 'Kabul',
      },
    },
    email: 'sarita.fernandes@example.com',
    login: {
      uuid: '1afb922e-cf52-428b-848f-878bb41a001e',
      username: 'orangegorilla961',
      password: 'kermit',
      salt: '5BoVLlhe',
      md5: '5581417e803cf3c23abcdd2db3c674a2',
      sha1: '5c0e9517e5e330ca0a1a117fe4d2a35b5a849a17',
      sha256:
        'e77ad303ece96b0b36084940ad73dcac5d010554b114876d5567efde7c3ebee0',
    },
    dob: {
      date: '1975-02-19T01:50:08.837Z',
      age: 47,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/52.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/52.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
    },
  },
  {
    name: {
      title: 'Mrs',
      first: 'Esfir',
      last: 'Sidoryak',
    },
    location: {
      street: {
        number: 1482,
        name: 'Borovikovskogo',
      },
      city: 'Balakliya',
      state: 'Dnipropetrovska',
      country: 'Ukraine',
      postcode: 66743,
      coordinates: {
        latitude: '-73.5790',
        longitude: '148.3859',
      },
      timezone: {
        offset: '-8:00',
        description: 'Pacific Time (US & Canada)',
      },
    },
    email: 'esfir.sidoryak@example.com',
    login: {
      uuid: '73c92118-86f8-4685-a250-556025b6b90a',
      username: 'bigswan520',
      password: 'believe',
      salt: 'aGX1IbRU',
      md5: '3420b4a88d36c2604c2e3750fbdfe48c',
      sha1: 'd18f40fef9d60c9c733cfbe30211a23e75f2545a',
      sha256:
        '5d7712a025331345eefb807f52846e822f720b6b53d673987e7eab5ec5fbb04e',
    },
    dob: {
      date: '1969-03-25T13:48:15.938Z',
      age: 53,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/7.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/7.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/7.jpg',
    },
  },
  {
    name: {
      title: 'Ms',
      first: 'Lukiya',
      last: 'Batyuk',
    },
    location: {
      street: {
        number: 3650,
        name: "P'yat kutiv",
      },
      city: 'Odesa',
      state: 'Luganska',
      country: 'Ukraine',
      postcode: 59639,
      coordinates: {
        latitude: '48.4968',
        longitude: '-99.5847',
      },
      timezone: {
        offset: '+4:30',
        description: 'Kabul',
      },
    },
    email: 'lukiya.batyuk@example.com',
    login: {
      uuid: 'f5e376d1-54c7-4efc-8c72-2102a08cd80b',
      username: 'bluemouse509',
      password: 'smart1',
      salt: 'MR1rfT5X',
      md5: 'b59268b0fe7ebede3e9745d264ea7918',
      sha1: '1c960419755e9810a7cb0527b1acb1169a250b17',
      sha256:
        '78346fd9ebaf977383630bfee858417b5c2a56fd1a3de0adf864bf9c48f0402a',
    },
    dob: {
      date: '1972-03-21T00:33:18.461Z',
      age: 50,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/31.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/31.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/31.jpg',
    },
  },
  {
    name: {
      title: 'Mr',
      first: 'Ethan',
      last: 'Lambert',
    },
    location: {
      street: {
        number: 2665,
        name: 'Rue Principale',
      },
      city: 'Grenoble',
      state: "Côte-D'Or",
      country: 'France',
      postcode: 93173,
      coordinates: {
        latitude: '45.8909',
        longitude: '-133.4831',
      },
      timezone: {
        offset: '-6:00',
        description: 'Central Time (US & Canada), Mexico City',
      },
    },
    email: 'ethan.lambert@example.com',
    login: {
      uuid: '1d76e19a-047b-40ce-8ea0-3a4fe70ba5aa',
      username: 'silverswan645',
      password: 'admin',
      salt: 's558l8Qm',
      md5: 'f4aa4e2fab63bcdcd828bb9ad22b7af0',
      sha1: '7119ae1ba599a66b3c5d83dc160b2980b5be7ce3',
      sha256:
        '7773525ee0f5878d7da7ebe7509afe91c7a15a5a7c9cc426bbc1931046f81f86',
    },
    dob: {
      date: '1950-08-12T19:37:52.081Z',
      age: 72,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/40.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/40.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/40.jpg',
    },
  },
  {
    name: {
      title: 'Mr',
      first: 'Bror',
      last: 'Rekstad',
    },
    location: {
      street: {
        number: 9142,
        name: 'Bidenkaps gate',
      },
      city: 'Oslo',
      state: 'Description',
      country: 'Norway',
      postcode: '9690',
      coordinates: {
        latitude: '-3.6070',
        longitude: '18.5593',
      },
      timezone: {
        offset: '+6:00',
        description: 'Almaty, Dhaka, Colombo',
      },
    },
    email: 'bror.rekstad@example.com',
    login: {
      uuid: '9bd41bec-d397-47f5-84d6-9388564ff6d0',
      username: 'bluefrog276',
      password: 'leather',
      salt: 'OzVh9gRK',
      md5: 'f7c29e8f66ee350c0b6e1696d22f2112',
      sha1: '67be6d0ddd9c9dd25dc524cff2d864b17da3fbd8',
      sha256:
        '98466790e2cbd82b69bc9d9a8c61cac5e759a6a89fc60fc6002a8cac0770fda1',
    },
    dob: {
      date: '1990-05-31T11:43:55.077Z',
      age: 32,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/37.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/37.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/37.jpg',
    },
  },
  {
    name: {
      title: 'Mr',
      first: 'Nataniel',
      last: 'da Cunha',
    },
    location: {
      street: {
        number: 6479,
        name: 'Rua Doze ',
      },
      city: 'Bauru',
      state: 'Paraná',
      country: 'Brazil',
      postcode: 95664,
      coordinates: {
        latitude: '-16.2628',
        longitude: '-128.4131',
      },
      timezone: {
        offset: '+6:00',
        description: 'Almaty, Dhaka, Colombo',
      },
    },
    email: 'nataniel.dacunha@example.com',
    login: {
      uuid: '4734f53e-4eef-43fa-b1cd-913666642859',
      username: 'smallkoala725',
      password: 'storage',
      salt: 'Gu28JLHf',
      md5: '9e9fe39487fc3d9223ef73be90cfe334',
      sha1: '2cc86bcdb7dcca52a1b25d0e33b4a34bd2715f58',
      sha256:
        'a43b60e524f4424e89cf244062bba7eb275ffa3cf48e2129985fa29f9c4ee2d5',
    },
    dob: {
      date: '1951-05-10T22:22:14.891Z',
      age: 71,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/7.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/7.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/7.jpg',
    },
  },
  {
    name: {
      title: 'Madame',
      first: 'Mona',
      last: 'Olivier',
    },
    location: {
      street: {
        number: 6209,
        name: "Place de L'Abbé-Jean-Lebeuf",
      },
      city: 'Neuendorf',
      state: 'Graubünden',
      country: 'Switzerland',
      postcode: 7548,
      coordinates: {
        latitude: '-13.2034',
        longitude: '-33.0935',
      },
      timezone: {
        offset: '+5:00',
        description: 'Ekaterinburg, Islamabad, Karachi, Tashkent',
      },
    },
    email: 'mona.olivier@example.com',
    login: {
      uuid: 'd99430cb-52ac-4e19-b8a6-c1f1b98253cb',
      username: 'organicostrich251',
      password: 'mississi',
      salt: 'gbCRdtYY',
      md5: 'c4f5cd62fb882a82bd676e6a66e50034',
      sha1: 'f5814aa367996a72373998f294672002e8e0634d',
      sha256:
        '044591052653baf83bd05da91e9ebda318b4b45ae7e1b16fc0bef68dcb8d180f',
    },
    dob: {
      date: '1986-01-19T09:52:49.141Z',
      age: 37,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/34.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/34.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/34.jpg',
    },
  },
  {
    name: {
      title: 'Mr',
      first: 'Roope',
      last: 'Luoma',
    },
    location: {
      street: {
        number: 4948,
        name: 'Mannerheimintie',
      },
      city: 'Ruokolahti',
      state: 'Finland Proper',
      country: 'Finland',
      postcode: 73808,
      coordinates: {
        latitude: '-22.6912',
        longitude: '138.9641',
      },
      timezone: {
        offset: '-1:00',
        description: 'Azores, Cape Verde Islands',
      },
    },
    email: 'roope.luoma@example.com',
    login: {
      uuid: '8a092400-b5a9-443f-b16b-3ca518f85df9',
      username: 'brownlion419',
      password: 'birdman',
      salt: 'xbmWw4bX',
      md5: '8f4d1390615775b40652f19e06a6dbd1',
      sha1: '66881e9abe5bc9c225bbf8cd2def15bc930c6293',
      sha256:
        '00442b6666470370e5ddaaeef2c2b79a1781f6941776a5cbd25cd2e6509dc2bc',
    },
    dob: {
      date: '1979-03-21T04:29:04.475Z',
      age: 43,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/men/87.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/87.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/87.jpg',
    },
  },
  {
    name: {
      title: 'Mrs',
      first: 'Phoebe',
      last: 'Anderson',
    },
    location: {
      street: {
        number: 8444,
        name: 'Halifax Street',
      },
      city: 'Hamilton',
      state: 'Wellington',
      country: 'New Zealand',
      postcode: 56991,
      coordinates: {
        latitude: '19.6431',
        longitude: '11.6366',
      },
      timezone: {
        offset: '-12:00',
        description: 'Eniwetok, Kwajalein',
      },
    },
    email: 'phoebe.anderson@example.com',
    login: {
      uuid: '1dd7b121-617a-4e03-b0f5-3ab89f8158e4',
      username: 'blackwolf420',
      password: 'jetski',
      salt: 'J3mqnk45',
      md5: '1cc282e2ee430cb26748e876ca548d53',
      sha1: '33f6908aaac7a46a1fad8cf6f32b0c2ab477833f',
      sha256:
        'fbe63a4585fd3bad63e3304250bf307434bfdfa40b8132452d7c660e47fe39c4',
    },
    dob: {
      date: '1974-08-17T14:02:30.375Z',
      age: 48,
    },
    picture: {
      large: 'https://randomuser.me/api/portraits/women/9.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/9.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/9.jpg',
    },
  },
];
