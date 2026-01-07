// Import mongoose for MongoDB schema creation
const mongoose = require("mongoose");

// Define schema for Income collection
const IncomeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    icon: { type: String }, // Optional icon for income source
    source: { type: String, required: true }, // Income source
    amount: { type: Number, required: true }, // Income amount
    date: { type: Date, default: Date.now }, // Date of income
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Export Income model
module.exports = mongoose.model("Income", IncomeSchema);
