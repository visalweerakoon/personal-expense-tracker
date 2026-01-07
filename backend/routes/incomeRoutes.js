// Import express framework
const express = require("express");

// Import income controller functions
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");

// Import authentication middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// Create a router instance
const router = express.Router();

// Add a new income (protected route)
router.post("/add", protect, addIncome);

// Get all incomes (protected route)
router.get("/get", protect, getAllIncome);

// Download all incomes as Excel (protected route)
router.get("/downloadexcel", protect, downloadIncomeExcel);

// Delete an income by ID (protected route)
router.delete("/:id", protect, deleteIncome);

// Export router
module.exports = router;
