import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Table } from './table';

interface PaginationProps {
  _itemsPerPage: number;
  _pagesToShow: number;
  _itemsLength: number;
  handlePage(page: number): void;
}
// const column = [
//   { heading: 'Name', value: 'name.first' },
//   { heading: 'Email', value: 'email' },
//   { heading: 'Username', value: 'login.username' },
//   { heading: 'City', value: 'location.country' },
//   { heading: 'Age', value: 'dob.age' },
// ];

const Pagination = ({
  _itemsLength,
  _itemsPerPage,
  handlePage,
  _pagesToShow,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(_itemsPerPage);
  // const [pagesToShow, setPagesToShow] = useState(_pagesToShow);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // useEffect(() => {
  //   setItemsPerPage(_itemsPerPage);
  //   setPagesToShow(_pagesToShow);
  // }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(_itemsLength / _itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(pageNumber) {
    handlePage(pageNumber);
    setCurrentPage(pageNumber);
  }

  const firstPage = currentPage - Math.floor(_pagesToShow / 2);

  const lastPage = currentPage + Math.floor(_pagesToShow / 2);
  const pagesToRender = pageNumbers.filter(
    (page) => page >= firstPage && page <= lastPage
  );

  return (
    <>
      {/* <Table column={column} data={currentItems} isEditable={false}></Table> */}
      <div></div>
      <nav className="p-1 flex items-center place-content-between  justify-end">
        {_itemsLength > 1 && (
          <ul className="text-right ">
            <ul>
              {/* <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{1}</span> to{' '}
                <span className="font-medium">{1}</span> of{' '}
                <span className="font-medium">{_itemsLength}</span> results
              </p>{' '} */}
            </ul>
            {currentPage !== 1 && (
              <button
                onClick={() => handlePageChange(firstPage)}
                className="relative inline-flex items-center active:bg-gray-300 rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
                {/* <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" /> */}
              </button>
            )}
            {pagesToRender.map((number) => (
              <div key={number} className="relative inline-flex ">
                <button
                  onClick={() => handlePageChange(number)}
                  className="relative items-center border active:bg-gray-300 border-gray-300  px-4 py-2 text-sm font-medium text-gray-600 focus:z-20"
                >
                  {number}
                </button>
              </div>
            ))}

            {currentPage !== Math.ceil(_itemsLength / _itemsPerPage) && (
              <button
                onClick={() => handlePageChange(lastPage)}
                className="relative inline-flex items-center active:bg-gray-300 rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
                {/* <ChevronRightIcon className="h-5 w-5 fon" aria-hidden="true" /> */}
              </button>
            )}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Pagination;
// export default function Pagination({
//   totalPages,
//   totalResults,
//   _start,
//   _end,
//   handlePage,
// }: PaginationProps) {
//   function classNames(...classes: (string | boolean)[]) {
//     return classes.filter(Boolean).join(' ');
//   }
//   const arr = [];
//   const [list, setList] = useState([arr]);

//   totalPages = totalPages > 5 ? 5 : totalPages;
//   for (let i = 0; i < totalPages; i++) {
//     arr.push({ page: i, isActive: false });
//   }

//   if (arr.length > 0) {
//     list.push(arr);
//   }

//   function handlePageNumber(page: number) {
//     list[0].forEach((res) => {
//       res.isActive = false;
//     });

//     list[0][page].isActive = true;
//     list.pop();
//     handlePage(page);
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between border-t border-gray-200 bg-white  py-3 ">
//         <div className="flex flex-1 justify-between sm:hidden">
//           <a
//             href="#"
//             className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Previous
//           </a>
//           <a
//             href="#"
//             className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Next
//           </a>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">{_start}</span> to{' '}
//               <span className="font-medium">{_end}</span> of{' '}
//               <span className="font-medium">{totalResults}</span> results
//             </p>
//           </div>
//           <div>
//             <nav
//               className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//               aria-label="Pagination"
//             >
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
//               </a>
//               {list[0].map((arr, i) => (
//                 <Link
//                   key={i}
//                   href={''}
//                   onClick={() => handlePageNumber(i)}
//                   aria-current="page"
//                   className={classNames(
//                     list[0][i]?.isActive
//                       ? 'relative z-10 inline-flex items-center border border-gray-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-gray-600 focus:z-20'
//                       : 'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-300'
//                   )}
//                 >
//                   {i + 1}
//                 </Link>
//               ))}
//               ...
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
//               </a>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
