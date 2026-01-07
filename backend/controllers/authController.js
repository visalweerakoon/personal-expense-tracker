// Import User model for database operations related to users
const User = require('../models/User');

// Import JSON Web Token library for authentication
const jwt = require("jsonwebtoken");

// Function to generate a JWT token using user ID
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
exports.registerUser = async (req, res) => {

    // Destructure user details from request body
    const { fullName, email, password, profileImageUrl } = req.body;

    // Check if required fields are provided
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check whether the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create a new user in the database
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        });

        // Send success response with user data and token
        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        // Handle errors during user registration
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Login an existing user
exports.loginUser = async (req, res) => {

    // Destructure login credentials from request body
    const { email, password } = req.body;

    // Check if required fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // Validate user and password
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Send success response with user data and token
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        // Handle errors during login
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};

// Get logged-in user's information
exports.getUserInfo = async (req, res) => {

    try {
        // Find user by ID and exclude password field
        const user = await User.findById(req.user.id).select("-password");

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send user information as response
        res.status(200).json(user);

    } catch (err) {
        // Handle errors while fetching user data
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message });
    }
};
