const express = require('express');

const router = express.Router();

//TO-DO
router.use((req, res, next) => {
    if(req.session.role === undefined)
        return next('Error: Invalid route');
    else
        return next(); 
});

//planning the routes
// router.use('/users');

// router.use('/email');

// router.use('/orders');

// router.use('/products');

// router.use('/site');

module.exports = router;