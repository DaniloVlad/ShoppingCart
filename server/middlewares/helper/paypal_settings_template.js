'use strict';
const paypal = require('@paypal/checkout-server-sdk');

const client = () => {
    return new paypal.core.PayPalHttpClient(environment());
}

//Change to your own client ID and Seed.
const environment = () => {
    let clientId = process.env.PAYPAL_CLIENT_ID || '<CLIENT-ID>';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || '<CLIENT-SEED>';
    //Change from sandbox
    return new paypal.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

module.exports = { client };