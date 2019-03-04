var express = require('express');
var {getProduct} = require('../../middlewares/product');

var router = express.Router();


router.get('/:id(\\d+)', getProduct);


module.exports = router;