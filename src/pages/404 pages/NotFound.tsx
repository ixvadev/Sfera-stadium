import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <h2 className="text-3xl mt-4 font-semibold text-gray-700">Page Not Found</h2>
      <p className="text-lg mt-2 text-gray-600">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/admin" className="mt-6 bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
