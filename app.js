const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const sessionChecker = require('./middlewares/sessionMiddleware');
const adminChecker = require('./middlewares/adminMiddleware');
const authController = require('./controllers/authController');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter'); // Add this line
const path = require('path');
const productsMiddle = require('./middlewares/productsMiddleware')
const adminRouter = require('./routes/adminRouter')

const app = express();
const port = 4000;



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodbproject', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
.then(()=>{
  console.log('njn vanneda');
})
.catch((err)=>{
  console.log('something seems fishy u got an error');
})

// Set up session middleware
app.use(
  session({
    secret: 'smart raghavan', // Replace with a strong, random string
    resave: false,
    saveUninitialized: false,
  })
  );
  
  // Set view engine and static files
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/controllers', express.static(path.join(__dirname, 'controllers')));
  
  // Parse JSON and urlencoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
  });
  
  app.use('/products', productRouter); // Use the product router
  // Render signup form on root path
  app.get('/',sessionChecker, (req, res) => {
    let msg = req.session.message 
    req.session.message = ''
  res.render('signup',{message: msg});

});

app.get('/signup',sessionChecker, (req, res) => {
  
  res.render('signup',{message: ''});
});

app.get('/login',sessionChecker, (req, res) => {
  res.render('login');
});

app.get('/logout',authController.logout)

// Example usage of requireAdmin middleware
app.get('/admin/dashboard', adminChecker, (req, res) => {
  res.render('admin_dashboard');
});

// app.get('/products',productsMiddle,(req,res)=>{
//   res.render('products')
// })






function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Homepage route with requireAuth middleware
// Homepage route with requireAuth middleware
app.get('/homepage', requireAuth, (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    // Render admin homepage
    res.render('admin_homepage');
  } else {
    // Render regular user homepage
    res.render('homepage');
  }
});


app.use('/users', authRouter);
app.use('/admin', adminRouter);

// Start the server
app.listen(port, () => {
  console.log('Server running on port', port);
});