import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-cyan-600">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white"></div>
    </div>
  );
}
