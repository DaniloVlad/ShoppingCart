const express = require('express');
const Cart = require('../../middlewares/cart');
const Checkout = require('./checkout');

var router = express.Router();

router.use(Checkout);

router.get('/view', Cart.viewCart);

router.post('/clear', Cart.clearCart);

router.post('/add', [Cart.generateProduct, Cart.addToCart]);

module.exports = router;