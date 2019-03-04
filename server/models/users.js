var execQuery = require('./db');

const createUser = (req, res, next) => {
    var {first_name, last_name, email, password} = req.body;
    var details = {
        sql: "INSERT INTO `users` (first_name, last_name, email, password, joined) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())",
        data: [first_name, last_name, email, password]
    }
    return execQuery(details);
}


module.exports = {
    createUser

}