const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: [true, 'Product already exists'],
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    image: {
        type: String,
        required: true,
    },
    stocks: Number,
});

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;
