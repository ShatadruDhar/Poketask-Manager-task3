import React from 'react';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 rounded-lg border ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
