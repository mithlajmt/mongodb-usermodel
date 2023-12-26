const express = require('express');
const router = express.Router();
const ProductModel = require('../models/productModel');

router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.render('products', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;