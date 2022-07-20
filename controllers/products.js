const Product = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const products = await Product.find({})
    res.status(200).json({ products, total: products && products.length ? products.length : 0 })
}

const getAllProducts = async(req, res) => {
    const { featured, name, price, company, sort, fields } = req.query;      /* Destructuring Method */
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

    // Find / Search
    let result = Product.find(queryObj);
    
    // Sort 
    if(sort){
        const sortData = sort.split(',').join(' ')
        result = result.sort(sortData)
    } else{
        result = result.sort('createdAt')
    }

    // Allowed / Visible Fields
    if(fields){
        const fieldsData = fields.split(',').join(' ')
        result = result.select(fieldsData)
    }
    
    // Pagination
    const page = Number(req.query.page) || 1;
    const pageLimit = Number(req.query.pageLimit) || 10;
    const skip = (page - 1) * pageLimit;
    result = result.limit(pageLimit).skip(skip)

    const products = await result
    res.status(200).json({ products, total: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}