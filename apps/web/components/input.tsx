import { useState } from 'react';

type InputProps = {
  placeholder?: string;
  isButonSubmit?: boolean;
  handleInput(events: string): void;
};

export function Input({ handleInput, placeholder, isButonSubmit }: InputProps) {
  const [search, setSearch] = useState<any>();

  function handleInputChange(data: string) {
    setSearch(data);
    if (!isButonSubmit) {
      handleInput(search);
    }
  }
  function handleSubmit() {
    handleInput(search);
  }

  return (
    <>
      <div className="">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative flex flex-row-reverse items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            ></svg>
          </div>
          <input
            onChange={(e) => handleInputChange(e.target.value)}
            type="search"
            id="default-search"
            className="block w-80 p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500  "
            placeholder={placeholder}
          />
          {isButonSubmit && (
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white absolute right-1 bg-gray-700 hover:bg-gray-800   font-medium rounded-lg text-sm px-2 py-2 "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
