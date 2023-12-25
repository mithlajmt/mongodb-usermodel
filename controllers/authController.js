const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    let role = 'user';

    // Check if the email is for an admin
    if (email === 'smartboy@gmail.com') {
      role = 'admin';
    }

    const newUser = await User.create({ ...req.body, role });
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