const paypal = require('@paypal/checkout-server-sdk');

/**
 *
 * PayPal HTTP client dependency
 */
const client = require('./paypal').client;

const createOrder = (payer, order) => {
    var items = []
    // console.log(JSON.stringify(order))
    for(x in order.products) {
      items.push({
        name: order.products[x].product_name,
        sku: order.products[x].product_variant+'-'+order.products[x].product_type,
        description: order.products[x].product_description,
        unit_amount: {
          currency_code: "USD",
          value: order.products[x].price
        },
        quantity: order.products[x].quantity,
        category: "PHYSICAL_GOODS"
      })
    }
    // console.log(items);
    // console.log(order)
    //set up Order request
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
  
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: order.id,
        amount: {
          currency_code: 'USD',
          value: (parseFloat(order.item_total)+parseFloat(order.shipping_total)).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: order.item_total
            },
            shipping: {
              currency_code: 'USD',
              value: order.shipping_total
            }
          }
        },
      items: items,
        shipping: {
          method: "United States Postal Service",
          address: {
            name: {
              given_name: payer.name.given_name,
              surname: payer.name.surname
            },
            address_line_1: payer.address.address_line_1,
            address_line_2: payer.address.address_line_2,
            admin_area_2: payer.address.admin_area_2,
            admin_area_1: payer.address.admin_area_1,
            postal_code: payer.address.postal_code,
            country_code: "US"
          }
        }
      
      }],
      application_context: {
        brand_name: "WiGX",
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:3000/order/view',
        cancel_url: 'http://localhost:3000/',
        payment_method: {
          payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED'
        }
      }
    });
  
    return client().execute(request);
     
  }
  
module.exports = createOrder;