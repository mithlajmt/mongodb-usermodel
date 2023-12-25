// authMiddleware.js

function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
      // User is authenticated, redirect to homepage or another page
      return res.redirect('/homepage');
    }
    // User is not authenticated, continue to the next middleware or route handler
    next();
  }
  
  module.exports = ensureAuthenticated;
  