const router = require('express').Router();    
const passport = require('passport');

// router.get('/logout', (req, res) => {
//         res.send('logout'); 
// }); 

// router.get('/login', (req, res) => {
//         res.send('login'); 
// }); 


// router.get('/google/callback', passport.authenticate('google', {
//         successRedirect : '/user',
//         failureRedirect : '/'
// }), (req, res) => { 
//        console.log('call back reached!', Object.keys(res.req), req.query.code);
//         return res.redirect('http://localhost:3000/user?code=' + req.query.code);
// }); 

// , (req, res) => { 
//         console.log('call back reached!', Object.keys(res.req), req.query.code);
//         //res.send(req.query.code);
//         //return res.redirect('http://localhost:3000/user?code=' + req.query.code);
// }


// router.get('/google', passport.authenticate('google', {
//         scope: ['profile']
// })); 


// router.get('/google/callback', passport.authenticate('google'), (req, res) => {
//         console.log('call back reached!', res.req._passport);
//         return res.redirect('http://localhost:3000/user');
// }); 

module.exports = router;