const pg = require('pg');

module.exports.init = function (configs) {

    let dbConfig = {
        user: configs.user,
        password: configs.pass,
        database: configs.database,
        max: '1'
    }

    const pool = new pg.Pool(dbConfig);

     // the pool with emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    });

    pool.connect(function (err, client, done) {

        if (err) {
            console.error('Error connecting to pg server' + err.stack);
            callback(err);
        } else {
            console.log('Connection established with pg db server');
            client.query('SELECT current_user', (err, res) => {

                if (err) {
                    console.error('Error executing query on pg db' + err.stack);
                    callback(err);
                } else {
                    console.log('Got query results : ' + JSON.stringify(res.rows));
                }

                client.release();
                
                console.log('Ending lambda at ' + new Date(), '\n');
            });
        }

    });

    return new pg.Pool(dbConfig);
};