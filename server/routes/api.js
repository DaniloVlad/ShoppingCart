const express = require('express');
var cart = require('./api/cart');
var categories = require('./api/categories');
var checkout = require('./api/checkout');
var product = require('./api/product');
var types = require('./api/types');

var Register = require('../middlewares/register');
var Categories = require('../middlewares/categories');

var router = express.Router();

router.use('/products', types);

router.use('/product', product);

router.use('/cart', cart);

router.use('/category', categories)

router.get('/login', Register.getLogin);

router.post('/login', Register.postLogin);

router.get('/register', Register.getRegister);

router.post('/register', Register.postRegister);

router.get('/logout', Register.logout);

router.get('/', Categories.getMenu);

module.exports = router;