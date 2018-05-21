const express = require('express');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const auth = require('./auth');

const uuidv4 = require('uuid/v4');
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

// const session = require('express-session');
// const pgSession = require('connect-pg-simple')(session);

const request = require('request');
const url = require('url');    

module.exports.init = function (configs, db) {
    const app = express();
    auth(passport, configs, db);

    app.use(cookieSession({
        name: 'session',
        keys: ['jW8aor76jpPX'],
        httpOnly: false,
        secure: false, 
        overwrite: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }))
     

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(function (err, req, res, next) {
        console.log('\n error!'); 
        console.log('\n error!', err); 
        res.status(500).send(err);
        // next(err);
    });

    // IS LOGGED IN ------------------------------------------------------

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
        console.log('\n IS USER LOGGED IN!!!', req.isAuthenticated());

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            return next();
        }

        // if they aren't redirect them to the home page
        res.redirect('/auth/fail');
    }

    function requiresLogin(req, res, next) {
        
        try{ 
            const token = req.headers.token;
            console.log('token', token, req.headers, '\n');

            const decoded = jwt.verify(token, 'jW8aor76jpPX');
            req.userData = decoded;
            
            return next();
        }catch(e){
            console.log(e);
            var err = {err: 'You must be logged in to view this page.', status: 401};
            return next(JSON.stringify(err)); 
        }

        // if (req.session && req.session.token) {
        //   return next();
        // } else {
        //   var err = new Error('You must be logged in to view this page.');
        //   err.status = 401;
        //   return next(err); 
        // }
      }

    // SESSION ------------------------------------------------------

    app.get('/', (req, res) => {
        // res.json({
        //     status: 'session cookie set', 
        //     session: req.session, 
        //     cookies: req.cookies || {}
        // });

        res.redirect('http://localhost:3000/');

        // if (req.session) {
        //     res.cookie('token', uuidv4());

        //     req.session.views = (req.session.views || 0) + 1;
        //     req.session.token = res.cookie.token || '';

        //     res.json({status: 'session cookie set', session: req.session});
        //     res.end(req.session.views + ' views');
        // }else{
        //     res.cookie('token', '');
        //     res.json({status: 'session cookie not set'});
        // }
        
    });

    // AUTH ------------------------------------------------------------


    app.get('/auth/google', passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 
                'https://www.googleapis.com/auth/userinfo.email']
    }) 
        // , (req, res) => {
        //     console.log('req.query', req.query);
        //     res.send({ code: req.query.code });
        // }
    );
       
    
    app.get('/auth/logout', (req, res) => {
        req.logout();
        req.session = null;
        res.redirect('/');
    });


    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/auth/fail',
            successRedirect: '/auth/user'
        })
        // , (req, res) => {
        //     console.log('req.user.token', req.user.token);
        //     req.session.token = req.user.token;
        //     res.redirect('http://localhost:3000/user');
        // }
    );

    app.get('/auth/user', isLoggedIn, (req, res) => {        
        const token = jwt.sign(JSON.stringify(req.user), 'jW8aor76jpPX');
        
        req.session.token = token;
        res.cookie('token' , token);

        console.log('\n req.session.token', req.session.token, '\n');

        res.redirect(url.format({
            pathname:"http://localhost:3000/user",
            query: {
               "loggedin": req.isAuthenticated(),
             } 
          }));
    });

    app.get('/auth/fail', (req, res) => {
        console.log('\n USER Failed TO LOG IN!!!');
        res.send({ expressstuff: 'FAILED TO LOGIN', whatwhat: req.user });
    });

    app.get('/auth/getuser', requiresLogin, (req, res) => {
        console.log('get user \n', req, '\n');
        res.send({user: req.userData[0]});
    });


    //requiresLogin,
    app.get('/api/hello', requiresLogin, (req, res, next) => {
        console.log('\n hello!!!');
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    });


    // END AUTH ----------------------------------------------------------


    return app;
};
