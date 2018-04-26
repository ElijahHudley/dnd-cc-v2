'use strict';

const express = require('express');
const bodyParser = require("body-parser");

module.exports.init = function(configs, db){
    const app = express();

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

    











    // app.get('/api/readchar', (req, res) => {
//         console.log(req);
//   res.send({expressstuff: 'port', whatwhat: 'what'}); 
// }); 

// app.post('/api/updatechar', (req, res) => {
//         console.log(req);
//   res.send({expressstuff: 'port', whatwhat: 'what'}); 
// }); 

// app.post('/api/deletechar', (req, res) => {
//         console.log(req);
//   res.send({expressstuff: 'port', whatwhat: 'what'}); 
// }); 


    return app;
};



