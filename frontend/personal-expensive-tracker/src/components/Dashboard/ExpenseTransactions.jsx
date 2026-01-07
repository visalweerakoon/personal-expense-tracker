import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import { addThousandsSeparator } from "../../utils/helper";

// Component to display a list of recent expense transactions
const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      
      {/* Header with title and "See All" button */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button> 
      </div>

      {/* List of up to 4 expense transaction cards */}
      <div className="mt-6">
        {transactions?.slice(0, 4)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")} // Format date
            amount={addThousandsSeparator(expense.amount)}
            type="expense"
            hideDeleteBtn // hide delete button
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
