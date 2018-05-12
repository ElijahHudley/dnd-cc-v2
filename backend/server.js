const express = require('express');
const app = express();
const passport = require('passport');
const auth = require('./auth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

module.exports.init = function (configs, db) {
    auth(passport, configs, db);
    app.use(passport.initialize());

    app.use(cookieSession({
        name: 'session',
        keys: ['SECRECT KEY'],
        maxAge: 24 * 60 * 60 * 1000
    }));

    app.use(cookieParser());

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
    }), (req, res) => {
        console.log('req.query', req.query);
        res.send({code: req.query.code});
    });

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/',
            successRedirect: '/auth/user'
        }),
        (req, res) => {
            console.log('req.user.token', req.user.token);
            req.session.token = req.user.token;
            res.redirect('/');
        }
    );

    app.get('/auth/user', (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
 

    });      

    return app;
};