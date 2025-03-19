import React from 'react';

const LoadingSpinner = ({ size = 'medium', fullScreen = false, text = 'Loading...' }) => {
  // Size variants
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  // Spinner element
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizeClasses[size]} rounded-full border-solid border-light-blue border-t-brand-blue animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
      {text && <p className="mt-2 text-gray">{text}</p>}
    </div>
  );

  // Return full screen spinner if needed
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
      </div>
    );
  }

  // Return inline spinner
  return spinner;
};

export default LoadingSpinner;