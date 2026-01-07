// Import express framework
const express = require("express");

// Import authentication middleware to protect route
const { protect } = require("../middleware/authMiddleware");

// Import controller function to get dashboard data
const { getDashboardData } = require("../controllers/dashboardController");

// Create a router instance
const router = express.Router();

// Route to get dashboard data (protected)
router.get("/", protect, getDashboardData);

// Export router
module.exports = router;
