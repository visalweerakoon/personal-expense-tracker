// Import multer library for handling file uploads
const multer = require('multer');

// Configure storage location and filename for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

// Filter uploaded files to allow only specific image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg','image/png','image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only .jpg and .png formats are allowed'), false); // Reject file
    }
};

// Create multer upload instance with storage and file filter
const upload = multer({ storage, fileFilter });

// Export upload middleware for use in routes
module.exports = upload;
