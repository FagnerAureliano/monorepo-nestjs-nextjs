import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type TableProps = {
  data: any[];
  columns: any[];
  handleDelete(data: any): void;
  handleUpdate(data: number): void;
};
export function Table({
  data,
  columns,
  handleUpdate,
  handleDelete,
}: TableProps) {
  function headerData() {
    return columns.map((data) => {
      return (
        <th key={data} className="px-6 py-3">
          {data}
        </th>
      );
    });
  }
  function rowData() {
    return data.map((data, index) => {
      return (
        <tr
          key={index}
          className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200"
        >
          {columns.map((v, index) => {
            return (
              <td key={index} className="px-6 py-4">
                {data[v]}
              </td>
            );
          })}
          <td>
            <button
              onClick={() => handleUpdate(data.id)}
              className="px-5 py-2  mb-2  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(data.id)}
              className="focus:outline-none text-white bg-red-200 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2  mb-2 dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-500"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="dark:bg-gray-700 border-b   dark:border-gray-700 ">
            {headerData()}
            <th className="mr-2"></th>
          </tr>
        </thead>
        <tbody>{rowData()}</tbody>
      </table>
    </div>
  );
}
