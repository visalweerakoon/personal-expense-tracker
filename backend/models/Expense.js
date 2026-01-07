// Import mongoose for MongoDB schema creation
const mongoose = require("mongoose");

// Define schema for Expense collection
const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    icon: { type: String }, // Optional icon for category
    category: { type: String, required: true }, // Expense category
    amount: { type: Number, required: true }, // Expense amount
    date: { type: Date, default: Date.now } // Date of expense
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Export Expense model
module.exports = mongoose.model("Expense", ExpenseSchema);
