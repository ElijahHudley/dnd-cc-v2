// My module
function UserModel(db) {
    this.db = db;

    this.save = function(profile, callback){
        db.connect(function (err, client, done) {

            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(err);
            } else {
                console.log('Connection established with pg db server');
                client.query('INSERT INTO public.userprofiles (userid, email, name) VALUES ($1, $2, $3);', [profile.id, profile._json.url, profile.displayName], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(err);
                    } else {
                        console.log('Got query results : ' + JSON.stringify(res.rows));
                        callback(res.rows);
                    }
    
                    client.release();
                    
                    console.log('Ending lambda at ' + new Date(), '\n');
                });
            }
    
        });
    }

    this.get = function(id, callback){
        db.connect(function (err, client, done) {
            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(err);
            } else {
                console.log('Connection established with pg db server');
                client.query('SELECT * from public.userprofiles where userid = $1', [id], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(err);
                    } else {
                        console.log('Got query results : ' + JSON.stringify(res.rows));
                        callback(res.rows);
                    }
    
                    client.release();
                    
                    console.log('Ending lambda at ' + new Date(), '\n');
                });
            }
    
        });
    }


  }
  
  module.exports = UserModel;