import React from 'react';

const LoadingSpinner = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-light-blue bg-opacity-75 z-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
          <p className="mt-4 text-brand-blue font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-blue"></div>
    </div>
  );
};

export default LoadingSpinner;