var execQuery = require('./db');

const addProduct = (name, description, type_id, price, default_variant = null) => {
    var details = {
        sql: "INSERT INTO `product` (name, description, type, price, default_variant) VALUES (?, ?, ?, ?, ?)",
        data: [name, description, type_id, price, default_variant]
    }
    return execQuery(details);
}

const addProductVariants = (products_arr) => {
    var insert_arr = [];
    for(x in products_arr)
        insert_arr.push([ products_arr[x].product_id, products_arr[x].name, products_arr[x].price ]);

    var details = {
        sql: "INSERT INTO `product_variant` (`product_id`, `name`, `price`) VALUES ?",
        data: [insert_arr]
    }

    return execQuery(details)
}

const getProductById = (product_id) => {
    var details = {
        sql: "SELECT * FROM `product` WHERE `id` = ?",
        data: [product_id]
    }
    return execQuery(details);
}

const getProductAndVariantsById = (product_id) => {
    var details = {
        sql: 'SELECT p.*, t.name as type_name, JSON_ARRAYAGG(JSON_OBJECT("name", pv.name, "price", pv.price)) as variants FROM product p LEFT JOIN product_variant pv ON p.id=pv.product_id JOIN product_types t ON p.type=t.id WHERE p.id = ?',
        data: [product_id]
    }
    return execQuery(details);
}

const getProductsByTypeId = (type_id) => {
    var details = {
        sql: "SELECT * FROM `product` WHERE type = ?",
        data: [type_id]
    }
    return execQuery(details);
}

const updateProductType = (new_type, prod_id) => {
    var details = {
        sql: "UPDATE `product` SET `product_type` = ? WHERE `id` = ?",
        data: [new_type, prod_id]
    }
    return execQuery(details);
}


module.exports = { 
    addProduct,
    addProductVariants,
    getProductById,
    getProductAndVariantsById,
    getProductsByTypeId,
    updateProductType
}