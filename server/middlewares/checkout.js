const crypto = require('crypto');
const {shippingCost, subTotal, roundPrice} = require('./helper/cart');
const { testEmail } = require('./helper/filters');
const { genTempPassword, hashPassword } = require('./helper/password');
const paypalOrder = require('./order').captureOrder;
const state_codes = require('./states');
const {Payer} = require('./payer');
const Orders = require('../models/orders');
const User = require('../models/users');
const emailClient = require('./email');


const preCheck = (req, res, next) => {
    if(req.session.cart === undefined || req.session.cart.length === 0)
        return res.json({cart: [], shippingCost: 0, itemCost: 0});
    else next();
}

const getCheckout = (req, res, next) => {
    let cost = subTotal(req.session.cart);
    let shipping = shippingCost(cost);
    return res.json({cart: req.session.cart, shippingCost: shipping, itemCost: cost});
    
}

const createPayer = (req, res, next) => {
    console.log('Creating payer....')
    var { first_name, last_name, email, address_1 , address_2, city, state, zip } = req.body;
    state = state.toUpperCase();

    let err = []
    if(typeof first_name !== 'string' || first_name.length === 0 || first_name.length > 140)
        err.push('Invalid first name');
    if(typeof last_name !== 'string' || last_name.length === 0 || last_name.length > 140)
        err.push('Invalid last name');
    if(typeof email !== 'string' || email.length === 0 || email.length > 254 || !testEmail(email))
        err.push('Invalid email');
    if(typeof address_1 !== 'string' || address_1.length === 0 || address_1.length > 300)
        err.push('Invalid main address');
    if(typeof address_2 !== 'string' || address_2.length > 300)
        err.push('Invalid secondary address');
    if(typeof state !== 'string' || state.length !== 2 || !Object.values(state_codes).includes(state))
        err.push('Invalid state code!');
    if(typeof city !== 'string' || city.length === 0 || city.length > 120)
        err.push('Invalid city/town/village')
    if(typeof zip !== 'string' || zip.length === 0 || zip.length > 60)
        err.push('Invalid zip code!');

    
    if(err.length > 0) {
        console.error(err);
        return next(err); //will call middleware with (err, req, res, next)
    }
    else {
        if(address_2.length === 0) address_2 = null;
        req.payer = {};
        req.payer = new Payer(first_name, last_name, email, address_1, address_2, city, state, zip,  "US");
        if(req.session.uid) {
            req.payer.uid = req.session.uid;
            next();
        }
        else {
            User.checkEmail(email)
            .then((results) => {
                if(results.length === 1) {
                    req.payer.uid = results[0].id;
                    return next(); //email already registered

                }
                else {
                    let user = {first_name, last_name, email};
                    let tmpPass = genTempPassword();  //email temp password to user
                    user.password = hashPassword(tmpPass);
                    User.addUser(user)
                    .then((response) => {
                        req.payer.uid = response.insertId;
                        const emailString = `New account for wigx.\nEmail: ${email}\nPassword: ${tmpPass}`
                        emailClient.sendMail(email, 'New Account!', emailString)
                        .then((response) => {
                            console.log(response);
                            return next();  //email sent!
                        })
                        .catch((err) => {
                            console.log('couldnt send email :(')
                            return next(); //still proceed with checkout
                        })
                    })
                    .catch(err => next('Some error occured!'));
                }
            })
        }
        
        
            
    }
}

const postCheckout = (req, res, next) => {

    let payer = req.payer;

    let cost = subTotal(req.session.cart);
    let shipping = shippingCost(cost);
    let order = {
        uid: req.payer.uid,
        name: payer.name.given_name+" "+payer.name.surname,
        address: payer.address.address_line_1,
        apartment: payer.address.address_line_2,
        state: payer.address.admin_area_1,
        city: payer.address.admin_area_2,
        zip: payer.address.postal_code,
        cost: roundPrice(cost),
        shipping: shipping
    }

    
    Orders.createOrder(order)
    .then((results) => {

        var reference_id = results.insertId;
        console.log('Order insert id: '+reference_id);

        Orders.createOrderProducts(reference_id, req.session.cart)
        .then((results2) => {
           
            let orderSub = {
                id: reference_id,
                item_total: order.cost,
                shipping_total: order.shipping,
                products: req.session.cart
            }
            paypalOrder(payer, orderSub)
            .then((details) => {
                let orderID = details.result.id;
                var link = "";
                console.log(details);
                for(x in details.result.links) {
                    if(details.result.links[x].rel === "approve") {
                        link = details.result.links[x].href;
                        console.log(details.result.links[x])
                        Orders.updateTokenByOrderId(reference_id, orderID)
                        .then(result => res.json({suc: link}))
                        .catch(err => next('Couldnt update order with transaction id!'))
                        break;
                    }
                }
            })
            .catch(err => next('Could\'t create paypal order!'))
        })
        .catch((err) => {
            Orders.removeOrder(reference_id)
            .then(resu => next('Couldn\'t create order!'))
            .catch(err => next('Couldn\'t create order!'))
        })
    })
    .catch(err => next('Could\'t create order!'))

}

module.exports = {
    preCheck, 
    getCheckout, 
    postCheckout, 
    createPayer
}