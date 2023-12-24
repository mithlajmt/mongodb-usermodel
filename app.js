const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// Set 'views' directory for any views 
app.set('views', path.join(__dirname, 'views'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));


// Render the signup form when a user accesses the root path
app.get('/', (req, res) => {
    res.render('signup');
});

app.listen(port, () => {
    console.log('Server running on port', port);
});
