function productsMw(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/homepage'); // Redirect unauthorized users to the login page
    }
  }
  
  module.exports = productsMw