import { ChangeEvent } from 'react';

type InputProps = {
  handleInputChange(events: any): void;
};

export function Input({ handleInputChange }: InputProps) {
  return (
    <>
      <form className="py-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            ></svg>
          </div>
          <input
            onChange={(e) => handleInputChange(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500  "
            placeholder="Search name, e-mail, phone ..."
          />
        </div>
      </form>
    </>
  );
}
