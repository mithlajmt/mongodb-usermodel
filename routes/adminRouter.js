const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')


adminRouter.get('/users',adminController.showUsers)
adminRouter.get('/logout',adminController.logout)
adminRouter.get('/add-products',adminController.renderAddProductPage)
adminRouter.post('/add-products', adminController.addProduct);
adminRouter.get('/admin_homepage', adminController.renderAdminHomepage);
adminRouter.get('/edit-products',adminController.editProductPage)
adminRouter.get('/delete/:id',adminController.deleteProduct)
adminRouter.get('/update/:id',adminController.renderUpdatePage)
adminRouter.post('/products/edit/:id',adminController.updateProduct)






module.exports = adminRouter