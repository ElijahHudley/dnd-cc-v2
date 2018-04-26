const pg = require('pg');

module.exports.init = function (configs) {
    var userInfo = {
        host: configs.host,
        user: configs.user,
        pass: configs.pass,
        url: configs.url,
        database: configs.database
    }
    var connectionString = process.env.DATABASE_URL || 'postgres://' + userInfo.user +':'+ userInfo.pass + '@' + userInfo.url +  userInfo.database; 

    return new pg.Client(connectionString);
}; 

//const connectionString = process.env.DATABASE_URL || 'postgres://eli:jvdilla12@localhost:5432/CreatorDB'; 

// const client = new pg.Client(connectionString, function(err, cli, dun){
//     if(err){
//         return console.log('error connecting to database', err);
//     }else{
//         console.log('CONNECTED TO DATABASE!');
//     }
// }); 

// client.connect(function(err, client, done){
    
// });

// module.exports = client;

// const query = client.query(
//   'CREATE TABLE characters(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

// query.on('end', () => { client.end(); });