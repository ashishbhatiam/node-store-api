const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({ featured: true })
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

const getAllProducts = async(req, res) => {
    const { featured, name, price, company } = req.query;      /* Destructuring Method */
    const queryObj = {}
    if(featured){
        queryObj.featured = featured
    }
    if(price){
        queryObj.price = price
    }
    if(company){
        queryObj.company = company
    }
    if(name){
        queryObj.name = { $regex: name, $options: 'i'}
    }

    // const products = await Product.find(req.query); /* Simple Method */
    
    const products = await Product.find(queryObj);
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}