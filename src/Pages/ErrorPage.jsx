import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  useEffect(() => {
    document.title = "404 Not Found | Hobby Hub"
  }, [])
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={60} />
          <h1 className="text-5xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <p className="text-gray-500 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <button className='btn'>Go Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
