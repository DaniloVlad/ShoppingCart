var mysql = require('mysql');


var connection = mysql.createPool({
    user: 'root',
    host: 'localhost',
    password: 'PASSWORD123',
    database: 'db_name'
});

const execQuery = (details) => {
    return new Promise((resolve, reject) => {
        
        let {sql, data} = details;
        console.log("Here is the query: ")
        console.log(mysql.format(sql, data));
        connection.query(sql, data, (error, results, feilds) => {
            if(error) { 
                console.log(`Query had an error!\n Error: ${error}`);
                return reject(error)
            }
            else {
                console.log(`Query was successfully!\n Result: ${JSON.stringify(results)}`);
                return resolve(results);
            }
        });
    })
}
module.exports = execQuery;
