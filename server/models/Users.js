const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    education: String,
    skills: [String],
    resume: String,
    password: { type: String, required: false }, // Optional for older records, required for new signups
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;