const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    gender: String,
    education: String,
    skills: [String],
    resume: String,
    
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;