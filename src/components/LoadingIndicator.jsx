import React from 'react';

const LoadingIndicator = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default LoadingIndicator; 