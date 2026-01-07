// Excel file handling library
const xlsx = require("xlsx");

// Income database model
const Income = require("../models/Income");

// Add a new income
exports.addIncome = async (req, res) => {
    const userId = req.user.id; // logged-in user ID

    try {
        const { icon, source, amount, date } = req.body;

        // Validate required fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create and save income
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all incomes of the user
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id; // logged-in user ID

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete an income by ID
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Download incomes as an Excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id; // logged-in user ID

    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: new Date(item.date).toISOString().split("T")[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Generate and download Excel file
        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);
        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
