const express = require('express');
const { captureOrder } = require('../../middlewares/order');
const Order = require('../../models/orders');
var router = express.Router();

router.post('/complete', (req, res, next) => {
    //capture store and update as bought
    var {token, payerID} = req.body;
    captureOrder(token)
    .then((order) => {
        var token = order.result.id; //paypal order id
        var status = order.result.status; //Paypal payment status
        var order_id = order.result.purchase_units[0].reference_id; //internal order id
        var transaction_id = order.result.purchase_units[0].payments.captures[0].id; //admin transaction id
        var payer_id = order.result.payer.payer_id;
        if(payerID !== payer_id) return next("Error: Payer id not associated with order!");
        //debug
        console.log("Order_id: " + token 
        + " Reference_ID: " + order_id 
        + " Transaction id: "+transaction_id 
        + " Status: " + status);
        if(status === 'COMPLETED') {
            //empty cart
            req.session.cart = [];
            Order.updateOrderCompleted(order_id, transaction_id, payer_id)
            .then(results2 => res.json({succ: "Successfully captured order!"}))
            .catch(err => next('Error: Couldnt capture order!'))
        }
    })
    .catch(err => next("Error: Order couldn't be found"));
    
});

module.exports = router;