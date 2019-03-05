const express = require('express');
const order = require('./dashboard/order');


var router = express.Router();


router.use((req, res, next) => {
    if(!req.session.uid || !req.session.name || !req.session.email) 
        return res.redirect('/api/login');
    else
        next();
});


router.get('/', (req, res, next) => {
    return res.json({name: req.session.name, email: req.session.email});
});

router.use(order);



module.exports = router;