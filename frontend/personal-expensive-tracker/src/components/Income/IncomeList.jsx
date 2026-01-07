import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { addThousandsSeparator } from "../../utils/helper";


// Component to display all income transactions with download option
const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div>
      <div className="card">
        <div className="flex items-center justify-between">
          <h5>Income Sources</h5>

          {/* Button to download all income data */}
          <button className="add-btn" onClick={onDownload}>
            <LuDownload className="text-base" />
            Download
          </button>
        </div>
      </div>

      {/* List of income transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("Do MM YYYY")}
            amount={addThousandsSeparator(income.amount)}
            type="income"
            onDelete={() => onDelete(income._id)} // Delete specific income
          />
        ))}
      </div>
    </div>
  )
}

export default IncomeList
