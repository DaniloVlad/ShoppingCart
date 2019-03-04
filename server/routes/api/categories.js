const express = require('express');
const {getCategories} = require('../../middlewares/categories');

var router = express.Router();

router.get('/:catname', getCategories);

module.exports = router;