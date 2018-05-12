const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport, configs) {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: configs.auth.googleAuth.clientID,
        clientSecret: configs.auth.googleAuth.clientSecret,
        callbackURL: configs.auth.googleAuth.redirect_uris

    }, (token, refreshToken, profile, done) => {
        return done(null, {
            profile: profile,
            token: token
        });

    }));
    
};