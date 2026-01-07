import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuCreditCard } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const Home = () => {
  useUserAuth(); // Ensure user is authenticated

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null); // Store dashboard data
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch dashboard summary data from API
  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* Info cards showing summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={`LKR ${addThousandsSeparator(dashboardData?.totalBalance || 0)}`}
            color="bg-black"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={`LKR ${addThousandsSeparator(dashboardData?.totalIncome || 0)}`}
            color="bg-green-500"
          />

          <InfoCard
            icon={<LuCreditCard />}
            label="Total Expense"
            value={`LKR ${addThousandsSeparator(dashboardData?.totalExpenses || 0)}`}
            color="bg-red-500"
          />
        </div>

        {/* Dashboard widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Recent transactions */}
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Financial overview pie chart */}
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalIncome || 0} // Might need correction to totalExpenses
          />

          {/* Last 30 days expense summary */}
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          {/* Expense bar chart */}
          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          {/* Recent income pie chart */}
          <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          {/* Recent income list */}
          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
