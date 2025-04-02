import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Profile Mapper
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-gray-900">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 