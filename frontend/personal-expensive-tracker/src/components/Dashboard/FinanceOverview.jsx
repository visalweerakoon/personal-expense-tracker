import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { addThousandsSeparator } from "../../utils/helper";

// Colors for pie chart slices
const COLORS = ["#000000ff", "#FA2C37", "#17ce60"];

// Component to display financial overview using a pie chart
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  // Data for pie chart
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h6 className="text-lg">Financial Overview</h6>
      </div>

      {/* Pie chart showing balance, income, and expenses */}
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`LKR ${addThousandsSeparator(totalBalance)}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
