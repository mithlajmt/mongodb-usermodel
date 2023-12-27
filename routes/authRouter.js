const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const authController = require('../controllers/authController');
const productsMiddle = require('../middlewares/productsMiddleware') 

router.post('/signup',authController.sessioncheck, authController.signup);
router.post('/login', authController.login);
router.get('/logout',authController.logout)
router.get('/products',authController.sessioncheck,productsMiddle,(req,res)=>{
    res.render('products')
  })
  

module.exports = router;