const Product = require('../models/products');


const getProduct = (req, res, next) => {
    Product.getProductAndVariantsById(req.params.id)
    .then(results => res.json({result: results[0]}))
    .catch(err => next('Could\'t find product with supplied id!'));

}

module.exports = {
    getProduct
}