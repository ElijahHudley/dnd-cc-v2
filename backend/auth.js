const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('./user');

module.exports = function (passport, configs, db) {
    var userModel = new UserModel(db);

    passport.serializeUser(function (user, done) {
        console.log('\n passport.serializeUser', user);
        done(null, user.userid);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        console.log('\n passport.deserializeUser', id);
        userModel.getUser(id, function (err, user) {
            done(err, user);
        });
    });

    function UserCallback(data){
        console.log('findUserCallback', data);
        return data; 
    };

    passport.use(new GoogleStrategy({
        clientID: configs.auth.googleAuth.clientID,
        clientSecret: configs.auth.googleAuth.clientSecret,
        callbackURL: configs.auth.googleAuth.redirect_uris

    }, (token, refreshToken, profile, done) => {
        console.log(userModel);

        process.nextTick(function() {
            userModel.getUser(profile.id, function(data, err){
                if (err){
                    console.log('there was an error', err);
                    return done(err);
                }

                if (data.length) {
                    // if a user is found, log them in
                    console.log('\n if a user is found, log them in', data);
                    return done(null, data[0]);
                } else {
                    // if the user isnt in our database, create a new user
                    console.log('\n if the user isnt in our database, create a new user', data);

                    // set all of the relevant information
                    userModel.google.id    = profile.id;
                    userModel.google.token = token;
                    userModel.google.name  = profile.displayName;
                    //userModel.google.email = profile.emails[0].value; // pull the first email
                    
                    console.log('newUser', userModel.google);
                    userModel.setUser(userModel, function(data, err){
                        if (err){
                            throw err;
                        }

                        return done(null, userModel);
                    });
                }
            });
        });
        // userModel.get(profile.id, function(data){
        //     console.log('got data', data);
            
        //     if(data.length < 1){
        //         userModel.set(profile, function(data){
        //             console.log('save data', data);
        //         });
        //     }
        // });

    }));

};