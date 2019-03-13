const express = require('express');
const {captureOrder} = require('../../middlewares/payment');
const Order = require('../../models/orders');
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
            var status = result.result.status; //Paypal payment status
            var order_id = result.result.purchase_units[0].reference_id; //internal order id
            var transaction_id = result.result.purchase_units[0].payments.captures[0].id; //admin transaction id
            console.log('Order_id: ' + token 
            + " Reference_ID: " + order_id 
            + " Transaction id: "+transaction_id 
            + " Status: " + status);
            if(status === 'COMPLETED') {
                console.log('Updating order status');
                Order.updateTransactionId(order_id, transaction_id)
                .then(results2 => res.json({succ: "Successfully captured order!"}))
                .catch(err => next('Error: Couldnt capture order!'))
            }
        }
    })
    res.json({suc: 'test webhook!'})
});

module.exports = router;