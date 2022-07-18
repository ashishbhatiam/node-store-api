const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({ featured: true })
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

const getAllProducts = async(req, res) => {
    const products = await Product.find(req.query);
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}