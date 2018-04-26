'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const {google} = require('googleapis');
const plus = google.plus('v1');

module.exports.init = function(configs, db){
    const app = express();

    //---------------------------------------- BEGIN GOOGLE ---------
    const oauth2Client = new google.auth.OAuth2(
        configs.auth.googleAuth.clientID,
        configs.auth.googleAuth.clientSecret,
        configs.auth.googleAuth.redirect_uris
    );

    google.options({ auth: oauth2Client });

    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = ['https://www.googleapis.com/auth/plus.me'];
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        // If you only need one scope you can pass it as a string
        access_type: 'offline',
        scope: scopes
    });

    //using session in express
    app.use(session({
        secret: 'your-random-secret-19890913007',
        resave: true,
        saveUninitialized: true
    }));
 
    app.use("/login", function (req, res) {
        res.send(`<h1>Authentication using google oAuth</h1> 
        <a href=${url}> Login </a>`);
    });

    app.use("/oauth2Callback", function (req, res) {
        console.log('/oauth2Callback')

        var session = req.session;
        var code = req.query.code; // the query param code

        oauth2Client.getToken(code, function(err, tokens) {
            // Now tokens contains an access_token and an optional refresh_token. Save them.
            if(!err) {
                oauth2Client.setCredentials(tokens);
                //saving the token to current session
                session["tokens"]=tokens;
                res.send(`<h3>Login successful!!</h3>
                <a href="/details">Go to details page</a>`);
            }
            else{
                res.send(`<h3>Login failed!!</h3>`);
            }
        });
    });
 
    //---------------------------------------- END GOOGLE ---------

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send(err);
    });

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
        res.send({}); 
    }); 

    //get all characters
    app.get('/api/getallchar', (req, res) => {
        console.log(req);
        res.send({}); 
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



