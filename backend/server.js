// Load environment variables from .env file
require("dotenv").config();

// Import express framework
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Import path module for handling file paths
const path = require("path");

// Import database connection function
const connectDB = require("./config/db");

// Import route files
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Initialize express app
const app = express();

// Enable CORS with specified options
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allow requests from client or any origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type, Authorization"],
    })
);

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Mount API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
