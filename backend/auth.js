const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserModel = require('./user');

module.exports = function (passport, configs, db) {
    var userModel = new UserModel(db);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    function findUserCallback(err, user){
        console.log('findUserCallback', err, user);
    };

    passport.use(new GoogleStrategy({
        clientID: configs.auth.googleAuth.clientID,
        clientSecret: configs.auth.googleAuth.clientSecret,
        callbackURL: configs.auth.googleAuth.redirect_uris

    }, (token, refreshToken, profile, done) => {
        console.log(profile);

        userModel.get(profile.id, function(data){
            console.log('got data', data);
            
            if(data.length<1){
                userModel.save(profile, function(data){
                    console.log('save data', data);
                });
            }
        });

        return done(null, {
            profile: profile,
            token: token
        });       

    }));

};