const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');
const path = require('path');


// HOME PAGE (serve HTML)
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


// GET ALL PRODUCTS
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ADD PRODUCT FROM FORM
router.post('/add-product', async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Error adding product");
    }
});


// SEARCH PRODUCT BY NAME
router.get('/products/:name', async (req, res) => {
    try {
        const name = req.params.name;

        const products = await Product.find({
            name: { $regex: name, $options: 'i' }
        });

        if (products.length === 0) {
            return res.status(404).json({
                message: `No products found with name: ${name}`
            });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// DELETE PRODUCT BY NAME
router.delete('/products/:name', async (req, res) => {
    try {
        const name = req.params.name;

        const result = await Product.deleteMany({
            name: { $regex: name, $options: 'i' }
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: `No products found with name: ${name}`
            });
        }

        res.json({
            message: `${result.deletedCount} product(s) deleted`
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
