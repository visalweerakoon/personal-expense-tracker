import React from "react";

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        {/* Display the name/category */}
        <p className="text-xs font-semibold text-green-800 mb-1">{payload[0].name}</p>
        {/* Display the amount/value */}
        <p className="text-sm text-gray-600">
          Amount: <span className="font-sm font-medium text-gray-900">LKR {payload[0].value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
