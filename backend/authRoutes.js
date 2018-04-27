const router = require('express').Router();    
const passport = require('passport');

router.get('/logout', (req, res) => {
        res.send('logout'); 
}); 

router.get('/login', (req, res) => {
        res.send('login'); 
}); 

router.get('/google', passport.authenticate('google', {
        scope: ['profile']
})); 

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        res.send('call back reached!')
});

module.exports = router;