import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Key, useState } from 'react';
import { Loading } from './loading';

type TableProps = {
  data: any[];
  column: any[];
  isEditable: boolean;
  handleDelete?(data: any): void;
  handleUpdate?(data: any): void;
};

export function Table({
  data,
  column,
  handleDelete,
  handleUpdate,
  isEditable,
}: TableProps) {
  //
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [row, setRow] = useState();
  function handleDeleteRow(data) {
    setRow(data);
    setShowConfirmDialog(true);
  }

  function confirmDelete() {
    handleDelete(row);
    // Delete logic goes here
    setShowConfirmDialog(false);
  }

  function cancelDelete() {
    setShowConfirmDialog(false);
  }
  //
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
              {item ? item[itemSplit[0]][itemSplit[1]] : ''}
            </td>
          );
        } else if (
          item[`${columnItem.value}`]?.includes('data:image') ||
          item[`${columnItem.value}`]?.includes('http')
        ) {
          return (
            <td className="px-6 py-4" key={index}>
              <picture>
                <img
                  src={item[`${columnItem.value}`]}
                  className="flex object-fill rounded-lg h-6"
                  alt="image of cat"
                />
              </picture>
            </td>
          );
        } else {
          return (
            <td className="px-6 py-4" key={index}>
              {item[`${columnItem.value}`]}
            </td>
          );
        }
      })}
      {isEditable && (
        <td className="text-end">
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
      {showConfirmDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={cancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {data.length > 0 ? (
        <div className="my-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="px-6 py-3">
                {column.map((item: undefined, index: Key) => (
                  <TableHeadItem key={index} item={item} />
                ))}
                {isEditable && <th>{null}</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: Key) => (
                <TableRow
                  key={index}
                  item={item}
                  column={column}
                  handleDelete={handleDeleteRow}
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
