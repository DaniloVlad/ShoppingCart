const express = require('express');

var router = express.Router();
var order = require('./dashboard/order')
router.use(order);



module.exports = router;