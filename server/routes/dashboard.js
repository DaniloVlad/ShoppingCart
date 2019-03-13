const express = require('express');
const order = require('./dashboard/order');
const {getDetails} = require('../middlewares/accounts');

var router = express.Router();


router.use((req, res, next) => {
    if(!req.session.uid || !req.session.name || !req.session.email) 
        return res.redirect('/api/login');
    else
        next();
});


router.get('/', (req, res, next) => {
    let menu = ['orders', 'account settings'];
    if(req.session.role === 'Admin') 
        menu.concat(['users', 'manage orders', 'email', 'products', 'site settings'])
    return res.json({name: req.session.name, email: req.session.email});
});

router.use(order);

//TO-DO:
router.get('/account', getDetails); 
// router.use(admin);

module.exports = router;