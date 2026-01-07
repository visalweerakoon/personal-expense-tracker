// Excel file handling library
const xlsx = require("xlsx");

// Expense database model
const Expense = require("../models/Expense");

// Add a new expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id; // logged-in user ID

  try {
    const { icon, category, amount, date } = req.body;

    // Validate required fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save expense
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all expenses of the user
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id; // logged-in user ID

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download expenses as an Excel file
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id; // logged-in user ID

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel
    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toISOString().split("T")[0],
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Generate and download Excel file
    const filePath = "expense_details.xlsx";
    xlsx.writeFile(wb, filePath);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
