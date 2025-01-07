import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg mb-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Oops! Page Not Found.</p>
      </div>
      <p className="text-gray-600 mb-6">We couldn't find the page you're looking for.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
