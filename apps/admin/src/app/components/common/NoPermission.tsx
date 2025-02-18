import React from 'react';

const NoPermission = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-44">
      <div className="animate-bounce bg-red-500 text-white text-4xl font-bold p-4 rounded-full shadow-lg">
        <svg
          className="w-16 h-16 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-semibold text-gray-800">
        Access Denied
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        You do not have permission to view this page.
      </p>
    </div>
  );
};

export default NoPermission;
