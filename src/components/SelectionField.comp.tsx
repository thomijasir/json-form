import React, { ChangeEvent, useMemo } from 'react';

interface ISelectionFieldProps { }

const SelectionField: React.FC<ISelectionFieldProps> = () => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </select>
    </div>
  );
}

export default SelectionField;