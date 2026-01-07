// Import mongoose library to work with MongoDB
const mongoose = require("mongoose");

// Asynchronous function to establish connection with MongoDB
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection string stored in environment variables
        await mongoose.connect(process.env.MONGO_URI, {});

        // Display success message when MongoDB is connected successfully
        console.log("MongoDB connected");
    } catch (err) {
        // Display error message if connection fails
        console.error("Error connecting to MongoDB");

        // Exit the application if database connection fails
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
