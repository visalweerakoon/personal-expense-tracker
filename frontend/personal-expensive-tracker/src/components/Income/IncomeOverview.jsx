import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Prepare chart data whenever transactions change
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    console.log("Chart Data:", result); // Debugging chart data
    setChartData(result);
  }, [transactions]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0.5'>
            Observe your earnings history and analyze how your income evolves
          </p>
        </div>

        {/* Button to add new income */}
        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>

      {/* Bar chart displaying income data */}
      <div className='mt-10'>
        <CustomBarChart data={chartData} xKey="name"/>
      </div>
    </div>
  );
};

export default IncomeOverview;
