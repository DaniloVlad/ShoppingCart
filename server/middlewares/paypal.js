'use strict';
const paypal = require('@paypal/checkout-server-sdk');
const states = require('./states');

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use ProductionEnvironment.
 *
 */
function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID || 'AXgNDq1PfbdYC8iK6vuRCWiB8z_zXnXbWW0aAetGb2i_VUPLdFuyHD0p52I2AydBxtLeJoRSjyh1LOz1';
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'EPGhQZcHB8561aopStyI1LULGly2_SgMNherxhKjmtBEKCNQ6iB_StdgkrFYPHYdCS5jAQWKGU14A4Ll';

    return new paypal.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

function prettyPrint(jsonData, pre=""){
    let pretty = "";
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    for (let key in jsonData){
        if (jsonData.hasOwnProperty(key)){
            if (isNaN(key))
              pretty += pre + capitalize(key) + ": ";
            else
              pretty += pre + (parseInt(key) + 1) + ": ";
            if (typeof jsonData[key] === "object"){
                pretty += "\n";
                pretty += prettyPrint(jsonData[key], pre + "    ");
            }
            else {
                pretty += jsonData[key] + "\n";
            }

        }
    }
    return pretty;
}



module.exports = {client, prettyPrint};