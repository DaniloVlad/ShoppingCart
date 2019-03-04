const express = require('express');
const getProductsByType = require('../../middlewares/types');

var router = express.Router();

router.get('/:type', getProductsByType)



module.exports = router;