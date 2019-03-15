const express = require('express');
const {getProduct} = require('../../middlewares/product');

var router = express.Router();
//allow only numeric url params
router.get('/:id(\\d+)', getProduct);

module.exports = router;