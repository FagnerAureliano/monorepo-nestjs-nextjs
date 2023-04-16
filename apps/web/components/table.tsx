import { PencilIcon } from '@heroicons/react/24/outline';
import { Key, useEffect, useState } from 'react';
import { Loading } from './loading';
import TooltipConfirmation from './tooltip-confirmation';

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
  const TableHeadItem = ({ item }) => (
    <th className="px-6 py-3">{item.heading}</th>
  );

  const TableRow = ({ item, column, handleUpdate, handleDelete }) => (
    <>
      <tr
        key={item}
        className="bg-white border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200"
      >
        {column.map((columnItem: { value: string }, index: Key) => {
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
            <td className="text-end ">
              <button
                onClick={() => handleUpdate(item)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <TooltipConfirmation
                headerText={'Deletar cliente'}
                message={`Você tem certeza que deseja deletar o cliente ${item.name}?`}
                onConfirm={() => handleDelete(item)}
              />
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
