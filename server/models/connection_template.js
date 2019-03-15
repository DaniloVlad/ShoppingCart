const mysql = require('mysql');
//This file is to be changed to your connection
//information and rename to connection.js
const queryConnection = {
    user: 'root',
    host: 'localhost',
    password: 'PASSWORD123',
    database: 'db_name',
    port: 3306,
    connectionLimit: 10
};

const connection = mysql.createPool(queryConnection);

module.exports = connection;
