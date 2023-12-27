const user = require('../models/userModel')
const ProductModel = require('../models/productModel')
const mongoose = require('mongoose')

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
        res.redirect('/admin/admin_homepage');

    } catch (err) {
        res.render('addProduct', { message: 'Error adding the product. Please try again.' });
    }
};


  exports.renderAdminHomepage = (req,res)=>{
    res.render('admin_homepage')  }




    ///products


    exports.editProductPage = async (req,res)=>{
    try{
        const products = await ProductModel.find()
        res.render('edit-product',{products})

        }catch(err){
            console.log('error in edit product:',err);
            res.status(500).json({
                status:'error',
                message:'cant load products to edit'
            })
    }   
    }
     

    exports.deleteProduct = async (req,res)=>{

        try{
        const productId = req.params.id

        // await ProductModel.deleteOne({_id:productId})  
        console.log(req.params.id,'hi idhaada njan'); 
        const minnu = await ProductModel.findOne({_id:req.params.id})
        console.log(minnu,'hello findMon on the waaay');
        await ProductModel.deleteOne({_id: productId });

        res.redirect('/admin/edit-products')
    }catch(err){
        console.log('oops..cant delete',err)
        res.status(500).json({
            status:"failure",
            message:{
               mesage: 'got some issues here server down'
            }
        })

    }

    }

    exports.renderUpdatePage = async(req,res,next)=>{
    try{

        
        const product = await ProductModel.findOne({_id:req.params.id})
        res.render('update-product',{product})

    }catch(err){

        console.log('hey its got some errors in admin update',err);
        res.status(500).json({
            status:"failure",
            message:{
               mesage: 'got some issues here server down'
            }
        })

    }
    }


    exports.updateProduct = async(req,res)=>{
        try{
            const id = req.params.id ;
            const chunk = req.body ;
            await ProductModel.updateOne({_id:id},{$set:req.body})    //  $set:{...req.body}
            res.redirect('/admin/edit-products')
        }catch(err){
    
            console.log('error looks cool inhere');
        }
    }

    exports.logout = (req, res, next) => {
        if (req.session && req.session.user) {
          // User is authenticated, proceed to the next middleware or route handler
          next();
        } else {
          // User is not authenticated, redirect to login or send an unauthorized response
          res.status(401).json({ error: 'Unauthorized access' });
        }
      };
      