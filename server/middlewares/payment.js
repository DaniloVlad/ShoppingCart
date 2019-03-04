const paypal = require('@paypal/checkout-server-sdk');

const client = require('./paypal').client;

const captureOrder = (orderID) => {

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
  
     
    
    return client().execute(request);
     
}


module.exports = captureOrder;