import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Key, useEffect, useState } from 'react';
import { Loading } from './loading';
import ModalConfirm from './modal-confirm';

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [row, setRow] = useState();

  function handleDeleteRow(item: any) {
    setRow(item);
    setShowConfirmDialog(!showConfirmDialog);
  }

  function confirmDelete() {
    handleDelete(row);
    setShowConfirmDialog(!showConfirmDialog);
  }
  const cancelDelete = () => setShowConfirmDialog(false);

  useEffect(() => {
    if (!showConfirmDialog) {
      document.addEventListener('click', function (event) {
        setShowConfirmDialog(!showConfirmDialog);
      });
    }
  });

  const TableHeadItem = ({ item }) => (
    <th className="px-6 py-3">{item.heading}</th>
  );

  const TableRow = ({ item, column, handleUpdate, handleDelete }) => (
    <>
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
          <>
            <td className="text-end">
              <ModalConfirm
                headerMessage="Deletar cliente"
                bodyMessage="Deseja realmente deletar esse cliente?"
                handleCancel={cancelDelete}
                handleConfirm={confirmDelete}
                showModal={showConfirmDialog}
              />
              <button
                onClick={() => handleUpdate(item)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteRow(item)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );

  return (
    <>
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
