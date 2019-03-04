const Types = require('../models/types');
const Product = require('../models/products');

const getProductsByType = (req, res, next) => {
    var {type} = req.params;
    console.log('Got here '+type)
    Types.getTypeIdByName(type)
    .then((results) => {
        var type_id = results[0].id;
        console.log("Got typeid: "+type_id)
        Product.getProductsByTypeId(type_id)
        .then((results) => {
            return res.json({products: results})
        })
        .catch((err) => next('No products with that type!'))
    })
    .catch((err) => next('Invalid sub type provided!'))
}

module.exports = getProductsByType;