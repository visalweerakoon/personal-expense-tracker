import React from "react";

// Component to display a custom legend for charts
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center space-x-2"
        >
          {/* Color indicator for the legend item */}
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {/* Label for the legend item */}
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
