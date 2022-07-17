const getAllProductsStatic = (req, res) => {
    res.status(200).json({msg: 'All Products Testing'})
}

const getAllProducts = (req, res) => {
    res.status(200).json({msg: 'All Products'})
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}