import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl md:text-5xl text-green-500 mb-8 text-center">
        Stamurai Task Management System
      </h1>
      <div className="inline-block w-10 h-10 rounded-full border-4 border-solid border-green-500 border-t-transparent animate-spin"></div>
      <p className="mt-4 text-gray-600 text-center">Loading...</p>
    </div>
  );
};

export default Loading;