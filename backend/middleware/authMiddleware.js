// Import JSON Web Token library for authentication
const jwt = require('jsonwebtoken');

// Import User model to fetch user data
const User = require('../models/User');

// Middleware to protect routes and verify JWT
exports.protect = async (req, res, next) => {

    // Get token from Authorization header
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        // Verify token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user data to request (excluding password)
        req.user = await User.findById(decoded.id).select('password');

        // Proceed to next middleware or route handler
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }  
};
