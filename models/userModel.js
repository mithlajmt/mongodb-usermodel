const mongoose = require('mongoose');
const validator = require('validator');

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: [true, 'Email already exists'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email format'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'Please enter a password'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Invalid password format',
    ],
  },

  confirmPassword: {
    type: String,
    required: [true, 'Password confirmation is required'],
  },
  
});

// Create User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
