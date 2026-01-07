import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { addThousandsSeparator } from "../../utils/helper";


// Component to display a list of all expenses with delete and download functionality
const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>

      {/* Header with title and download button */}
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Expanses</h5>

        <button className='card-btn add-btn-danger' onClick={onDownload}>
          <LuDownload className='text-base'/>
          Download 
        </button>
      </div>

      {/* Grid of expense transaction cards */}
      <div className='grid grid-cols-1 md:grid-cols-2'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")} // Format date
            amount={addThousandsSeparator(expense.amount)}
            type="expense"
            onDelete={() => onDelete(expense._id)} // Delete handler
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList;
