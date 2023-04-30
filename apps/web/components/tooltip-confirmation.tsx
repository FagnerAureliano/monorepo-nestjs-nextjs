import {
  ExclamationTriangleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const TooltipConfirmation = ({ headerText, message, onConfirm }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setShowTooltip(false);
  };

  return (
    <>
      <button
        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
        onClick={handleClick}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
      {showTooltip && (
        <div className="fixed right-1 z-50 w-96 transform -translate-x-1/2 mt-2 px-4 py-2  sm:right-0.5 bg-white border border-gray-200 rounded shadow-lg ">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {headerText}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-1 sm:w-auto"
              onClick={handleConfirm}
            >
              Sim
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setShowTooltip(false)}
            >
              Não
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TooltipConfirmation;
