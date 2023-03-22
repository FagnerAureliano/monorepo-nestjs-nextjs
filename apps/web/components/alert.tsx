import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
  let backgroundColorClass = '';
  let textColorClass = '';
  switch (type) {
    case 'success':
      backgroundColorClass = 'bg-green-100';
      textColorClass = 'text-green-700';
      break;
    case 'error':
      backgroundColorClass = 'bg-red-100';
      textColorClass = 'text-red-700';
      break;
    case 'warning':
      backgroundColorClass = 'bg-yellow-100';
      textColorClass = 'text-yellow-700';
      break;
    default:
      backgroundColorClass = 'bg-gray-100';
      textColorClass = 'text-gray-700';
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 311000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-10  w-1/3 right-2 p-4 rounded-md ${backgroundColorClass} ${textColorClass} transition duration-300 ease-in-out`}
      style={{ zIndex: 9999 }}
    >
      <div>
        <div className="flex items-center gap-2 capitalize">
          <ExclamationTriangleIcon className="h-10" />
          {type}
        </div>
        <div className="capitalize">{message}</div>
      </div>
    </div>
  );
};

export default Alert;
