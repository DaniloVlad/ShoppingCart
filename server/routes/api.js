const express = require('express');
const dasboard = require('./dashboard');
const order = require('./api/order');
const cart = require('./api/cart');
const categories = require('./api/categories');
const checkout = require('./api/checkout');
const product = require('./api/product');
const types = require('./api/types');
const Register = require('../middlewares/register');
const Categories = require('../middlewares/categories');

var router = express.Router();

router.use('/order', order);

router.use('/dashboard', dasboard);

router.use('/products', types);

router.use('/product', product);

router.use('/cart', cart);

router.use('/category', categories);

router.use('/checkout', checkout);

router.get(['/register', '/login'], Register.getRegister);

router.post('/login', Register.postLogin);

router.post('/register', Register.postRegister);

router.get('/logout', Register.logout);

router.get('/', Categories.getMenu);

module.exports = router;