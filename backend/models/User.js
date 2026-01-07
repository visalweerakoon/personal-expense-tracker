// Import mongoose for MongoDB schema creation
const mongoose = require("mongoose");

// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Define schema for User collection
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true }, // User's full name
        email: { type: String, required: true, unique: true }, // User email (unique)
        password: { type: String, required: true }, // User password (hashed)
        profileImageUrl: { type: String, default: null }, // Optional profile image URL
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

// Hash password before saving user
UserSchema.pre('save', async function () {
    if (!this.isModified("password")) return next(); // Skip if password not modified
    this.password = await bcrypt.hash(this.password, 10); // Hash password
});

// Method to compare entered password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export User model
module.exports = mongoose.model("User", UserSchema);
