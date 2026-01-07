// Import Income model for income-related database operations
const Income = require("../models/Income");

// Import Expense model for expense-related database operations
const Expense = require("../models/Expense");

// Import mongoose to work with MongoDB ObjectId
const mongoose = require("mongoose");

// Controller to get dashboard summary data
exports.getDashboardData = async (req, res) => {
    try {
        // Get logged-in user's ID
        const userId = req.user._id;

        // Convert user ID to MongoDB ObjectId
        const userObjectId = new mongoose.Types.ObjectId(String(userId));

        // Calculate total income for the user
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Calculate total expenses for the user
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        // Get income transactions from the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total income for the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions from the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total expenses for the last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get the most recent income and expense transactions
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "income"
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
                ...txn.toObject(),
                type: "expense"
            }))
        ]
        // Sort combined transactions by date
        .sort((a, b) => b.date - a.date);

        // Send dashboard summary data as response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Server Error", error });
    }
};
