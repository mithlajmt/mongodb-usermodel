const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

  exports.signup = async (req, res, next) => {
    try {
      const newUser = await User.create(req.body);
      req.session.user = newUser;
  
      console.log('Session:', req.session); // Log the session object
  
      // Redirect to the homepage after successful signup
      res.redirect('/homepage');
    } catch (err) {
      console.error('Error in signup:', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password',
      });
    }

    // Set up a session
    req.session.user = user;

    console.log('Session:', req.session); // Log the session object
    res.redirect('/homepage')

    // res.redirect('/homepage'); // Redirect to the homepage after successful login
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

exports.logout = (req, res, next) => {
  // Clear the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
    // Redirect to the signup page after logout
    res.redirect('/signup');
  });
};


// authController.js

// authController.js

exports.getProfilePage = (req, res) => {
  console.log('Rendering profile page');
  res.render('profile', { user: req.session.user });
};

exports.updateProfile = async (req, res) => {
  console.log('Handling profile update');
  try {
      const { username, address, phoneNumber } = req.body;

      // Update user profile information
      const updatedUser = await User.findByIdAndUpdate(
          req.session.user._id,
          { username, address, phoneNumber },
          { new: true } // Return the updated document
      );

      // Update session with new user information
      req.session.user = updatedUser;

      // Redirect to the profile page
      res.redirect('/profile');
  } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({
          status: 'error',
          message: 'Internal server error',
      });
  }
};

// authController.js



