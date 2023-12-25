function requireAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.redirect('/login'); // Redirect unauthorized users to the login page
    }
  }
  
  module.exports = requireAdmin