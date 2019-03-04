const express = require('express');
const {captureOrder} = require('../../middlewares/payment');

var router = express.Router();

router.post('/order', (req, res, next) => {
    //capture store and update as bought
    var {token, payerID} = req.body;
    console.log("TOKEN: "+token+" PayerID: "+payerID);
    captureOrder(token, (err, result) => {
        if(err) {
            // console.log(err);
            return next();
        }
        else {
            var token = result.result.id; //paypal order id
            var order_id = result.result.purchase_units[0].reference_id; //internal order id
            var transaction_id = result.result.purchase_units[0].payments.captures[0].id; //admin transaction id
            console.log('Order_id: '+token+" Reference_ID: "+order_id+ " Transaction id: "+transaction_id)
            console.log(result.status)
            if(result.result.statusCode === 201) return res.json({suc: "Successfully captured order!"})
        }
    })
    res.json({suc: 'test webhook!'})
});

module.exports = router;