// Import express framework
const express = require("express");

// Import expense controller functions
const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

// Import authentication middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// Create a router instance
const router = express.Router();

// Add a new expense (protected route)
router.post("/add", protect, addExpense);

// Get all expenses (protected route)
router.get("/get", protect, getAllExpense);

// Download all expenses as Excel (protected route)
router.get("/downloadexcel", protect, downloadExpenseExcel);

// Delete an expense by ID (protected route)
router.delete("/:id", protect, deleteExpense);

// Export router
module.exports = router;
