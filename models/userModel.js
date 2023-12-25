const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
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
    validate:{
      validator:function(val){   //only workfor save() & create()
       return val==this.password
      },
      message:'password and confirm password not matching'
    }
  },

});


//middlware for encrypting password

userSchema.pre('save', async function(next){  //since we r using async version of hash we made it a async function
  if(!this.isModified('password'))return next()  //skipping encryption if paassword isnt modifeid

  //encrypt the password before saving it
  this.password = await bcrypt.hash(this.password,12);  //first generate random string and hash it so it will be unique  (async hash)
  this.confirmPassword = undefined ;  //since we dont need this tobe stores in db or encrypt it
  next();
})

// Create User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;

