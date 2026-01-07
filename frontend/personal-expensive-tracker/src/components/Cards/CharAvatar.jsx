import React from 'react';
import { getInitials } from '../../utils/helper'; // Utility to get initials from full name

// Component to display user initials in a circular avatar
const CharAvatar = ({ fullName, width, height, style }) => {
  return (
    <div
      className={`${width || "w-12"}${height || "h-12"} ${
        style || ''
      } flex items-center rounded-full text-gray-900 font-medium bg-gray-100`}
    >
      {getInitials(fullName || "")} {/* Display initials */}
    </div>
  );
};

export default CharAvatar;
