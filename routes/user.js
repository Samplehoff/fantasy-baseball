const passport = require('passport');
const router = require('express').Router();
const { User } = require('../models');

router.post('/register', (req, res) => {
    req.body.password = User.hashPassword(req.body.password);
    User.create(req.body).then(user => {
        delete user.dataValues.password;
        res.status(201).send(user.dataValues)
    }).catch(err => res.status(500).send(err));
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    delete req.user.password;
    res.send(req.user);
});

module.exports = router;