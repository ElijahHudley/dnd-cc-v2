'use strict';

const express = require('express');

//const GoogleStrategy = require('passport-google-oauth20');

const request = require('request');
//const uuidv4 = require('uuid/v4');

const bodyParser = require("body-parser");

//const session = require('express-session');
 //const authRoutes = require('./authRoutes');

const passport = require('passport');

<<<<<<< HEAD
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
=======

//const session = require('express-session');
//const {google} = require('googleapis');
>>>>>>> parent of 90e7203... used pool instead of client

module.exports.init = function(configs, db){
    const app = express(); 
    app.use(passport.initialize());
    app.use(passport.session());

    //app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send(err);
    });

    function insertDataIntoUser(profile){
            var data = null;
            db.connect();
            
            var insertQuery = db.query('INSERT INTO public.users (userid, email, name) VALUES ($1, $2, $3);',[profile.id.substring(1, 5), profile.displayName, profile.displayName], 
            function(err, result){
                console.log('INSERT err', err);
                console.log('INSERT result',result);
                //res.send({status: 'ok'});
            });
            

            insertQuery.on('row', function(row) {
                console.log('insertQuery row', row);
                data = row;
            });

            insertQuery.on('end', function(row) {
                console.log('insertQuery row', row);
                data = row;
                db.end();
            });
    }

    function selectDataFromUsers(selector){
        var data = null;
        db.connect();

        console.log('SELECT selectDataFromUsers', selector);

        db.connect(function (err, client, done) {
            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(err);
            } else {
                console.log('Connection established with pg db server');
                client.query('SELECT * from public.users WHERE userid=' + selector, (err, results) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(err);
                    } else {
                        console.log('Got selectDataFromUsers results : ' + results.rows.length);
                        console.log('Got selectDataFromUsers results : ' + JSON.stringify(res.rows));
                        res.send(results.rows);
                    }
    
                    client.release();
                    //db.end();
                    console.log('Ending getallchar at ' + new Date());
                });
            }
        });
    }

    //---------------------------------------- BEGIN GOOGLE ---------
    
    // Use the GoogleStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and Google profile), and
    //   invoke a callback with a user object.

    var printSometing = function(req, res, next) {
        console.log("I'm still here");
        return next();
    }

    var initGoogleStrategy = function(req, res, next) {
        var GoogleStrategy = require('passport-google-oauth20')
        //var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
        passport.use(new GoogleStrategy({
            clientID: configs.auth.googleAuth.clientID,
            clientSecret: configs.auth.googleAuth.clientSecret,
            callbackURL: configs.auth.googleAuth.redirect_uris
          },
          function(accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
               app.set('GOOGLE_ACCESS_TOKEN', accessToken);

            //    member.authorize(req, res, function(member) {
            //        return done(null, member);
            //    })
          }
        ));

        return next();
    }

//     app.get('/auth/google/callback', printSometing, initGoogleStrategy, printSometing,
//     passport.authenticate('google', { failureRedirect: '/' }), printSometing,
//     function(req, res) {
//         if (req.session.redirectURL) {
//             var redirectURL = req.session.redirectURL;
//             req.session.redirectURL = null;
//             res.redirect(redirectURL)
//         } else res.redirect('/');
//   });

  // GET /auth/facebook
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Facebook authentication will involve
  //   redirecting the user to facebook.com.  After authorization, Facebook will
  //   redirect the user back to this application at /auth/facebook/callback
    app.get('/auth/google', initGoogleStrategy,
        passport.authenticate('google', {scope: ['profile', 'email'] })
    ), (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    };

    app.get('/auth/google/callback', printSometing, initGoogleStrategy, printSometing,
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    ), (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    };
    
    // passport.use(new GoogleStrategy({
    //         clientID: configs.auth.googleAuth.clientID,
    //         clientSecret: configs.auth.googleAuth.clientSecret,
    //         callbackURL: configs.auth.googleAuth.redirect_uris
    //     },
    //     function(accessToken, refreshToken, profile, done) {
    //        //selectDataFromUsers(profile.id.substring(1, 5));
           
    //     //console.log('accessToken DONE!',accessToken, '\n');
    //     //    console.log('refreshToken DONE!',refreshToken, '\n');
    //     //    console.log('profile DONE!',profile, '\n');
    //     //    console.log('done DONE!',done, '\n');

    //         process.nextTick(function() {
    //             console.log('nextTick DONE!', '\n');
    //         });

    //         return next();
    //     }
    // )); 

   // http://localhost:5000/auth/google

    // app.get('/auth/google', 
    //     passport.authenticate('google', { 
    //         scope : ['profile'] 
    //     }), (req, res) => {
    //         res.send("logging in");
    //     });

    // app.get('/auth/google', passport.authenticate('google', { 
    //         scope : ['profile'] 
    //     }),(req, res) => { 
    //     res.send({expressstuff: 'port', code: 'what'});
    //     //res.redirect('http://localhost:5000/auth/google'); 
    // });  

    // app.get('/auth/google/callback', passport.authenticate('google', {
    //     successRedirect: '/user',
    //     failureRedirect: '/',
    //     failureFlash: true
    //   }), (req, res, next)=> { 
    //     res.send({expressstuff: 'port', code: 'what'});
    //     //res.redirect('http://localhost:5000/auth/google'); 
    // });  

    //app.use('/auth', authRoutes);

    //---------------------------------------- END GOOGLE ---------

    //add route setup here!
    app.get('/api/hello', (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    });  

<<<<<<< HEAD
=======
    app.post('/api/createchar',  (req, res, next) => {
        if (!req.body) return res.sendStatus(400);
        const char = req.body;

        db.connect();
         
        var query = db.query('INSERT INTO characters(text, complete) values($1, $2);',[char.text, char.complete], 
        function(err){
            if(err) return next(err);
            res.send({status: 'ok'});
        });

        query.on('row', function(row) {
            console.log('row', row);
        });
         
        query.on('end', function() {
            console.log('row end');
            db.end();
        });
    
    });

    //get character based on userid
    app.post('/api/getchar', (req, res) => {
        console.log(req);

        
    }); 

>>>>>>> parent of 90e7203... used pool instead of client
    //get all characters
    app.get('/api/getallchar', (req, res) => {
        console.log(req);
        db.connect(); 
          
        var query = db.query('SELECT * from public.characters', 
        function(err, result){
                console.log('SELECT err', err);
                console.log('SELECT result',result);
                //res.send({status: 'ok'});
            });

<<<<<<< HEAD
        db.connect(function (err, client, done) {

            if (err) {
                console.error('Error connecting to pg server' + err.stack);
                callback(err);
            } else {
                console.log('Connection established with pg db server');
                client.query('SELECT * from public.characters', (err, results) => {
    
                    if (err) {
                        console.error('Error executing query on pg db' + err.stack);
                        callback(err);
                    } else {
                        console.log('Got query results : ' + results.rows.length);
                        res.send(results.rows);
                    }
    
                    client.release();
                    //db.end();
                    
                    console.log('Ending getallchar at ' + new Date());
                });
            }
        });
=======
        query.on('row', function(row) {
            console.log('row', row);
            res.send(row);
        });
        
        query.on('end', function() {
            console.log('row end');
            db.end();
        }); 
>>>>>>> parent of 90e7203... used pool instead of client
    });

    return app;
};



