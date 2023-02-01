import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Key, useEffect, useState } from 'react';
import { Loading } from './loading';

type TableProps = {
  data: any[];
  column: any[];
  isEditable: boolean;
  handleDelete(data: any): void;
  handleUpdate(data: any): void;
};

export function Table({
  data,
  column,
  handleDelete,
  handleUpdate,
  isEditable,
}: TableProps) {
  const TableHeadItem = ({ item }) => (
    <th className="px-6 py-3">{item.heading}</th>
  );

  const TableRow = ({ item, column, handleUpdate, handleDelete }) => (
    <tr
      key={item}
      className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200"
    >
      {column.map((columnItem, index) => {
        if (columnItem.value.includes('.')) {
          const itemSplit = columnItem.value.split('.'); 

          return (
            <td className="px-6 py-4" key={index}>
              {item[itemSplit[0]][itemSplit[1]]}
            </td>
          );
        }

        return (
          <td className="px-6 py-4" key={index}>
            {item[`${columnItem.value}`]}
          </td>
        );
      })}
      {isEditable && (
        <td className="text-center">
          <button
            onClick={() => handleUpdate(item)}
            className="px-3 py-2  mr-1  focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="focus:outline-none text-white bg-red-200 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2  mb-2 dark:bg-red-400 dark:hover:bg-red-400 dark:focus:ring-red-500"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </td>
      )}
    </tr>
  );

  return (
    <>
      {data.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="px-6 py-3">
                {column.map((item: undefined, index: Key) => (
                  <TableHeadItem key={index} item={item} />
                ))}
                {isEditable && <th></th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: Key) => (
                <TableRow
                  key={index}
                  item={item}
                  column={column}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-96">
          <Loading />
        </div>
      )}
    </>
  );
}
