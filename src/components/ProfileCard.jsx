import React from "react";
import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center p-4">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4 flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
          <p className="text-gray-600">{profile.description}</p>
          <p className="text-sm text-gray-500 mt-1">{profile.address}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSelect}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Show on Map
          </button>
          <Link
            to={`/profile/${profile.id}`}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 