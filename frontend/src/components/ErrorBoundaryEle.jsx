import React from 'react';

const ErrorBoundaryEle = ({error, resetErrorBoundary}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <p className="text-lg text-neutral-content mt-4">
          {error?.message}
        </p>
        <p className="text-md text-neutral-content mt-2">
          Please try again later or contact support if the problem persists.
        </p>
        <button onClick={resetErrorBoundary} className="btn btn-primary mt-6">Go Back Home</button>
      </div>
    </div>
  );
};

export default ErrorBoundaryEle;
