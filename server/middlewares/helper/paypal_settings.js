'use strict';
const paypal = require('@paypal/checkout-server-sdk');

const client = () => {
    return new paypal.core.PayPalHttpClient(environment());
}

const environment = () => {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'AXgNDq1PfbdYC8iK6vuRCWiB8z_zXnXbWW0aAetGb2i_VUPLdFuyHD0p52I2AydBxtLeJoRSjyh1LOz1';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EPGhQZcHB8561aopStyI1LULGly2_SgMNherxhKjmtBEKCNQ6iB_StdgkrFYPHYdCS5jAQWKGU14A4Ll';
    //Change from sandbox
    return new paypal.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

module.exports = { client };