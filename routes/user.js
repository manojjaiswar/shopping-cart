var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport')

var csrfProtection = csurf();
router.use(csrfProtection);

router.get('/profile', isLoggenIn, function (req, res, next) {
    res.render('user/profile')
});
router.get('/logout', isLoggenIn, function (req, res, next) {
    req.logout();
    res.redirect('/')
});

router.use('/', notLoggenIn, function (req, res, next) {
    next();
})

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: 'signup',
    failureFlash: true
}),
function(req, res, next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 })
});
router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: 'signin',
    failureFlash: true
}), function(req, res, next){
    if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    }else{
        res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggenIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
function notLoggenIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

