const passport = require('passport');
const router = require('express').Router();
const { User } = require('../models');
const { mailer } = require('../utils');

// Route - Register new user
router.post('/register', (req, res) => {
    req.body.password = User.hashPassword(req.body.password);
    User.create(req.body).then(user => {
        delete user.dataValues.password;
        res.status(201).send(user.dataValues)
    }).catch(err => res.status(500).send(err));
});


// Route - Login a user
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    delete req.user.password;
    res.send(req.user);
});


// Route - Forget user password
router.post('/forget-password', (req, res) => {
    const { email } = req.body;
    mailer({ email }).then(resp => {
        console.log('mail sent===>>', resp);
    }).catch(err => console.log('err sending mail===>>', err));
});

module.exports = router;