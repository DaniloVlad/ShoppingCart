var express = require('express');
var checkout = require('../../middlewares/checkout');

var router = express.Router();

router.use('/checkout', checkout.preCheck);

router.get('/checkout', checkout.getCheckout);

router.post('/checkout', [checkout.createPayer , checkout.postCheckout]);

module.exports = router;