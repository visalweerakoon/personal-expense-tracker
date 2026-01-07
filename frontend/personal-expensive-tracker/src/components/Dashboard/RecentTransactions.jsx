import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import { addThousandsSeparator } from "../../utils/helper";


// Component to display a list of recent transactions (both income and expense)
const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      
      {/* Header with title and "See All" button */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* List of up to 5 recent transactions */}
      <div className="mt-4">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source} // Show category for expense, source for income
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")} // Format date
            amount={addThousandsSeparator(item.amount)}
            type={item.type}
            hideDeleteBtn // hide delete button
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
