// My module
function UserModel(db) {

    this.google = {
        userid       : String,
        token        : String,
        name         : String,
        email        : String
    }

    this.setUser = function(profile, callback){
        console.log('this.setUser', profile);

        db.connect(function (err, client, done) {

            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(null, err);
            } else {
                console.log('setUser Connection established with pg db server');
                client.query('INSERT INTO public.userprofiles (userid, token, name, email, created) VALUES ($1, $2, $3, $4, $5);', [profile.google.userid, profile.google.token, profile.google.name, profile.google.email, new Date()], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(null, err);
                    } else {
                        console.log('Got query results  : ', res.rows);
                        callback(res.rows);
                    }
    
                    client.release();
                    console.log('Ending setUser at ' + new Date(), '\n');
                });
            }
        });
    }

    this.getUser = function(userid, callback){
        console.log('this.getUser', userid);

        db.connect(function (err, client, done) {
            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(null, err);
            } else {
                console.log('getUser Connection established with pg db server');
                client.query('SELECT * from public.userprofiles where userid = $1', [userid], (err, res) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(null, err);
                    } else {
                        console.log('Got query results : ' ,res.rows);
                        callback(res.rows, null);
                    }
    
                    client.release();
                    console.log('Ending getUser at ' + new Date(), '\n');
                });
            }
        });
    }
  }
  
  module.exports = UserModel;