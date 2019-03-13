var execQuery = require('./db');


const createOrder = (order_details) => {
    var {name, address, apartment, state, city, zip, cost, shipping} = order_details;
    var details = {
        sql: "INSERT INTO `orders` (`name`, `address`, `apartment`, `state`, `city` , `zip`, `cost`, `shipping`) VALUES (?,?,?,?,?,?,?,?)",
        data: [name, address, apartment, state, city, zip, cost, shipping]
    }
    return execQuery(details);
}

const createOrderProducts = (order_id, cart) => {
    let insertArr = [];
    for(x in cart) 
        insertArr.push([order_id, cart[x].product_id, cart[x].product_variant, cart[x].product_type, cart[x].quantity])
    
    var details = {
        sql: "INSERT INTO `order_products` (`order_id`, `product_id`, `product_variant`, `product_type`, `quantity`) VALUES ?",
        data: [insertArr]
    }
    return execQuery(details);
}

const updateTokenByOrderId = (order_id, token) => {
    var details = {
        sql: "UPDATE `orders` SET `token` = ? WHERE `id` = ?",
        data: [token, order_id]
    }
    return execQuery(details);
}

const updateTransactionId = (order_id, trans_id) => {
    var details = {
        sql: "UPDATE `orders` SET `token` = ?, `status` = 1 WHERE `id` = ?",
        data: [trans_id, order_id]
    }
    return execQuery(details);
}
const removeOrder = (order_id) => {
    var details = {
        sql: "DELETE FROM `orders` WHERE id = ?",
        data: [order_id]
    }
    return execQuery(details);
}

module.exports = {
    createOrder, 
    createOrderProducts,
    updateTokenByOrderId,
    updateTransactionId,
    removeOrder
};