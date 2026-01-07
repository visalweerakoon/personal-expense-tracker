import { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { addThousandsSeparator } from "../../utils/helper";

// Colors for pie chart slices
const COLORS = ["#000000ff", "#FA2C37", "#17ce60"];

// Component to display income over the last 60 days as a pie chart
const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Prepare chart data whenever `data` changes
  const PrepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };


  useEffect(() => {
    PrepareChartData();
    return () => {};
  }, [data]);


  return (
    <div className="card">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {/* Pie chart */}
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`LKR ${addThousandsSeparator(totalIncome)}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
