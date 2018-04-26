const pg = require('pg');

module.exports.init = function (configs) {
    const user = configs.user;
    const pass = configs.pass;
    const url = configs.url;
    const database = configs.database;

    const connectionString = `postgres://${user}:${pass}@${url}${database}`;
    
    return new pg.Client(connectionString);
}; 

