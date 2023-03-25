const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/registro', (req, res, next) => {
    res.render('registro');
});

router.post('/registro', passport.authenticate('local-registro',{
    successRedirect: '/profile',
    failureRedirect: '/registro',
    passReqToCallback: true
}));

router.get('/ingreso', (req, res, next) => {
    res.render('ingreso');
});

router.post('/ingreso', passport.authenticate('local-ingreso',{
    successRedirect: '/profile',
    failureRedirect: '/ingreso',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout(() => {
        res.redirect('/ingreso');
    });
});

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/profile', (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;