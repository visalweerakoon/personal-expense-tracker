// Load environment variables from .env file
require("dotenv").config();

// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// Connect to MongoDB using URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected")) // Success message
  .catch(err => console.error("Error connecting to MongoDB:", err.message)); // Error handling
