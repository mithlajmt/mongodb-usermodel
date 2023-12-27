const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')


adminRouter.get('/users',adminController.showUsers)
adminRouter.get('/add-products',adminController.renderAddProductPage)
// adminRouter.js
adminRouter.post('/add-products', adminController.addProduct);
adminRouter.get('/admin_homepage', adminController.renderAdminHomepage);


module.exports = adminRouter