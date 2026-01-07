import React, { useState, useEffect } from 'react'
import { LuPlus } from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

// Component to show expense trends over time with option to add a new expense
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([]);

    // Prepare chart data whenever transactions change
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);

    return (
        <div className='card'>
          
            {/* Header with title, description, and Add Expense button */}
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Monitor your expenses over time and understand how your money is being spent.
                    </p>
                </div>
                <button className='add-btn add-btn-danger' onClick={onExpenseIncome}>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            {/* Line chart showing expense trends */}
            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
}

export default ExpenseOverview;
