const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authController = require('./../controllers/authController')

// Handle signup POST request
// router.post('/signup', async (req, res) => {
//   try {
//     // Create a new user with the provided data
//     const newUser = await User.create(req.body);
//     // Redirect to login page on successful signup
//     res.redirect('/login');
//   } catch (err) {
//     // Render signup page with error messages on failure
//     res.render('signup', { error: err.message });
//   }
// });


router.route('/signup').post(authController.signup);

module.exports = router;
