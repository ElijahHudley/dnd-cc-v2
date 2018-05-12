const express = require('express');
const app = express();
const passport = require('passport');
const auth = require('./auth');
var session = require('express-session');

module.exports.init = function (configs, db) {
    auth(passport, configs, db);
    
    // required for passport session
    app.use(session({
        secret: 'secrettexthere',
        saveUninitialized: true,
        resave: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send(err);
    });

    app.get('/', (req, res) => {
        if (req.session.token) {
            res.cookie('token', req.session.token);
            res.json({
                status: 'session cookie set'
            });
        } else {
            res.cookie('token', '')
            res.json({
                status: 'session cookie not set'
            });
        }
    });

    app.get('/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
    });

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    })
        // , (req, res) => {
        //     console.log('req.query', req.query);
        //     res.send({ code: req.query.code });
        // }
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/auth/fail',
            successRedirect: '/auth/user'
        })
        // ,(req, res) => {
        //     console.log('req.user.token', req.user.token);
        //     req.session.token = req.user.token;
        //     res.redirect('/');
        // }
    );

    app.get('/auth/user', isLoggedIn, (req, res) => {
        res.send({ expressstuff: 'port', whatwhat: req.user });
    });

    app.get('/auth/fail', (req, res) => {
        res.send({ expressstuff: 'FAILED TO LOGIN', whatwhat: req.user });
    });

    return app;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log('\n isLoggedIn', req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/auth/fail');
}