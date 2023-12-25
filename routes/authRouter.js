const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Define /profile route for both GET and POST requests
// router.route('/profile')
//     .get((req, res) => {
//         console.log('Accessing /profile route');
//         authController.getProfilePage(req, res);
//     })
//     .post((req, res) => {
//         console.log('Handling POST request to /profile');
//         authController.updateProfile(req, res);
//     });

// authRouter.js

router.route('/profile')
    .get(authController.getProfilePage)
    .post(authController.updateProfile);


module.exports = router;