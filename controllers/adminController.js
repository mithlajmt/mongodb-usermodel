const user= require('../models/userModel')
const products = require('../models/productModel')
const ProductModel = require('../models/productModel')


exports.showUsers = async(req,res,next)=>{


try{
    if(req.session.user && req.session.user.role == 'admin'){
        const users = await user.find({},'email')
        res.render('admin_users',{users})
    }


}catch (err){
    console.log('error in show users:',err);
    res.status(500).json({
        status:'error',
        message:'internal server error'
    });

    }

  }


  exports.renderAddProductPage = (req,res)=>{
    try{
        if(req.session.user && req.session.user.role == 'admin'){
            res.render('addProduct', { message: '' });

        }
    }
    catch (err){
        console.log('error in show users:',err);
        res.status(500).json({
            status:'error',
            message:'authetication Failed'
        });
    }
  }


// adminController.js
exports.addProduct = async (req, res, next) => {
    try {
        const { productName, price, description, image, stocks } = req.body;

        const newProduct = new ProductModel({
            productName,
            price,
            description,
            image,
            stocks,
        });

        await newProduct.save();

        // Redirect to the admin homepage after adding the product
        res.status(201).json({
            status:"succeccful",
            message:{
                message:'product has been added'
            }
        });
    } catch (err) {
        res.render('addProduct', { message: 'Error adding the product. Please try again.' });
    }
};


  exports.renderAdminHomepage = (req,res)=>{
    res.render('admin_homepage')  }
