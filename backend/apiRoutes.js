const router = require('express').Router();    

//add route setup here!
    router.get('/hello', (req, res) => {
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    });  

    router.post('/createchar',  (req, res, next) => {
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
    router.post('/getchar', (req, res) => {
        console.log(req);

    }); 

    //get all characters
    router.get('/getallchar', (req, res) => {
        console.log(db)
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
    router.post('/updatechar', (req, res) => {
        console.log(req);
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    }); 

    //delete the character based on user id and character id
    router.post('/deletechar', (req, res) => {
        console.log(req);
        res.send({expressstuff: 'port', whatwhat: 'what'}); 
    }); 


module.exports = router;