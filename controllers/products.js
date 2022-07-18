const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({ featured: true })
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

const getAllProducts = async(req, res) => {
    const { featured, name, price, company, sort } = req.query;      /* Destructuring Method */
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

    let result = Product.find(queryObj);
    if(sort){
        const sortData = sort.split(',').join(' ')
        result = result.sort(sortData)
    } else{
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}