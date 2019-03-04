var execQuery = require('./db');


const getSiteSettings = () => {
    var details = {
        sql: 'SELECT name, support_email FROM site_settings'
    }
    return execQuery(details);
}


module.exports = getSiteSettings;