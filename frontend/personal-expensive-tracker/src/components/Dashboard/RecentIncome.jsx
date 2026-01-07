import moment from "moment"; // Library to format dates
import { LuArrowRight } from "react-icons/lu"; // Icon for "See All" button
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard"; // Card to display individual transaction
import { addThousandsSeparator } from "../../utils/helper"; // Helper function to format numbers with commas

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      {/* Header section with title and "See All" button */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* List of recent income transactions */}
      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id} // Unique key for each transaction
            title={item.source} // Name of the income source
            icon={item.icon} // Optional icon for the income source
            date={moment(item.date).format("Do MMM YYYY")} // Format date to readable format
            amount={addThousandsSeparator(item.amount)} // Format amount with commas
            type="income" // Type of transaction, used for styling
            hideDeleteBtn // Hide delete button in this view
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
