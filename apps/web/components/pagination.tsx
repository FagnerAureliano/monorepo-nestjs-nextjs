import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  totalResults: number;
  _start: number;
  _end: number;
  handlePage(page: number);
}
export default function Pagination({
  totalPages,
  totalResults,
  _start,
  _end,
  handlePage,
}: PaginationProps) {
  function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ');
  }
  const arr = [];
  const [list, setList] = useState([arr]);

  totalPages = totalPages > 5 ? 5 : totalPages;
  for (let i = 0; i < totalPages; i++) {
    arr.push({ page: i, isActive: false });
  }

  if (arr.length > 0) {
    list.push(arr);
  }

  function handlePageNumber(page: number) {
    list[0].forEach((res) => {
      res.isActive = false;
    });

    list[0][page].isActive = true;
    list.pop();
    handlePage(page);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white  py-3 ">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{_start}</span> to{' '}
            <span className="font-medium">{_end}</span> of{' '}
            <span className="font-medium">{totalResults}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {list[0].map((arr, i) => (
              <Link
                key={i}
                href={''}
                onClick={() => handlePageNumber(i)}
                aria-current="page"
                className={classNames(
                  list[0][i]?.isActive
                    ? 'relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20'
                    : '"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-300"'
                )}
              >
                {i + 1}
              </Link>
            ))}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
