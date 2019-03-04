const execQuery = require('./db');

const addProductType = (name, category_id, cb) => {
    var details = {
        sql: "INSERT INTO `product_types` (name, category_id) VALUES (?,?)",
        data: [name, category_id]
    }
    return execQuery(details);
}

const getTypeNameById = (type_id) => {
    var details = {
        sql: "SELECT `name` FROM `product_types` WHERE `id` = ?",
        data: [type_id]
    }
    return execQuery(details);
}

const getTypeIdByName = (name) => {
    var details = {
        sql: "SELECT `id` FROM `product_types` WHERE `name` = ?",
        data: [name]
    }
    return execQuery(details);
}

const updateProductTypeName = (name, type_id) => {
    var details = {
        sql: "UPDATE `product_types` SET `name` = ? WHERE `id`=?",
        data: [name, type_id]
    }
    return execQuery(details);
}

module.exports = {
    addProductType, 
    getTypeNameById, 
    getTypeIdByName,
    updateProductTypeName
}