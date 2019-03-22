const express = require('express');
const dasboard = require('./dashboard');
const order = require('./api/order');
const cart = require('./api/cart');
const categories = require('./api/categories');
const checkout = require('./api/checkout');
const product = require('./api/product');
const types = require('./api/types');
const { postLoginFilter, postRegisterFilter} = require('../filters/register');
const {getRegister, postRegister, postLogin, logout} = require('../middlewares/register');
const Categories = require('../middlewares/categories');

var router = express.Router();

router.use('/order', order);

router.use('/dashboard', dasboard);

router.use('/products', types);

router.use('/product', product);

router.use('/cart', cart);

router.use('/category', categories);

router.use('/checkout', checkout);

router.get(['/register', '/login'], getRegister);

router.post('/login', [postLoginFilter, postLogin]);

router.post('/register', [postRegisterFilter, postRegister]);

router.get('/logout', logout);

router.get('/', Categories.getMenu);

module.exports = router;