// My module
function UserModel(db) {

    this.google = {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

    this.setUser = function(profile, callback){
        console.log('this.setUser ', profile, callback);
        db.connect(function (err, client, done) {

            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback({}, err);
            } else {
                console.log('setUser Connection established with pg db server');
                client.query('INSERT INTO public.userprofiles (userid, token, name) VALUES ($1, $2, $3);', [profile.google.id, profile.google.token, profile.google.name], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback({}, err);
                    } else {
                        console.log('Got query results : ' + JSON.stringify(res.rows));
                        callback(res.rows, err);
                    }
    
                    client.release();
                    console.log('Ending lambda at ' + new Date(), '\n');
                });
            }
        });
    }

    this.getUser = function(id, callback){
        db.connect(function (err, client, done) {
            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback({}, err);
            } else {
                console.log('getUser Connection established with pg db server');
                client.query('SELECT * from public.userprofiles where userid = $1', [id], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback({}, err);
                    } else {
                        console.log('Got query results : ' + JSON.stringify(res.rows));
                        callback(res.rows, err);
                    }
    
                    client.release();
                    console.log('Ending lambda at ' + new Date(), '\n');
                });
            }
        });
    }
  }
  
  module.exports = UserModel;