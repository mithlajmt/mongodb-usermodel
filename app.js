const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter')
const path = require('path');
const app = express();
const port = 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongodbproject', {
  // useNewUrlParser: true,
  useUnifiedTopology: true, // Add this line

}).then(() => {
  console.log('DB connection successful');
}).catch((err) => {
  console.log('Error connecting to DB:', err);
});

// Set view engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render signup form on root path
app.get('/', (req, res) => {
  res.render('signup');
});



app.get('/login', (req, res) => {   ///
    res.render('login');
  });

app.use('/users',authRouter)

// Start the server
app.listen(port, () => {
  console.log('Server running on port', port);
});
