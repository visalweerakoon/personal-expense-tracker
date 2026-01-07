import { useState, useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import AddExpensiveForm from '../../components/Expense/AddExpensiveForm';
import Modal from '../../components/Modal';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

function Expense() {
  useUserAuth(); // Ensure user is authenticated

  // State variables
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expenses from API
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) setExpenseData(response.data);
    } catch (error) {
      console.log("Something went wrong while fetching expenses:", error)
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation
    if (!category.trim()) { toast.error("Category is required."); return; }
    if (!amount || isNaN(amount) || Number(amount) <= 0) { toast.error("Amount should be a valid number greater than 0."); return; }
    if (!date) { toast.error("Date is required."); return; }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, { category, amount, date, icon });
      setOpenAddExpenseModal(false); // Close modal
      toast.success("Expense added successfully");
      fetchExpenseDetails(); // Refresh expense list
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };

  // Delete an expense by id
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense detail deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };

  // Download expense data as Excel file
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "expense_details.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download file. Please try again.");
    }
  };

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenseDetails();
    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          {/* Expense chart overview */}
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          {/* Expense list with delete & download */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* Modal to add expense */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpensiveForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Modal to confirm delete */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you permanently delete this expense details?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default Expense;
