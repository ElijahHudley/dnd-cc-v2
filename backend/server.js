'use strict';

const express = require('express');
const request = require('request');
//const uuidv4 = require('uuid/v4');

const bodyParser = require("body-parser");

const passport = require('passport');
const session = require('express-session');

const GoogleStrategy = require('passport-google-oauth20');
const authRoutes = require('./authRoutes');


//const session = require('express-session');
//const {google} = require('googleapis');

module.exports.init = function(configs, db){
    const app = express(); 

    //app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(passport.initialize())
    app.use(passport.session())

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

        var selectQuery = db.query('SELECT * from public.users WHERE userid=' + selector, 
            function(err, result){
                console.log('SELECT err', err);
                console.log('SELECT result',result);
                //res.send({status: 'ok'});
            });

            selectQuery.on('row', function(row) {
                console.log('row', row);
                data = row;
                
                if(data === null){
                    console.log('data', data);
                }else{
                    console.log('data', data);
                } 
            });

            selectQuery.on('end', function() {
                console.log('row end', data);
                data = 'none';
                db.end();
            });
    }

    //---------------------------------------- BEGIN GOOGLE ---------
    
    // Use the GoogleStrategy within Passport.
    //   Strategies in passport require a `verify` function, which accept
    //   credentials (in this case, a token, tokenSecret, and Google profile), and
    //   invoke a callback with a user object.
    
    passport.use(new GoogleStrategy({
            clientID: configs.auth.googleAuth.clientID,
            clientSecret: configs.auth.googleAuth.clientSecret,
            callbackURL: configs.auth.googleAuth.redirect_uris
        },
        function(accessToken, refreshToken, profile, done) {
           selectDataFromUsers(profile.id.substring(1, 5));
           console.log(done);
        }
    ));



    app.use('/auth', authRoutes);
    //---------------------------------------- END GOOGLE ---------

    //add route setup here!
    app.get('/api/hello', (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    });  

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

        query.on('row', function(row) {
            console.log('row', row);
            res.send(row);
        });
        
        query.on('end', function() {
            console.log('row end');
            db.end();
        }); 
    });

    //update the character based on userid
    app.post('/api/updatechar', (req, res) => {
        console.log(req);
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    }); 

    //delete the character based on user id and character id
    app.post('/api/deletechar', (req, res) => {
        console.log(req);
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    }); 


    return app;
};



