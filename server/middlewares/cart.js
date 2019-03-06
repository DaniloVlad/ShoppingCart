const Product = require('../models/products');
const {shippingCost, subTotal, roundPrice} = require('./helper/cart');

const clearCart = (req, res, next) => {
    req.session.cart = [];
    return res.json({suc: "Cleared cart!"})
}

const viewCart = (req, res, next) => {
    if(!req.session.cart || req.session.cart.length === 0)
        return next('You\'re cart is empty!')
    else {
        let cost = subTotal(req.session.cart);
        let shipping = shippingCost(cost);
        return res.json({cart: req.session.cart, shippingCost: shipping, itemCost: cost});
    }
}

const generateProduct = (req, res, next) => {
    if(req.body.product_variant === "0") 
        req.body.product_variant = 0;

    if(!req.body) 
        return next('Empty Request!');

    else if(!req.body.product_id || !req.body.product_name || req.body.product_type === undefined || req.body.product_variant === undefined)
        return next('Invalid product!');

    else if(!req.body.quantity || isNaN(req.body.quantity))
        return next('Invalid quantity!');
        
    else {
        var prod = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_description: "",
            product_variant: req.body.product_variant,
            product_type: req.body.product_type,
            quantity: parseInt(req.body.quantity)
        }
        req.product = prod;
        next();

    }
    
}

const addToCart = (req, res, next) => {

    var prod = req.product;    
    const cartChk = req.session.cart

    for(item in cartChk) {
        if(cartChk[item].product_id == prod.product_id && cartChk[item].product_variant == prod.product_variant) {
                req.session.cart[item].quantity += prod.quantity;
                return res.json({suc: "successfully updated quantity!"})
        }
    }
    Product.getProductAndVariantsById(prod.product_id)
    .then((results) => {
        if(!results || results.length === 0) 
            return next('No product found with the supplied product_id');
        else {
            var data = results[0];
            data.variants = JSON.parse(data.variants);
            prod.product_description = data.description;
            console.log(data);
            
            if(prod.product_type !== data.type) 
                return next('product_id does not match product_type')

            else if(prod.product_variant === data.default_variant) {
                prod.price = roundPrice(data.price);
                req.session.cart.push(prod);
                return res.json({suc: 'Successfully added product to cart!'})
            }

            else {
                let x = 0;
                for(x in data.variants) {
                    if(data.variants[x].name === prod.product_variant) {
                        prod.price = roundPrice(data.variants[x].price);
                        req.session.cart.push(prod);
                        break;
                    }
                }

                return res.json({suc: 'Successfully added product to cart!'});
            }
        }
    })
    .catch(err => next('Invalid product_id!'));

}

module.exports = {
    addToCart, 
    generateProduct,
    clearCart,
    viewCart
}