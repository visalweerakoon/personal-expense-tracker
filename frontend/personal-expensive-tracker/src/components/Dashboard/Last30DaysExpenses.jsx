import React, { useState, useEffect } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper'; 
import CustomBarChart from '../Charts/CustomBarChart';

// Component to display a bar chart of expenses over the last 30 days
const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  // Prepare chart data whenever `data` changes
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      
      {/* Bar chart */}
      <CustomBarChart data={chartData} xKey="category"/>
    </div>
  );
};

export default Last30DaysExpenses;
