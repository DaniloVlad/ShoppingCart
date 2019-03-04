var execQuery = require('./db');

const getMenu = () => {
    var details = {
        sql:"SELECT ct.name, JSON_ARRAYAGG(t.name) as subCategories FROM categories ct LEFT JOIN product_types t ON ct.id = t.category_id GROUP BY ct.id"
    }
    console.log('getting menu...')
    return execQuery(details);
}

const getCategories = () => {
    var details = {
        sql: "SELECT * FROM `categories`"
    }
    return execQuery(details);
}

const getSubCategoriesByCategory = (category_name) => {
    var details = {
        sql: "SELECT pt.`name` FROM `product_types` pt RIGHT JOIN `categories` cat ON cat.`id` = pt.`category_id` WHERE `cat`.name = ?",
        data: [category_name]
    }
    return execQuery(details);
}

const addCategory = (name, position) => {
    var details = {
        sql: "INSERT INTO `categories` (`name`, `position`) VALUES (?, ?)",
        data: [name, position]
    }
    return execQuery(details);
}

const updateCategoryPosition = (category_id, position) => {
    var details = {
        sql: "UPDATE `categories` SET `position` = ? WHERE `id` = ?",
        data: [position, category_id]
    }
    return execQuery(details);
}


module.exports = {
    addCategory,
    getMenu, 
    getCategories, 
    getSubCategoriesByCategory,
    updateCategoryPosition
};