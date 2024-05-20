import React from 'react';

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-violet-600 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(202,182,255,1),rgba(255,255,255,0))]">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white"></div>
    </div>
  );
}
