const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productNAme : {
        type:String,
        required:true,
        unique:[true,'product already exists']
    },
    price : {
        type:Number,
        required:true
    },
    desciption:String,
    image:{
        type:String,
        required:true
    },
    stocks:Number
    
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;