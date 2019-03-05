var execQuery = require('./db');


const addUser = (user) => {
    var {first_name, last_name, email, password} = user;
    var details = {
        sql: "INSERT INTO `users` (first_name, last_name, email, password, joined) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())",
        data: [first_name, last_name, email, password]
    }
    return execQuery(details);
}

const getUserDetails = (email, password) => {
    var details = {
        sql: "SELECT * FROM users WHERE email = ? AND password = ?",
        data: [email, password]
    }
    return execQuery(details);
}

const checkEmail = (email) => {
    var details = {
        sql: "SELECT email FROM users WHERE email = ?",
        data: [email]
    }
    return execQuery(details);
}
const updateEmail = (id, newEmail) => {
    var details = {
        sql: "UPDATE `users` SET email = ? WHERE `id`= ?",
        data: [newEmail, id]
    }
    return execQuery(details);
}

const updateFirstAndLastName = (id, first_name, last_name) => {
    var details = {
        sql: "UPDATE `users` SET first_name = ?, last_name = ? WHERE `id`= ?",
        data: [first_name, last_name, id]
    }
    return execQuery(details);
}

const updatePassword = (id, password) => {
    var details = {
        sql: "UPDATE `users` SET `password` = ? WHERE `id`= ?",
        data: [password, id]
    }
    return execQuery(details);
}

module.exports = {
    addUser,
    getUserDetails,
    checkEmail,
    updateEmail,
    updateFirstAndLastName,
    updatePassword
}