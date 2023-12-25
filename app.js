const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const sessionChecker = require('./middlewares/sessionMiddleware')
const authRouter = require('./routes/authRouter');
const path = require('path');

const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodbproject', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

// Set up session middleware
app.use(
  session({
    secret: 'smart raghavan', // Replace with a strong, random string
    resave: false,
    saveUninitialized: true,
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

// Render signup form on root path
app.get('/',sessionChecker, (req, res) => {
  res.render('signup');
});

app.get('/login',sessionChecker, (req, res) => {
  res.render('login');
});




function requireAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Homepage route with requireAuth middleware
app.get('/homepage', requireAuth, (req, res) => {
  console.log('Reached homepage route');
  res.render('homepage');
});
app.use('/users', authRouter);

// Start the server
app.listen(port, () => {
  console.log('Server running on port', port);
});
