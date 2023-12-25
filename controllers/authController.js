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

