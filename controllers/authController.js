const user = require('../models/userModel')


exports.signup = async (req, res, next) => {
    try {
      const newUser = await user.create(req.body);
      console.log(newUser); // Add this line

      // Additional logic if needed
  
      // Send a response or do other tasks
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    } catch (err) {
      // Handle errors
      console.error('Error in signup:', err);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  };
  