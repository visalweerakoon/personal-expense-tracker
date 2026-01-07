// Import express framework
const express = require("express");

// Import authentication middleware to protect routes
const { protect } = require("../middleware/authMiddleware");

// Import file upload middleware
const upload = require("../middleware/uploadMiddleware");

// Import controller functions for authentication
const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

// Create a router instance
const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login a user
router.post("/login", loginUser);

// Route to get logged-in user's info (protected)
router.get("/getUser", protect, getUserInfo);

// Route to upload a single image
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Build URL for uploaded image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

// Export router
module.exports = router;
